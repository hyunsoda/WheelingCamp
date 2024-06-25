jQuery(document).ready(function ($) {
  let checkObj = {
    address: false,
    type: false,
  };

  $('#nextBtn').bind('click', function () {
    // 주소 컬럼
    if (!checkObj.address) {
      if (!origin.value.replace(/^\s+|\s+$/g, '')) {
        showalEbcvbcvDFDF();
        return;
      }

      // 목적지 입력 확인
      if (!destination.value.replace(/^\s+|\s+$/g, '')) {
        showalEbcbcvbvcbvbcvDFDF();
        return;
      }

      if (
        destination.value.replace(/^\s+|\s+$/g, '') ==
        origin.value.replace(/^\s+|\s+$/g, '')
      ) {
        showalEbcbcvbvvcvccvbcbvbcvDFDF();
        return;
      }

      checkObj.address = true;

      $('#colAddress').collapse('hide');
      $('#colType').collapse('show');

      $('#nextBtn').hide();
      $('#letsChabak').show();
    }

    $('input[type=checkbox]').on('change', function (e) {
      if ($('input[type=checkbox]:checked').length > 3) {
        $(this).prop('checked', false);
        showalvbcvbcvbEbcbcvbvvcvccvbcbvbcvDFDF();
      }
    });

    // 취향 컬럼
    if (!checkObj.type) {
      checkObj.type = true;
    }
  });

  $('#letsChabak').bind('click', function () {
    $('#colType').collapse('hide');
    $('#colResult').collapse('show');
  });
});
