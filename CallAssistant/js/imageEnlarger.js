$(document).ready(function (){

  $(".clickable").click(function(event) {
    var temp = event.currentTarget.cloneNode();
    $('.imageEnlarger').html(temp);
    // append target="_blank" to the inner html
    $('.imageEnlarger img').removeClass('col-xs-6').addClass('col-xs-12');
    console.log(temp);
  });


});
