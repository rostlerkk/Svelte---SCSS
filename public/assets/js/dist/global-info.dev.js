"use strict";

// tlačidlo Global info
pano.addListener('varchanged_footer_global_info', function () {
  switch (pano.getVariableValue('footer_global_info')) {
    case true:
      variableTrue(['blurred', 'infopanel']);
      variableFalse(['footer_social', 'footer_chatbot']);
      $('.right-side > .item').removeClass('active');
      break;

    case false:
      variableFalse(['blurred']);
      break;
  }
});