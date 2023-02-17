"use strict"; // global variables

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
  be_fr: 'https://baumit.fr',
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
      checkHotspots();
      loadIntroData();
    }).fail(function () {////console.log( "houses loading error" );
    });
  } else {} ////console.log('dáta domov už mám');
  // //console.log(housesData);

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

var pointshotspots, pointshotspotsNew;

function checkHotspots() {
  addLoader('loading hotspots data');
  var pointshotspots = pano.getCurrentPointHotspots();
  var pointHotspotsNew = [];
  var removeItem = 'viva-tooltip';
  console.log('hľadám hotspoty');

  for (var index = 0; index < pointshotspots.length; index++) {
    if (pointshotspots[index]['className'].indexOf(removeItem) > 0) {
      pointHotspotsNew.push(pointshotspots[index]);
    }
  }

  console.log(pointHotspotsNew);
  var houseID = pano.getNodeUserdata(currentNode).source; // ID domu

  var houseTitle = pano.getNodeUserdata(currentNode).title; // ID document

  console.log(houseTitle);
  var position;

  if (houseTitle.indexOf('Interier') >= 0) {
    position = 'interior';
  } else {
    position = 'exterior';
  }

  for (var _index2 = 0; _index2 < pointHotspotsNew.length; _index2++) {
    //console.log(housesValues[lang][houseID][position][index+1]['name']);
    //pointHotspotsNew[index]['textContent'] = housesValues[lang][houseID][position][index+1]['name'];
    if (housesValues[lang][houseID][position][_index2 + 1] && housesValues[lang][houseID][position][_index2 + 1] != 'undefined') {
      $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).children().children().html(housesValues[lang][houseID][position][_index2 + 1]['name']);
      $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).removeClass('removed');
      $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).attr('data-product', _index2 + 1).attr('data-position', position);
    } else {
      $('.viva-tooltip').eq(pointHotspotsNew.length - _index2 - 1).addClass('removed');
    }
  }

  console.log(position);
  $('#progress').remove();
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

  $('p.status').text('loading panorama');
  pano.on('tilesready', function addPatch() {
    $('#progress').remove();
  });
}

