"use strict";

// tlačidlo Floorplan vo Footri
pano.addListener('varchanged_footer_floorplan', function () {
  switch (pano.getVariableValue('footer_floorplan')) {
    case true:
      addClass(['.floorplan', '.hlp-layer'], 'active');
      addClass(['.floorplan-side'], 'anim');
      break;

    case false:
      if (pano.getVariableValue('footer_map') == true || pano.getVariableValue('footer_layers') == true || pano.getVariableValue('footer_chatbot') == true || pano.getVariableValue('footer_social') == true || pano.getVariableValue('attributes_side') == true || pano.getVariableValue('footer_apartments') == true) {
        removeClass(['.floorplan-side'], 'anim');
        removeClass(['.floorplan'], 'active');
      } else {
        removeClass(['.floorplan-side'], 'anim');
        removeClass(['.floorplan', '.hlp-layer'], 'active');
      }

      break;
  }
}); // Zmena hodnoty premennej floorplan-full

pano.addListener('varchanged_floorplan_full', function () {
  switch (pano.getVariableValue('floorplan_full')) {
    case true:
      variableTrue(['blurred']);
      addClass(['.floorplan-full'], 'anim');
      break;

    case false:
      variableFalse(['blurred']);
      removeClass(['.floorplan-full'], 'anim');
      break;
  }
});
pano.on("changenode", function nodeChange() {
  /* Prepnutie aktívnej panorámy vo floorplane */
  $('.check-layer').removeClass('active');
  $('span.active').closest('.check-layer').addClass('active');
});