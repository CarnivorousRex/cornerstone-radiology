(function(cornerstoneTools) {

    'use strict';

    function invertOrientationString(string) {
        var inverted = string.replace('H', 'f');
        inverted = inverted.replace('F', 'h');
        inverted = inverted.replace('R', 'l');
        inverted = inverted.replace('L', 'r');
        inverted = inverted.replace('A', 'p');
        inverted = inverted.replace('P', 'a');
        inverted = inverted.toUpperCase();
        return inverted;
    }

    // module/private exports
    cornerstoneTools.orientation.invertOrientationString = invertOrientationString;

})(cornerstoneTools);
