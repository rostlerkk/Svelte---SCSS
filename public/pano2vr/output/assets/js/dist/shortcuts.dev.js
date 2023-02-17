"use strict";

var x; // Akcie pri zmene hodnoty premennej shortcuts

pano.addListener('varchanged_shortcuts', function () {
  switch (pano.getVariableValue('shortcuts')) {
    case true:
      addClass(['.shortcuts', '.slider-bg'], 'move');
      $('.shortcuts > .shortcuts-icon').addClass('rotate');
      removeClass(['.shortcuts-navigation', '.shortcuts-logo'], 'hidden');
      HideElement(['.footer']);
      addClass(['.mobile-footer, .screenCapture'], 'hidden');
      variableFalse(['footer_floorplan', 'footer_map', 'footer_chatbot', 'footer_social', 'attributes_side', 'attributes_hotspot', 'lang_menu', 'mobile_menu_left', 'mobile_menu_right']);
      addClass(['.hlp-layer'], 'active');
      x = $('.all-slider').filter(function () {
        return this.style.opacity > 0;
      });
      break;

    case false:
      $('.shortcuts > .shortcuts-icon').removeClass('rotate');
      addClass(['.shortcuts-navigation', '.shortcuts-logo'], 'hidden');
      removeClass(['.shortcuts', '.slider-bg'], 'move');
      ShowElement(['.footer']);
      removeClass(['.mobile-footer, .screenCapture'], 'hidden');
      removeClass(['.hlp-layer'], 'active');
      progressBar.removeClass('anim');
      clearInterval(interval);
      autoplay = false;
      autoplayIcon.removeAttr('style');
      break;
  }
}); // Zapínanie a vypínanie AUTO TOUR selection

var progressBar = $('.progresbar');

function PlayTour() {
  progressBar.removeClass('anim');
  $('.next').trigger('click');
  $('.progresbar').addClass('anim');
}

var interval;
var autoplay = false;
var autoplayIcon = $('.shortcuts-play');
autoplayIcon.on('click touchstart', function () {
  $(this).css('background-color', 'rgba(89, 86, 233, 1)');

  if (autoplay == false) {
    progressBar.addClass('anim');
    interval = setInterval(PlayTour, 5000);
  }

  autoplay = true;
});
stopAutoPlayIcon = $('.shortcuts-pause');
stopAutoPlayIcon.on('click touchstart', function (e) {
  progressBar.removeClass('anim');
  clearInterval(interval);
  autoplay = false;
  autoplayIcon.removeAttr('style');
});
/* otvorenie ďalšej panorámy */
//END Zapínanie a vypínanie AUTO TOUR selection

var allArrays = {};
var sliderTags = ['equirects'];
var AllSliders = {};
pano.on("configloaded", function () {
  allArrays['panoArrayA'] = pano.getNodesWithTag('equirects');

  function showActiveSlider(allArrays, panoArray, activeSlider) {
    for (var i = 0; i < allArrays[panoArray].length; i++) {
      var name = allArrays[panoArray][i];

      if (name == targetPano) {
        $('.sliders').addClass('hidden');
        activeSlider.removeClass('hidden');
        break;
      }
    }
  }

  for (index = 0; index < sliderTags.length; index++) {
    AllSliders[sliderTags[index]] = pano.getNodesWithTag(sliderTags[index]);
    $('.slider-' + sliderTags[index]).attr('id', sliderTags[index]);
  }
});
var activeNodePosition = 0;
var activeSlider = '';
$('.next').on('click touchstart', function () {
  var y = x[0].id;

  function getPosition(arrayName, arrayItem) {
    for (var i = 0; i < arrayName.length; i++) {
      if (arrayName[i] == arrayItem) return i;
    }
  }

  var pos = getPosition(AllSliders[y], pano.getCurrentNode());

  if (pos == AllSliders[y].length - 1) {
    pano.openNext('{' + AllSliders[y][0] + '}');
  } else {
    pos++;
    pano.openNext('{' + AllSliders[y][pos] + '}');
  }
});
$('.prev').on('click touchstart', function () {
  var y = x[0].id;

  function getPosition(arrayName, arrayItem) {
    for (var i = 0; i < arrayName.length; i++) {
      if (arrayName[i] == arrayItem) return i;
    }
  }

  var pos = getPosition(AllSliders[y], pano.getCurrentNode());

  if (pos == 0) {
    pos = AllSliders[y].length - 1;
    pano.openNext('{' + AllSliders[y][pos] + '}');
  } else {
    pos--;
    pano.openNext('{' + AllSliders[y][pos] + '}');
  }
}); // pano.on("changenode", function() {
//     targetPano = pano.getCurrentNode();
//     showActiveSlider(allArrays, 'panoArrayA', $('.slider-a'));
//     showActiveSlider(allArrays, 'panoArrayB', $('.slider-b'));
//     showActiveSlider(allArrays, 'panoArrayC', $('.slider-c'));
//     showActiveSlider(allArrays, 'panoArrayD', $('.slider-d'));
//     showActiveSlider(allArrays, 'panoArrayE', $('.slider-e'));
// });