function nacitajData(productName, product_id, position) {
  console.log(position);

  if (productNameSave == product_id && productLang == pano.getVariableValue('lang')) {
    $('.hotspot-loader').remove(); ////console.log('pozor nie je zmena');

    pano.setVariableValue('infopanel', true);
  } else {
    if (product_id == '' || product_id == undefined || product_id == null) {} else {
      $('.info-v1 > .head > .content > h2').empty();
      var _houseID = pano.getNodeUserdata(currentNode).source; // ID domu

      $('.info-v1 > .head > .content > h2').html(housesValues[lang][_houseID][position][product_id]['name']);
      $('.info-v1 > .head > .content > a').remove();
      var urlTarget = urlPrefix[lang] + housesValues[lang][_houseID][position][product_id]['details_url'];
      var a = document.createElement("a");
      $('.info-v1 > .head > .content').append(a);

      if (moreInfoButton[pano.getVariableValue('lang')] == undefined || moreInfoButton[pano.getVariableValue('lang')] == null || moreInfoButton[pano.getVariableValue('lang')] == 'undefined') {
        $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target', '_blank').text(moreInfoButton.uk);
      } else {
        $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target', '_blank').text(moreInfoButton[pano.getVariableValue('lang')]);
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
      $('.info-v1 > .head > .baumit-img').append("<img class='baumit-img' src='" + imgSrc + "'/>"); ////console.log('je je zmena');

      pano.setVariableValue('infopanel', true);
      lang = pano.getVariableValue('lang');
      productNameSave = product_id; // var key = productNameSave+productSuffix[lang];
      // ////console.log(key);
      // var imgSrc = 'https://int.baumit.com/'+ productData[lang][key]['image'];
      // $('.info-v1 > .head > .baumit-img').append("<img class='baumit-img' src='"+imgSrc+"'/>");
      // //$('.info-v1 > .head > .baumit-img > img').attr('src', imgSrc);
      // var urlTarget = urlPrefix[lang]+productData[lang][key]['details_url'];
      // var a = document.createElement("a");
      // $('.info-v1 > .head > .content').append(a);
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
      // $('.info-v1 > .head > .content > h2').append(productData[lang][key]['name']);
      // $.each( productData[lang][key], function( i, el ) {
      //     var y = '';
      //     y = i;
      //     if (
      //         y.includes('product_benefit') &&
      //         y.indexOf('description') < 1
      //         ) {
      //         $('.content > ul').append("<li><span>" + el + "</span></li>");
      //     }
      // }); 
      // $('.info-v1 > .body > p').append(productData[lang][key]['description']);
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
        $('.viva-house-info > div > .content > h1').text(noData);
        $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(noData);
        $('.viva-house-info > div > .content > .row > p').text(noData);
        $('#viva-second').addClass('hidden');
      } else {
        if (housesData[lang]['additional_content'][8] == null || housesData[lang]['additional_content'][8] == 'undefined' || housesData[lang]['additional_content'][8] == '') {
          $('.viva-house-info > div > .content > h1').text(noData);
        } else {
          $('.viva-house-info > div > .content > h1').text(housesData[lang]['additional_content'][8]['title']);
        }

        if (housesData[lang]['additional_content'][13] == null || housesData[lang]['additional_content'][13] == 'undefined' || housesData[lang]['additional_content'][13] == '') {
          $('.viva-house-info > div > .content > h1').text(noData);
        } else {
          $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(housesData[lang]['additional_content'][13]['content']);
        }

        if (housesData[lang]['additional_content'][16] == null || housesData[lang]['additional_content'][16] == 'undefined' || housesData[lang]['additional_content'][16] == '') {
          $('.viva-house-info > div > .content > h1').text(noData);
        } else {
          $('.viva-house-info > div > .content > .row > p').text(housesData[lang]['additional_content'][16]['title']);
        }

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

          if (moreInfoButton[lang] == undefined || moreInfoButton[lang] == null || moreInfoButton[lang] == 'undefined') {
            $('#house-url').attr('href', tmpLink).text(moreInfoButton.uk);
          } else {
            $('#house-url').attr('href', tmpLink).text(moreInfoButton[lang]);
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

function getHousesValues(lang, houseID, housesUrl) {
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
              var layers_data = ['name', 'description', 'image', 'details_url', 'product_benefit_1', 'product_benefit_2', 'product_benefit_3'];
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
    }).fail(function () {//console.log( "Chyba pri načítavaní produktov" );
    });
  } else {
    //console.log('dátový model už je načítaný');
    //checkHotspots();
    loadIntroData();
  }

  console.log(housesValues);
}

pano.on('configloaded', function (Tooltips) {
  pano.setVariableValue('lang', 'int');
  lang = pano.getVariableValue('lang');
  Tooltips = $('.viva-tooltip');
  getProductLink(lang);
  getHousesLink(lang);
  getHousesValues(lang, houseID, housesUrl); //loadProductData(housesUrl,lang);

  pano.addListener('varchanged_lang', function () {
    lang = pano.getVariableValue('lang');
    getProductLink(lang);
    getHousesLink(lang); //loadProductData(housesUrl,lang);

    getHousesValues(lang, houseID, housesUrl);
  });
  pano.on('changenode', function nodechange() {
    showVivaIntro();
    checkHotspots();
    ToolTips.push($('.viva-tooltip'));
    hideTooltips(); //checkHotspots2();

    currentNode = pano.getCurrentNode();

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
  });
});
pano.addListener('varchanged_houseInfo', function () {
  switch (pano.getVariableValue('houseInfo')) {
    case true:
      ShowElement(['.viva-house-info']);
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