jQuery(document).ready(function ($) {
  $('#nextBtn').bind('click', function () {
    $('#colAddress').collapse('hide');
    $('#colResult').collapse('show');

    $('#nextBtn').hide();
    $('#letsChabak').show();
  });
});
