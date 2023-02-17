"use strict";

$('#intro > p').text('loading configuration');
pano.on("tilesready", function () {// $('#intro > p').text('loading panoramas');
}); // global variables

var productData = {};
var productDataNew = {};
var housesData = {};
var productUrl = '';
var housesUrl = '';
var currentNode = '';
var ToolTips = [];
var lang = '';
var videoDuration = 0;
var videoDurationHalf = 0;
var play = true;
var tmpID;
var dataModelUpdating = false;
var vid;
var patchName;
var houseID = '';
var loader = '<div id="progress"><img src="images/loader.svg" class="hotspot-loader"><p class="status">načítavam ... </p></div>';
var allVideos = ['Exterier_01', 'Exterier_02', 'Exterier_03', 'Exterier_04', 'Exterier_05', 'Exterier_06', 'Exterier_07', 'Exterier_08', 'Exterier_09', 'Exterier_10', 'Exterier_11', 'Exterier_12', 'Exterier_13', 'Interier_01', 'Interier_02', 'Interier_03', 'Interier_04', 'Interier_05', 'Interier_06', 'Interier_07', 'Interier_08', 'Interier_09', 'Interier_11', 'Interier_12', 'Interier_13'];
var productNameSave = '';
var moreInfoButton = {
  cz: 'Více info',
  sk: 'Viac info',
  uk: 'More info'
};
var productLang = '';
var noData = 'No data in API';
var map_iframe = {
  "int": 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sen!2sen',
  en: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sen!2sen',
  de: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
  at: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
  ch: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
  sk: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1ssk!2ssk'
};
var apiToken = {
  cz: 'ZsqPYpxsPHK3EpNwK6l7nOOyoTHIrw21Aw2pAh10BfV3mSl8he06rz1IsJNA',
  sk: 'uuPus1j6IOdtp9p5EKzpusgd2TlXMuDK7C33qC8yof4IvMNCyzIPQEV9dfSI',
  at: 'EJVpr39eQqgZ3CtFudtsOA3QurptILYv6aLjQvOh9DX8VoAvNrRthOJyBXAu',
  de: 'bF6JRVySe9U1xOMWi2Kc8I5pzzgZcjT9LG0F1PrmDkOPHI9nKUBv5It3bjlY',
  hr: 'KdZMZzWIYcj4AVjJ3VK6WvV2zCCQfx5jzDqgXk1A1Er013JaTbqlSuDLPcTZ',
  rs: 'FEVesKJGbx1bEm9hsXijIZwV9E332FtvbFA01YxtKjEi1Sw3AMdT6Gp1uFMk',
  si: 'izOhuLDDFGmEeOTxj3s3x31ZTjgI4Ck5zfqK3X5cAlpgPW5piIxtGwtdX2ZH',
  ba: 'Sjuab7GbAKhg6XNFGkQgLJEJXAxQ6Omwru89ErJ48AfX5uvncjpyjdx4K9xY',
  "int": 'AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0',
  ua: 'COyMGTwBy8YgEyZanLTWyTuaoGbDpTOB13BNAHAqDNLgU7PzbGouJKYcfZIo',
  fr: 'e2AwJInW59w310Ve0DUEBRLL1Je8eqkf4BTTHwtCbz2YIwjXS20TaMpPHdum',
  es: 'k2Mb4GufP8ED3B5wRQelPHY9NimPax2VDd8utmZKLNYc3IwdGuCiZRwe7fvF',
  cn: 'Wf4qqUqX5qoPSvT0EzQezjt2ieaIIOUTNSmHT9VPwCDbJ1tqgmN5E32RuOSz',
  gr: 'DADpDgerXpQ2QchZMpjN6Rsrx4q1s7m9r1AW4hcpWi2bH9DBfP2j998gJgKl',
  hu: 'zG3XR4VrL5ZWh7rQlCydbGd0ysYmCziX0VOhyhEx7A3xmE9fysWf9uYhrRQR',
  tr: 'RxX7fNvn9yiRmB3iGZtDYyyiMTA9nUmqXZg7dCoXP55XnOyvXJKEjr12iuhe',
  ro: 'mrsKaiGNc28HA49VDcZjEnof8uvjJBa4pd45M6McUq0wR8T6gYWCDgsAy3i9',
  uk: 'xF8BmqraDqPNxx4LfcepYpqGde0oPbu7kRtARznJxxFTiD1PukPbcdZl9cPg',
  it: 'UYgEsu0OxQv8zkgPnOiVLh0TTGD0aiYe2GVog2o7ithQ8fadPYRr40GNOxDY',
  pl: '4vtMautl3wPGnzZLogvUE6x7tZkweWzo7vQBXJCVjZbtjxigxue33NRCahrR',
  lv: 'UBP0CW3yVvzlw24fmTgFrXIya84dV4rEQIjaCJT4G35BdMRbiVvIYdVb4cSQ',
  ru: 'llN4GmBb0uWIQlr9lyfaF7qR7DmDs733Fp8wkiJs0sduzwoEG9NBvqYpSONe',
  by: 'xARlEVKEW4lpeuyGt8Hb8LnY63P9SjMopyEKlemGSOTzsGZ1MD6wIZvCGBs0',
  bg: 'cEyeSbL3VQDR9kLRUCWuHIqOT5ID59T05VVbNNbkm0bylEylgIfsDBvpAgqJ',
  lt: 'jgqtiedWmx17W0csUqPuaYNf1JqOCAytsdec8k739pljn83OEBft2vixQ9jn',
  ee: '7c0WUsKukTHuIw2rix2E7eRfn9wVSrd89hwNJLgtBz4JfHUh2UPclt4bQvZI',
  mk: 'JhFW6xr1bV0HjEhyCv4pIvK3X9ZMPsa25YaNkjlAPQL2izaZwvaWMNagpO00',
  beNl: 'cqElSqSIpHckBG14OZAxTIzUlA4i2lIHaFzMNVYgTW5zfOeyk6FiMIWU1FtP',
  ch: 'PoCX0p3qavOP4RL8Ke7ZiGUhidi6iT69zZ7QHNo8OOiatgjdES4iDXqeEz9p',
  md: 'M3Amm8ZznQ3BoROYdKeq2iEtwSjPoFc9Egf4wV8JerAMnkQvbzakElhNHCIS',
  beFr: 'M73nHM2cKlyK8WRkmNjGHhhEtgpq5xrvBcwgxrpXCZLoEFyiiLhxaeRTpdt2'
};
var productSuffix = {
  cz: 'BCZ',
  sk: 'BSK',
  at: 'BAT',
  de: 'BDE',
  hr: 'BHR',
  rs: 'BRS',
  si: 'BSI',
  ba: 'BBA',
  "int": 'INT',
  ua: 'BUA',
  fr: 'BFR',
  es: 'BES',
  cn: 'BCN',
  gr: 'BGR',
  hu: 'BHU',
  tr: 'BTR',
  ro: 'BRO',
  uk: 'BUK',
  it: 'BIT',
  pl: 'BPL',
  lv: 'BLV',
  ru: 'BRU',
  by: 'BBY',
  bg: 'BBG',
  lt: 'BLT',
  ee: 'BEE',
  mk: 'BMK',
  beNl: 'BBE',
  ch: 'BCH',
  md: 'BRO',
  beFr: 'BBE'
};
var urlPrefix = {
  en: 'https://baumit.co.uk',
  sk: 'https://baumit.sk',
  cz: 'https://baumit.cz',
  at: 'https://baumit.at',
  de: 'https://baumit.de',
  hr: 'https://baumit.hr',
  rs: 'https://baumit.rs',
  si: 'https://baumit.si',
  ba: 'https://baumit.ba',
  ua: 'https://baumit.ua',
  fr: 'https://baumit.fr',
  es: 'https://baumit.es',
  cn: 'https://baumit.cn',
  gr: 'https://baumit.gr',
  hu: 'https://baumit.hu',
  tr: 'https://baumit.com.tr',
  ro: 'https://baumit.ro',
  uk: 'https://baumit.co.uk',
  it: 'https://baumit.it',
  pl: 'https://baumit.pl',
  lv: 'https://baumit.lv',
  ru: 'https://baumit.ru',
  by: 'https://baumit.by',
  bg: 'https://baumit.bg',
  lt: 'https://baumit.lt',
  ee: 'https://baumit.ee',
  mk: 'https://baumit.mk',
  nl: 'https://baumit.nl',
  ch: 'https://baumit.ch',
  md: 'https://baumit.md',
  beNl: 'https://baumit.be',
  beFr: 'https://fr.baumit.be',
  "int": 'https://int.baumit.com'
};

