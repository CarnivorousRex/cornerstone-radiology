function setupViewport(element, stack, image) {
    // Display the image on the viewer element
    cornerstone.displayImage(element, image);
	
    // If it's a movie (has frames), then play the clip
    if (stack.frameRate !== undefined) {
        cornerstone.playClip(element, stack.frameRate);
    }

    // Activate mouse clicks, mouse wheel and touch
    cornerstoneTools.mouseInput.enable(element);
    cornerstoneTools.mouseWheelInput.enable(element);
    cornerstoneTools.touchInput.enable(element);
	
	var foo = $(".thumbnailSelector").get(0);
	cornerstoneTools.touchInput.enable(foo);
	

    // Enable all tools we want to use with this element
    cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
    cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
    cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
    cornerstoneTools.probe.enable(element);
    cornerstoneTools.length.enable(element);
    cornerstoneTools.ellipticalRoi.enable(element);
    cornerstoneTools.rectangleRoi.enable(element);
    cornerstoneTools.wwwcTouchDrag.activate(element);
    cornerstoneTools.zoomTouchPinch.activate(element);

    // Stack tools
    cornerstoneTools.addStackStateManager(element, ['playClip']);
    cornerstoneTools.addToolState(element, 'stack', stack);
    cornerstoneTools.stackScrollWheel.activate(element);
    cornerstoneTools.stackPrefetch.enable(element);
	
	// Keyboard tools
	cornerstoneTools.keyboardInput.enable(element);
	cornerstoneTools.stackScrollKeyboard.activate(element);
	
	
	// Put tabindex on viewport - must click anywhere once to enable up/down arrow scrolling
	$(window).click(function() {
		$(element).attr("tabindex", 0).focus();
	});
	
	$("#fullscreen").click(function() {
		cornerstoneTools.makeFullscreen();
	});

	$("#scrollButton").click();

var viewer = $(".viewer").get(0);
console.log(viewer);
var navTabs = $(".nav-tabs").get(0);
var myNav = $(".myNav").get(0);

viewer.addEventListener('touchmove', function(e) {
	//Shutting off preventDefault to get the left hand slider to move without breaking stuff
	e.preventDefault();
});
navTabs.addEventListener('touchmove', function(e) {
	//Shutting off preventDefault to get the left hand slider to move without breaking stuff
	e.preventDefault();
});
myNav.addEventListener('touchmove', function(e) {
	//Shutting off preventDefault to get the left hand slider to move without breaking stuff
	e.preventDefault();
});	
	// Doubleclick a thumbnail to enter fullscreen mode
	//var mc = new Hammer(foo);
	//mc.on("doubletap", function(evt) {
		//if (evt.type == 'doubletap') cornerstoneTools.makeFullscreen();
/*		if (evt.type == 'pan') {
			var el = evt.target;
			startY = evt.touches ? evt.touches[0].screenY : evt.screenY;
			var curY = evt.touches ? evt.touches[0].screenY : evt.screenY;

			// Determine if the user is trying to scroll past the top or bottom
			// In this case, the window will bounce, so we have to prevent scrolling completely
			var isAtTop = (startY <= curY && el.scrollTop === 0);
			var isAtBottom = (startY >= curY && el.scrollHeight - el.scrollTop === height);

			// Stop a bounce bug when at the bottom or top of the scrollable element
			if (isAtTop || isAtBottom) {
				evt.preventDefault();
			}
			return;
	}*/
	//});
	
	
/*var viewer = $("viewer");
console.log(viewer);
viewer.addEventListener('touchmove', function(e) {
	e.preventDefault();
});
var myNav = document.getElementById("myNav");
myNav.addEventListener('touchmove', function(e) {
	e.preventDefault();
});
var tabs = document.getElementById("tabs");
tabs.addEventListener('touchmove', function(e) {
	e.preventDefault();
});*/
	
}
