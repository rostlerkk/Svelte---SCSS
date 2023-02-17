"use strict";

pano.addListener('varchanged_attributes_side', function () {
  switch (pano.getVariableValue('attributes_side')) {
    case true:
      ShowElement(['.attributes-side']);
      break;

    case false:
      HideElement(['.attributes-side']);
      break;
  }
});
var AttributesGroupsDiv = $('.attributes-groups');
var AttributesGroupsContent = $('<div class="group active"></div>');
var AttributesGroupDivTitle = $('.group');
var activeAttributeTitle = $('.attribute-title');
var Groups = $('.attributes-groups > .group');
var GroupsFirstChild = $('.attributes-groups > .group:first-child');
var _flatID = null;

function addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups) {
  hMedia(['Limec_schodik_black', 'Limec_schodik_grey', 'Limec_terasa_white', 'Limec_terasa_black', 'Limec_terasa_grey', 'Terasa_white_l', 'Terasa_white_r', 'Terasa_black_l', 'Terasa_black_r', 'Terasa_grey_l', 'Terasa_grey_r', 'Vypln_heraklit', 'Vypln_rastre']);
  AttributesGroupsDiv.empty(); // Premazanie názvov skupín atribútov

  ActiveItem = AllFlats[_flatID][attrid].ActiveItem; // Načítanie hodnoty aktívnej položky

  $('.attribute-title > div').empty().append(AllFlats[_flatID][attrid].Names[ActiveItem - 1] + '<span>' + AllFlats[_flatID][attrid].Prices[ActiveItem - 1] + ' €</span>'); // Názov a cena aktívneho prvku 

  $('.attribute-description > div').empty().append(AllFlats[_flatID][attrid].Descriptions[ActiveItem - 1]); // popis aktívneho prvku 

  var CoutOfAttributes = Object.keys(AllFlats[_flatID]).length; // Počet atribútov 

  var searchForSign = AllFlats[_flatID][attrid].Grouped; // Načítanie znaku pre pridanie ďalšej skupiny atribútov

  var AtributesArray = [];

  if (searchForSign == '') {
    // Ak sa atribút nemá "zgrupovať", vypíš iba túto jednu skupinu
    var item = document.createElement('div');
    $(item).addClass('group').append('<div class="active">' + AllFlats[_flatID][attrid].name + '</div>'); // Názov skupiny atribútov

    $('.attributes-groups').append(item);
  } else {
    // Výpis skupín atribútov        
    $.each(AllFlats[_flatID], function (i) {
      if (AllFlats[_flatID][i].Grouped == searchForSign) {
        AtributesArray.push(AllFlats[_flatID][i].id);
        var item = document.createElement('div');
        $(item).addClass('group').append('<div>' + AllFlats[_flatID][i].name + '</div>'); // Názov skupiny atribútov

        $('.attributes-groups').append(item);
      }
    });
  }

  Groups = $('.attributes-groups > .group');
  GroupsFirstChild = $('.attributes-groups > .group:first-child');
  GroupsFirstChild.addClass('active'); // Výpis atribútov - prvky

  $('.attr-group').empty().append('<div class="active-attribute-image item"></div>'); // Thumbnail akvívneho atribútu

  for (var i = 0; i < AllFlats[_flatID][attrid].Names.length; i++) {
    // Generovanie miniatúr atribútov
    var item = document.createElement('div');
    $(item).addClass('item').addClass('attr-item').addClass(AllFlats[_flatID][attrid].Thumbnails[i]);

    if (i == AllFlats[_flatID][attrid].ActiveItem - 1) {
      // ak je položka predvolená
      $(item).addClass('active');
      $('.active-attribute-image').addClass(AllFlats[_flatID][attrid].Thumbnails[ActiveItem - 1]); // pridanie classy pre Thumbnail atívneho prvku
    }

    if (AllFlats[_flatID][attrid].Premium[i] == 'y') {
      // Ak je položka prémiová
      $(item).addClass('premium');
    }

    $('.attr-group').append(item);
  } // Zmena aktívneho atrbútu - prvku po kliknutí na neho


  $('.attr-item').on('click touchstart', function () {
    activeItem = $(this).index();
    $('.attr-item').removeClass('active');
    $(this).addClass('active'); // Označenie aktívneho prvku

    AllFlats[_flatID][attrid].ActiveItem = activeItem; // uloženie aktuálne aktívneho prvku do objektu !!!!

    $('.active-attribute-image').attr('class', '').addClass('active-attribute-image').addClass(AllFlats[_flatID][attrid].Thumbnails[activeItem - 1]); // update Thumbnail atívneho prvku

    $('.attribute-title > div').empty().append(AllFlats[_flatID][attrid].Names[activeItem - 1] + '<span>' + AllFlats[_flatID][attrid].Prices[activeItem - 1] + ' €</span>'); // update Názov a cena aktívneho prvku 

    $('.attribute-description > div').empty().append(AllFlats[_flatID][attrid].Descriptions[activeItem - 1]); // update popisu aktívneho prvku 
  }); // Zmena aktívnej skupiny atribútov po kliknutí na skupinu

  Groups.on('click touchstart', function () {
    AtributesArray = []; // Vytvorenie poľa s Idčkami "grouped" atribútov

    $.each(AllFlats[_flatID], function (i) {
      if (AllFlats[_flatID][i].Grouped == searchForSign) {
        AtributesArray.push(AllFlats[_flatID][i].id);
      }
    });

    function updateTitle() {
      $('.attribute-title > div').empty().append(AllFlats[_flatID][AtributesArray[Index]].Names[ActiveItem - 1] + '<span>' + AllFlats[_flatID][AtributesArray[Index]].Prices[ActiveItem - 1] + ' €</span>');
    }

    function updateDescription() {
      $('.attribute-description > div').empty().append(AllFlats[_flatID][AtributesArray[Index]].Descriptions[ActiveItem - 1]); // popis aktívneho prvku 
    }

    Groups.removeClass('active');
    $(this).addClass('active');
    var Index = $(this).index();
    ActiveItem = AllFlats[_flatID][AtributesArray[Index]].ActiveItem;
    updateTitle();
    updateDescription();
    $('.attr-group').empty().append('<div class="active-attribute-image item"></div>'); // Thumbnail akvívneho atribútu
    // Prepísanie prvkov (atribútov)

    for (var i = 0; i < AllFlats[_flatID][AtributesArray[Index]].Names.length; i++) {
      // Generovanie miniatúr atribútov
      var item = document.createElement('div');
      $(item).addClass('item').addClass('attr-item').addClass(AllFlats[_flatID][AtributesArray[Index]].Thumbnails[i]);

      if (i == AllFlats[_flatID][AtributesArray[Index]].ActiveItem - 1) {
        // ak je položka predvolená
        $(item).addClass('active');
        $('.active-attribute-image').addClass(AllFlats[_flatID][AtributesArray[Index]].Thumbnails[ActiveItem - 1]); // pridanie classy pre Thumbnail atívneho prvku
      }

      if (AllFlats[_flatID][AtributesArray[Index]].Premium[i] == 'y') {
        // Ak je položka prémiová
        $(item).addClass('premium');
      }

      $('.attr-group').append(item);
    } // Zmena aktívneho prvku (názov, cena, popis + thumbnail)


    $('.attr-item').on('click touchstart', function () {
      console.log($(this).index());
      ActiveItem = $(this).index();
      $('.attr-item').removeClass('active');
      $(this).addClass('active'); // Označenie aktívneho prvku

      AllFlats[_flatID][AtributesArray[Index]].ActiveItem = ActiveItem; // uloženie aktuálne aktívneho prvku do objektu !!!!

      $('.active-attribute-image').attr('class', '').addClass('active-attribute-image').addClass(AllFlats[_flatID][AtributesArray[Index]].Thumbnails[ActiveItem - 1]); // update Thumbnail atívneho prvku

      updateTitle();
      updateDescription();
    });
  });
} // Hotspot Exteriér


