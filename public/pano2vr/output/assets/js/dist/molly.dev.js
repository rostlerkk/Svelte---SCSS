"use strict";

//console.log( "Ja som ready !" );
UserData = {};
bytID = null;
activeItem = '';
pano.on("configloaded", function () {
  najdiAktualnyByt();
  nacitajId(); // načítanie ID atribútov a následne načítanie bytov

  pano.on("changenode", function () {
    najdiAktualnyByt();
    activeNode = pano.getCurrentNode();

    if (patches[activeNode] == undefined || patches[activeNode] == {}) {} else {
      UpdateCurrentPatches();
    }
  });
});
$(document).ready(function () {//console.log( "Document ready !" );
  // najdiAktualnyByt();
});
$(window).on('load', function (e) {//najdiAktualnyByt();
  // executes when complete page is fully loaded, including all frames, objects and images
  //console.log("window is loaded, id bytu je : "+bytID);
  //var element=skin.findElements('test')[0];
  //console.log(element);
  //pano.addHotspot('np', 40, 90, element);
});

function updateTexts() {
  lang = pano.getVariableValue('lang');
  activeItem = Flats[bytID][targetAttr].activeItem;
  $('.attribute-title > div').empty().append(Flats[bytID][targetAttr].names[lang][activeItem] + '<span>' + Flats[bytID][targetAttr].prices[activeItem] + ' €</span>'); // update Názov a cena aktívneho prvku 

  $('.attribute-description > div').empty().addClass('addReadMore showlesscontent').append(Flats[bytID][targetAttr].descriptions[lang][activeItem]); // update popisu aktívneho prvku 

  AddReadMore();
}

$('.attributes-scroll-section').scroll(function () {
  $('.full-active-attribute-image').removeClass('active').addClass('hidden');
  var scroll = $(this).scrollTop();
  var flexHeight = $('.attributes-scroll-section').outerHeight();

  var _final = flexHeight - 104 + scroll;

  var styles = {
    'bottom': _final
  };
  $('.full-active-attribute-image').css(styles);
  console.log(scroll);
});

function updateAttributesDivs() {
  $('.attr-group').empty();
  $('.full-active-attribute-image').remove();
  $('.attributes-side').append('<div class="full-active-attribute-image"></div>');
  var flexHeight = $('.attributes-scroll-section').outerHeight();

  var _final2 = flexHeight - 104;

  var styles = {
    'bottom': _final2
  };
  var classToAdd = Flats[bytID][targetAttr].thumbnails[activeItem];
  $('.full-active-attribute-image').css(styles).addClass(classToAdd);
  $('.full-active-attribute-image').on('click tap', function () {
    if ($(this).hasClass('hidden') == true) {
      $(this).removeClass('hidden').addClass('active');
    }

    if ($(this).hasClass('hidden') == false && $(this).hasClass('active') == false) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active').addClass('hidden');
    }
  });
  $('.attr-group').append('<div class="active-attribute-image item"></div>'); // Thumbnail akvívneho atribútu

  $('.active-attribute-image').on('click tap', function () {
    if ($('.full-active-attribute-image').hasClass('hidden') == true) {
      $('.full-active-attribute-image').removeClass('hidden').addClass('active');
    }
  });

  for (y = 0; y < Flats[bytID][targetAttr].thumbnails.length; y++) {
    var item = document.createElement('div');
    $(item).addClass('item').addClass('attr-item').addClass(Flats[bytID][targetAttr].thumbnails[y]).addClass(Flats[bytID][targetAttr].premium[y]).attr('data-id', Flats[bytID][targetAttr].target);
    activeDiv = Flats[bytID][targetAttr].activeItem; // zistenie aktuálnej hodnoty aktívna položka

    if (y == Flats[bytID][targetAttr].activeItem) {
      // ak je položka predvolená
      $(item).addClass('active');
      $('.active-attribute-image').addClass(Flats[bytID][targetAttr].thumbnails[activeDiv]); // pridanie classy pre Thumbnail atívneho prvku
    }

    $('.attr-group').append(item);
  }

  $('.attr-item').on('click tap', function () {
    //console.log('klikol si na atribút');
    activeItem = $(this).index() - 1; // zistenie pozicie kliknuteho prvku

    Flats[bytID][targetAttr].activeItem = activeItem; // uloženie aktuálne aktívneho prvku do objektu !!!!

    $('.attr-item').removeClass('active');
    $(this).addClass('active'); // Označenie aktívneho prvku

    $('.full-active-attribute-image').attr('class', '').addClass('full-active-attribute-image hidden').addClass(Flats[bytID][targetAttr].thumbnails[activeItem]);
    $('.active-attribute-image').attr('class', '').addClass('active-attribute-image').addClass(Flats[bytID][targetAttr].thumbnails[activeItem]).addClass(Flats[bytID][targetAttr].premium[y]); // update Thumbnail atívneho prvku

    updateTexts();

    if (Flats[bytID][targetAttr].targetUrl.length < 2) {//console.log('nie sú nadefinované žiadne prechody');
    } else {
      pano.openNext('{' + Flats[bytID][targetAttr].targetUrl[activeItem] + '}', '$(cur)'); // console.log('Sú nadefinované prechody');
    } //console.log(Flats[bytID][targetAttr]);
    //console.log(Flats[bytID][targetAttr].globalChange);
    // Globálna zmena


    $.each(Flats, function (index, item) {
      $.each(Flats[index], function (byt) {
        //if (Flats[index][byt] == Flats[bytID][targetAttr] ) {
        if (Flats[bytID][targetAttr].globalChange !== '' && Flats[bytID][targetAttr].globalChange !== undefined && Flats[bytID][targetAttr].globalChange == Flats[index][byt].globalChange && Flats[bytID][targetAttr] !== Flats[index][byt]) {
          if (Flats[index][byt].globalChange == Flats[bytID][targetAttr].globalChange) {
            Flats[index][byt].activeItem = activeItem;
          }
        }
      });
    });
    UpdateCurrentPatches();
    var targetAtribute = $(this).attr('data-id');
    updateItemInCart(targetAtribute, Flats);
    UpdateTotalPrice();
  });
  updateTexts(); //UpdateCurrentPatches();
}

