"use strict";

// Akcie pri zmene hodnoty premennej infopanel
pano.addListener('varchanged_infopanel', function () {
  switch (pano.getVariableValue('infopanel')) {
    case true:
      ShowElement(['.infopanel']);
      variableTrue(['blurred']);
      $('.ggskin_hotspot, .ggskin_external').css({
        'visibility': 'hidden'
      });
      break;

    case false:
      variableFalse(['blurred']);
      HideElement(['.infopanel']);
      setTimeout(function () {
        $('.ggskin_hotspot, .ggskin_external').css({
          'visibility': 'visible'
        });
      }, 250);
      break;
  }
});