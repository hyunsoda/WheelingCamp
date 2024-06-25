$.noConflict();
jQuery(document).ready(function ($) {
  /*--------------------------------------*/

  var dddddd = sessionStorage.getItem('dddddd');

  if (!dddddd) {
    $('#first_hwa').show();
    $('body').css('overflow-y', 'hidden');

    let count = 0;
    const last = 100;

    const yea = setInterval(function () {
      count++;
      $('.count-shot').text(count);

      if (count >= last) {
        clearInterval(yea);
      }
    }, 18);

    setTimeout(function () {
      $('#first_hwa').fadeOut(500);

      sessionStorage.setItem('dddddd', 'true');
    }, 2000);

    setTimeout(function () {
      $('body').css('overflow', 'auto');
      // $(".header-wrap").css("display","block");
    }, 2200);
  }

  $('#hamburger').on('click', function () {
    $('#box').css('margin-right', '0px');
    $('#box-wrap').fadeIn(100);
    $('#box').css('zIndex', '500');
  });

  $('.x-btn-box').on('click', function () {
    $('#box').css('margin-right', '-264px');
    $('#box-wrap').fadeOut(100);
    $('#box').css('zIndex', '25');
  });

  if ($(this).scrollTop() > 200) {
    $('.arrow-box').fadeIn(300);
  } else {
    $('.arrow-box').hide();
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.arrow-box').fadeIn(300);
    } else {
      $('.arrow-box').hide();
    }
  });

  $('.arrow-box').on('click', function () {
    $('html').scrollTop(0);
  });

  $('.increase').on('click', function () {
    var currentNumber = parseInt($('.up-number').text());
    if (currentNumber < 10) {
      $('.up-number').text(currentNumber + 1);
    }
  });

  $('.decrease').on('click', function () {
    var currentNumber = parseInt($('.up-number').text());
    if (currentNumber > 1) {
      $('.up-number').text(currentNumber - 1);
    }
  });

  $('body').append('<div id="toolTip" class="toolTip"></div>');

  $('#KR42').on('mouseover', function () {
    $('#toolTip').text('강원').show();
  });

  $('#KR42').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR42').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR41').on('mouseover', function () {
    $('#toolTip').text('경기').show();
  });

  $('#KR41').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR41').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR28').on('mouseover', function () {
    $('#toolTip').text('인천').show();
  });

  $('#KR28').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR28').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR44').on('mouseover', function () {
    $('#toolTip').text('충남').show();
  });

  $('#KR44').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR44').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR11').on('mouseover', function () {
    $('#toolTip').text('서울').show();
  });

  $('#KR11').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR11').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR50').on('mouseover', function () {
    $('#toolTip').text('세종').show();
  });

  $('#KR50').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR50').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR45').on('mouseover', function () {
    $('#toolTip').text('전북').show();
  });

  $('#KR45').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR45').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR46').on('mouseover', function () {
    $('#toolTip').text('전남').show();
  });

  $('#KR46').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR46').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR48').on('mouseover', function () {
    $('#toolTip').text('경남').show();
  });

  $('#KR48').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR48').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR26').on('mouseover', function () {
    $('#toolTip').text('부산').show();
  });

  $('#KR26').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR26').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR31').on('mouseover', function () {
    $('#toolTip').text('울산').show();
  });

  $('#KR31').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR31').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR47').on('mouseover', function () {
    $('#toolTip').text('경북').show();
  });

  $('#KR47').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR47').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR49').on('mouseover', function () {
    $('#toolTip').text('제주').show();
  });

  $('#KR49').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR49').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR30').on('mouseover', function () {
    $('#toolTip').text('대전').show();
  });

  $('#KR30').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR30').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR29').on('mouseover', function () {
    $('#toolTip').text('광주').show();
  });

  $('#KR29').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR29').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR27').on('mouseover', function () {
    $('#toolTip').text('대구').show();
  });

  $('#KR27').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR27').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('#KR43').on('mouseover', function () {
    $('#toolTip').text('충북').show();
  });

  $('#KR43').on('mouseout', function () {
    $('#toolTip').hide();
  });

  $('#KR43').on('mousemove', function (event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px',
    });
  });

  $('tr[data-board-no]')
    .click(function () {
      var boardNo = $(this).data('board-no');
      var cp = $(this).data('pagination-cp');
      var targetUrl = 'http://localhost/board/' + boardNo + '?cp=' + cp;
      localStorage.setItem('previousPage', cp); // 현재 페이지 정보를 localStorage에 저장
      window.location = targetUrl;
    })
    .hover(
      function () {
        $(this).css('background-color', '#f0f0f0');
      },
      function () {
        $(this).css('background-color', '');
      }
    );

  $('#my-comment-content').each(function () {
    var text = $(this).text();
    if (text.length > 10) {
      $(this).text(text.substring(0, 10) + '...');
    }
  });

  if (document.getElementById('myboard-real-btn') != null) {
    document
      .getElementById('myboard-real-btn')
      .addEventListener('click', function () {
        var previousPage = localStorage.getItem('previousPage'); // 저장된 페이지 정보를 가져옴
        if (previousPage) {
          var targetUrl = 'http://localhost/board/myPosts?cp=' + previousPage;
          window.location = targetUrl;
        } else {
          // 이전 페이지 정보가 없는 경우 기본 페이지로 이동
          window.location = 'http://localhost/board/myPosts?cp=' + 1;
        }
      });
  }

  if (document.getElementById('mycomment-real-btn') != null) {
    document
      .getElementById('mycomment-real-btn')
      .addEventListener('click', function () {
        var previousPage = localStorage.getItem('previousPage'); // 저장된 페이지 정보를 가져옴
        if (previousPage) {
          var targetUrl =
            'http://localhost/board/myComments?cp=' + previousPage;
          window.location = targetUrl;
        } else {
          // 이전 페이지 정보가 없는 경우 기본 페이지로 이동
          window.location = 'http://localhost/board/myComments?cp=' + 1;
        }
      });
  }

  //대여 내역 버튼
  $(".orderListP").on("click", function(){
      $(".borrow-wrap-box").css("display", "block");
      $(".orderListP").css("color","#585F38;");

      
      $(".purchase-wrap-box").css("display", "none");
     $(".borrow-cancle-wrap-box").css("display","none");
     $(".purchase-cancle-wrap-box").css("display","none");

      $(".orderListPurchaseP").css("color", "#A59F8B");
      $(".orderListCancleP").css("color", "#A59F8B");
      $(".orderListCanclePurchase").css("color", "#A59F8B");

  })

