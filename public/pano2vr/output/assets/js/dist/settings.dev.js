"use strict";

//nastavenie jazyka po kliku na jazyk v menu
$('#sk').on('click touchstart', function (e) {
  SetVariableValue(['lang'], 'sk');
  removeClass(['.hlp-layer'], 'active');
  $('.adv-wrapper').removeClass('hidden');
  variableFalse(['settings', 'lang_menu']);
});
$('#cz').on('click touchstart', function (e) {
  SetVariableValue(['lang'], 'cz');
  removeClass(['.hlp-layer'], 'active');
  $('.adv-wrapper').removeClass('hidden');
  variableFalse(['settings', 'lang_menu']);
});
$('#en').on('click touchstart', function (e) {
  SetVariableValue(['lang'], 'en');
  removeClass(['.hlp-layer'], 'active');
  $('.adv-wrapper').removeClass('hidden');
  variableFalse(['settings', 'lang_menu']);
});
/* KONIEC sekcie Jazyk - otvorenie menu a aktivácia jazka */

/* Zatváranie a otváranie Nastavení */

pano.addListener('varchanged_settings', function () {
  switch (pano.getVariableValue('settings')) {
    case true:
      variableFalse(['app_cart', 'shortcuts']);
      ShowElement(['.settings-container']);
      addClass(['.adv-wrapper'], 'hidden');
      addClass(['.hlp-layer'], 'active');
      variableFalse(['lang_menu']);

      if (pano.getGyroAvailable() == false) {
        $('.settings-item.gyroscope').remove();
      }

      break;

    case false:
      HideElement(['.settings-container']);
      removeClass(['.adv-wrapper'], 'hidden');
      removeClass(['.hlp-layer'], 'active');
      break;
  }
});
/* Nastavenia - zmeny hodnôt */

pano.addListener('varchanged_autorotate', function () {
  $('.switch-container.autorotate > .on_off-icon').removeClass('active');

  switch (pano.getVariableValue('autorotate')) {
    case true:
      $('.switch-container.autorotate > .on').addClass('active');
      $('.switch-container.autorotate > .title').addClass('active');
      pano.startAutorotate('0.03', '0.2');
      break;

    case false:
      $('.switch-container.autorotate > .off').addClass('active');
      $('.switch-container.autorotate > .title').removeClass('active');
      pano.stopAutorotate();
      break;
  }
});
pano.addListener('varchanged_hotspots', function () {
  $('.switch-container.hotspots > .on_off-icon').removeClass('active');

  switch (pano.getVariableValue('hotspots')) {
    case true:
      $('.switch-container.hotspots > .on').addClass('active');
      $('.switch-container.hotspots > .title').addClass('active');
      break;

    case false:
      $('.switch-container.hotspots > .off').addClass('active');
      $('.switch-container.hotspots > .title').removeClass('active');
      break;
  }
});
pano.addListener('varchanged_gyroscope', function () {
  $('.switch-container.gyroscope > .on_off-icon').removeClass('active');

  switch (pano.getVariableValue('gyroscope')) {
    case true:
      $('.switch-container.gyroscope > .on').addClass('active');
      $('.switch-container.gyroscope > .title').addClass('active');
      break;

    case false:
      $('.switch-container.gyroscope > .off').addClass('active');
      $('.switch-container.gyroscope > .title').removeClass('active');
      break;
  }
});
pano.addListener('varchanged_advertisement', function () {
  $('.switch-container.advertisement > .on_off-icon').removeClass('active');

  switch (pano.getVariableValue('advertisement')) {
    case true:
      $('.switch-container.advertisement > .on').addClass('active');
      $('.switch-container.advertisement > .title').addClass('active'); //addClass(['.adv-wrapper '],'active');

      ShowElement(['.adv-wrapper']);
      break;

    case false:
      $('.switch-container.advertisement > .off').addClass('active');
      $('.switch-container.advertisement > .title').removeClass('active'); //removeClass(['.adv-wrapper '],'active');

      HideElement(['.adv-wrapper']);
      break;
  }
});
pano.addListener('varchanged_resolution', function () {
  switch (pano.getVariableValue('resolution')) {
    case true:
      $('.switch-container.resolution > .hq').addClass('active');
      $('.switch-container.resolution > .lq').removeClass('active');
      break;

    case false:
      $('.switch-container.resolution > .hq').removeClass('active');
      $('.switch-container.resolution > .lq').addClass('active');
      break;
  }
});
pano.addListener('varchanged_sound', function () {
  $('.sound').removeClass('active');

  switch (pano.getVariableValue('sound')) {
    case true:
      $('.sound.on').addClass('active');
      pano.setVolume('_main', 1.0);
      break;

    case false:
      $('.sound.off').addClass('active');
      pano.setVolume('_main', 0.0);
      break;
  }
});