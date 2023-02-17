"use strict";

var IdsFile = 'assets/data/ids.csv';
var importFile = 'assets/data/import.csv';
var Ids = {}; // Inicializácia nového prázdneho objektu pre ID atribútov

var Flats = {}; // Inicializácia nového prázdneho objektu pre byty a ich atribúty

patches = {}; // Inicializácia objektu so všetkými patchmi zo všetkých panorám

patchesNames = [];
activeNode = ''; // Aktívna panoráma

UserData = {};
bytID = ''; // funkcia na vytvorenie objektu s hodnotami atribútov

function readIds(response, Ids) {
  var lines = response.split("\n");

  for (var i = 1; i < lines.length; i++) {
    _attrID = lines[i].split(";")[0]; // ID atribútu

    _attrGroupName_SK = lines[i].split(";")[1]; // Názov skupiny atribútu SK

    _attrGroupName_EN = lines[i].split(";")[2]; // Názov skupiny atribútu EN

    _attrNames_SK = lines[i].split(";")[3]; // Názvy atribútov SK

    _attrNames_EN = lines[i].split(";")[4]; // Názvy atribútov EN

    _attrDescriptions_SK = lines[i].split(";")[5]; // Popisy atribútov SK

    _attrDescriptions_EN = lines[i].split(";")[6]; // Popisy atribútov EN

    _attrPrices = lines[i].split(";")[7]; // Ceny atribútov

    _attrThumbnails = lines[i].split(";")[8]; // Miniatúry atribútov

    _attrPremium = lines[i].split(";")[9]; // Prémiový produkt
    // Kontrola nekorektných vstupov

    if (_attrGroupName_SK !== undefined) {
      _attrGroupName_SK = _attrGroupName_SK;
    }

    if (_attrGroupName_EN !== undefined) {
      _attrGroupName_EN = _attrGroupName_EN;
    }

    if (_attrNames_SK !== undefined) {
      _attrNames_SK = _attrNames_SK.split('|');
    }

    if (_attrNames_EN !== undefined) {
      _attrNames_EN = _attrNames_EN.split('|');
    }

    if (_attrDescriptions_SK !== undefined) {
      _attrDescriptions_SK = _attrDescriptions_SK.split('|');
    }

    if (_attrDescriptions_EN !== undefined) {
      _attrDescriptions_EN = _attrDescriptions_EN.split('|');
    }

    if (_attrPrices !== undefined) {
      _attrPrices = _attrPrices.split('|');
    }

    if (_attrThumbnails !== undefined) {
      _attrThumbnails = _attrThumbnails.split('|');
    }

    if (_attrPremium !== undefined) {
      _attrPremium = _attrPremium.split('|');
    }

    if (_attrID == undefined || _attrID == '') {// fix nekorektných záznamov
    } else {
      // Naplnenie objektu údajmi 
      Ids[_attrID] = {
        'id': _attrID,
        _attrGroupName: {
          sk: _attrGroupName_SK,
          en: _attrGroupName_EN
        },
        _attrNames: {
          sk: _attrNames_SK,
          en: _attrNames_EN
        },
        _attrDescriptions: {
          sk: _attrDescriptions_SK,
          en: _attrDescriptions_EN
        },
        _attrPrices: _attrPrices,
        _attrThumbnails: _attrThumbnails,
        _attrPremium: _attrPremium
      };
    }
  } //console.log('objekt s hodnotami atribútov vytvorený...');         
  //console.log(Ids);         

}

; // funkcia na vytvorenie objektu s bytmi a ich atribútmi

