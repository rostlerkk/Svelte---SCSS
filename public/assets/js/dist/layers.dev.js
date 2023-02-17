"use strict";

// tlačidlo Layers
pano.addListener('varchanged_footer_layers', function layerchange() {
  switch (pano.getVariableValue('footer_layers')) {
    case true:
      HideElement(['.map-side', '.attributes-side', '.shortcuts']);
      ShowElement(['.layers-side']);
      variableFalse(['footer_map', 'footer_cart', 'footer_apartments', 'attributes_side']);
      $('.left-side > .item').not('.floorplan').removeClass('active');
      addClass(['.layers', '.hlp-layer'], 'active');
      break;

    case false:
      if (pano.getVariableValue('footer_floorplan') == true || pano.getVariableValue('footer_map') == true || pano.getVariableValue('footer_chatbot') == true || pano.getVariableValue('footer_social') == true || pano.getVariableValue('attributes_side') == true || pano.getVariableValue('footer_apartments') == true) {
        removeClass(['.layers'], 'active');
        HideElement(['.layers-side']);
      } else {
        removeClass(['.layers', '.hlp-layer'], 'active');
        HideElement(['.layers-side']);
      }

      ShowElement(['.shortcuts']);
      break;
  }
}); //Akcie pri zmene panorámy // 

pano.on("changenode", function nodeChange() {
  /* Prepnutie aktívnej panorámy vo floorplane */
  $('.check-layer').removeClass('active');
  $('span.active').closest('.check-layer').addClass('active');
  /* KONIEC Prepnutie aktívnej panorámy vo floorplane */

  /* zapnutie a vypnutie tlačidla vrstvy vo footri pre konkrétne panorámy*/
  // if (
  //     pano.getNodeUserdata(pano.getCurrentNode()).datetime == 'layer-full' || pano.getNodeUserdata(pano.getCurrentNode()).datetime == 'layer-pure'
  // ){
  //     removeClass(['.layers'], 'hidden');
  // }
  // else {
  //     addClass(['.layers'], 'hidden');
  // }
}); // Akcia pri kliku na vrstvu v časti Layers-side (zmena aktívnej)

$('.layers-wrapper > .layer').on('click touchstart', function (e) {
  $('.layers-wrapper > .layer').removeClass('active');
  $(this).addClass('active');
});
$('.full-pano').on('click touchstart', function goToFullPano() {
  if (pano.getNodeUserdata(pano.getCurrentNode()).datetime == 'layer-pure') {
    pano.openNext('{' + pano.getLastVisitedNode() + '}');
  } else {
    console.log('gdhs');
  }
});
$('.pure-pano').on('click touchstart', function goToFullPano() {
  // var tmpName = pano.getCurrentNode().replace('node','');
  // var tmpcount = parseInt(tmpName)+43;
  // pano.openNext('{node'+ tmpcount+'}');
  switch (pano.getCurrentNode()) {
    case 'node1':
      pano.openNext('{node9}', '$(cur)');
      break;

    case 'node2':
    case 'node8':
    case 'node4':
      pano.openNext('{node10}', '$(cur)');
      break;

    default:
      break;
  }
});