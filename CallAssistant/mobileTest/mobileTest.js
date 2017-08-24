$( document ).on( "pagecreate", function( event, ui ) {
//$( document ).on( "pagecreate", function( event ) {



	$( "#message" ).bind( "keyup", function() {
        $('#foo').text($('#message').val());
        $('#bar').text($('#message').val());
		if ($('#message').val() == "" || $('#select-choice-1').val() == "Page a Radiologist") {
            $('#submitButton').button('disable');

            } else if ($('#message').val() != "" && $('#select-choice-1').val() != "Page a Radiologist") {
                $('#submitButton').button('enable');
                $('#submitButton').button('refresh');
            }
    });
    
    $("#select-choice-1").bind( "change", function() {
        $('#foo').text($('#select-choice-1').val());
		if ($('#message').val() == "" || $('#select-choice-1').val() == "Page a Radiologist") {
            $('#submitButton').button('disable');

            } else if ($('#message').val() != "" && $('#select-choice-1').val() != "Page a Radiologist") {
                $('#submitButton').button('enable');
                $('#submitButton').button('refresh');
            }
    });


    $( "#message2" ).bind( "keyup", function() {
        $('#foo2').text($('#pageTo').val());
        $('#bar2').text($('#message2').val());
		if ($('#message2').val() == "" || ($('#pageTo').val() == '')) {
            $('#submitButton2').button('disable');

            } else if ($('#message2').val() != "" && $('#pageTo').val() != "") {
                $('#submitButton2').button('enable');
                $('#submitButton2').button('refresh');
            }
    }); 
 
    $("#pageTo").bind( "keyup", function() {
        $('#foo2').text($('#pageTo').val());
        $('#bar2').text($('#message2').val());
		if ($('#message2').val() == "" || $('#pageTo').val() == "") {
            $('#submitButton2').button('disable');

            } else if ($('#message2').val() != "" && $('#pageTo').val() != "") {
                $('#submitButton2').button('enable');
                $('#submitButton2').button('refresh');
            }
    });    
    
   
    
    
});