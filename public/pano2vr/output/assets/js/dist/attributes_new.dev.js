"use strict";

var IdsFile = 'assets/data/ids.csv';
var importFile = 'assets/data/import.csv'; // Načítanie súbor s definíciami atribútov

$.ajax({
  type: 'GET',
  url: IdsFile,
  dataType: 'text',
  success: function success(response) {
    console.log('Načítavam CSV súbor "ids.csv"...');
    readIds(response, Ids);
  },
  error: function error() {
    console.log('Chyba pri načítavaní CSV súboru "ids.csv" !');
  }
}); // Inicializácia nového prázdneho objektu

var Ids = {};
var Flats = {};
var start = new Date().getTime(); // Výpočet času trvania importu

function importTime() {
  seconds = (new Date().getTime() - start) / 1000;
  console.log('Import zbehol za ' + seconds + 'sek.');
} // Vytovrenie objektu s hodnotami atribútov


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
  }

  console.log(Ids);
  console.log('CSV súbor "Ids" načítaný korenktne'); // po vytvorení objektu s hodntoami atribútov vytváram objekt s bytmi

  $.ajax({
    type: 'GET',
    url: importFile,
    dataType: 'text',
    success: function success(response) {
      console.log('Načítavam CSV súbor "import.csv"...');
      readFlats(response, Flats);
    },
    error: function error() {
      console.log('Chyba pri načítavaní CSV súboru "import.csv" !');
    }
  });
}

;

function readFlats(response, Flats) {
  var lines = response.split("\n");
  var _flatID = '';
  var _flatAttrID = '';
  var _flatAttrGroup = '';
  var counter = '0';

  for (var i = 1; i < lines.length; i++) {
    // Doplnkový atribút (1,1 ...) - nepovinný parameter, ak nie je zadaný, predvolí sa prvý záznam
    // Zápis záznamov
    var AddItem = function AddItem() {
      // Načítanie ID bytu
      Flats[_flatID][counter] = {
        'id': counter
      }; // Ak nie je zadaný názov skupiny, načítaj ho z Ids

      if (_flatAttrName == '' || _flatAttrName == '\r') {
        Flats[_flatID][counter] = {
          'title': Ids[_flatAttrID]._attrGroupName.sk
        };
      } else {
        Flats[_flatID][counter] = {
          'title': _flatAttrName
        };
      } // Načítanie názvov atribútov


      Flats[_flatID][counter].names = {
        sk: Ids[_flatAttrID]._attrNames.sk,
        en: Ids[_flatAttrID]._attrNames.en
      }; // Načítanie popisov atribútov

      Flats[_flatID][counter].descriptions = {
        sk: Ids[_flatAttrID]._attrDescriptions.sk,
        en: Ids[_flatAttrID]._attrDescriptions.en
      }; // Ak nie sú zadané ceny Atribútov v import.csv, načítaj ich z objektu Ids.

      if (_flatAttrPrices == '' || _flatAttrPrices == '\r') {
        Flats[_flatID][counter].prices = Ids[_flatAttrID]._attrPrices;
      } else {
        Flats[_flatID][counter].prices = _flatAttrPrices.toString().replace('\r', '').split('|');
      } // Načítanie miniatúr atribútov


      Flats[_flatID][counter].thumbnails = Ids[_flatAttrID]._attrThumbnails; //Načítanie zoskupeného produktu

      if (counter == '') {
        Flats[_flatID][counter].grouped = 'n';
      } else {
        Flats[_flatID][counter].grouped = _flatAttrGrouped.toString().replace('\r', '');
      } //Načítanie doplnkového atribútu


      if (counter == '' || counter == '\r') {} else {
        Flats[_flatID][counter].extended = _flatAttrExtended.toString().replace('\r', '');
      } //Načítanie globálnej zmeny atribútov


      if (_flatAttrGlobalChange == '' || _flatAttrGlobalChange == '\r') {
        Flats[_flatID][counter].globalChange = 'n';
      } else {
        Flats[_flatID][counter].globalChange = _flatAttrGlobalChange.toString().replace('\r', '');
      } //Načítanie aktívneho atribútu


      if (_flatAttrActiveItem == '' || _flatAttrActiveItem == '\r') {
        Flats[_flatID][counter].activeItem = "1";
      } else {
        Flats[_flatID][counter].activeItem = _flatAttrActiveItem.toString().replace('\r', '');
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

    counter++;
  }

  console.log(Flats);
  console.log('CSV súbor "import.csv" načítaný korenktne');
  importTime();
}

;