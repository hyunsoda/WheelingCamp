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
    $('#itemImageMain').css('display', 'none');
    if (!$('.3dView').length) {
      $('.itemImageMain').prepend(`
        <a-scene embedded class="3dView">
          <a-sky src="/images/images.jpg" rotation="0 0 0"></a-sky>
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



// ------------------------------------------
let date = new Date();
let currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
 
const currentDate = document.querySelector('.current-date');
currentDate.innerHTML = `${months[currMonth]} ${currYear}`;

const daysTag = document.querySelector('.days');



const renderCalendar = () => {
  currentDate.innerHTML = `${months[currMonth]} ${currYear}`;

  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); 

  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); 
let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
 
    let liTag = '';

     for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class = "inactive">${lastDateofLastMonth - i + 1}</li>`;
    
}


    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? 'active'
        : '';
    liTag += `<li class="${isToday}">${i}</li>`;
    
  }


  



 
 for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class = "inactive">${i - lastDayofMonth + 1}</li>`;
 }

	daysTag.innerHTML = liTag;
};
renderCalendar();

const prevNextIcon = document.querySelectorAll(".material-icons");

prevNextIcon.forEach((icon) => {
  icon.addEventListener('click', () => {
    currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); 
      currMonth = date.getMonth(); 
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});


// daysTag.addEventListener("click", () => {
//   let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); 

//     for(let i = 1; i <= lastDateofMonth; i++){
//       daysTag[i].classList.toggle('selected');
//      console.log(daysTag[i]);
//     }
// });



 