function readFlats(response, Flats) {
  var lines = response.split("\n");
  var _flatID = '';
  var _flatAttrID = '';
  var _flatAttrGroup = '';

  for (var i = 1; i < lines.length; i++) {
    // Doplnkový atribút (1,1 ...) - nepovinný parameter, ak nie je zadaný, predvolí sa prvý záznam
    // Zápis záznamov
    var AddItem = function AddItem() {
      // Načítanie ID bytu
      Flats[_flatID][_flatAttrID] = {
        'id': _flatAttrID
      }; // Ak nie je zadaný názov skupiny, načítaj ho z Ids

      if (_flatAttrName == '' || _flatAttrName == '\r') {
        Flats[_flatID][_flatAttrID] = {
          'title': Ids[_flatAttrID]._attrGroupName.sk
        };
      } else {
        Flats[_flatID][_flatAttrID] = {
          'title': _flatAttrName
        };
      } // Načítanie názvov atribútov


      Flats[_flatID][_flatAttrID].names = {
        sk: Ids[_flatAttrID]._attrNames.sk,
        en: Ids[_flatAttrID]._attrNames.en
      }; // Načítanie popisov atribútov

      Flats[_flatID][_flatAttrID].descriptions = {
        sk: Ids[_flatAttrID]._attrDescriptions.sk,
        en: Ids[_flatAttrID]._attrDescriptions.en
      }; // Ak nie sú zadané ceny Atribútov v import.csv, načítaj ich z objektu Ids.

      if (_flatAttrPrices == '' || _flatAttrPrices == '\r') {
        Flats[_flatID][_flatAttrID].prices = Ids[_flatAttrID]._attrPrices;
      } else {
        Flats[_flatID][_flatAttrID].prices = _flatAttrPrices.toString().replace('\r', '').split('|');
      } // Načítanie miniatúr atribútov


      Flats[_flatID][_flatAttrID].thumbnails = Ids[_flatAttrID]._attrThumbnails; //Načítanie zoskupeného produktu

      if (_flatAttrGrouped == '') {
        Flats[_flatID][_flatAttrID].grouped = 'n';
      } else {
        Flats[_flatID][_flatAttrID].grouped = _flatAttrGrouped.toString().replace('\r', '');
      } //Načítanie doplnkového atribútu


      if (_flatAttrExtended == '' || _flatAttrExtended == '\r') {} else {
        Flats[_flatID][_flatAttrID].extended = _flatAttrExtended.toString().replace('\r', '');
      } //Načítanie globálnej zmeny atribútov


      if (_flatAttrGlobalChange == '' || _flatAttrGlobalChange == '\r') {
        Flats[_flatID][_flatAttrID].globalChange = 'n';
      } else {
        Flats[_flatID][_flatAttrID].globalChange = _flatAttrGlobalChange.toString().replace('\r', '');
      } //Načítanie aktívneho atribútu


      if (_flatAttrActiveItem == '' || _flatAttrActiveItem == '\r') {
        Flats[_flatID][_flatAttrID].activeItem = 0;
      } else {
        Flats[_flatID][_flatAttrID].activeItem = _flatAttrActiveItem.toString().replace('\r', '');
      }
    };

    _flatID = lines[i].split(";")[0]; // ID Bytu

    _flatAttrID = lines[i].split(";")[1]; // ID atribútu

    _flatAttrName = lines[i].split(";")[2]; // Názov atribútu

    _flatAttrPrices = lines[i].split(";")[3]; // Ceny atribútu - nepovinný parameter, ak nie je zadaný, načíta sa z objektu Ids

    _flatAttrGrouped = lines[i].split(";")[4]; // Zoskupený atribút (Y|N) - nepovinný parameter, ak nie je zadaný, zapíše sa N

    _flatAttrExtended = lines[i].split(";")[5]; // Doplnkový atribút (Y|N) - nepovinný parameter, ak nie je zadaný, zapíše sa N

    _flatAttrGlobalChange = lines[i].split(";")[6]; // Globálna zmena (1,2 ...) - nepovinný parameter

    _flatAttrActiveItem = lines[i].split(";")[7];

    if (_flatID == '') {} //ak byt existuje, zapíše do neho hodnoty
    else if (_flatID in Flats) {
        AddItem();
      } // Ak byt ešte neexistuje, vytvorí nový objekt a potom do neho zapíše hodnoty
      else {
          Flats[_flatID] = {};
          AddItem();
        }
  }

  console.log('Byty načítané');
  console.log(Flats);
}

;

