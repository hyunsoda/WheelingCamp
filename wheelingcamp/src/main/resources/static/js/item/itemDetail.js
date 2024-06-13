// JQuery 기본 설정
jQuery(document).ready(function ($) {
  // 이미지 클릭시 메인 이미지 경로 변경
  $('.itemImage').on('click', function (e) {
    // 3D 이미지 숨기기
    if ($('.3dView').length) {
      $('.3dView').css('display', 'none');
    }

    // 메인 이미지 화면 표시
    $('#itemImageMain').css('display', 'block');
    // 메인 이미지 경로 변경
    $('#itemImageMain').attr('src', e.target.src);
  });

  $('#3dItemImage').on('click', function () {
    // 메인 이미지 화면 숨기기
    const itemSrc = this.src;

    $('#itemImageMain').css('display', 'none');
    if (!$('.3dView').length) {
      $('.itemImageMain').prepend(`
        <a-scene embedded class="3dView">
          <a-sky th:src="${itemSrc}" rotation="0 0 0"></a-sky>
        </a-scene>`);
    } else {
      $('.3dView').css('display', 'block');
    }
  });

  //------------------------------ 돋보기 ------------------------------
  var Magnify = function (element, options) {
    this.init('magnify', element, options);
  };
  Magnify.prototype = {
    constructor: Magnify,
    init: function (type, element, options) {
      var event = 'mousemove',
        eventOut = 'mouseleave';

      this.type = type;
      this.$element = $(element);
      this.options = this.getOptions(options);
      this.nativeWidth = 0;
      this.nativeHeight = 0;

      this.$element.wrap('<div class="magnify" >');
      $('.magnify-large').remove();
      this.$element.parent('.magnify').append('<div class="magnify-large" >');
      this.$element
        .siblings('.magnify-large')
        .css(
          'background',
          "url('" + this.$element.attr('src') + "') no-repeat"
        );

      this.$element
        .parent('.magnify')
        .on(event + '.' + this.type, $.proxy(this.check, this));
      this.$element
        .parent('.magnify')
        .on(eventOut + '.' + this.type, $.proxy(this.check, this));
    },
    getOptions: function (options) {
      options = $.extend(
        {},
        $.fn[this.type].defaults,
        options,
        this.$element.data()
      );
      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay,
          hide: options.delay,
        };
      }
      return options;
    },
    check: function (e) {
      var container = $(e.currentTarget);
      var self = container.children('img');
      var mag = container.children('.magnify-large');
      // Get the native dimensions of the image
      if (!this.nativeWidth && !this.nativeHeight) {
        var image = new Image();
        image.src = self.attr('src');

        this.nativeWidth = image.width;
        this.nativeHeight = image.height;
      } else {
        var magnifyOffset = container.offset();
        var mx = e.pageX - magnifyOffset.left;
        var my = e.pageY - magnifyOffset.top;

        if (
          mx < container.width() &&
          my < container.height() &&
          mx > 0 &&
          my > 0
        ) {
          mag.fadeIn(100);
        } else {
          mag.fadeOut(100);
        }

        if (mag.is(':visible')) {
          var rx =
            Math.round(
              (mx / container.width()) * this.nativeWidth - mag.width() / 2
            ) * -1;
          var ry =
            Math.round(
              (my / container.height()) * this.nativeHeight - mag.height() / 2
            ) * -1;
          var bgp = rx + 'px ' + ry + 'px';

          var px = mx - mag.width() / 2;
          var py = my - mag.height() / 2;

          mag.css({ left: px, top: py, backgroundPosition: bgp });
        }
      }
    },
  };
  /* MAGNIFY PLUGIN DEFINITION
   * ========================= */
  $.fn.magnify = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data('magnify'),
        options = typeof option == 'object' && option;
      if (!data) $this.data('tooltip', (data = new Magnify(this, options)));
      if (typeof option == 'string') data[option]();
    });
  };
  $.fn.magnify.Constructor = Magnify;

  $.fn.magnify.defaults = {
    delay: 0,
  };
  /* MAGNIFY DATA-API
   * ================ */
  $(window).on('load', function () {
    $('[data-toggle="magnify"]').each(function () {
      var $mag = $(this);
      $mag.magnify();
    });
  });
  $('.itemImageList').on('click', function () {
    $('[data-toggle="magnify"]').each(function () {
      var $mag = $(this);
      $mag.magnify();
    });
  });
});