// 구매내역 버튼 
  $(".orderListPurchaseP").on("click", function(){
    $(".borrow-cancle-wrap-box").css("display","none");
    $(".purchase-cancle-wrap-box").css("display","none");
      $(".borrow-wrap-box").css("display", "none");




      $(".purchase-wrap-box").css("display", "block");
      $(".orderListPurchaseP").css("color", "#585F38");


      $(".orderListP").css("color","#A59F8B");
      $(".orderListCancleP").css("color","#A59F8B");
      $(".orderListCanclePurchase").css("color","#A59F8B");

  })

  // 대여 취소 내역 버튼
   $(".orderListCancleP").on("click", function(){

    $(".borrow-cancle-wrap-box").css("display", "block");
    $(".orderListCancleP").css("color","#585F38");

    $(".borrow-wrap-box").css("display","none");
    $(".purchase-wrap-box").css("display","none");
      $(".purchase-cancle-wrap-box").css("display", "none");

      $(".orderListP").css("color","#A59F8B");
      $(".orderListPurchaseP").css("color","#A59F8B");
      $(".orderListCanclePurchase").css("color","#A59F8B");


   })

  // 구매 취소 내역 버튼
   $(".orderListCanclePurchase").on("click", function(){

    $(".purchase-cancle-wrap-box").css("display", "block");
    $(".orderListCanclePurchase").css("color","#585F38");

    $(".borrow-wrap-box").css("display","none");
    $(".purchase-wrap-box").css("display","none");
      $(".borrow-cancle-wrap-box").css("display", "none");

      $(".orderListP").css("color","#A59F8B");
      $(".orderListPurchaseP").css("color","#A59F8B");
      $(".orderListCancleP").css("color","#A59F8B");


   })

});

/*--------------------------------------*/

/*--------------------------------------*/