function nacitajId() {
  // Načítanie súbor s definíciami atribútov
  $.ajax({
    type: 'GET',
    url: IdsFile,
    dataType: 'text',
    success: function importIds(response) {
      //console.log('Načítavam 1. CSV súbor "ids.csv"...');
      readIds(response, Ids);
    },
    error: function error() {
      console.log('Chyba pri načítavaní CSV súboru "ids.csv" !');
    },
    complete: function complete() {
      //console.log('1. CSV súbor načítaný korektne - Atribúty OK.');
      nacitajByty();
    }
  });
}

function nacitajByty() {
  $.ajax({
    type: 'GET',
    url: importFile,
    dataType: 'text',
    success: function success(response) {
      // console.log('Načítavam 2. CSV súbor "import.csv"...');
      readFlats(response, Flats);
    },
    error: function error() {
      console.log('Chyba pri načítavaní CSV súboru "import.csv" !');
    },
    complete: function complete() {//console.log('2. CSV súbor načítaný korektne - BYTY OK.');
      //console.log(Flats[bytID]);
    }
  });
}

function najdiAktualnyByt() {
  UserData = pano.getNodeUserdata(pano.getCurrentNode());
  bytID = UserData.copyright; // zistenie ID bytu
  //console.log('Aktuálny byt je '+bytID);
}

;

function UpdateCurrentPatches() {
  najdiAktualnyByt();
  activeNode = pano.getCurrentNode(); // Zistenie aktuálnej panorámy

  pocetPatchov = patches[activeNode].length; // načítanie počtu patchov pre aktuálnu panorámu

  if (pocetPatchov > 0) {
    for (i = 0; i < pocetPatchov; i++) {
      // skrytie všetkých patchov, ktoré prislúchajú k aktuálnej panoráme
      hideMedia(patches[activeNode][i]);
    }
  } else {
    console.log('nemôžem aktualizovať patche ... ');
    odstranIntro();
  }

  patchesNames = []; // prečistenie poľa

  if (pocetPatchov > 0 && Flats[bytID] != undefined) {
    for (i = 0; i < pocetPatchov; i++) {
      if (jQuery.inArray(patches[activeNode][i].split('_')[0], patchesNames) !== -1) {} else {
        patchesNames.push(patches[activeNode][i].split('_')[0]);
      }
    }

    for (i = 0; i < patchesNames.length; i++) {
      //console.log(Flats[bytID]);
      aTitle = patchesNames[i];
      aItem = Flats[bytID][patchesNames[i]].activeItem;
      patchName = aTitle + '_' + aItem;
      showMedia(patchName);
    } //console.log('Patche zaktualizované ... ');


    odstranIntro();
  } else {
    console.log('nemôžem aktualizovať patche ... '); // console.log(Flats);
    // console.log(bytID);
    // console.log(Flats[bytID]);
    //odstranIntro();
  }
}

introPrvyKrat = 0;

function odstranIntro() {
  if (introPrvyKrat == 0) {
    // console.log('Začínam odstraňovať intro ...');
    setTimeout(function () {
      // Úvodná Animácia 
      $('.intro-screen').removeClass('anim');
      setTimeout(function () {
        $('.intro-screen').remove();
        $('.hts').removeClass('hidden');
      }, 1800); // číslo zhodné s nastaveniami v Mixins
    }, 1500);
    removeIntro(); //console.log('Intro odstránené ...');

    introPrvyKrat++;
  } else {}
}

