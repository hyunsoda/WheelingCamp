// var currentIndex = 0
// var shoot = $(".section_img1_box > li").length

// $(".arrow_2").click(function(){
//    currentIndex++

//    if(currentIndex >= shoot){
//       currentIndex = 0
//    }

//    ShowIndex(currentIndex)
// })


// $(".arrow_1").click(function(){
//    currentIndex--

//    if(currentIndex < 0){
//       currentIndex = shoot - 1
//    }

//    ShowIndex(currentIndex)
// })


// function ShowIndex(Index){
//    $(".section_img1_box >li").fadeOut(700)
//    $(".section_img1_box >li").eq(Index).fadeIn(700)

//    if(Index === 0){
//       $("#text2, #text3").fadeOut(300)
//       setTimeout(function(){
//          $("#text1").fadeIn(700)
//       },700)
   
//    }

//    if(Index === 1){
//       $("#text1, #text3").fadeOut(300)
//       setTimeout(function(){
//          $("#text2").fadeIn(700)
//       },700)
//    }

//    if(Index === 2){
//       $("#text1, #text2").fadeOut(300)
//       setTimeout(function(){
//          $("#text3").fadeIn(700)
//       },700)
//    }

// }


$.noConflict();
jQuery(document).ready(function ($) {
  /*--------------------------------------*/ 







   $('.increase').on('click', function() {
      var currentNumber = parseInt($('.up-number').text());
      if (currentNumber < 10) {
          $('.up-number').text(currentNumber + 1);
      }
  });

  $('.decrease').on('click', function() {
      var currentNumber = parseInt($('.up-number').text());
      if (currentNumber > 1) {
          $('.up-number').text(currentNumber - 1);
      }
  });

  $('body').append('<div id="toolTip" class="toolTip"></div>');

  $('#KR42').on('mouseover', function() {
    $('#toolTip').text('강원').show();
  });

  $('#KR42').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR42').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });


  $('#KR41').on('mouseover', function() {
    $('#toolTip').text('경기').show();
  });

  $('#KR41').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR41').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR28').on('mouseover', function() {
    $('#toolTip').text('인천').show();
  });

  $('#KR28').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR28').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR44').on('mouseover', function() {
    $('#toolTip').text('충남').show();
  });

  $('#KR44').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR44').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR11').on('mouseover', function() {
    $('#toolTip').text('서울').show();
  });

  $('#KR11').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR11').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR50').on('mouseover', function() {
    $('#toolTip').text('세종').show();
  });

  $('#KR50').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR50').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR45').on('mouseover', function() {
    $('#toolTip').text('전북').show();
  });

  $('#KR45').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR45').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR46').on('mouseover', function() {
    $('#toolTip').text('전남').show();
  });

  $('#KR46').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR46').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR48').on('mouseover', function() {
    $('#toolTip').text('경남').show();
  });

  $('#KR48').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR48').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR26').on('mouseover', function() {
    $('#toolTip').text('부산').show();
  });

  $('#KR26').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR26').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR31').on('mouseover', function() {
    $('#toolTip').text('울산').show();
  });

  $('#KR31').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR31').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });


  $('#KR47').on('mouseover', function() {
    $('#toolTip').text('경북').show();
  });

  $('#KR47').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR47').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR49').on('mouseover', function() {
    $('#toolTip').text('제주').show();
  });

  $('#KR49').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR49').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR30').on('mouseover', function() {
    $('#toolTip').text('대전').show();
  });

  $('#KR30').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR30').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR29').on('mouseover', function() {
    $('#toolTip').text('광주').show();
  });

  $('#KR29').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR29').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR27').on('mouseover', function() {
    $('#toolTip').text('대구').show();
  });

  $('#KR27').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR27').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });

  $('#KR43').on('mouseover', function() {
    $('#toolTip').text('충북').show();
  });

  $('#KR43').on('mouseout', function() {
    $('#toolTip').hide();
  });

  $('#KR43').on('mousemove', function(event) {
    $('#toolTip').css({
      left: event.pageX + 10 + 'px',
      top: event.pageY + 10 + 'px'
    });
  });













});







/*--------------------------------------*/ 

/*--------------------------------------*/ 