function getProductLink(lang) {
  productUrl = urlPrefix[lang] + '/api/products/products?api_token=' + apiToken[lang]; ////console.log(productUrl);

  return productUrl;
}

function getHousesLink(lang) {
  housesUrl = urlPrefix[lang] + '/api/buildings?api_token=' + apiToken[lang]; ////console.log(housesUrl);

  return housesUrl;
}

function addLoader(text) {
  if ($('#progress').length < 1) {
    $('#container').append(loader);
    $('p.status').text(text);
  } else {
    $('p.status').text(text);
  }
}

function loadProductData_backup(productUrl, lang) {
  addLoader('loading products data');

  if (productData[lang] == undefined || productData[lang] == null || productData[lang] == '') {
    productData[lang] = {};
    var searchID = 'pro_epim_productnr';
    var tmpProductsData = $.getJSON(productUrl, function (products) {
      $.each(products, function (key, val) {
        var tmpID = products[key][searchID]; ////console.log(val);

        productData[lang][tmpID] = val;
      });
    }).done(function () {
      ////console.log('Products loaded successfull');
      getHousesLink(lang);
      loadHousesData(housesUrl, lang);
    }).fail(function () {////console.log( "Products loading error" );
    });
  } else {
    ////console.log('dátový model už je načítaný');
    checkHotspots();
    loadIntroData();
  } //console.log(productData);

}

function loadProductData(housesUrl, lang) {
  addLoader('loading products data');

  if (productData[lang] == undefined || productData[lang] == null || productData[lang] == '') {
    productData[lang] = {};
    var searchID = 'pro_epim_productnr';
    var tmpProductsDataNew = $.getJSON(housesUrl, function (products) {
      $.each(products, function (index, val) {
        if (index == 'buildings') {
          $.each(val, function (i, data) {
            if (data['layers'] != null) {
              $.each(data['layers'], function (count, values) {
                var pro_epim_productnr = values['products']['pro_epim_productnr'];

                if (productData[lang][pro_epim_productnr] == null || productData[lang][pro_epim_productnr] == 'undefined') {
                  productData[lang][pro_epim_productnr] = {};
                }

                productData[lang][pro_epim_productnr]['id'] = values['products']['pro_epim_productnr'];
                productData[lang][pro_epim_productnr]['name'] = values['products']['name'];
                productData[lang][pro_epim_productnr]['details_url'] = values['products']['details_url'];
                productData[lang][pro_epim_productnr]['description'] = values['products']['description'];
                productData[lang][pro_epim_productnr]['image'] = values['products']['image'];

                for (var _index = 0; _index < 10; _index++) {
                  if (values['products']['product_benefit_' + _index]) {
                    productData[lang][pro_epim_productnr]['product_benefit_' + _index] = values['products']['product_benefit_' + _index];
                  }
                }
              });
            }

            ;
          });
        }
      });
    }).done(function () {
      //console.log('Produkty načítané v poriadku');
      getHousesLink(lang);
      loadHousesData(housesUrl, lang);
    }).fail(function () {//console.log( "Chyba pri načítavaní produktov" );
    });
  } else {
    //console.log('dátový model už je načítaný');
    checkHotspots();
    loadIntroData();
  } //console.log(productData);

}

;

function change_floorplan_node_title($housesData, $lang) {
  if ($housesData[$lang]) {
    $.each($('.ggskin_cloner > div'), function () {
      //console.log($(this).find('div > div > p').html());
      switch ($(this).index()) {
        case 0:
          break;

        default:
          $(this).find('div > div > p').html($housesData[$lang]['buildings'][$(this).index() - 1].house_nr);
          break;
      }
    });
  }
}

function loadHousesData(housesUrl, lang) {
  addLoader('loading houses data');

  if (housesData[lang] == undefined || housesData[lang] == null || housesData[lang] == '') {
    housesData[lang] = {};
    var tmpHousesData = $.getJSON(housesUrl, function (data) {
      $.each(data, function (key, val) {
        if (key == 'buildings') {
          housesData[lang]['buildings'] = val;
        } else if (key == 'additional_content') {
          housesData[lang]['additional_content'] = val;
        }
      });
    }).done(function () {
      ////console.log('Houses loaded successfull');
      changePanoTitle(lang, housesData);
      checkHotspots();
      loadIntroData();
      $.each($('.swiper-slide'), function () {
        //console.log($(this).html());
        //console.log(housesData[pano.getVariableValue('lang')]);
        switch ($(this).attr('data-url')) {
          case 'node1':
            $(this).find('.node-title').html('Viva Park');
            break;

          default:
            $(this).find('.node-title').html(housesData[lang]['buildings'][$(this).index() - 1].house_nr);
            break;
        }
      });
      change_floorplan_node_title(housesData, pano.getVariableValue('lang'));
      removeIntroAnimation(); // Zmena textu Buttonu Interaktívny 3D model

      $('.orientation-button.model-off > div').html('Interactive 3D model');

      if (housesData[lang]['additional_content']) {
        if (housesData[lang]['additional_content'][26]) {
          if (housesData[lang]['additional_content'][26]['title']) {
            $('.orientation-button.model-off > div').html(housesData[lang]['additional_content'][26]['title']);
          }
        }
      } // zmena jazyka pre Google mapu


      if (map_iframe[lang] != null && map_iframe[lang] != 'undefined' && map_iframe[lang] != undefined) {
        console.log(map_iframe[lang]);
        pano.setVariableValue('map_iframe', map_iframe[lang]);
        $('.map > iframe').attr('src', map_iframe[lang]);
      } else {
        console.log(map_iframe[int]);
        pano.setVariableValue('map_iframe', map_iframe['int']);
        $('.map > iframe').attr('src', map_iframe['int']);
      }
    }).fail(function () {////console.log( "houses loading error" );
    });
  } else {
    ////console.log('dáta domov už mám');
    checkHotspots();
    $('#progress').remove();
  } // //console.log(housesData);

}

function playPauseMedia() {
  if (videoDuration == 0 || videoDurationHalf == 0) {} else {
    ////console.log(videoDuration+' | '+pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue);
    if (pano.isPlaying(patchName) == true) {////console.log('Nemôžem prehrať 2 videá naraz');
    } else {
      vid.ontimeupdate = function () {
        if (play == true || pano.isPlaying(patchName) == false) {
          if (this.currentTime >= videoDurationHalf) {
            pano.pauseSound(patchName);
            play = false;
            $('.viva-tooltip').removeClass('hidden');
            return false;
          }
        } else {
          hideTooltips();
          pano.getMediaObject(patchName).addEventListener('ended', function () {
            play = true;
            hideTooltips();
          });
        }
      };

      pano.playSound(patchName, "1");
    }
  }
}

