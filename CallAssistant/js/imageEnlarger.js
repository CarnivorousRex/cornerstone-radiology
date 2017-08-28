$(document).ready(function (){

  $(".clickable").click(function(event) {
    $('.imageEnlarger').html('<a id="imageLink" href="#" target="_blank"></a>');

    $('#imageLink').html(event.currentTarget.cloneNode());
    $('#imageLink img').removeClass('col-xs-6 col-xs-4').addClass('col-xs-12');
    $('#imageLink').attr('href', $(this).attr('src'));
  });

  $('li').hover(function(){
    $(this).find('img').removeClass('invisible');
  }, function() {
    $(this).find('img').addClass('invisible');
  });

});
