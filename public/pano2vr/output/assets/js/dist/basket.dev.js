"use strict";

console.log('Baket načítaný, bytID : ' + bytID);
var appScrollcontent = $('.app-cart > .attributes-group');
var $cartHeight = 0;

function ElementHeight(element, cartHeight) {
  cartHeight = $(element).height(); //console.log(cartHeight);

  appScrollcontent.css('max-height', cartHeight - 374);
}

$(window).resize(function () {
  ElementHeight('window', $cartHeight); //console.log('spustil som prerátanie výšky okna');
  //console.log($cartHeight);
}); // Otvárani a zatváranie Košíka

pano.addListener('varchanged_app_cart', function () {
  switch (pano.getVariableValue('app_cart')) {
    case true:
      ElementHeight('window', $cartHeight);
      variableFalse(['settings']);
      ShowElement(['.app-cart']);
      addClass(['.adv-wrapper'], 'hidden');
      addClass(['.hlp-layer'], 'active');
      variableFalse(['lang_menu']);
      $('.tooltip').removeClass('active');
      break;

    case false:
      HideElement(['.app-cart']);
      removeClass(['.adv-wrapper'], 'hidden');
      removeClass(['.hlp-layer'], 'active');
      break;
  }
}); // Zatvorenie košíka po kliku na HLP-LAYER vrstvu

var hlpLayer = $('.hlp-layer');
hlpLayer.on('click tap', function () {
  variableFalse(['app_cart']);
}); // Zatvorenie košíka ak je premenná BLUR true

pano.addListener('varchanged_blurred', function () {
  switch (pano.getVariableValue('blurred')) {
    case true:
      hlpLayer.removeClass('active');
      variableFalse(['app_cart']);
      break;
  }
});