function attributeExterier() {
  _flatID = '307';
  attrid = '1';
  addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
  pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
} // Hotspot Interér - Podlaha


function attributeInterierPodlaha() {
  _flatID = '306';
  attrid = '3';
  addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
  pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
} // Hotspot Interiér - Steny


function attributeInterierObklad() {
  _flatID = '306';
  attrid = '4';
  addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
  pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
} // Hotspot Interiér - Kuchyňa


function attributeInterierKuchyna() {
  _flatID = '306';
  attrid = '5';
  addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
  pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
} // Hotspot Interiér - Svetlá


function attributeInterierSvetla() {
  _flatID = '306';
  attrid = '6';
  addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
  pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
} // Hotspot Kúpeľňa - Podlaha


function attributeKupelnaPodlaha() {
  _flatID = '305';
  attrid = '1';
  addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
  pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
} // Hotspot Kúpeľňa - Steny


function attributeKupelnaSteny() {
  _flatID = '305';
  attrid = '2';
  addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
  pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
} // Hotspot Kúpeľňa - Steny


function attributeKupelnaSkrinka() {
  _flatID = '305';
  attrid = '3';
  addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
  pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
} // $('.demoAttr').on('click', function() {
//     _flatID = '307';
//     attrid = '1';
//     addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
//     ShowElement(['.attributes-side']); 
// });
// $('.demoAttr2').on('click', function() {
//     _flatID = '306';
//     attrid = '5';
//     addAttributeDiv(AttributesGroupsDiv, _flatID, attrid, Groups);
//     ShowElement(['.attributes-side']); 
// });