pano.on('configloaded', function () {
  nacitajId(); // načítanie ID atribútov a následne načítanie bytov

  $.ajax({
    url: 'pano.xml',
    // URL k vygenerovanému XML - Pano2VR
    dataType: 'xml',
    success: function success(data) {
      var xml_node = $('tour', data);
      var tmpArray = {};
      $.each(xml_node.find('panorama'), function () {
        nodeID = $(this)[0].id; // Uloženie ID panorámy

        var Nodes = $(this).find('panorama>media>image');
        tmpArray[nodeID] = Nodes;
        patches[nodeID] = []; // Uloženie ID patchov

        $.each(tmpArray[nodeID], function (index) {
          patches[nodeID].push(tmpArray[nodeID][index].id);
        });
      });
      console.log('Načítavam patche zo XML');
      UpdateCurrentPatches();
      odstranIntro();
      pano.on("changenode", function zmenaPanoramy() {
        UpdateCurrentPatches();
      });
      $.getScript('assets/js/basket.js');
    },
    error: function error(data) {
      console.log('Error loading XML data');
    },
    complete: function complete(data) {//console.log('Skončil som ajaxové načítavanie pano.xml');
      //UpdateCurrentPatches();
      //odstranIntro();
      // pano.on("changenode", function zmenaPanoramy() {
      //     UpdateCurrentPatches();
      // });
      // $.getScript('assets/js/basket.js');
    }
  });
});
var targetAttr = '';
pano.addListener('varchanged_targetAttr', function () {
  alert('changed');
}); // Akcie pri zmene hodnoty premennej attributes side

pano.addListener('varchanged_attributes_side', function () {
  switch (pano.getVariableValue('attributes_side')) {
    case true:
      najdiAktualnyByt();
      position = $('.attributes-side').outerHeight() - 258;
      $('.full-active-attribute-image.side').css('bottom', position);
      HideElement(['.layers-side', '.map-side']);
      ShowElement(['.attributes-side']);
      variableFalse(['footer_map', 'footer_layers', 'footer_apartments', 'footer_apartments']); // $('.left-side > .item').removeClass('active'); 

      variableFalse(['shortcuts']);
      $('.attributes-groups > .group').text(Flats[bytID][targetAttr].title);
      $('.attr-group').empty();
      $('.attr-group').empty().append('<div class="active-attribute-image item"></div>'); // Thumbnail akvívneho atribútu

      for (i = 0; i < Flats[bytID][targetAttr].thumbnails.length; i++) {
        var item = document.createElement('div');
        $(item).addClass('item').addClass('attr-item').addClass(Flats[bytID][targetAttr].thumbnails[i]);
        activeDiv = Flats[bytID][targetAttr].activeItem; // zistenie aktuálnej hodnoty aktívna položka

        if (i == Flats[bytID][targetAttr].activeItem) {
          // ak je položka predvolená
          $(item).addClass('active');
          $('.active-attribute-image').addClass(Flats[bytID][targetAttr].thumbnails[activeDiv]); // pridanie classy pre Thumbnail atívneho prvku
        }

        $('.attr-group').append(item);
      }

      activeItem = Flats[bytID][targetAttr].activeItem;
      $('.active-attribute-image').attr('class', '').addClass('active-attribute-image').addClass(Flats[bytID][targetAttr].thumbnails[activeItem]); // update Thumbnail atívneho prvku

      $('.attribute-title > div').empty().append(Flats[bytID][targetAttr].names.sk[activeItem] + '<span>' + Flats[bytID][targetAttr].prices[activeItem] + ' €</span>'); // update Názov a cena aktívneho prvku 

      $('.attribute-description > div').empty().append(Flats[bytID][targetAttr].descriptions.sk[activeItem]); // update popisu aktívneho prvku 

      $('.attr-item').on('click touchstart', function () {
        activeItem = $(this).index() - 1;
        $('.attr-item').removeClass('active');
        $(this).addClass('active'); // Označenie aktívneho prvku

        Flats[bytID][targetAttr].activeItem = activeItem; // uloženie aktuálne aktívneho prvku do objektu !!!!

        $('.active-attribute-image').attr('class', '').addClass('active-attribute-image').addClass(Flats[bytID][targetAttr].thumbnails[activeItem]); // update Thumbnail atívneho prvku

        $('.attribute-title > div').empty().append(Flats[bytID][targetAttr].names.sk[activeItem] + '<span>' + Flats[bytID][targetAttr].prices[activeItem] + ' €</span>'); // update Názov a cena aktívneho prvku 

        $('.attribute-description > div').empty().append(Flats[bytID][targetAttr].descriptions.sk[activeItem]); // update popisu aktívneho prvku 

        UpdateCurrentPatches();
      }); //ShowMore();

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