var today= new Date();
/* ----------------------------------------- */
let totalprice ;



/* ----------------------------------------- */ 
var pick = new Lightpick({
  field: document.getElementById('datePick'),
  format: 'YYYY- MM- DD',
  singleDate: false,
  minDate: today,
  onSelect: function (start, end) {
    // 결과 값 반환
    let dateCalSpan = document.querySelector('.dateCalSpan');
    
    
    let startDate = new Date(start);
    let endDate = new Date(end);

    // 날짜계산
    let diff =
    (new Date(endDate).getTime() - new Date(startDate).getTime())
    / (1000 * 60 * 60 * 24);

   
    var str = '';
    str += start ? start.format('YYYY. MM. DD') + '  ~  ' : '';
    str += end ? end.format('YYYY. MM. DD') : '...';

    // 선택한 날짜 값 전달 (str)
    let dateSpan = document.querySelector('.dateSpan');

       // 기간에 n박 m일 나타내기
       if(diff>=1 ){
        end?dateSpan.innerHTML = str:'';
       
      } else {
        
        end?dateSpan.innerHTML = '':'';
      }
     


    // 기간에 n박 m일 나타내기
    if(diff>=1 ){
      end?dateCalSpan.innerHTML = diff + ' 박  ' + Number(diff+1)+' 일 ':'';
      
    } else {
     
      end?dateCalSpan.innerHTML = '':'';
    }
   
    // 가격
    let price = '';
   
    // categoryCode에 따른 price 값 설정
    switch(categoryCode){
      case 1: price = item.carRentPrice; break;
      case 2: price = item.equipmentRentPrice; break;
      case 3: price = item.packagePrice; break;
    }

    // 총 가격 나타낼 span 태그
    let totalPriceSpan = document.querySelector('.totalPriceSpan');

    // 총 가격 계산
    if(diff>=1){
      end?totalPriceSpan.innerHTML = (Number(price) * diff).toLocaleString() +' 원':'';
      totalprice = (Number(price) * diff)
    } else {
    
      end?totalPriceSpan.innerHTML = '':'';
    }

   
  },
  inline: true,
  
});


 /**-------------------------------------------------------------------- */

let paymentCounter = 1; // 초기 결제 고유 ID 카운터



// 결제를 위한 고유한 ID 생성 함수
function generatePaymentId() {
  const paymentId = `payment-${paymentCounter}`;
  paymentCounter++;
  return paymentId;
}

// 결제 요청 함수
async function requestPayment() {

    if(document.querySelector(".dateSpan").innerHTML.length == 0){
         
      return showMyCustomAlert200();
    }

  try {
    const paymentId = generatePaymentId(); // 고유한 결제 ID 생성

    const response = await PortOne.requestPayment({
      storeId: "store-83435443-985f-4172-afde-d5607f514534",
      channelKey: "channel-key-c76e683c-3c74-4534-b7ad-539fee45702e",
      paymentId: paymentId, // 생성된 결제 고유 ID 사용
      orderName: ItemName,
      totalAmount: 1,
      currency: "CURRENCY_KRW",
      payMethod: "MOBILE",
      customer: {
        fullName: "포트원",
        phoneNumber: "010-0000-1234",
        email: "test@portone.io",
       
      },
       productType : "PRODUCT_TYPE_DIGITAL"
    });

    if (response.code != null) {
      // 오류 발생
      return showMyCustomAlert100();
    }

    // 고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
    // (다음 목차에서 설명합니다)

    const notified = await fetch(`pay/payComplement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentId: paymentId,
        // 넘길값
        // 가격
        // 상품 이름
        // paymentId
        totalAmount : totalAmount,
        orderName : orderName,
        dateSpan : document.querySelector("#datePick").innerHTML,
        itemNo : item.itemNo
      }),
    });

    // fetch 요청이 성공적으로 처리되었는지 확인할 수 있는 추가 로직 필요
    if (notified.ok) {
      // 성공적으로 처리된 경우
      console.log("Payment notification sent successfully.");
    } else {
      // 오류 발생한 경우
      console.error("Failed to send payment notification.");
    }

  } catch (error) {
    console.error("Error occurred during payment request:", error);
    // 오류 처리 로직 추가
  }
}
  
console.log(totalprice); 