function hideTooltips() {
  var ToolTipsCount = ToolTips.length;

  for (var index = 0; index < ToolTipsCount; index++) {
    ToolTips[index].addClass('hidden');
  }
}

function removeIntroAnimation() {
  pano.setVariableValue('blurred', false);
  pano.setVariableValue('intro', false);
  addClass(['.mobile-footer'], 'active');
  $("#intro").fadeOut("slow", function () {
    $(this).remove();
  });
}

var pointshotspots, pointshotspotsNew;

function checkHotspots() {
  addLoader('loading hotspots data');
  var pointshotspots = pano.getCurrentPointHotspots();
  var pointHotspotsNew = [];
  var removeItem = 'viva-tooltip'; //console.log('hľadám hotspoty');

  for (var index = 0; index < pointshotspots.length; index++) {
    if (pointshotspots[index]['className'].indexOf(removeItem) > 0) {
      pointHotspotsNew.push(pointshotspots[index]);
    }
  } //console.log(pointHotspotsNew);


  var houseID = pano.getNodeUserdata(currentNode).source; // ID domu

  var houseTitle = pano.getNodeUserdata(currentNode).title; // ID document
  //console.log(houseTitle);

  var position;

  if (houseTitle.indexOf('Interier') >= 0) {
    position = 'interior';
  } else {
    position = 'exterior';
  }

  for (var _index2 = 0; _index2 < pointHotspotsNew.length; _index2++) {
    //console.log(housesValues[lang][houseID][position][index+1]['name']);
    //pointHotspotsNew[index]['textContent'] = housesValues[lang][houseID][position][index+1]['name'];
    if (housesValues[lang][houseID] && housesValues[lang][houseID][position][_index2 + 1] && housesValues[lang][houseID][position][_index2 + 1] != 'undefined' //housesValues[lang][houseID][position][index+1]['products']['id'] != -1
    ) {
        if (housesValues[lang][houseID][position][_index2 + 1]['id'] == -1) {
          $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).attr('data-open', 'no').children('.triangle-left').removeClass('hover');
        } else {
          $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).attr('data-open', 'true').children('.triangle-left').addClass('hover');
        }

        $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).children().children().html(housesValues[lang][houseID][position][_index2 + 1]['name']);
        $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).removeClass('removed');
        $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).attr('data-product', _index2 + 1).attr('data-position', position);
      } else {
      $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).addClass('removed');
    }
  }

  $('#progress').remove(); //console.log(position);
}

function checkHotspots_backup() {
  addLoader('loading hotspots data'); // var hotspotsArray = pano.getCurrentPointHotspots();
  // var hotspotsArrayLength =  hotspotsArray.length;
  // ////console.log('čekujem');
  // var tmpProductId;
  // var sep = ' ';
  // var tmpLang = pano.getVariableValue('lang');
  // for (var i = 0; i < hotspotsArrayLength; i++) {
  //     // hide all Hotspots
  //     if (hotspotsArray[i].className.indexOf('delete') < 0)
  //     {
  //         hotspotsArray[i].className = hotspotsArray[i].className+' delete';
  //     }
  //     if (hotspotsArray[i].className.indexOf('viva-tooltip') > -1) 
  //         {
  //             tmpProductId = hotspotsArray[i].textContent.substring(hotspotsArray[i].textContent.indexOf("|") + 1);
  //             // priradenie data-id k hotspotom
  //             if (tmpProductId != '') {
  //                     if (
  //                         hotspotsArray[i].className.indexOf(tmpProductId) >= 0
  //                     ) {
  //                     }
  //                     else {
  //                         hotspotsArray[i].className = hotspotsArray[i].className+sep+tmpProductId;        
  //                         $('.'+tmpProductId).attr('data-id',tmpProductId);
  //                     } 
  //             }
  //         }
  //         if (tmpProductId != '') {
  //             var tmpSearchingID = tmpProductId+productSuffix[lang];
  //             if (
  //                 productData[lang][tmpSearchingID] == undefined ||
  //                 productData[lang][tmpSearchingID] == null ||
  //                 productData[lang][tmpSearchingID] == ''
  //             )
  //             {
  //             }
  //             else {
  //                 ////console.log(tmpSearchingID);
  //                 //$('.viva-tooltip[data-id="'+tmpProductId+'"] > div > div').text(dataModel[tmpLang][tmpSearchingID].name);
  //                 var newTmpContent = '<div class="hts-title">'+productData[lang][tmpSearchingID].name+'</div><span>|'+tmpProductId+'</span>';
  //                 $('.viva-tooltip[data-id="'+tmpProductId+'"] > div > div').html(newTmpContent);
  //                 hotspotsArray[i].className = hotspotsArray[i].className.replace('delete', '');
  //             }
  //         }
  //     else {
  //         hotspotsArray.splice(i, 1);
  //         i--;
  //     }
  // }

  $('#progress').remove();
}

function checkHotspots2() {
  addLoader('loading hotspots data');
  var hotspotsArray = pano.getCurrentPointHotspots();
  var hotspotsArrayLength = hotspotsArray.length; ////console.log('čekujem 2');
  //console.log(hotspotsArray);

  var tmpProductId;
  var sep = ' ';
  var tmpLang = pano.getVariableValue('lang');

  for (var i = 0; i < hotspotsArrayLength; i++) {
    // hide all Hotspots
    if (hotspotsArray[i].className.indexOf('delete') < 0) {
      hotspotsArray[i].className = hotspotsArray[i].className + ' delete';
    }

    if (hotspotsArray[i].className.indexOf('viva-tooltip') > -1) {
      tmpProductId = hotspotsArray[i].textContent.substring(hotspotsArray[i].textContent.indexOf("|") + 1); // priradenie data-id k hotspotom

      if (tmpProductId != '') {
        if (hotspotsArray[i].className.indexOf(tmpProductId) >= 0) {} else {
          hotspotsArray[i].className = hotspotsArray[i].className + sep + tmpProductId;
          $('.' + tmpProductId).attr('data-id', tmpProductId);
        }
      }
    }

    if (tmpProductId != '') {
      var tmpSearchingID = tmpProductId + productSuffix[lang];

      if (productData[lang][tmpSearchingID] == undefined || productData[lang][tmpSearchingID] == null || productData[lang][tmpSearchingID] == '') {} else {
        ////console.log(tmpSearchingID);
        //$('.viva-tooltip[data-id="'+tmpProductId+'"] > div > div').text(dataModel[tmpLang][tmpSearchingID].name);
        var newTmpContent = '<div class="hts-title">' + productData[lang][tmpSearchingID].name + '</div><span>|' + tmpProductId + '</span>';
        $('.viva-tooltip[data-id="' + tmpProductId + '"] > div > div').html(newTmpContent);
        hotspotsArray[i].className = hotspotsArray[i].className.replace('delete', '');
      }
    } else {
      hotspotsArray.splice(i, 1);
      i--;
    }
  }

  if (housesData[lang]['additional_content'][18] == undefined || housesData[lang]['additional_content'][18] == null || housesData[lang]['additional_content'][18] == 'undefined') {
    $('p.status').text('loading panorama');
  } else {
    console.log(housesData[lang]['additional_content']);
    $('p.status').text(housesData[lang]['additional_content'][18]['text']);
  }

  pano.on('tilesready', function addPatch() {
    $('#progress').remove();
  });
}

