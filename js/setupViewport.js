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

	// Auto-enable stack scroll when switching series on a small screen
	if ($(window).width() < 767) {
		console.log("auto enable stack scroll");
		$("#scrollButton").click();
	}

	//  preventDefault all but the left hand slider (to allow native thumbnail scroll behavior)
	//  Unfortunately doesn't respond to JQuery selectors...gotta do it the hard way
	var viewer = $(".viewer").get(0);
	var navTabs = $(".nav-tabs").get(0);
	var myNav = $(".myNav").get(0);
	viewer.addEventListener('touchmove', function(e) {
		e.preventDefault();
	});
	navTabs.addEventListener('touchmove', function(e) {
		e.preventDefault();
	});
	myNav.addEventListener('touchmove', function(e) {
		e.preventDefault();
	});	// End preventDefaults
	
	// Up and Down arrow scrolling buttons
	//var hammerOptions = {touchAction: none};
	var upArrow = $("#upArrow").get(0);
	var hammertime = new Hammer(upArrow);
	hammertime.set({ touchAction: 'none'});
	hammertime.on('tap', function(ev) {
		cornerstoneTools.scroll(element, 1);
	});	
	var downArrow = $("#downArrow").get(0);
	var hammertime2 = new Hammer(downArrow);
	hammertime2.on('tap', function(ev) {
		cornerstoneTools.scroll(element, -1);
	});		
	
}
