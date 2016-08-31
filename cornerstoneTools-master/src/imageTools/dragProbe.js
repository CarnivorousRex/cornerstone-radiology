(function($, cornerstone, cornerstoneTools) {

    'use strict';

    function defaultStrategy(eventData) {
        var enabledElement = cornerstone.getEnabledElement(eventData.element);

        cornerstone.updateImage(eventData.element);

        var context = enabledElement.canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);

        var color = cornerstoneTools.toolColors.getActiveColor();
        var font = cornerstoneTools.textStyle.getFont();
        var fontHeight = cornerstoneTools.textStyle.getFontSize();
        var config = cornerstoneTools.dragProbe.getConfiguration();

        context.save();

        if (config && config.shadow) {
            context.shadowColor = config.shadowColor || '#000000';
            context.shadowOffsetX = config.shadowOffsetX || 1;
            context.shadowOffsetY = config.shadowOffsetY || 1;
        }

        var x = Math.round(eventData.currentPoints.image.x);
        var y = Math.round(eventData.currentPoints.image.y);

        var storedPixels;
        var text,
            str;

        if (x < 0 || y < 0 || x >= eventData.image.columns || y >= eventData.image.rows) {
            return;
        }

        if (eventData.image.color) {
            storedPixels = cornerstoneTools.getRGBPixels(eventData.element, x, y, 1, 1);
            text = '' + x + ', ' + y;
            str = 'R: ' + storedPixels[0] + ' G: ' + storedPixels[1] + ' B: ' + storedPixels[2] + ' A: ' + storedPixels[3];
        } else {
            storedPixels = cornerstone.getStoredPixels(eventData.element, x, y, 1, 1);
            var sp = storedPixels[0];
            var mo = sp * eventData.image.slope + eventData.image.intercept;
            var suv = cornerstoneTools.calculateSUV(eventData.image, sp);

            // Draw text
            text = '' + x + ', ' + y;
            str = 'SP: ' + sp + ' MO: ' + parseFloat(mo.toFixed(3));
            if (suv) {
                str += ' SUV: ' + parseFloat(suv.toFixed(3));
            }
        }

        // Draw text
        var coords = {
            // translate the x/y away from the cursor
            x: eventData.currentPoints.image.x + 3,
            y: eventData.currentPoints.image.y - 3
        };
        var textCoords = cornerstone.pixelToCanvas(eventData.element, coords);
        
        context.font = font;
        context.fillStyle = color;

        cornerstoneTools.drawTextBox(context, str, textCoords.x, textCoords.y + fontHeight + 5, color);
        cornerstoneTools.drawTextBox(context, text, textCoords.x, textCoords.y, color);
        context.restore();
    }

    function minimalStrategy(eventData) {
        var element = eventData.element;
        var enabledElement = cornerstone.getEnabledElement(element);
        var image = enabledElement.image;

        cornerstone.updateImage(element);

        var context = enabledElement.canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0);

        var color = cornerstoneTools.toolColors.getActiveColor();
        var font = cornerstoneTools.textStyle.getFont();
        var config = cornerstoneTools.dragProbe.getConfiguration();
        
        context.save();

        if (config && config.shadow) {
            context.shadowColor = config.shadowColor || '#000000';
            context.shadowOffsetX = config.shadowOffsetX || 1;
            context.shadowOffsetY = config.shadowOffsetY || 1;
        }

        var toolCoords;
        if (eventData.isTouchEvent === true) {
            toolCoords = cornerstone.pageToPixel(element, eventData.currentPoints.page.x,
                eventData.currentPoints.page.y - cornerstoneTools.textStyle.getFontSize() * 4);
        } else {
            toolCoords = cornerstone.pageToPixel(element, eventData.currentPoints.page.x,
                eventData.currentPoints.page.y - cornerstoneTools.textStyle.getFontSize() / 2);
        }

        var storedPixels;
        var text = '';

        if (toolCoords.x < 0 || toolCoords.y < 0 ||
            toolCoords.x >= image.columns || toolCoords.y >= image.rows) {
            return;
        }
        
        if (image.color) {
            storedPixels = cornerstoneTools.getRGBPixels(element, toolCoords.x, toolCoords.y, 1, 1);
            text = 'R: ' + storedPixels[0] + ' G: ' + storedPixels[1] + ' B: ' + storedPixels[2];
        } else {
            storedPixels = cornerstone.getStoredPixels(element, toolCoords.x, toolCoords.y, 1, 1);
            var sp = storedPixels[0];
            var mo = sp * eventData.image.slope + eventData.image.intercept;
            var suv = cornerstoneTools.calculateSUV(eventData.image, sp);

            var modalityTag = 'x00080060';
            var modality;
            if (eventData.image.data) {
                modality = eventData.image.data.string(modalityTag);    
            }
            
            if (modality === 'CT') {
                text += 'HU: ';
            }

            // Draw text
            text += parseFloat(mo.toFixed(2));
            if (suv) {
                text += ' SUV: ' + parseFloat(suv.toFixed(2));
            }
        }

        // Prepare text
        var textCoords = cornerstone.pixelToCanvas(element, toolCoords);
        context.font = font;
        context.fillStyle = color;

        // Translate the x/y away from the cursor
        var translation;
        var handleRadius = 6;
        var width = context.measureText(text).width;

        if (eventData.isTouchEvent === true) {
            translation = {
                x: -width / 2 - 5,
                y: -cornerstoneTools.textStyle.getFontSize() - 10 - 2 * handleRadius
            };
        } else {
            translation = {
                x: 12,
                y: -(cornerstoneTools.textStyle.getFontSize() + 10) / 2
            };
        }

        context.beginPath();
        context.strokeStyle = color;
        context.arc(textCoords.x, textCoords.y, handleRadius, 0, 2 * Math.PI);
        context.stroke();

        cornerstoneTools.drawTextBox(context, text, textCoords.x + translation.x, textCoords.y + translation.y, color);
        context.restore();
    }

    function mouseUpCallback(e, eventData) {
        $(eventData.element).off('CornerstoneToolsMouseDrag', dragCallback);
        $(eventData.element).off('CornerstoneToolsMouseUp', mouseUpCallback);
        $(eventData.element).off('CornerstoneToolsMouseClick', mouseUpCallback);
        cornerstone.updateImage(eventData.element);
    }

    function mouseDownCallback(e, eventData) {
        if (cornerstoneTools.isMouseButtonEnabled(eventData.which, e.data.mouseButtonMask)) {
            $(eventData.element).on('CornerstoneToolsMouseDrag', dragCallback);
            $(eventData.element).on('CornerstoneToolsMouseUp', mouseUpCallback);
            $(eventData.element).on('CornerstoneToolsMouseClick', mouseUpCallback);
            cornerstoneTools.dragProbe.strategy(eventData);
            return false; // false = causes jquery to preventDefault() and stopPropagation() this event
        }
    }

    function dragCallback(e, eventData) {
        cornerstoneTools.dragProbe.strategy(eventData);
        return false; // false = causes jquery to preventDefault() and stopPropagation() this event
    }

    cornerstoneTools.dragProbe = cornerstoneTools.simpleMouseButtonTool(mouseDownCallback);
    
    cornerstoneTools.dragProbe.strategies = {
        default: defaultStrategy,
        minimal: minimalStrategy
    };
    cornerstoneTools.dragProbe.strategy = defaultStrategy;

    var options = {
        fireOnTouchStart: true
    };
    cornerstoneTools.dragProbeTouch = cornerstoneTools.touchDragTool(dragCallback, options);

})($, cornerstone, cornerstoneTools);