function nacitajData(productName, product_id, position, open) {
  //console.log(position);
  if (productNameSave == product_id && productLang == pano.getVariableValue('lang') && open != 'no') {
    $('.hotspot-loader').remove();
    pano.setVariableValue('infopanel', true);
  } else {
    if (product_id == '' || product_id == undefined || product_id == null || open == 'no') {} else {
      $('.info-v1 > .head > .content > h2').empty();
      var _houseID = pano.getNodeUserdata(currentNode).source; // ID domu

      $('.info-v1 > .head > .content > h2').html(housesValues[lang][_houseID][position][product_id]['name']);
      $('.info-v1 > .head > .content > a').remove();
      var urlTarget = urlPrefix[lang] + housesValues[lang][_houseID][position][product_id]['details_url'];
      var a = document.createElement("a");
      $('.info-v1 > .head > .content').append(a); //console.log(housesData[lang]);
      // if (
      //     moreInfoButton[pano.getVariableValue('lang')] == undefined ||
      //     moreInfoButton[pano.getVariableValue('lang')] == null ||
      //     moreInfoButton[pano.getVariableValue('lang')] == 'undefined' 
      // ) {
      //     $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target','_blank').text(moreInfoButton.uk);
      // }
      // else  {
      //     $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target','_blank').text(moreInfoButton[pano.getVariableValue('lang')]);
      // }

      if (housesData[lang]['additional_content'][24] == undefined || housesData[lang]['additional_content'][24] == null || housesData[lang]['additional_content'][24] == 'undefined') {
        $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target', '_blank').text(moreInfoButton.uk);
      } else {
        console.log(housesData[lang]['additional_content'][19]['title']);
        $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target', '_blank').text(housesData[lang]['additional_content'][24]['title']);
      }

      $('.content > ul').empty();
      $.each(housesValues[lang][_houseID][position][product_id], function (i, el) {
        var y = '';
        y = i;

        if (y.includes('product_benefit') && y.indexOf('description') < 1) {
          $('.content > ul').append("<li><span>" + el + "</span></li>");
        }
      });
      $('.info-v1 > .body > p').empty();
      $('.info-v1 > .body > p').html(housesValues[lang][_houseID][position][product_id]['description']);
      $('.info-v1 > .head > .baumit-img > img').remove();
      var imgSrc = 'https://int.baumit.com/' + housesValues[lang][_houseID][position][product_id]['image'];
      $('.info-v1 > .head > .baumit-img').append("<img class='baumit-img' src='" + imgSrc + "'/>");
      pano.setVariableValue('infopanel', true);
      lang = pano.getVariableValue('lang');
      productNameSave = product_id;
    }
  }
}

function showVivaIntro() {
  if (currentNode == 'node1' && pano.getVariableValue('floorplan_full') == false) {
    $('.viva-start').removeClass('hidden');
  } else {
    $('.viva-start').addClass('hidden');
  }
}

function houseInfo(data) {
  $('.viva-start').addClass('hidden');
  $('.viva-house-info > div > .content > h1').removeClass('hidden');
  $('.viva-house-info > div > .content > .row').removeClass('hidden');

  if (houseID !== 100) {
    $('#house-url').addClass('hidden');
    $('.viva-house-info > div > .content > h1').empty();
    $('.viva-house-info > div > .content > .headline').empty();
    $('.viva-house-info > div > .content > .row > p').empty();
    $('#yt').attr('src', '');
    $('#yt-video').addClass('hidden'); // ak ide o House 0

    if (data == 0) {
      if (housesData[lang]['additional_content'].length == 0) {
        //$('.viva-house-info > div > .content > h1' ).text(noData); 
        //$('.viva-house-info > div > .content > .headline').removeClass('hidden').text(noData); 
        $('.viva-house-info > div > .content > .row > p').text(noData);
        $('#viva-second').addClass('hidden');
      } else {
        if (housesData[lang]['additional_content'][23]) {
          $('.viva-house-info > div > .content > h1').text(housesData[lang]['additional_content'][23]['title']);
          $('.viva-house-info > div > .content > .row > p').text(housesData[lang]['additional_content'][23]['content']);
        } else {
          $('.viva-house-info > div > .content > h1').text('About the VIVA Park');
          $('.viva-house-info > div > .content > .row > p').text('The Viva research park is Europe’s largest research facility for comparative building material studies.  Its main objective is to exactly measure and evaluate the impact of different construction materials to living comfort by simulating a typical user behavior.');
        } // if (
        //     housesData[lang]['additional_content'][8] == null ||
        //     housesData[lang]['additional_content'][8] == 'undefined' ||
        //     housesData[lang]['additional_content'][8] == '' 
        // )
        // {
        //     $('.viva-house-info > div > .content > h1' ).text(noData); 
        // }
        // else {
        //     $('.viva-house-info > div > .content > h1' ).text(housesData[lang]['additional_content'][8]['title']); 
        // }
        // if (
        //     housesData[lang]['additional_content'][13] == null ||
        //     housesData[lang]['additional_content'][13] == 'undefined' ||
        //     housesData[lang]['additional_content'][13] == '' 
        // )
        // {
        //     $('.viva-house-info > div > .content > h1' ).text(noData); 
        // }
        // else {
        //     $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(housesData[lang]['additional_content'][13]['content']); 
        // }
        // if (
        //     housesData[lang]['additional_content'][16] == null ||
        //     housesData[lang]['additional_content'][16] == 'undefined' ||
        //     housesData[lang]['additional_content'][16] == '' 
        // )
        // {
        //     $('.viva-house-info > div > .content > h1' ).text(noData); 
        // }
        // else {
        //     $('.viva-house-info > div > .content > .row > p').text(housesData[lang]['additional_content'][16]['title']); 
        // }


        $('#viva-second').addClass('hidden');
      }
    } else {
      comfortLevelSwitch(data);
      var tmpHouseID = data - 1;
      var tmpLength = housesData[lang]['buildings'].length; ////console.log(tmpLength);

      if (tmpLength == 0) {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
        $('#viva-second').addClass('hidden');
      } else {
        // Nadpisy
        if (housesData[lang]['buildings'][tmpHouseID]['house_nr'] == null || housesData[lang]['buildings'][tmpHouseID]['house_nr'] == 'undefined' || housesData[lang]['buildings'][tmpHouseID]['house_nr'] == '') {
          $('.viva-house-info > div > .content > h1').text(noData);
        } else {
          $('.viva-house-info > div > .content > h1').text(housesData[lang]['buildings'][tmpHouseID]['house_nr']);
        } // Headline


        if (housesData[lang]['buildings'][tmpHouseID]['headline'] == null || housesData[lang]['buildings'][tmpHouseID]['headline'] == 'undefined' || housesData[lang]['buildings'][tmpHouseID]['headline'] == '') {
          $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(noData);
        } else {
          $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(housesData[lang]['buildings'][tmpHouseID]['headline']);
        }

        if (housesData[lang]['buildings'][tmpHouseID]['text'] == null || housesData[lang]['buildings'][tmpHouseID]['text'] == 'undefined' || housesData[lang]['buildings'][tmpHouseID]['text'] == '') {
          $('.viva-house-info > div > .content > .row > p').text(noData);
        } else {
          $('.viva-house-info > div > .content > .row > p').text(housesData[lang]['buildings'][tmpHouseID]['text']);
        } // URL link na button


        if (housesData[lang]['buildings'][tmpHouseID]['link'] != '' && housesData[lang]['buildings'][tmpHouseID]['link'] != 'undefined') {
          var tmpLink = housesData[lang]['buildings'][tmpHouseID]['link'];

          if (housesData[lang]['additional_content'][24] // moreInfoButton[lang] == undefined ||
          // moreInfoButton[lang] == null ||
          // moreInfoButton[lang] == 'undefined' 
          ) {
              $('#house-url').attr('href', tmpLink).text(housesData[lang]['additional_content'][24]['text']);
            } else {
            $('#house-url').attr('href', tmpLink).text(moreInfoButton[uk]);
          }

          if (housesData[lang]['additional_content'][19] == undefined || housesData[lang]['additional_content'][19] == null || housesData[lang]['additional_content'][19] == 'undefined') {
            var _houseID2 = pano.getNodeUserdata(currentNode).source; // ID domu

            var houseTitle = pano.getNodeUserdata(currentNode).title; // ID document
            //console.log(houseTitle);

            var position;
            var urlTarget = urlPrefix[lang] + housesValues[lang][_houseID2]['link'];

            if (houseTitle.indexOf('Interier') >= 0) {
              position = 'interior';
            } else {
              position = 'exterior';
            } //console.log(housesValues[lang][houseID]['link']);


            $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target', '_blank').text(moreInfoButton.uk);
            $('#house-url').attr('href', tmpLink).text(moreInfoButton.uk);
          } else {
            //console.log(housesData[lang]['additional_content'][19]['title']);
            $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target', '_blank').text(housesData[lang]['additional_content'][19]['title']);
            $('#house-url').attr('href', tmpLink).text(housesData[lang]['additional_content'][19]['title']);
          }

          $('#house-url').removeClass('hidden');
        } // YouTube video


        if (housesData[lang]['buildings'][tmpHouseID]['media'] != '' && housesData[lang]['buildings'][tmpHouseID]['media'] != 'undefined' && housesData[lang]['buildings'][tmpHouseID]['media'] != null) {
          pano.setVariableValue('houseInfo', true);
          var tmpMedia = housesData[lang]['buildings'][tmpHouseID]['media'];
          var youtubeURL = 'https://www.youtube.com/embed/' + tmpMedia.replace('https://youtu.be/', '');
          var tmpWidth = $('#yt-video').width() / 16 * 9;
          $('#yt').attr('src', youtubeURL).css({
            'height': tmpWidth
          });
          $('#yt-video').removeClass('hidden');
        }
      }

      if (housesData[lang]['buildings'][tmpHouseID] != null || housesData[lang]['buildings'][tmpHouseID] != undefined) {}
    }

    houseID = data;
    $('#progress').remove();
  } else {//console.log('Dom je už načítaný');
  }

  pano.setVariableValue('houseInfo', true);
}

