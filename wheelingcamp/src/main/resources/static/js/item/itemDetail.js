// JQuery 기본 설정
jQuery(document).ready(function ($) {
  // 이미지 클릭시 메인 이미지 경로 변경
  $(".itemImage").on("click", function (e) {
    // 3D 이미지 숨기기
    if ($(".3dView").length) {
      $(".3dView").css("display", "none");
    }

    // 메인 이미지 화면 표시
    $("#itemImageMain").css("display", "block");
    // 메인 이미지 경로 변경
    $("#itemImageMain").attr("src", e.target.src);
  });

  $("#3dItemImage").on("click", function () {
    // 메인 이미지 화면 숨기기
    const itemSrc = this.src;

    $("#itemImageMain").css("display", "none");
    if (!$(".3dView").length) {
      $(".itemImageMain").prepend(`
        <a-scene embedded class="3dView">
          <a-sky th:src="${itemSrc}" rotation="0 0 0"></a-sky>
        </a-scene>`);
    } else {
      $(".3dView").css("display", "block");
    }
  });

  //------------------------------ 돋보기 ------------------------------
  var Magnify = function (element, options) {
    this.init("magnify", element, options);
  };
  Magnify.prototype = {
    constructor: Magnify,
    init: function (type, element, options) {
      var event = "mousemove",
        eventOut = "mouseleave";

      this.type = type;
      this.$element = $(element);
      this.options = this.getOptions(options);
      this.nativeWidth = 0;
      this.nativeHeight = 0;

      this.$element.wrap('<div class="magnify" >');
      $(".magnify-large").remove();
      this.$element.parent(".magnify").append('<div class="magnify-large" >');
      this.$element
        .siblings(".magnify-large")
        .css(
          "background",
          "url('" + this.$element.attr("src") + "') no-repeat"
        );

      this.$element
        .parent(".magnify")
        .on(event + "." + this.type, $.proxy(this.check, this));
      this.$element
        .parent(".magnify")
        .on(eventOut + "." + this.type, $.proxy(this.check, this));
    },
    getOptions: function (options) {
      options = $.extend(
        {},
        $.fn[this.type].defaults,
        options,
        this.$element.data()
      );
      if (options.delay && typeof options.delay == "number") {
        options.delay = {
          show: options.delay,
          hide: options.delay,
        };
      }
      return options;
    },
    check: function (e) {
      var container = $(e.currentTarget);
      var self = container.children("img");
      var mag = container.children(".magnify-large");
      // Get the native dimensions of the image
      if (!this.nativeWidth && !this.nativeHeight) {
        var image = new Image();
        image.src = self.attr("src");

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

        if (mag.is(":visible")) {
          var rx =
            Math.round(
              (mx / container.width()) * this.nativeWidth - mag.width() / 2
            ) * -1;
          var ry =
            Math.round(
              (my / container.height()) * this.nativeHeight - mag.height() / 2
            ) * -1;
          var bgp = rx + "px " + ry + "px";

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
        data = $this.data("magnify"),
        options = typeof option == "object" && option;
      if (!data) $this.data("tooltip", (data = new Magnify(this, options)));
      if (typeof option == "string") data[option]();
    });
  };
  $.fn.magnify.Constructor = Magnify;

  $.fn.magnify.defaults = {
    delay: 0,
  };
  /* MAGNIFY DATA-API
   * ================ */
  $(window).on("load", function () {
    $('[data-toggle="magnify"]').each(function () {
      var $mag = $(this);
      $mag.magnify();
    });
  });
  $(".itemImageList").on("click", function () {
    $('[data-toggle="magnify"]').each(function () {
      var $mag = $(this);
      $mag.magnify();
    });
  });
});

var today = new Date();

var pick = new Lightpick({
  field: document.getElementById("datePick"),
  format: "YYYY- MM- DD",
  singleDate: false,
  minDate: today,
  onSelect: function (start, end) {
    // 결과 값 반환
    let dateCalSpan = document.querySelector(".dateCalSpan");

    let startDate = new Date(start);
    let endDate = new Date(end);

    // 날짜계산
    let diff =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24);

    var str = "";
    str += start ? start.format("YYYY. MM. DD") + "  ~  " : "";
    str += end ? end.format("YYYY. MM. DD") : "...";

    // 선택한 날짜 값 전달 (str)
    let dateSpan = document.querySelector(".dateSpan");

    // 기간에 n박 m일 나타내기
    if (diff >= 1) {
      end ? (dateSpan.innerHTML = str) : "";
    } else {
      end ? (dateSpan.innerHTML = "") : "";
    }

    // 기간에 n박 m일 나타내기
    if (diff >= 1) {
      end
        ? (dateCalSpan.innerHTML = diff + " 박  " + Number(diff + 1) + " 일 ")
        : "";
    } else {
      end ? (dateCalSpan.innerHTML = "") : "";
    }

    // 가격
    let price = "";

    // categoryCode에 따른 price 값 설정
    switch (categoryCode) {
      case 1:
        price = item.carRentPrice;
        break;
      case 2:
        price = item.equipmentRentPrice;
        break;
      case 3:
        price = item.packagePrice;
        break;
    }

    // 총 가격 나타낼 span 태그
    let totalPriceSpan = document.querySelector(".totalPriceSpan");

    // 총 가격 계산
    if (diff >= 1) {
      end
        ? (totalPriceSpan.innerHTML =
            (Number(price) * diff).toLocaleString() + " 원")
        : "";
    } else {
      end ? (totalPriceSpan.innerHTML = "") : "";
    }
  },
  inline: true,
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 찜하기

const like = document.getElementById("like");
const cartBtn = document.getElementById("cartItem");

// 찜 기능

like.addEventListener("click", () => {
  if (loginMember == null) {
    alert("로그인 후 이용해주세요");
    return;
  }

  const obj = {
    categoryCode: categoryCode,
  };

  // 패키지가 아닌 경우
  if (item.itemNo != 0) {
    obj.itemNo = item.itemNo;
  } else {
    obj.packageNo = item.packageNo;
  }

  like.innerHtml = "";

  fetch("/interest/item", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result == 1) {
        alert("찜목록으로 추가 되었습니다.");
        like.innerHTML = "<i class='fa-solid fa-heart'></i> 찜 취소";
      } else if (result == 2) {
        alert("찜목록에서 삭제 되었습니다.");
        like.innerHTML = "<i class='fa-regular fa-heart'></i> 찜 하기";
      } else {
        console.log("진행 실패..");
      }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////
// 장바구니

const cartItem = document.getElementById("cartItem"); // 장바구니 버튼
const dateSpan = document.querySelector(".dateSpan"); // 예약 날짜 기간
const totalPriceSpan = document.querySelector(".totalPriceSpan"); // 총 결제금액
const buttonDiv = document.getElementById("buttonDiv"); // 버튼 div
const rentalBtn = document.querySelector(".rentalBtn"); // 대여용 버튼
const shoppingBtn = document.querySelector(".shoppingBtn"); // 구매용 버튼

const obj = {
  itemNo: item.itemNo,
  categoryCode: item.categoryCode,
  dateSpan: dateSpan,
  totalPriceSpan: totalPriceSpan,
};

const cartAppend = (type) => {
  obj.type = type;

  fetch("cart/appendCart", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(obj),
  })
    .then((resp) => resp.text())
    .then((result) => {
      if (result > 0) {
        alert("상품이 장바구니에 추가되었습니다!");
      } else {
        console.log("오류...");
      }
    });
};

// 버튼 기능을 추가하는 함수 정의
const btnClickEvent = (btn, type) => {
  btn.addEventListener("click", () => {
    cartAppend(type);
  });
};

// 장바구니 버튼을 눌렀을 때
cartItem.addEventListener("click", (e) => {
  if (dateSpan.innerText == "") {
    alert("예약 날짜를 선택해주세요");
    return;
  }

  // 장비를 장바구니에 추가하는 경우 대여인지 구매인지 따져줌
  if (obj.categoryCode == 2) {
    cartItem.style.display = "none";
    rentalBtn.style.display = "block";
    shoppingBtn.style.display = "block";

    return;
  }
});

document.addEventListener("click", (e) => {
  if (!buttonDiv.contains(e.target)) {
    cartItem.style.display = "block";
    rentalBtn.style.display = "none";
    shoppingBtn.style.display = "none";
  }
});

btnClickEvent(rentalBtn, 1); // 대여용 버튼 함수
btnClickEvent(shoppingBtn, 1); // 구매용 버튼 함수
