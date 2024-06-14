jQuery(document).ready(function ($) {
  let checkObj = {
    address: false,
    type: false,
  };

  $('#nextBtn').bind('click', function () {
    // 주소 컬럼
    if (!checkObj.address) {
      if (!origin.value.replace(/^\s+|\s+$/g, '')) {
        alert('출발지를 입력해주세요!');
        return;
      }

      // 목적지 입력 확인
      if (!destination.value.replace(/^\s+|\s+$/g, '')) {
        alert('목적지를 정확히 입력해주세요');
        return;
      }

      if (
        destination.value.replace(/^\s+|\s+$/g, '') ==
        origin.value.replace(/^\s+|\s+$/g, '')
      ) {
        alert('출발지와 목적지는 일치할 수 없습니다!');
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
        alert('세개보다 많이 선택할 수 없습니다!');
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