function comfortLevel(level) {
  window.randomize = function () {
    $('.ko-progress-circle').attr('data-progress', level);
  };

  setTimeout(window.randomize, 200);
  $('.ko-progress-circle').click(window.randomize);
}

function comfortLevelSwitch(houseID) {
  if (currentNode == 'node1') {
    $('#viva-second').addClass('hidden');
  } else {
    var tmphouseid = houseID - 1; ////console.log('tmphouseid je : '+tmphouseid);

    if (housesData[lang]['buildings'].length == 0) {
      $('#viva-second').addClass('hidden');
    } else {
      if (housesData[lang]['buildings'][tmphouseid]['house_comfort'] == null || housesData[lang]['buildings'][tmphouseid]['house_comfort'] == 'undefined' || housesData[lang]['buildings'][tmphouseid]['house_comfort'] == '') {
        $('#viva-second').addClass('hidden');
      } else {
        var tmpComfortLevel = housesData[lang]['buildings'][tmphouseid]['house_comfort']; ////console.log(tmpComfortLevel);

        switch (tmpComfortLevel) {
          case 'High':
            $('#viva-second').removeClass('hidden');
            $('.house-tooltip-inner').text('High');
            comfortLevel(100);
            break;

          case 'Low':
            $('#viva-second').removeClass('hidden');
            $('.house-tooltip-inner').text('Low');
            comfortLevel(30);
            break;

          case 'Medium':
            $('#viva-second').removeClass('hidden');
            $('.house-tooltip-inner').text('Medium');
            comfortLevel(60);
            break;

          case '':
            $('#viva-second').addClass('hidden');
            comfortLevel(0);
            break;

          default:
            $('#viva-second').removeClass('hidden');
            $('.house-tooltip-inner').text(tmpComfortLevel);
            comfortLevel(5);
            break;
        }
      }
    }
  }
}

function updateComfortLevel() {
  $.each($('.check-layer > div > span'), function () {
    var tmpComfortLevel = parseInt($(this).attr('id')); //console.log(tmpComfortLevel);

    var lang = pano.getVariableValue('lang');

    if (tmpComfortLevel > 0) {
      tmpComfortLevel--;
    }

    var number = housesData[lang]['buildings'][tmpComfortLevel]['house_comfort']; ////console.log(number);

    var finalNumber = 0;

    switch (number) {
      case 'High':
        finalNumber = 100;
        break;

      case 'Low':
        finalNumber = 30;
        break;

      case 'Medium':
        finalNumber = 60;
        break;

      case null:
        finalNumber = 0;
        break;

      case '':
        $('#viva-second').addClass('hidden');
        comfortLevel(0);
        break;

      case 'undefined':
        $('#viva-second').addClass('hidden');
        comfortLevel(0);
        break;
    }

    $(this).next('.ko-progress-circle').attr('data-progress', finalNumber);

    if (number == null || number == undefined || number == '') {
      //$(this).siblings('.tooltip-level').text('null');
      $(this).siblings('.tooltip-level').remove();
      $(this).siblings('.ko-progress-circle').remove();
    } else {
      $(this).siblings('.tooltip-level').text(number);
    }
  });
}

function loadIntroData() {
  //alert('agdg');
  console.log(lang);
  var tmpLength = housesData[lang]['additional_content'].length; ////console.log(tmpLength);

  if (tmpLength == 0) {
    ////console.log('empthy object !!!!!!!!!!!!!!!!!!!!');
    $('.viva-start .title > div > h1').text(noData);
    $('.viva-start .title > div > span.subtitle').text(noData);
    $('#quickTour').text(noData);
    $('#results').text(noData);
    $('#about').text(noData);
    $('.viva-start .logo > div > img').attr('src', 'images/vivapark-logo.svg');
    $('.viva-start').removeClass('hidden');
  } else {
    $('.viva-start .title > div > h1').text(housesData[lang]['additional_content'][8]['title']);
    $('.viva-start .title > div > span.subtitle').text(housesData[lang]['additional_content'][8]['content']);
    $('#quickTour').text(housesData[lang]['additional_content'][9]['title']);
    $('#results').text(housesData[lang]['additional_content'][10]['title']);
    $('#about').text(housesData[lang]['additional_content'][11]['title']); //$('.viva-start .logo > div > img').attr('src',housesData[lang]['additional_content'][15]['media']);

    $('.viva-start .logo > div > img').attr('src', 'images/vivapark-logo.svg');
    $('.viva-start').removeClass('hidden');
  }

  change_tooltip_names(lang, housesData);
}

