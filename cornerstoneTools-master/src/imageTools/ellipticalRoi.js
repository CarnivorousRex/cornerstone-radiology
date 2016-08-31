(function($, cornerstone, cornerstoneMath, cornerstoneTools) {

    'use strict';

    var toolType = 'ellipticalRoi';

    ///////// BEGIN ACTIVE TOOL ///////
    function createNewMeasurement(mouseEventData) {
        // create the measurement data for this tool with the end handle activated
        var measurementData = {
            visible: true,
            active: true,
            invalidated: true,
            handles: {
                start: {
                    x: mouseEventData.currentPoints.image.x,
                    y: mouseEventData.currentPoints.image.y,
                    highlight: true,
                    active: false
                },
                end: {
                    x: mouseEventData.currentPoints.image.x,
                    y: mouseEventData.currentPoints.image.y,
                    highlight: true,
                    active: true
                },
                textBox: {
                    active: false,
                    hasMoved: false,
                    movesIndependently: false,
                    drawnIndependently: true,
                    allowedOutsideImage: true,
                    hasBoundingBox: true
                }
            }
        };

        return measurementData;
    }
    ///////// END ACTIVE TOOL ///////

    ///////// BEGIN IMAGE RENDERING ///////
    function pointInEllipse(ellipse, location) {
        var xRadius = ellipse.width / 2;
        var yRadius = ellipse.height / 2;

        if (xRadius <= 0.0 || yRadius <= 0.0) {
            return false;
        }

        var center = {
            x: ellipse.left + xRadius,
            y: ellipse.top + yRadius
        };

        /* This is a more general form of the circle equation
         *
         * X^2/a^2 + Y^2/b^2 <= 1
         */

        var normalized = {
            x: location.x - center.x,
            y: location.y - center.y
        };

        var inEllipse = ((normalized.x * normalized.x) / (xRadius * xRadius)) + ((normalized.y * normalized.y) / (yRadius * yRadius)) <= 1.0;
        return inEllipse;
    }

    function calculateMeanStdDev(sp, ellipse) {
        // TODO: Get a real statistics library here that supports large counts

        var sum = 0;
        var sumSquared = 0;
        var count = 0;
        var index = 0;

        for (var y = ellipse.top; y < ellipse.top + ellipse.height; y++) {
            for (var x = ellipse.left; x < ellipse.left + ellipse.width; x++) {
                if (pointInEllipse(ellipse, {
                    x: x,
                    y: y
                }) === true) {
                    sum += sp[index];
                    sumSquared += sp[index] * sp[index];
                    count++;
                }

                index++;
            }
        }

        if (count === 0) {
            return {
                count: count,
                mean: 0.0,
                variance: 0.0,
                stdDev: 0.0
            };
        }

        var mean = sum / count;
        var variance = sumSquared / count - mean * mean;

        return {
            count: count,
            mean: mean,
            variance: variance,
            stdDev: Math.sqrt(variance)
        };
    }

    function pointNearEllipse(element, data, coords, distance) {
        var startCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
        var endCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

        var minorEllipse = {
            left: Math.min(startCanvas.x, endCanvas.x) + distance / 2,
            top: Math.min(startCanvas.y, endCanvas.y) + distance / 2,
            width: Math.abs(startCanvas.x - endCanvas.x) - distance,
            height: Math.abs(startCanvas.y - endCanvas.y) - distance
        };

        var majorEllipse = {
            left: Math.min(startCanvas.x, endCanvas.x) - distance / 2,
            top: Math.min(startCanvas.y, endCanvas.y) - distance / 2,
            width: Math.abs(startCanvas.x - endCanvas.x) + distance,
            height: Math.abs(startCanvas.y - endCanvas.y) + distance
        };

        var pointInMinorEllipse = pointInEllipse(minorEllipse, coords);
        var pointInMajorEllipse = pointInEllipse(majorEllipse, coords);

        if (pointInMajorEllipse && !pointInMinorEllipse) {
            return true;
        }

        return false;
    }

    function pointNearTool(element, data, coords) {
        return pointNearEllipse(element, data, coords, 15);
    }

    function pointNearToolTouch(element, data, coords) {
        return pointNearEllipse(element, data, coords, 25);
    }

    function numberWithCommas(x) {
        // http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        var parts = x.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    function onImageRendered(e, eventData) {
        // If we have no toolData for this element, return immediately as there is nothing to do
        var toolData = cornerstoneTools.getToolState(e.currentTarget, toolType);
        if (!toolData) {
            return;
        }

        var image = eventData.image;
        var element = eventData.element;
        var lineWidth = cornerstoneTools.toolStyle.getToolWidth();
        var config = cornerstoneTools.ellipticalRoi.getConfiguration();
        var context = eventData.canvasContext.canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);

        // Retrieve the image modality from its metadata, if available
        var modalityTag = 'x00080060';
        var modality;
        if (image.data) {
            modality = image.data.string(modalityTag);
        }

        // If we have tool data for this element - iterate over each set and draw it
        for (var i = 0; i < toolData.data.length; i++) {
            context.save();

            var data = toolData.data[i];

            // Apply any shadow settings defined in the tool configuration
            if (config && config.shadow) {
                context.shadowColor = config.shadowColor || '#000000';
                context.shadowOffsetX = config.shadowOffsetX || 1;
                context.shadowOffsetY = config.shadowOffsetY || 1;
            }

            // Check which color the rendered tool should be
            var color = cornerstoneTools.toolColors.getColorIfActive(data.active);

            // Convert Image coordinates to Canvas coordinates given the element
            var handleStartCanvas = cornerstone.pixelToCanvas(element, data.handles.start);
            var handleEndCanvas = cornerstone.pixelToCanvas(element, data.handles.end);

            // Retrieve the bounds of the ellipse (left, top, width, and height)
            // in Canvas coordinates
            var leftCanvas = Math.min(handleStartCanvas.x, handleEndCanvas.x);
            var topCanvas = Math.min(handleStartCanvas.y, handleEndCanvas.y);
            var widthCanvas = Math.abs(handleStartCanvas.x - handleEndCanvas.x);
            var heightCanvas = Math.abs(handleStartCanvas.y - handleEndCanvas.y);

            // Draw the ellipse on the canvas
            context.beginPath();
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            cornerstoneTools.drawEllipse(context, leftCanvas, topCanvas, widthCanvas, heightCanvas);
            context.closePath();

            // If the tool configuration specifies to only draw the handles on hover / active,
            // follow this logic
            if (config && config.drawHandlesOnHover) {
                // Draw the handles if the tool is active
                if (data.active === true) {
                    cornerstoneTools.drawHandles(context, eventData, data.handles, color);
                } else {
                    // If the tool is inactive, draw the handles only if each specific handle is being
                    // hovered over
                    var handleOptions = {
                        drawHandlesIfActive: true
                    };
                    cornerstoneTools.drawHandles(context, eventData, data.handles, color, handleOptions);
                }
            } else {
                // If the tool has no configuration settings, always draw the handles
                cornerstoneTools.drawHandles(context, eventData, data.handles, color);
            }

            // Define variables for the area and mean/standard deviation
            var area,
                meanStdDev,
                meanStdDevSUV;

            // Perform a check to see if the tool has been invalidated. This is to prevent
            // unnecessary re-calculation of the area, mean, and standard deviation if the
            // image is re-rendered but the tool has not moved (e.g. during a zoom)
            if (!data.invalidated) {
                // If the data is not invalidated, retrieve it from the toolData
                meanStdDev = data.meanStdDev;
                meanStdDevSUV = data.meanStdDevSUV;
                area = data.area;
            } else {
                // If the data has been invalidated, we need to calculate it again

                // Retrieve the bounds of the ellipse in image coordinates
                var ellipse = {
                    left: Math.min(data.handles.start.x, data.handles.end.x),
                    top: Math.min(data.handles.start.y, data.handles.end.y),
                    width: Math.abs(data.handles.start.x - data.handles.end.x),
                    height: Math.abs(data.handles.start.y - data.handles.end.y)
                };

                // First, make sure this is not a color image, since no mean / standard
                // deviation will be calculated for color images.
                if (!image.color) {
                    // Retrieve the array of pixels that the ellipse bounds cover
                    var pixels = cornerstone.getPixels(element, ellipse.left, ellipse.top, ellipse.width, ellipse.height);

                    // Calculate the mean & standard deviation from the pixels and the ellipse details
                    meanStdDev = calculateMeanStdDev(pixels, ellipse);

                    if (modality === 'PT') {
                        // If the image is from a PET scan, use the DICOM tags to 
                        // calculate the SUV from the mean and standard deviation.

                        // Note that because we are using modality pixel values from getPixels, and
                        // the calculateSUV routine also rescales to modality pixel values, we are first
                        // returning the values to storedPixel values before calcuating SUV with them.
                        // TODO: Clean this up? Should we add an option to not scale in calculateSUV?
                        meanStdDevSUV = {
                            mean: cornerstoneTools.calculateSUV(image, (meanStdDev.mean - image.intercept) / image.slope),
                            stdDev: cornerstoneTools.calculateSUV(image, (meanStdDev.stdDev - image.intercept) / image.slope)
                        };
                    }

                    // If the mean and standard deviation values are sane, store them for later retrieval
                    if (meanStdDev && !isNaN(meanStdDev.mean)) {
                        data.meanStdDev = meanStdDev;
                        data.meanStdDevSUV = meanStdDevSUV;
                    }
                }

                // Retrieve the pixel spacing values, and if they are not
                // real non-zero values, set them to 1
                var columnPixelSpacing = image.columnPixelSpacing || 1;
                var rowPixelSpacing = image.rowPixelSpacing || 1;

                // Calculate the image area from the ellipse dimensions and pixel spacing
                area = Math.PI * (ellipse.width * columnPixelSpacing / 2) * (ellipse.height * rowPixelSpacing / 2);

                // If the area value is sane, store it for later retrieval
                if (!isNaN(area)) {
                    data.area = area;
                }

                // Set the invalidated flag to false so that this data won't automatically be recalculated
                data.invalidated = false;
            }

            // Define an array to store the rows of text for the textbox
            var textLines = [];

            // If the mean and standard deviation values are present, display them
            if (meanStdDev && meanStdDev.mean) {
                // If the modality is CT, add HU to denote Hounsfield Units
                var moSuffix = '';
                if (modality === 'CT') {
                    moSuffix = ' HU';
                }

                // Create a line of text to display the mean and any units that were specified (i.e. HU)
                var meanText = 'Mean: ' + numberWithCommas(meanStdDev.mean.toFixed(2)) + moSuffix;
                // Create a line of text to display the standard deviation and any units that were specified (i.e. HU)
                var stdDevText = 'StdDev: ' + numberWithCommas(meanStdDev.stdDev.toFixed(2)) + moSuffix;

                // If this image has SUV values to display, concatenate them to the text line
                if (meanStdDevSUV && meanStdDevSUV.mean !== undefined) {
                    var SUVtext = ' SUV: ';
                    meanText += SUVtext + numberWithCommas(meanStdDevSUV.mean.toFixed(2));
                    stdDevText += SUVtext + numberWithCommas(meanStdDevSUV.stdDev.toFixed(2));
                }

                // Add these text lines to the array to be displayed in the textbox
                textLines.push(meanText);
                textLines.push(stdDevText);
            }

            // If the area is a sane value, display it
            if (area) {
                // Determine the area suffix based on the pixel spacing in the image.
                // If pixel spacing is present, use millimeters. Otherwise, use pixels.
                // This uses Char code 178 for a superscript 2
                var suffix = ' mm' + String.fromCharCode(178);
                if (!image.rowPixelSpacing || !image.columnPixelSpacing) {
                    suffix = ' pixels' + String.fromCharCode(178);
                }

                // Create a line of text to display the area and its units
                var areaText = 'Area: ' + numberWithCommas(area.toFixed(2)) + suffix;

                // Add this text line to the array to be displayed in the textbox
                textLines.push(areaText);
            }

            // If the textbox has not been moved by the user, it should be displayed on the right-most
            // side of the tool. 
            if (!data.handles.textBox.hasMoved) {
                // Find the rightmost side of the ellipse at its vertical center, and place the textbox here
                // Note that this calculates it in image coordinates
                data.handles.textBox.x = Math.max(data.handles.start.x, data.handles.end.x);
                data.handles.textBox.y = (data.handles.start.y + data.handles.end.y) / 2;
            }

            // Convert the textbox Image coordinates into Canvas coordinates
            var textCoords = cornerstone.pixelToCanvas(element, data.handles.textBox);

            // Set options for the textbox drawing function
            var options = {
                centering: {
                    x: false,
                    y: true
                }
            };

            // Draw the textbox and retrieves it's bounding box for mouse-dragging and highlighting
            var boundingBox = cornerstoneTools.drawTextBox(context, textLines, textCoords.x,
                textCoords.y, color, options);

            // Store the bounding box data in the handle for mouse-dragging and highlighting
            data.handles.textBox.boundingBox = boundingBox;

            // If the textbox has moved, we would like to draw a line linking it with the tool
            // This section decides where to draw this line to on the Ellipse based on the location
            // of the textbox relative to the ellipse.
            if (data.handles.textBox.hasMoved) {
                // Draw dashed link line between tool and text

                // The initial link position is at the center of the
                // textbox.
                var link = {
                    start: {},
                    end: {
                        x: textCoords.x,
                        y: textCoords.y
                    }
                };

                // First we calculate the ellipse points (top, left, right, and bottom)
                var ellipsePoints = [ {
                    // Top middle point of ellipse
                    x: leftCanvas + widthCanvas / 2,
                    y: topCanvas
                }, {
                    // Left middle point of ellipse
                    x: leftCanvas,
                    y: topCanvas + heightCanvas / 2
                }, {
                    // Bottom middle point of ellipse
                    x: leftCanvas + widthCanvas / 2,
                    y: topCanvas + heightCanvas
                }, {
                    // Right middle point of ellipse
                    x: leftCanvas + widthCanvas,
                    y: topCanvas + heightCanvas / 2
                } ];

                // We obtain the link starting point by finding the closest point on the ellipse to the
                // center of the textbox
                link.start = cornerstoneMath.point.findClosestPoint(ellipsePoints, link.end);

                // Next we calculate the corners of the textbox bounding box
                var boundingBoxPoints = [ {
                    // Top middle point of bounding box
                    x: boundingBox.left + boundingBox.width / 2,
                    y: boundingBox.top
                }, {
                    // Left middle point of bounding box
                    x: boundingBox.left,
                    y: boundingBox.top + boundingBox.height / 2
                }, {
                    // Bottom middle point of bounding box
                    x: boundingBox.left + boundingBox.width / 2,
                    y: boundingBox.top + boundingBox.height
                }, {
                    // Right middle point of bounding box
                    x: boundingBox.left + boundingBox.width,
                    y: boundingBox.top + boundingBox.height / 2
                }, ];

                // Now we recalculate the link endpoint by identifying which corner of the bounding box
                // is closest to the start point we just calculated.
                link.end = cornerstoneMath.point.findClosestPoint(boundingBoxPoints, link.start);

                // Finally we draw the dashed linking line
                context.beginPath();
                context.strokeStyle = color;
                context.lineWidth = lineWidth;
                context.setLineDash([ 2, 3 ]);
                context.moveTo(link.start.x, link.start.y);
                context.lineTo(link.end.x, link.end.y);
                context.stroke();
            }

            context.restore();
        }
    }
    ///////// END IMAGE RENDERING ///////

    // module exports
    cornerstoneTools.ellipticalRoi = cornerstoneTools.mouseButtonTool({
        createNewMeasurement: createNewMeasurement,
        onImageRendered: onImageRendered,
        pointNearTool: pointNearTool,
        toolType: toolType
    });
    cornerstoneTools.ellipticalRoiTouch = cornerstoneTools.touchTool({
        createNewMeasurement: createNewMeasurement,
        onImageRendered: onImageRendered,
        pointNearTool: pointNearToolTouch,
        toolType: toolType
    });

})($, cornerstone, cornerstoneMath, cornerstoneTools);
