$(function() {
    $('#bias').change(function() {
      $('.mking').toggle();
      $('.cod').toggle();
    });
    });

// $(function() {
//     $('.accy').collapse('toggle');
// });

$('.popover-dismiss').popover({
  trigger: 'focus'
})

$(function () {
  $('[data-toggle="popover"]').popover()
})

$(".flipper").click(function() {
  var target = $( event.target );
  if ( target.is("button") ) {
    //follow that link
    $(this).toggleClass("flip");
  } else {
    return true;
  }
  return false;
});