function tagInfo(value) {
  $('.headline').addClass('hidden');
  $('#viva-second').addClass('hidden');
  $('#yt-video').addClass('hidden');
  $('#house-url').addClass('hidden');
  $('.viva-house-info > div > .content > h1').removeClass('hidden');
  $('.viva-house-info > div > .content > .row').removeClass('hidden');

  switch (value) {
    case 'Air Supply':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][1]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][1]['title'];
        var tmpContent = housesData[lang]['additional_content'][1]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'Global Temperature Sensor':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][3]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][3]['title'];
        var tmpContent = housesData[lang]['additional_content'][3]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'Humidifier':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][0]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][0]['title'];
        var tmpContent = housesData[lang]['additional_content'][0]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'Air Exhaust':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][2]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][2]['title'];
        var tmpContent = housesData[lang]['additional_content'][2]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'Built-in sensors':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][13]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][13]['title'];
        var tmpContent = housesData[lang]['additional_content'][13]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'Temperature sensor':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][14]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][14]['title'];
        var tmpContent = housesData[lang]['additional_content'][14]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'InteriorValues':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][6]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][6]['title'];
        var tmpContent = housesData[lang]['additional_content'][6]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);

        if (housesData[lang]['additional_content'][6]['media'] != '' && housesData[lang]['additional_content'][6]['media'] != 'undefined' && housesData[lang]['additional_content'][6]['media'] != null) {
          pano.setVariableValue('houseInfo', true);
          var tmpMedia = housesData[lang]['additional_content'][6]['media'];
          var youtubeURL = 'https://www.youtube.com/embed/' + tmpMedia.replace('https://youtu.be/', '');
          var tmpWidth = $('#yt-video').width() / 16 * 9;
          $('#yt').attr('src', youtubeURL).css({
            'height': tmpWidth
          });
          $('#yt-video').removeClass('hidden');
        }
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'Solidity':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][5]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][5]['title'];
        var tmpContent = housesData[lang]['additional_content'][5]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);

        if (housesData[lang]['additional_content'][5]['media'] != '' && housesData[lang]['additional_content'][5]['media'] != 'undefined' && housesData[lang]['additional_content'][5]['media'] != null) {
          pano.setVariableValue('houseInfo', true);
          var tmpMedia = housesData[lang]['additional_content'][5]['media'];
          var youtubeURL = 'https://www.youtube.com/embed/' + tmpMedia.replace('https://youtu.be/', '');
          var tmpWidth = $('#yt-video').width() / 16 * 9;
          $('#yt').attr('src', youtubeURL).css({
            'height': tmpWidth
          });
          $('#yt-video').removeClass('hidden');
        }
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'Insulation':
      if (housesData[lang]['additional_content'].length > 0 && housesData[lang]['additional_content'][4]['content'] != null) {
        var tmpTitle = housesData[lang]['additional_content'][4]['title'];
        var tmpContent = housesData[lang]['additional_content'][4]['content'];
        $('.viva-house-info > div > .content > h1').text(tmpTitle);
        $('.viva-house-info > div > .content > .row > p').text(tmpContent);

        if (housesData[lang]['additional_content'][4]['media'] != '' && housesData[lang]['additional_content'][4]['media'] != 'undefined' && housesData[lang]['additional_content'][4]['media'] != null) {
          pano.setVariableValue('houseInfo', true);
          var tmpMedia = housesData[lang]['additional_content'][4]['media'];
          var youtubeURL = 'https://www.youtube.com/embed/' + tmpMedia.replace('https://youtu.be/', '');
          var tmpWidth = $('#yt-video').width() / 16 * 9;
          $('#yt').attr('src', youtubeURL).css({
            'height': tmpWidth
          });
          $('#yt-video').removeClass('hidden');
        }
      } else {
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
      }

      break;

    case 'Monitor':
      if (housesData[lang]['additional_content'].length > 0) {
        //var tmpTitle = housesData[lang]['additional_content'][7]['title'];
        //var tmpContent = housesData[lang]['additional_content'][7]['content'];
        $('.viva-house-info > div > .content > h1').addClass('hidden');
        $('.viva-house-info > div > .content > .row').addClass('hidden');

        if (housesData[lang]['additional_content'][7]['media'] != '' && housesData[lang]['additional_content'][7]['media'] != 'undefined' && housesData[lang]['additional_content'][7]['media'] != null) {
          pano.setVariableValue('houseInfo', true);
          var tmpMedia = housesData[lang]['additional_content'][7]['media'];
          var youtubeURL = 'https://www.youtube.com/embed/' + tmpMedia.replace('https://youtu.be/', '');
          var tmpWidth = $('#yt-video').width() / 16 * 9;
          $('#yt').attr('src', youtubeURL).css({
            'height': tmpWidth
          });
          $('#yt-video').removeClass('hidden');
        }
      } else {}

      break;
  }

  pano.setVariableValue('houseInfo', true);
}

var housesValues = {};

function getHousesValues(lang, houseID, housesUrl, housesData) {
  addLoader('loading products data');

  if (housesValues[lang] == undefined || housesValues[lang] == null || housesValues[lang] == '') {
    housesValues[lang] = {};
    var dataModel = $.getJSON(housesUrl, function (products) {
      $.each(products, function (index, val) {
        if (index == 'buildings') {
          $.each(val, function (i, data) {
            if (housesValues[lang][i + 1] == null || housesValues[lang][i + 1] == 'undefined') {
              housesValues[lang][i + 1] = {};
            }

            var house_attributes = ['house_nr', 'headline', 'house_comfort', 'text', 'link', 'media'];

            for (var _index3 = 0; _index3 < house_attributes.length; _index3++) {
              housesValues[lang][i + 1][house_attributes[_index3]] = data[house_attributes[_index3]];
            }

            housesValues[lang][i + 1]['exterior'] = {};
            housesValues[lang][i + 1]['interior'] = {};

            if (data['layers']) {
              var layers_data = ['name', 'description', 'image', 'details_url', 'product_benefit_1', 'product_benefit_2', 'product_benefit_3', 'id'];
              $.each(data['layers'], function (index, layers) {
                function read_data(layers, target, layers_data) {
                  for (var _index4 = 0; _index4 < layers_data.length; _index4++) {
                    housesValues[lang][i + 1][target][layers['name'].substring(1)][layers_data[_index4]] = layers['products'][layers_data[_index4]];
                  }
                }

                if (layers['name'].indexOf('E') > -1) {
                  if (!housesValues[lang][i + 1]['exterior'][layers['name'].substring(1)]) {
                    housesValues[lang][i + 1]['exterior'][layers['name'].substring(1)] = {};
                  }

                  read_data(layers, 'exterior', layers_data);
                }

                if (layers['name'].indexOf('I') > -1) {
                  if (!housesValues[lang][i + 1]['interior'][layers['name'].substring(1)]) {
                    housesValues[lang][i + 1]['interior'][layers['name'].substring(1)] = {};
                  }

                  read_data(layers, 'interior', layers_data);
                } //console.log(layers);

              });
            }
          });
        }
      });
    }).done(function () {
      //console.log('Produkty načítané v poriadku');
      getHousesLink(lang);
      loadHousesData(housesUrl, lang);
      house_8_texts(lang, housesData);
    }).fail(function () {//console.log( "Chyba pri načítavaní produktov" );
    });
  } else {
    //console.log('dátový model už je načítaný');
    checkHotspots();
    loadIntroData();
  }
}

function house_8_texts($lang, $housesData) {
  console.log('mením house 8 texts');

  if (pano.getCurrentNode() == 'node24' && housesData[lang]) {
    console.log('áno teraz');

    if (housesData[lang]['additional_content'][5]['title']) {
      $('.helper-text.solidity').html(housesData[lang]['additional_content'][5]['title']);
    } else {
      $('.helper-text.solidity').html('Solidity counts');
    }

    if (housesData[lang]['additional_content'][4]['title']) {
      $('.helper-text.insulation').html(housesData[lang]['additional_content'][4]['title']);
    } else {
      $('.helper-text.insulation').html('Insulation first');
    }

    if (housesData[lang]['additional_content'][6]['title']) {
      $('.helper-text.interior-values').html(housesData[lang]['additional_content'][6]['title']);
    } else {
      $('.helper-text.interior-values').html('Interior values');
    }
  }
}

