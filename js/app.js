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