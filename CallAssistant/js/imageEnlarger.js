$(document).ready(function (){
  $('img').tooltip({
    content: function() {
      console.log($(this).data('figure'));
      return;
    }
  });

// If an image is clicked, push it over to the right and enlarge
  $(".clickable").click(function(event) {
    $('.imageEnlarger').html('<a id="imageLink" href="#" target="_blank"></a>');
    $('#imageLink').html(event.currentTarget.cloneNode());
    $('#imageLink img').removeClass('col-xs-6 col-xs-4').addClass('col-xs-12');
    $('#imageLink').attr('href', $(this).attr('src'));
  });

// Show the hidden elements when hovering. On exit, hide the same and also the details
  $('.middle-column li').hover(function(){
    $(this).removeClass("oneLineHeight");
    $(this).find('img').removeClass('invisible');
    $(this).find('.js-showDetails button').removeClass('invisible');
  }, function() {
    $(this).addClass("oneLineHeight");
    $(this).find('img').addClass('invisible');
    $(this).find('.js-showDetails button').addClass('invisible');
    $('.initiallyHidden').hide();
    $(this).find('button').html("Show Citation");
  });

// Show the journal details when clicked
  $('.js-showDetails').click(function() {
    if (!$('.initiallyHidden').is(':visible')) {
      $(this).find('button').html("Hide Citation");
    } else {
      $(this).find('button').html("Show Citation");
    }
    console.log($(this).find('.initiallyHidden'));
    $(this).find('.initiallyHidden').toggle("blind", 500);


  });

});