function changePanoTitle(lang, housesData) {
  //console.log('mením názov');
  var node_id = pano.getNodeUserdata(pano.getCurrentNode()).source;
  var title = $('.header > .title > div');
  lang = pano.getVariableValue('lang');

  switch (node_id) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '10':
    case '11':
    case '12':
    case '13':
      if (housesData[lang]) {
        title.text(housesData[lang]['buildings'][parseInt(node_id) - 1].house_nr);
      }

      break;

    case '0':
      title.text('Viva park');
      break;
  }

  $.each($('.hts-np'), function () {
    var hotspot_title = $(this).children('.np-title').children('div').html();
    var foundString;

    if (hotspot_title.indexOf('_') > 0) {
      foundString = hotspot_title.substr(hotspot_title.indexOf('_') + 1);
    } else if (hotspot_title.indexOf('.') > 0) {
      foundString = hotspot_title.substr(hotspot_title.indexOf('.') + 1).replace(' ', '');
    } // console.log(foundString);
    //console.log(housesData[lang]);


    if (!housesData[lang]) {} else {
      switch (foundString) {
        case '01':
        case '1':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][0].house_nr);
          break;

        case '02':
        case '2':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][1].house_nr);
          break;

        case '03':
        case '3':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][2].house_nr);
          break;

        case '04':
        case '4':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][3].house_nr);
          break;

        case '05':
        case '5':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][4].house_nr);
          break;

        case '06':
        case '6':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][5].house_nr);
          break;

        case '07':
        case '7':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][6].house_nr);
          break;

        case '08':
        case '8':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][7].house_nr);
          break;

        case '09':
        case '9':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][8].house_nr);
          break;

        case '10':
        case '10':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][9].house_nr);
          break;

        case '11':
        case '11':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][10].house_nr);
          break;

        case '12':
        case '12':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][11].house_nr);
          break;

        case '13':
        case '13':
          $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][12].house_nr);
          break;

        case '00':
          $(this).children('.np-title').children('div').html('Viva park');
          break;
      }

      house_8_texts();
    }
  }); // Zmena názvu domov v slidery

  if (housesData[lang]) {
    // Zmena názvu domov v slidery
    $.each($('.swiper-slide'), function () {
      ;

      switch ($(this).attr('data-url')) {
        case 'node1':
          $(this).find('.node-title').html('Viva Park');
          break;

        default:
          $(this).find('.node-title').html(housesData[lang]['buildings'][$(this).index() - 1].house_nr);
          break;
      }
    }); // Zmena názvu domov vo floorplane
  }
}

function change_tooltip_names($lang, $housesData) {
  console.log('mením tooltipy');
  var go_inside = 'Go inside';
  var go_outside = 'Go outside';
  var wall_components = 'Wall components';
  var more_info = 'Tooltips #1';
  var house_info = 'House Info';

  if (housesData[lang]) {
    if (housesData[lang]['additional_content']) {
      if (housesData[lang]['additional_content'][20]) {
        // Go inside
        if (housesData[lang]['additional_content'][20]['title']) {
          go_inside = housesData[lang]['additional_content'][20]['title'];
        }
      }

      if (housesData[lang]['additional_content'][21]) {
        // Wall components
        if (housesData[lang]['additional_content'][21]['title']) {
          wall_components = housesData[lang]['additional_content'][21]['title'];
        }
      }

      if (housesData[lang]['additional_content'][22]) {
        // House info
        if (housesData[lang]['additional_content'][22]['title']) {
          house_info = housesData[lang]['additional_content'][22]['title'];
        }
      }

      if (housesData[lang]['additional_content'][24]) {
        // More info
        console.log('áno');

        if (housesData[lang]['additional_content'][24]['title']) {
          more_info = housesData[lang]['additional_content'][24]['title'];
        }
      }

      if (housesData[lang]['additional_content'][25]) {
        // Go outside
        if (housesData[lang]['additional_content'][25]['title']) {
          go_outside = housesData[lang]['additional_content'][25]['title'];
        }
      }
    }

    var searched_hotspots = ['hts-ext-layer', 'hts-ext-info', 'hts-ext-door', 'hts-int-layer', 'hts-int-info', 'hts-int-door'];

    for (var index = 0; index < searched_hotspots.length; index++) {
      switch (index) {
        case 0:
          $('.' + searched_hotspots[index] + ' > .layer-tooltip > div').html(wall_components);
          break;

        case 1:
          $('.' + searched_hotspots[index] + ' > .layer-tooltip > div').html(house_info);
          break;

        case 2:
          $('.' + searched_hotspots[index] + ' > .layer-tooltip > div').html(go_inside);
          break;

        case 3:
          $('.' + searched_hotspots[index] + ' > .layer-tooltip > div').html(wall_components);
          break;

        case 4:
          $('.' + searched_hotspots[index] + ' > .layer-tooltip > div').html(house_info);
          break;

        case 5:
          $('.' + searched_hotspots[index] + ' > .layer-tooltip > div').html(go_outside);
          break;
      }
    }
  }
} // Take a Tour navigation arrows


function is_tour_navigation() {
  var is_tour_nodes = ['node1', 'node16', 'node12', 'node26', 'node6', 'node22', 'node3', 'node18', 'node5', 'node20'];
  console.log(is_tour_nodes);
  $('.tt-next').on('click tap', function () {
    var index = is_tour_nodes.indexOf(pano.getCurrentNode());
    console.log('index : ' + index);

    if (index != null && index < is_tour_nodes.length - 1) {
      pano.openNext('{' + is_tour_nodes[index + 1] + '}');
    } else {
      pano.openNext('{' + is_tour_nodes[0] + '}');
    }
  });
  $('.tt-prev').on('click tap', function () {
    var index = is_tour_nodes.indexOf(pano.getCurrentNode());
    console.log('index : ' + index);

    if (index != null && index <= 0) {
      pano.openNext('{' + is_tour_nodes[is_tour_nodes.length - 1] + '}');
    } else {
      pano.openNext('{' + is_tour_nodes[index - 1] + '}');
    }
  });
}

