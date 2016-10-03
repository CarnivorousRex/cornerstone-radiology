$(document).ready(function() {
    var text_max = 99;
    $('#textarea_feedback').html(text_max + ' characters remaining');

    $('#message').keyup(function() {
        var text_length = $('#message').val().length;
        var text_remaining = text_max - text_length;

        $('#textarea_feedback').html(text_remaining + ' characters remaining');
    });
});



/*
$(document).ready(function() {
$("input[type=submit]").click(function(e) {
var name = $("#name").val();
var email = $("#email").val();
if (name == '' || email == '') {
e.preventDefault();
alert("Please Fill Required Fields");
}
});
});