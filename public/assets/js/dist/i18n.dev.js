"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 *  I18n.js
 *  =======
 *
 *  Simple localization util.
 *  1. Store your localized labels in json format: `localized-content.json`
 *  2. Write your markup with key references using `data-i18n` attributes.
 *  3. Explicitly invoke a traverse key resolver: `i18n.localize()`
 *     OR
 *     Change the language, and the contents will be refreshed: `i18n.lang('en')`
 *
 *  This util relies on jQuery to work. I would recommend using the latest version
 *  available (1.12.x or 2.1.4+), although this will probably run with any older
 *  version since it is only taking advantage of `$.getJSON()` and the jQuery
 *  selector function `$()`.
 * 
 *  © 2016 Diogo Simões - diogosimoes.com
 *
 */
var demoJson = {
  "woow": {
    "language": {
      "sk": "SK",
      "cz": "CZ",
      "en": "EN"
    },
    "intro-title": {
      "sk": "Virtuálny showroom",
      "cz": "Virtuální showroom",
      "en": "Virtual showroom"
    },
    "intro-submit": {
      "sk": "ŠTART",
      "cz": "START",
      "en": "ENTER"
    },
    "intro-password": {
      "sk": "Heslo",
      "cz": "Heslo",
      "en": "Password"
    },
    "intro-password-placeholder": {
      "sk": "zadajte heslo",
      "cz": "zadejte heslo",
      "en": "write password"
    },
    "autotour": {
      "sk": "Auto prehrávanie",
      "cz": "Auto přehrávaní",
      "en": "Automatic Tour"
    },
    "form": {
      "password": {
        "sk": "zadajte heslo",
        "cz": "zadejte heslo",
        "en": "type password"
      },
      "submit": {
        "sk": "ŠTART",
        "cz": "START",
        "en": "START"
      }
    },
    "cart": {
      "name": {
        "sk": "Meno",
        "cz": "Jméno",
        "en": "Name"
      },
      "name-placeholder": {
        "sk": "Vaše meno",
        "cz": "Vaše jméno",
        "en": "Your name"
      },
      "email": {
        "sk": "Email",
        "cz": "Email",
        "en": "Email"
      },
      "email-placeholder": {
        "sk": "Váš email",
        "cz": "Váš email",
        "en": "Your email"
      },
      "lname": {
        "sk": "Priezvisko",
        "cz": "Příjmení",
        "en": "Last name"
      },
      "lname-placeholder": {
        "sk": "Vaše priezvisko",
        "cz": "Vaše příjmení",
        "en": "Your lastname"
      },
      "telephone": {
        "sk": "Telefón",
        "cz": "Telefón",
        "en": "Telephone"
      },
      "telephone-placeholder": {
        "sk": "Váš telefón",
        "cz": "Váš telefón",
        "en": "Your telephone"
      },
      "city": {
        "sk": "Lokalita",
        "cz": "Město",
        "en": "City"
      },
      "city-placeholder": {
        "sk": "Vaša lokalita",
        "cz": "Vaše město",
        "en": "Your city"
      },
      "zip": {
        "sk": "PSČ",
        "cz": "PSČ",
        "en": "ZIP"
      },
      "zip-placeholder": {
        "sk": "Vaše PSČ",
        "cz": "Vaše PSČ",
        "en": "Your ZIP"
      },
      "state": {
        "sk": "Štát",
        "cz": "Stát",
        "en": "State"
      },
      "state-placeholder": {
        "sk": "Váš štát",
        "cz": "Váš stát",
        "en": "Your state"
      },
      "subject": {
        "sk": "Vaša správa",
        "cz": "Vaše zpráva",
        "en": "Your message"
      },
      "subject-placeholder": {
        "sk": "Sem napíšte Vašu správu",
        "cz": "Zde napište Vaši zprávu",
        "en": "Type your message"
      },
      "required-fileds": {
        "sk": "Povinné polia sú označené *",
        "cz": "Povinná pole jsou označena *",
        "en": "Required fields are marked *"
      },
      "submit": {
        "sk": "ODOSLAŤ",
        "cz": "ODOSLAT",
        "en": "SEND MESSAGE"
      }
    },
    "tour-title": {
      "sk": "Virtuálny showroom",
      "cz": "Virtuální showroom",
      "en": "Virtual showroom"
    },
    "layer-main": {
      "sk": "Plný pohľad",
      "cz": "Plný pohled",
      "en": "Main view"
    },
    "layer-pure": {
      "sk": "Konštrukcia",
      "cz": "Konstrukce",
      "en": "Construction"
    },
    "settings": {
      "sk": "Nastavenia",
      "cz": "Nastavení",
      "en": "Settings"
    },
    "autorotate": {
      "sk": "Autootáčanie",
      "cz": "Autootáčení",
      "en": "Autorotate"
    },
    "hotspots": {
      "sk": "Hotspoty",
      "cz": "Hotspoty",
      "en": "Hotspots"
    },
    "gyroscope": {
      "sk": "Gyroskop",
      "cz": "Gyroskop",
      "en": "Gyroscope"
    },
    "advert": {
      "sk": "Reklamy",
      "cz": "Reklamy",
      "en": "Advertisement"
    },
    "resolution": {
      "sk": "Rozlíšenie",
      "cz": "Rozlíšení",
      "en": "Resolution"
    },
    "resolution-lq": {
      "sk": "HD",
      "cz": "HD",
      "en": "LQ"
    },
    "resolution-hq": {
      "sk": "FULL HD",
      "cz": "FULL HD",
      "en": "HQ"
    },
    "floorplan-title": {
      "sk": "KOMA SK",
      "cz": "KOMA CZ",
      "en": "KOMA EN"
    },
    "layers-title": {
      "sk": "Vrstvy",
      "cz": "Vrstvy CZ",
      "en": "Layers"
    },
    "map": {
      "sk": "Mapa",
      "cz": "Mapa",
      "en": "Map"
    },
    "attributtes-title": {
      "sk": "Atribúty",
      "cz": "Atributy",
      "en": "Attributes"
    },
    "contact-form-title": {
      "sk": "Kontaktný formulár",
      "cz": "Kontaktní formulář",
      "en": "Contact form"
    },
    "np-exterier": {
      "sk": "Exterér",
      "cz": "Exteriér",
      "en": "Exterior"
    },
    "np-interier": {
      "sk": "Interiér",
      "cz": "Interiér",
      "en": "Interior"
    },
    "np": {
      "sk": "Interiér",
      "cz": "Interiér",
      "en": "Interior"
    },
    "np-kupelna": {
      "sk": "Kúpeľňa",
      "cz": "Koupelna",
      "en": "Bathroom"
    },
    "video-close": {
      "sk": "Zatvoriť",
      "cz": "Zavřit",
      "en": "Close"
    },
    "basket-tootlip": {
      "sk": "Lorem ipsum SK",
      "cz": "Lorem ipsum CZ",
      "en": "Lorem ipsum EN"
    },
    "basket-tootlip-vr": {
      "sk": "Funkcionalita už čoskoro",
      "cz": "Funkcionalita zanedlho",
      "en": "Functionality coming soon"
    },
    "attrA": {
      "sk": "Limec",
      "cz": "Rám",
      "en": "Frame"
    },
    "attrB": {
      "sk": "Výplň",
      "cz": "Výplň",
      "en": "Filling"
    },
    "attrC": {
      "sk": "Obklad",
      "cz": "Obklad",
      "en": "Tilling"
    },
    "attrD": {
      "sk": "Podlaha",
      "cz": "Podlaha",
      "en": "Floor"
    },
    "attrE": {
      "sk": "Kuchyňa",
      "cz": "Kuchyň",
      "en": "Kitchen"
    },
    "attrF": {
      "sk": "Svetlá",
      "cz": "Světla",
      "en": "Lights"
    },
    "attrG": {
      "sk": "Obklad",
      "cz": "Obklad",
      "en": "Tilling"
    },
    "attrH": {
      "sk": "Podlaha",
      "cz": "Podlaha",
      "en": "Floor"
    },
    "attrI": {
      "sk": "Skrinka",
      "cz": "Skříň",
      "en": "Box"
    },
    "h-vr": {
      "sk": "VR mód",
      "cz": "VR mod",
      "en": "VR mode"
    },
    "h-share": {
      "sk": "Zdieľať",
      "cz": "Sdílet",
      "en": "Share"
    },
    "h-layers": {
      "sk": "Vrstvy",
      "cz": "Vrstvy",
      "en": "Layers"
    },
    "h-cart": {
      "sk": "Košík",
      "cz": "Košík",
      "en": "Basket"
    },
    "h-map": {
      "sk": "Mapa",
      "cz": "Mapa",
      "en": "Map"
    },
    "h-floorplan": {
      "sk": "Pôdorys",
      "cz": "Půdorys",
      "en": "Floorplan"
    },
    "h-guide": {
      "sk": "Virtuálny sprievodca",
      "cz": "Virtuální prúvodce",
      "en": "Virtual guide"
    },
    "h-chatbot": {
      "sk": "Chatbot",
      "cz": "Chatbot",
      "en": "Chatbot"
    },
    "h-attributes": {
      "sk": "Atribúty",
      "cz": "Atribúty",
      "en": "Attributes"
    },
    "h-model": {
      "sk": "3D model",
      "cz": "3D model",
      "en": "3D model"
    },
    "h-video-panel": {
      "sk": "Video panel",
      "cz": "Video panel",
      "en": "Video panel"
    },
    "h-local-video": {
      "sk": "Lokálne video",
      "cz": "Lokální video",
      "en": "Local video"
    },
    "h-info-panel": {
      "sk": "Info panel",
      "cz": "Info panel",
      "en": "Info panel"
    },
    "h-tag": {
      "sk": "Produkt",
      "cz": "Produkt",
      "en": "Product"
    },
    "h-shortcuts": {
      "sk": "Okno s panorámami",
      "cz": "Okno s panorámami",
      "en": "Shortcuts"
    }
  }
};
(function () {
  this.I18n = function (defaultLang) {
    var lang = defaultLang || 'en';
    this.language = lang;

    (function (i18n) {
      i18n.contents = demoJson;

      i18n.contents.prop = function (key) {
        var result = this;
        var keyArr = key.split('.');

        for (var index = 0; index < keyArr.length; index++) {
          var prop = keyArr[index];
          result = result[prop];
        }

        return result;
      };

      i18n.localize();
    })(this);
  };

  this.I18n.prototype.hasCachedContents = function () {
    return this.contents !== undefined;
  };

  this.I18n.prototype.lang = function (lang) {
    if (typeof lang === 'string') {
      this.language = lang;
    }

    this.localize();
    return this.language;
  };

  this.I18n.prototype.localize = function () {
    var contents = this.contents;

    if (!this.hasCachedContents()) {
      return;
    }

    var dfs = function dfs(node, keys, results) {
      var isLeaf = function isLeaf(node) {
        for (var prop in node) {
          if (node.hasOwnProperty(prop)) {
            if (typeof node[prop] === 'string') {
              return true;
            }
          }
        }
      };

      for (var prop in node) {
        if (node.hasOwnProperty(prop) && _typeof(node[prop]) === 'object') {
          var myKey = keys.slice();
          myKey.push(prop);

          if (isLeaf(node[prop])) {
            //results.push(myKey.reduce((prev, current) => prev + '.' + current));	//not supported in older mobile broweser
            results.push(myKey.reduce(function (previousValue, currentValue, currentIndex, array) {
              return previousValue + '.' + currentValue;
            }));
          } else {
            dfs(node[prop], myKey, results);
          }
        }
      }

      return results;
    };

    var keys = dfs(contents, [], []);

    for (var index = 0; index < keys.length; index++) {
      var key = keys[index];

      if (contents.prop(key).hasOwnProperty(this.language)) {
        $('[data-i18n="' + key + '"]').text(contents.prop(key)[this.language]);
        $('[data-i18n-placeholder="' + key + '"]').attr('placeholder', contents.prop(key)[this.language]);
        $('[data-i18n-value="' + key + '"]').attr('value', contents.prop(key)[this.language]);
      } else {
        $('[data-i18n="' + key + '"]').text(contents.prop(key)['en']);
        $('[data-i18n-placeholder="' + key + '"]').attr('placeholder', contents.prop(key)['en']);
        $('[data-i18n-value="' + key + '"]').attr('value', contents.prop(key)['en']);
      }
    }
  };
}).apply(window);
$(document).ready(function () {
  var i18n = new I18n();
  i18n.localize(); //$('.lang-picker #english').addClass('selected');

  $('#sk').on('click touchstart', function () {
    i18n.lang('sk'); //selectLang($(this));
  });
  $('#intro-sk').on('click touchstart', function () {
    i18n.lang('sk'); //selectLang($(this));
  });
  $('#cz').on('click touchstart', function () {
    i18n.lang('cz'); //selectLang($(this));
  });
  $('#intro-cz').on('click touchstart', function () {
    i18n.lang('cz'); //selectLang($(this));
  });
  $('#en').on('click touchstart', function () {
    i18n.lang('en'); //selectLang($(this));
  });
  $('#intro-en').on('click touchstart', function () {
    i18n.lang('en'); //selectLang($(this));
  });
});