pano.on('configloaded', function (Tooltips) {
  is_tour_navigation();

  function check_user_lang(lang) {
    if ($.cookie('user_language') != undefined && $.cookie('user_language') != 'undefined' && $.cookie('user_language') != null) {
      // cookies nie su prázdne 
      lang = $.cookie('user_language').substr($.cookie('user_language').indexOf("=") + 1);
      pano.setVariableValue('lang', $.cookie('user_language').substr($.cookie('user_language').indexOf("=") + 1)); // alert(lang);

      update_lang_content();
    } else {
      // Jazyk nie je definovaný v Cookies
      var user_language = window.navigator.userLanguage || window.navigator.language;
      user_language = user_language.toLowerCase();

      switch (user_language) {
        case 'cz':
        case 'cs':
        case 'cz-cz':
        case 'cz-CZ':
          pano.setVariableValue('lang', 'cz');
          break;

        case 'sk':
        case 'sk-sk':
        case 'sk-SK':
          pano.setVariableValue('lang', 'sk');
          break;

        case 'at':
        case 'at-at':
        case 'de-at':
          pano.setVariableValue('lang', 'at');
          break;

        case 'de':
        case 'de-de':
          pano.setVariableValue('lang', 'de');
          break;

        case 'hr':
        case 'hr-hr':
          pano.setVariableValue('lang', 'hr');
          break;

        case 'rs': // Srbsko

        case 'rs-rs': // Srbsko

        case 'sr':
        case 'sr-sr':
          pano.setVariableValue('lang', 'rs');
          break;

        case 'si': // Slovinsko

        case 'si-si': // Slovinsko

        case 'sl':
        case 'sl-sl':
          pano.setVariableValue('lang', 'si');
          break;

        case 'ba': // Bosna a Hercegovina

        case 'ba-ba':
          pano.setVariableValue('lang', 'ba');
          break;

        case 'ua':
        case 'ua-ua':
        case 'uk':
        case 'uk-uk':
          pano.setVariableValue('lang', 'ua');
          break;

        case 'fr':
        case 'fr-fr':
          pano.setVariableValue('lang', 'fr');
          break;

        case 'es':
        case 'es-es':
          pano.setVariableValue('lang', 'es');
          break;

        case 'cn':
        case 'cn-cn':
        case 'zh-cn':
          pano.setVariableValue('lang', 'cn');
          break;

        case 'gr':
        case 'gr-gr':
        case 'el':
        case 'el-el':
          pano.setVariableValue('lang', 'gr');
          break;

        case 'hu':
        case 'hu-ht':
          pano.setVariableValue('lang', 'hu');
          break;

        case 'tr':
        case 'tr-tr':
          pano.setVariableValue('lang', 'tr');
          break;

        case 'ro':
        case 'ro-ro':
          pano.setVariableValue('lang', 'ro');
          break;

        case 'en-gb':
        case 'en':
          pano.setVariableValue('lang', 'uk');
          break;

        case 'it':
        case 'it-it':
          pano.setVariableValue('lang', 'it');
          break;

        case 'pl':
        case 'pl-pl':
          pano.setVariableValue('lang', 'pl');
          break;

        case 'lv':
        case 'lv-lv':
          pano.setVariableValue('lang', 'lv');
          break;

        case 'ru':
        case 'ru-ru':
          pano.setVariableValue('lang', 'ru');
          break;

        case 'by':
        case 'by-by':
        case 'be':
        case 'be-be':
          pano.setVariableValue('lang', 'by');
          break;

        case 'bg':
        case 'bg-bg':
          pano.setVariableValue('lang', 'bg');
          break;

        case 'lt':
        case 'lt-lt':
          pano.setVariableValue('lang', 'lt');
          break;

        case 'ee':
        case 'ee-ee':
        case 'et':
        case 'et-et':
          pano.setVariableValue('lang', 'ee');
          break;

        case 'mk':
        case 'mk-mk':
          pano.setVariableValue('lang', 'mk');
          break;

        case 'nl-be':
          pano.setVariableValue('lang', 'be');
          break;

        case 'de-ch':
          pano.setVariableValue('lang', 'ch');
          break;

        case 'ro-mo':
          pano.setVariableValue('lang', 'md');
          break;

        default:
          pano.setVariableValue('lang', 'int');
          break;
      }

      update_lang_content();
    }
  }

  function update_lang_content() {
    lang = pano.getVariableValue('lang');
    getProductLink(lang);
    getHousesLink(lang);
    getHousesValues(lang, houseID, housesUrl, housesData);
    changePanoTitle(lang, housesData);
  }

  ;

  if ($.cookie('sound')) {
    //console.log('cookies som načítal ako :'+$.cookie('sound'));
    switch ($.cookie('sound')) {
      case 'false':
        pano.setVariableValue('sound', false);
        break;

      case 'true':
        //pano.setVariableValue('sound', true);
        break;
    }
  }

  pano.addListener('varchanged_sound', function () {
    switch (pano.getVariableValue('sound')) {
      case true:
        $.cookie('sound', 'true');
        break;

      case false:
        $.cookie('sound', 'false');
        break;
    }
  });
  check_user_lang(lang);
  Tooltips = $('.viva-tooltip');
  pano.on('varchanged_lang', function () {
    //alert('pozor, zmena');
    $.cookie('user_language', pano.getVariableValue('lang'));
    update_lang_content();
    change_floorplan_node_title(housesData, pano.getVariableValue('lang'));
  });
  pano.on('changenode', function nodechange(lang) {
    //addLoader('loading products data');
    changePanoTitle(lang, housesData);
    change_tooltip_names(lang, housesData);
    showVivaIntro();
    checkHotspots();
    ToolTips.push($('.viva-tooltip'));
    hideTooltips();
    change_floorplan_node_title(housesData, pano.getVariableValue('lang')); //checkHotspots2();

    currentNode = pano.getCurrentNode();
    house_8_texts(lang, housesData);

    if (currentNode != 'node30' && currentNode != 'node31' && currentNode != 'node32' && currentNode != 'node33') {
      patchName = pano.getNodeUserdata(currentNode).title;

      if (currentNode != 'node1') {
        $('.ggskin_external').css({
          'visibility': 'hidden'
        });
        $('#vid').attr('id', '');
        videoDuration = 0;
        videoDurationHalf = 0;

        for (var i = 0; i < allVideos.length; i++) {
          pano.setMediaVisibility(allVideos[i], 0);
        }

        pano.on('tilesready', function addPatch() {
          play = true;

          if (currentNode != 'node1' && currentNode != 'node16' && currentNode != 'node24' && currentNode != 'node26' && currentNode != 'node30' && currentNode != 'node31' && currentNode != 'node32' && currentNode != 'node33' && pano.getMediaObject(patchName) != null) {
            if (pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue == null || pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue == undefined || pano.getMediaObject(patchName) == null) {
              //$('#loader').remove();
              if (pano.getVariableValue('floorplan_full') != true) {
                $('.ggskin_external').css({
                  'visibility': 'visible'
                });
              }
            } else {
              pano.setMediaVisibility(allVideos[allVideos.indexOf(pano.getNodeUserdata(currentNode).title)], 1);
              tmpID = pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue;
              $('.ggmedia > source[src="' + tmpID + '"]').parent().attr('id', 'vid1');
              vid = document.getElementById("vid1");
              videoDuration = vid.duration;
              videoDurationHalf = videoDuration / 2 - 0.20; ////console.log(videoDuration+' | '+videoDurationHalf);

              if (dataModelUpdating == false) {
                $('#progress').remove();

                if (pano.getVariableValue('floorplan_full') != true) {
                  $('.ggskin_external').css({
                    'visibility': 'visible'
                  });
                }
              }
            }
          } else {
            $('#progress').remove();

            if (pano.getVariableValue('floorplan_full') != true) {
              $('.ggskin_external').css({
                'visibility': 'visible'
              });
            }
          }
        });
      }
    }

    $('#progress').remove();
  });
  pano.on('varchanged_mobile_menu_active', function () {
    switch (pano.getVariableValue('mobile_menu_active')) {
      case true:
        $('.viva-start').addClass('hidden');
        break;
    }
  });
});
pano.addListener('varchanged_houseInfo', function () {
  //changePanoTitle();
  switch (pano.getVariableValue('houseInfo')) {
    case true:
      ShowElement(['.viva-house-info']);

      switch (pano.getVariableValue('tagValue')) {
        case 'Monitor':
          $('.viva-house-info').addClass('yt-only');
          break;

        default:
          $('.viva-house-info').removeClass('yt-only');
          break;
      }

      variableTrue(['blurred']);
      $('.ggskin_hotspot, .ggskin_external').css({
        'visibility': 'hidden'
      });
      break;

    case false:
      $('#yt').attr('src', '');
      showVivaIntro();
      variableFalse(['blurred']);
      HideElement(['.viva-house-info']);
      setTimeout(function () {
        $('.ggskin_hotspot, .ggskin_external').css({
          'visibility': 'visible'
        });
      }, 250);
      break;
  }
});