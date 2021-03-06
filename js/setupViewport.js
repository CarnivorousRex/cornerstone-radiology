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
	} else { // Otherwise, light up the WW/WC button -> tool is already L mouse button default
		$("#wwWL").addClass("btn-active");
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
		window.clearInterval(startPressEventUp);
		window.clearInterval(startPressEventDown);
		cornerstoneTools.scroll(element, 1);
	});	
	var startPressEventUp;
	var startPressEventDown;
	hammertime.on('press pressup', function(ev) {
		console.log(ev.type);
		var counter = 0;
		switch (ev.type) {
			case 'press':				
				cornerstoneTools.scroll(element, 1);
				startPressEventUp = window.setInterval( function() {
					cornerstoneTools.scroll(element, 1);
					counter++;
					console.log("Counter: " + counter);
				},250);
				break;
			case 'pressup':
				window.clearInterval(startPressEventUp);
				break;
		}
	});		
	
	var downArrow = $("#downArrow").get(0);
	var hammertime2 = new Hammer(downArrow);
	hammertime2.on('tap', function(ev) {
		window.clearInterval(startPressEventUp);
		window.clearInterval(startPressEventDown);
		cornerstoneTools.scroll(element, -1);
	});		
	hammertime2.on('press pressup', function(ev) {
		
		console.log(ev.type);
		var counter2 = 0;
		switch (ev.type) {
			case 'press':
				cornerstoneTools.scroll(element, -1);
				startPressEventDown = window.setInterval( function() {
					counter2--;
					console.log("Counter2: " + counter2);
					cornerstoneTools.scroll(element, -1);
				},250);
				break;
			case 'pressup':
				window.clearInterval(startPressEventDown);
				break;
		}
	});	
	
	//$("#stopButton").click(onRelease);  Probably don't need this anymore.
	
	// If touch event falls of scroll buttons, cancel the setInterval() autoscroll
	function onRelease(e) {
		window.clearInterval(startPressEventUp);
		window.clearInterval(startPressEventDown);		
	}
	document.getElementById("upArrow").addEventListener("mouseup", onRelease);
	document.getElementById("upArrow").addEventListener("touchend", onRelease);
	document.getElementById("downArrow").addEventListener("mouseup", onRelease);
	document.getElementById("downArrow").addEventListener("touchend", onRelease);
	// End of cancel scrolling
}