function generateAttributesDivs() {
  $('.attributes-groups').empty();
  $('.attr-group').empty();
  vytvorGroup = $(document.createElement('div'));
  vytvorGroup.addClass('group active').text(Flats[bytID][targetAttr].title).attr('data-target', Flats[bytID][targetAttr].target);
  vytvorGroup.on('click touchstart', function () {
    if (targetAttr != $(this).attr('data-target')) {
      //console.log('Klikol si na názov skupiny');
      targetAttr = $(this).attr('data-target');
      $('.group').removeClass('active');
      $(this).addClass('active');
      $('.attr-group').empty().attr('data-target', Flats[bytID][targetAttr].target);
      $('.attr-group').append('<div class="active-attribute-image item"></div>'); // Thumbnail akvívneho atribútu

      updateAttributesDivs();
    } else {//console.log('Klikol si na názov skupiny, ktorý nie je aktívny');
    }
  });
  $('.attributes-groups').append(vytvorGroup);
  $('.attr-group').append('<div class="active-attribute-image item"></div>'); // Thumbnail akvívneho atribútu

  $('.active-attribute-image').attr('class', '').addClass('active-attribute-image').addClass(Flats[bytID][targetAttr].thumbnails[activeItem]); // update Thumbnail atívneho prvku

  updateAttributesDivs();
} // Akcie pri zmene hodnoty premennej attributes side


pano.addListener('varchanged_attributes_side', function () {
  switch (pano.getVariableValue('attributes_side')) {
    case true:
      activeItem = Flats[bytID][targetAttr].activeItem;
      najdiAktualnyByt();
      fullItem = $(document.createElement('div'));
      HideElement(['.layers-side', '.map-side']);
      ShowElement(['.attributes-side']);
      variableFalse(['footer_map', 'footer_layers', 'footer_apartments', 'footer_apartments']); // $('.left-side > .item').removeClass('active'); 

      variableFalse(['shortcuts']); // $('.attributes-groups').empty();
      //$('.attr-group').empty().attr('data-target',Flats[bytID][targetAttr].target).append('<div class="active-attribute-image item"></div>'); // Thumbnail akvívneho atribútu

      generateAttributesDivs(); //Zoskupený atribút

      $.each(Flats[bytID], function (i) {
        if (Flats[bytID][i].grouped != '' && Flats[bytID][targetAttr].grouped == Flats[bytID][i].grouped) {
          if (Flats[bytID][targetAttr] != Flats[bytID][i]) {
            //.log(Flats[bytID][i]);
            vytvorGroup = $(document.createElement('div'));
            vytvorGroup.addClass('group').text(Flats[bytID][i].title).attr('data-target', Flats[bytID][i].target);
            vytvorGroup.on('click touchstart', function () {
              $('.group').removeClass('active');
              $(this).addClass('active');
              targetAttr = Flats[bytID][i].target;
              activeItem = Flats[bytID][targetAttr].activeItem;
              updateAttributesDivs();
              updateTexts();
            });
            $('.attributes-groups').append(vytvorGroup);
          }
        }
      });
      var flexHeight = $('.attributes-scroll-section').outerHeight();

      var _final3 = flexHeight - 104;

      var styles = {
        'bottom': _final3
      };
      var classToAdd = Flats[bytID][targetAttr].thumbnails[activeItem];
      $('.full-active-attribute-image').css(styles).addClass(classToAdd); //ShowMore();

      break;

    case false:
      if (pano.getVariableValue('footer_floorplan') == true || pano.getVariableValue('footer_layers') == true || pano.getVariableValue('footer_chatbot') == true || pano.getVariableValue('footer_social') == true || pano.getVariableValue('footer_map') == true || pano.getVariableValue('footer_social') == true || pano.getVariableValue('footer_apartments') == true) {
        $('.attr-group').removeClass('active');
        addClass(['.group-2'], 'hidden');
        HideElement(['.attributes-side']);
      } else {
        $('.attr-group').removeClass('active');
        addClass(['.group-2'], 'hidden');
        HideElement(['.attributes-side']);
      }

      break;
  }
});