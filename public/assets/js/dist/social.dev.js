"use strict";

// tlačidlo Social
pano.addListener('varchanged_footer_social', function () {
  switch (pano.getVariableValue('footer_social')) {
    case true:
      variableFalse(['footer_global_info', 'footer_chatbot', 'footer_apartments']);
      ShowElement(['.social-container']);
      $('.right-side > .item').removeClass('active');
      addClass(['.social', '.hlp-layer'], 'active');

      if (pano.getNodeUserdata(pano.getCurrentNode()).copyright == 'vyberovnik' && $(window).width() < 730) {
        $('.footer-apartments').addClass('hidden');
      }

      break;

    case false:
      //$('.social').addClass('active');
      if (pano.getVariableValue('footer_floorplan') == true || pano.getVariableValue('footer_map') == true || pano.getVariableValue('footer_chatbot') == true || pano.getVariableValue('footer_layers') == true || pano.getVariableValue('attributes_side') == true) {
        removeClass(['.social'], 'active');
        HideElement(['.social-container']);
      } else {
        removeClass(['.social', '.hlp-layer'], 'active');
        HideElement(['.social-container']);
      }

      if (pano.getNodeUserdata(pano.getCurrentNode()).copyright == 'vyberovnik' && $(window).width() < 730) {
        $('.footer-apartments').removeClass('hidden');
      }

      break;
  }
});
pano.on("configloaded", function () {
  var link = window.location.href;
  $('#share').attr('value', link);
  $('.twitter').on('click touchstart', function () {
    url = 'https://twitter.com/share?url=' + link;
    pano.openUrl(url, "_blank");
  });
  $('.facebook').on('click touchstart', function () {
    url = 'https://www.facebook.com/sharer/sharer.php?u=' + link;
    pano.openUrl(url, "_blank");
  });
  $('.inkedIn').on('click touchstart', function () {
    url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + link;
    pano.openUrl(url, "_blank");
  });
});