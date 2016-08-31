(function($, cornerstone, cornerstoneMath, cornerstoneTools) {

    'use strict';

    function moveAllHandles(mouseEventData, data, toolData, toolType, options, doneMovingCallback) {
        var element = mouseEventData.element;

        function mouseDragCallback(e, eventData) {
            data.active = true;

            Object.keys(data.handles).forEach(function(name) {
                var handle = data.handles[name];
                if (handle.movesIndependently === true) {
                    return;
                }

                handle.x += eventData.deltaPoints.image.x;
                handle.y += eventData.deltaPoints.image.y;
                
                if (options.preventHandleOutsideImage === true) {
                    handle.x = Math.max(handle.x, 0);
                    handle.x = Math.min(handle.x, eventData.image.width);

                    handle.y = Math.max(handle.y, 0);
                    handle.y = Math.min(handle.y, eventData.image.height);
                }
            });

            cornerstone.updateImage(element);

            var eventType = 'CornerstoneToolsMeasurementModified';
            var modifiedEventData = {
                toolType: toolType,
                element: element,
                measurementData: data
            };
            $(element).trigger(eventType, modifiedEventData);

            return false; // false = causes jquery to preventDefault() and stopPropagation() this event
        }

        $(element).on('CornerstoneToolsMouseDrag', mouseDragCallback);

        function mouseUpCallback(e, eventData) {
            data.invalidated = true;

            $(element).off('CornerstoneToolsMouseDrag', mouseDragCallback);
            $(element).off('CornerstoneToolsMouseUp', mouseUpCallback);
            $(element).off('CornerstoneToolsMouseClick', mouseUpCallback);

            // If any handle is outside the image, delete the tool data
            if (options.deleteIfHandleOutsideImage === true &&
                cornerstoneTools.anyHandlesOutsideImage(eventData, data.handles)) {
                cornerstoneTools.removeToolState(element, toolType, data);
            }

            cornerstone.updateImage(element);

            if (typeof doneMovingCallback === 'function') {
                doneMovingCallback();
            }
        }

        $(element).on('CornerstoneToolsMouseUp', mouseUpCallback);
        $(element).on('CornerstoneToolsMouseClick', mouseUpCallback);
        return true;
    }

    // module/private exports
    cornerstoneTools.moveAllHandles = moveAllHandles;

})($, cornerstone, cornerstoneMath, cornerstoneTools);
