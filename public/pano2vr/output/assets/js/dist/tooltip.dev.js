"use strict";

$('.item.chatbot, .m-chatbot').on('click touchstart', function (e) {
  $('.tooltip').removeClass('active');
  $('.tooltip.chatbot').addClass('active');
  setTimeout(function () {
    $('.tooltip').removeClass('active');
  }, 8000);
});
$('.item.vr, .m-vr').on('click tap', function (e) {
  $('.tooltip').removeClass('active');
  $('.tooltip.vr').addClass('active');
  setTimeout(function () {
    $('.tooltip').removeClass('active');
  }, 8000);
});

function TooltipNewCart() {
  $('.tooltip').removeClass('active');
  $('.tooltip.new-cart').addClass('active'); //console.log('zobrazujem toolpit');

  setTimeout(function () {
    $('.tooltip').removeClass('active');
  }, 6000);
}

pano.addListener('varchanged_blurred', function () {
  switch (pano.getVariableValue('blurred')) {
    case true:
      $('.tooltip').removeClass('active');
      break;
  }
});
pano.addListener('varchanged_mobile_menu_right', function () {
  switch (pano.getVariableValue('mobile_menu_right')) {
    case false:
      $('.tooltip').removeClass('active');
      break;
  }
});
pano.addListener('varchanged_mobile_menu_left', function () {
  switch (pano.getVariableValue('mobile_menu_left')) {
    case true:
      $('.tooltip').removeClass('active');
      break;
  }
});