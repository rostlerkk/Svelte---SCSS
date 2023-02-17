"use strict";

let text = 'loading configuration';
$('#intro > p').text('loading configuration');
$('#intro').append('<span></span>');


$.html5Loader({
    filesToLoad:    'assets/json/data.json', // this could be a JSON or simply a javascript object
    onBeforeLoad:       function () {
        ////////console.log('preloaer spustený');
    },
    onComplete:         function () {
        ////////console.log('načítané dáta');
    },
    onElementLoaded:    function ( obj, elm) { 
        ////////console.log(obj);
        ////////console.log(elm);
    },
    onUpdate:           function ( percentage ) {
        ////////console.log(percentage);
        $('#intro > p').text(text +' '+ percentage + '%');
    }
});

pano.on("tilesready", function() {
   // $('#intro > p').text('loading panoramas');
});

// global variables
var productData = {};
let productDataNew = {};
var housesData = {};
var subtitlesData = {};
var productUrl = '';
var housesUrl = '';
var subtitlesUrl = '';
var currentNode = '';
var ToolTips = [];
var lang = '';
var videoDuration = 0;
var videoDurationHalf = 0;
let video_nacitane = false;
var play = true;
var tmpID;
var dataModelUpdating = false;
var vid;
var patchName;
var houseID = '';
const loader = '<div id="progress"><img src="images/loader.svg" class="hotspot-loader"><p class="status">načítavam ... </p></div>';
let allVideos = ['Exterier_01','Exterier_02','Exterier_03','Exterier_04','Exterier_05','Exterier_06','Exterier_07','Exterier_08','Exterier_09','Exterier_10','Exterier_11','Exterier_12','Exterier_13','Interier_01','Interier_02','Interier_03','Interier_04','Interier_05','Interier_06','Interier_07','Interier_08','Interier_09','Interier_11','Interier_12','Interier_13'];
var productNameSave = '';
var moreInfoButton = {
    cz : 'Více info',
    sk : 'Viac info',
    uk : 'More info'
}

var productLang = '';
var noData = 'No data in API';
let a_video = 'video_1';

const map_iframe = {
    int : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sen!2sen',
    en : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sen!2sen',
    de : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
    at : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
    ch : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
    sk : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1ssk!2ssk',
    
}

const apiToken = {
    cz : 'ZsqPYpxsPHK3EpNwK6l7nOOyoTHIrw21Aw2pAh10BfV3mSl8he06rz1IsJNA',
    sk : 'uuPus1j6IOdtp9p5EKzpusgd2TlXMuDK7C33qC8yof4IvMNCyzIPQEV9dfSI',
    at : 'EJVpr39eQqgZ3CtFudtsOA3QurptILYv6aLjQvOh9DX8VoAvNrRthOJyBXAu',
    de : 'bF6JRVySe9U1xOMWi2Kc8I5pzzgZcjT9LG0F1PrmDkOPHI9nKUBv5It3bjlY',
    hr : 'KdZMZzWIYcj4AVjJ3VK6WvV2zCCQfx5jzDqgXk1A1Er013JaTbqlSuDLPcTZ',
    rs : 'FEVesKJGbx1bEm9hsXijIZwV9E332FtvbFA01YxtKjEi1Sw3AMdT6Gp1uFMk',
    si : 'izOhuLDDFGmEeOTxj3s3x31ZTjgI4Ck5zfqK3X5cAlpgPW5piIxtGwtdX2ZH',
    ba : 'Sjuab7GbAKhg6XNFGkQgLJEJXAxQ6Omwru89ErJ48AfX5uvncjpyjdx4K9xY',
    int : 'AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0',
    ua : 'COyMGTwBy8YgEyZanLTWyTuaoGbDpTOB13BNAHAqDNLgU7PzbGouJKYcfZIo',
    fr : 'e2AwJInW59w310Ve0DUEBRLL1Je8eqkf4BTTHwtCbz2YIwjXS20TaMpPHdum',
    es : 'k2Mb4GufP8ED3B5wRQelPHY9NimPax2VDd8utmZKLNYc3IwdGuCiZRwe7fvF',
    cn : 'Wf4qqUqX5qoPSvT0EzQezjt2ieaIIOUTNSmHT9VPwCDbJ1tqgmN5E32RuOSz',
    gr : 'DADpDgerXpQ2QchZMpjN6Rsrx4q1s7m9r1AW4hcpWi2bH9DBfP2j998gJgKl',
    hu : 'zG3XR4VrL5ZWh7rQlCydbGd0ysYmCziX0VOhyhEx7A3xmE9fysWf9uYhrRQR',
    tr : 'RxX7fNvn9yiRmB3iGZtDYyyiMTA9nUmqXZg7dCoXP55XnOyvXJKEjr12iuhe',
    ro : 'mrsKaiGNc28HA49VDcZjEnof8uvjJBa4pd45M6McUq0wR8T6gYWCDgsAy3i9',
    uk : 'xF8BmqraDqPNxx4LfcepYpqGde0oPbu7kRtARznJxxFTiD1PukPbcdZl9cPg',
    it : 'UYgEsu0OxQv8zkgPnOiVLh0TTGD0aiYe2GVog2o7ithQ8fadPYRr40GNOxDY',
    pl : '4vtMautl3wPGnzZLogvUE6x7tZkweWzo7vQBXJCVjZbtjxigxue33NRCahrR',
    lv : 'UBP0CW3yVvzlw24fmTgFrXIya84dV4rEQIjaCJT4G35BdMRbiVvIYdVb4cSQ',
    ru : 'llN4GmBb0uWIQlr9lyfaF7qR7DmDs733Fp8wkiJs0sduzwoEG9NBvqYpSONe',
    by : 'xARlEVKEW4lpeuyGt8Hb8LnY63P9SjMopyEKlemGSOTzsGZ1MD6wIZvCGBs0',
    bg : 'cEyeSbL3VQDR9kLRUCWuHIqOT5ID59T05VVbNNbkm0bylEylgIfsDBvpAgqJ',
    lt : 'jgqtiedWmx17W0csUqPuaYNf1JqOCAytsdec8k739pljn83OEBft2vixQ9jn',
    ee : '7c0WUsKukTHuIw2rix2E7eRfn9wVSrd89hwNJLgtBz4JfHUh2UPclt4bQvZI',
    mk : 'JhFW6xr1bV0HjEhyCv4pIvK3X9ZMPsa25YaNkjlAPQL2izaZwvaWMNagpO00',
    beNl : 'cqElSqSIpHckBG14OZAxTIzUlA4i2lIHaFzMNVYgTW5zfOeyk6FiMIWU1FtP',
    ch : 'PoCX0p3qavOP4RL8Ke7ZiGUhidi6iT69zZ7QHNo8OOiatgjdES4iDXqeEz9p',
    md : 'M3Amm8ZznQ3BoROYdKeq2iEtwSjPoFc9Egf4wV8JerAMnkQvbzakElhNHCIS',
    beFr : 'M73nHM2cKlyK8WRkmNjGHhhEtgpq5xrvBcwgxrpXCZLoEFyiiLhxaeRTpdt2'    
}

const productSuffix = {
    cz : 'BCZ',
    sk : 'BSK',
    at : 'BAT',
    de : 'BDE',
    hr : 'BHR',
    rs : 'BRS',
    si : 'BSI',
    ba : 'BBA',
    int : 'INT',
    ua : 'BUA',
    fr : 'BFR',
    es : 'BES',
    cn : 'BCN',
    gr : 'BGR',
    hu : 'BHU',
    tr : 'BTR',
    ro : 'BRO',
    uk : 'BUK',
    it : 'BIT',
    pl : 'BPL',
    lv : 'BLV',
    ru : 'BRU',
    by : 'BBY',
    bg : 'BBG',
    lt : 'BLT',
    ee : 'BEE',
    mk : 'BMK',
    beNl : 'BBE',
    ch : 'BCH',
    md : 'BRO',
    beFr : 'BBE'
}

const urlPrefix = {
    en : 'https://baumit.co.uk',
    sk : 'https://baumit.sk',
    cz : 'https://baumit.cz',
    at : 'https://baumit.at',
    de : 'https://baumit.de',
    hr : 'https://baumit.hr',
    rs : 'https://baumit.rs',
    si : 'https://baumit.si',
    ba : 'https://baumit.ba',
    ua : 'https://baumit.ua',
    fr : 'https://baumit.fr',
    es : 'https://baumit.es',
    cn : 'https://baumit.cn',
    gr : 'https://baumit.gr',
    hu : 'https://baumit.hu',
    tr : 'https://baumit.com.tr',
    ro : 'https://baumit.ro',
    uk : 'https://baumit.co.uk',
    it : 'https://baumit.it',
    pl : 'https://baumit.pl',
    lv : 'https://baumit.lv',
    ru : 'https://baumit.ru',
    by : 'https://baumit.by',
    bg : 'https://baumit.bg',
    lt : 'https://baumit.lt',
    ee : 'https://baumit.ee',
    mk : 'https://baumit.mk',
    nl : 'https://baumit.nl',
    ch : 'https://baumit.ch',
    md : 'https://baumit.md',
    beNl : 'https://baumit.be',
    beFr : 'https://fr.baumit.be',
    int : 'https://int.baumit.com'
}

function getProductLink(lang) {
    productUrl = urlPrefix[lang]+'/api/products/products?api_token='+apiToken[lang];
    ////////////console.log(productUrl);
    return productUrl;
}

function getHousesLink(lang) {
    housesUrl = urlPrefix[lang]+'/api/buildings?api_token='+apiToken[lang];
    ////////console.log(housesUrl);
    return housesUrl;
}

function getSubtitlesLink(lang) {
    subtitlesUrl = urlPrefix[lang]+'/api/building-tour-translations?api_token='+apiToken[lang];
    //////////console.log(subtitlesUrl);
}

function addLoader(text) {
    if (
        $('#progress').length < 1
    ) {
        $('#container').append(loader);
        $('p.status').text(text);
    }

    else {
        $('p.status').text(text);
    }
    
}

function loadProductData_backup(productUrl,lang) {
    addLoader('loading products data');

    if (
        productData[lang] == undefined ||
        productData[lang] == null ||
        productData[lang] == ''
    ) {        
        productData[lang] = {};
        var searchID = 'pro_epim_productnr';
        var tmpProductsData = $.getJSON( productUrl, function( products ) {
            $.each( products, function( key, val ) {
                var tmpID = products[key][searchID];
                ////////////console.log(val);
                productData[lang][tmpID] = val;
            });
        }).done(function() {
            ////////////console.log('Products loaded successfull');
            getHousesLink(lang);
            getSubtitlesLink(lang);
            loadHousesData(housesUrl,lang);
            loadSubtitlesData(subtitlesUrl,lang);


            
          })
          .fail(function() {
            ////////////console.log( "Products loading error" );
        })
        ;
    }

    else {
        ////////////console.log('dátový model už je načítaný');
        checkHotspots();
        loadIntroData();
    }
    //////////console.log(productData);
}

function loadProductData(housesUrl,lang) {
    addLoader('loading products data');

    if (
        productData[lang] == undefined ||
        productData[lang] == null ||
        productData[lang] == ''
    ) {        
        productData[lang] = {};
        var searchID = 'pro_epim_productnr';
        var tmpProductsDataNew = $.getJSON( housesUrl, function( products ) {
            $.each( products, function (index, val) {
                if (
                    index == 'buildings'
                ) {
                    $.each( val, function (i, data) {
                        
                        if (
                            data['layers'] != null
                        ) {

                            $.each(data['layers'], function (count, values) {
                                let pro_epim_productnr = values['products']['pro_epim_productnr'];
                                if (
                                    productData[lang][pro_epim_productnr] == null ||
                                    productData[lang][pro_epim_productnr] == 'undefined' 
                                ) {
                                    productData[lang][pro_epim_productnr] = {};
                                }

                                productData[lang][pro_epim_productnr]['id'] = values['products']['pro_epim_productnr'];
                                productData[lang][pro_epim_productnr]['name'] = values['products']['name'];
                                productData[lang][pro_epim_productnr]['details_url'] = values['products']['details_url'];
                                productData[lang][pro_epim_productnr]['description'] = values['products']['description'];
                                productData[lang][pro_epim_productnr]['image'] = values['products']['image'];
                                for (let index = 0; index < 10; index++) {    
                                    if (
                                        values['products']['product_benefit_'+index]
                                    )
                                    {
                                        productData[lang][pro_epim_productnr]['product_benefit_'+index] = values['products']['product_benefit_'+index];
                                    }                                        
                                    
                                }                                    
                            });
                        };
                    });

                    
                }
                
            });
        }).done(function() {
            //////////console.log('Produkty načítané v poriadku');
            getHousesLink(lang);
            getSubtitlesLink(lang);
            loadHousesData(housesUrl,lang);

            


            loadSubtitlesData(subtitlesUrl,lang);
            
            loadSubtitlesData(subtitlesUrl,'int');
            generate_baumit_data();
            
          })
          .fail(function() {
            //////////console.log( "Chyba pri načítavaní produktov" );
        });
    }

    else {
        //////////console.log('dátový model už je načítaný');
        checkHotspots();
        loadIntroData();
        //houses_tour();;
        //add_screens();
    }
    //////////console.log(productData);

   

};

function change_floorplan_node_title ($housesData, $lang) {

    if ( $housesData[$lang]) {
        $.each ($('.ggskin_cloner > div'), function () {
            //////////console.log($(this).find('div > div > p').html());
            switch ($(this).index()) {
                case 0 : 
                break;
    
                default : 
                $(this).find('div > div > p').html($housesData[$lang]['buildings'][$(this).index()-1].house_nr);
                break;
            }
            
        });    
    }
    
}

function loadHousesData(housesUrl, lang) {
    if (
        housesData['int'] == undefined ||
        housesData['int'] == null ||
        housesData['int'] == ''
    ) {
        housesData['int'] = {
        };

        let int_housesUrl = 'https://int.baumit.com/api/buildings?api_token=AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0';
    var intHousesData = $.getJSON( int_housesUrl, function( data ) {
        $.each( data, function( key, val ) {
            if (
                key == 'buildings'
            ) {
                housesData['int']['buildings'] = val;
            }
            else if (key == 'additional_content') {
                //////console.log(val);
                housesData['int']['additional_content'] = val;
            }
        });
    })
    .done(function() {
        ////////////console.log('Houses loaded successfull');
        // changePanoTitle(lang, housesData);
        // checkHotspots();
        // loadIntroData();
        // welcome_screen();
        //houses_tour();;
        //add_screens();

        if (
            housesData[lang]['buildings'] != undefined
        ) {
            $.each ($('.swiper-slide'), function (index, data) {
                //////////console.log(housesData[pano.getVariableValue('lang')]);
                switch ($('.swiper-slide').eq(index).attr('data-url')) {
                    case 'node1' : 
                    $('.swiper-slide').eq(index).find('.node-title').html('Viva Park');
                    break;
                    default : 
                    
                    if (
                        housesData[lang]['buildings'][index-1] != undefined
                    ) {
                        $('.swiper-slide').eq(index).find('.node-title').html(housesData[lang]['buildings'][index-1].house_nr);
                    }
                        
                    break;
                }
            });

            change_floorplan_node_title (housesData, pano.getVariableValue('lang'));
            removeIntroAnimation();

            // Zmena textu Buttonu Interaktívny 3D model
            $('.orientation-button.model-off > div').html('Interactive 3D model');
            if (
                housesData[lang]['additional_content']
            ) {
                if (housesData[lang]['additional_content'][26]) {
                    if (housesData[lang]['additional_content'][26]['title']) {
                        $('.orientation-button.model-off > div').html(housesData[lang]['additional_content'][26]['title']);
                    }
                }
            }
        
            // zmena jazyka pre Google mapu
            if (
                map_iframe[lang] != null &&
                map_iframe[lang] != 'undefined' &&
                map_iframe[lang] != undefined
                ) {
                // ////////console.log(map_iframe[lang]);
                pano.setVariableValue('map_iframe', map_iframe[lang]);
                $('.map > iframe').attr('src', map_iframe[lang]);
                
            }
    
            else {
                // ////////console.log(map_iframe[int]);
                pano.setVariableValue('map_iframe', map_iframe['int']);
                $('.map > iframe').attr('src', map_iframe['int']);
                
                
            }

            // zmena loga 
            if (
                $('.vp-logo')
                
            ) {
                if (
                    housesData[lang]['additional_content'][15] != ''  && 
                    housesData[lang]['additional_content'][15] != null    
                ) {
                    if (
                        housesData[lang]['additional_content'][15]['media'] != ''  && 
                        housesData[lang]['additional_content'][15]['media'] != null    
                    ) {
                        $('.vp-logo > img').attr('src', housesData[lang]['additional_content'][15]['media']);
                        ////////console.log('logo : ' + housesData[lang]['additional_content'][15]['media']);
                    }
            
                    else {
                        $('.vp-logo > img').attr('src', 'images/vivapark-logo.svg');
                        ////////console.log('Logo nie je ');
                    }
                }
            }

            else {
                $('.vp-logo > img').attr('src', 'images/vivapark-logo.svg');
            }
            $('.vp-logo').on('click tap', function () {
            window.location = 'https://tour.baumit.com/';
            });
        }
      })
    }

    else {
        ////////////console.log('dáta domov už mám');
        checkHotspots();
        $('#progress').remove(); 
    }

    

    addLoader('loading houses data');
    if (
        housesData[lang] == undefined ||
        housesData[lang] == null ||
        housesData[lang] == '' || 
        lang == 'int'
    ) {
        housesData[lang] = {
        };
        var tmpHousesData = $.getJSON( housesUrl, function( data ) {
            
            $.each( data, function( key, val ) {
                if (
                    key == 'buildings'
                ) {
                    housesData[lang]['buildings'] = val;
                }
                else if (key == 'additional_content') {
                    //////console.log(val);
                    housesData[lang]['additional_content'] = val;
                }
            });
        })
        .done(function() {
            ////////////console.log('Houses loaded successfull');
            changePanoTitle(lang, housesData);
            checkHotspots();
            loadIntroData();
            welcome_screen();
            //houses_tour();;
            //add_screens();

            $.each ($('.swiper-slide'), function (index, data) {
                //////////console.log($(this).html());
                
                
                //////////console.log(housesData[pano.getVariableValue('lang')]);
                switch ($('.swiper-slide').eq(index).attr('data-url')) {
                    case 'node1' : 
                    $('.swiper-slide').eq(index).find('.node-title').html('Viva Park');
                    break;
                    default : 
                    
                    if (
                        housesData[lang]['buildings'][index-1] != undefined
                    ) {
                        $('.swiper-slide').eq(index).find('.node-title').html(housesData[lang]['buildings'][index-1].house_nr);
                    }
                        
                    break;
                }
            });

            change_floorplan_node_title (housesData, pano.getVariableValue('lang'));
            removeIntroAnimation();

            // Zmena textu Buttonu Interaktívny 3D model
            $('.orientation-button.model-off > div').html('Interactive 3D model');
            if (
                housesData[lang]['additional_content']
            ) {
                if (housesData[lang]['additional_content'][26]) {
                    if (housesData[lang]['additional_content'][26]['title']) {
                        $('.orientation-button.model-off > div').html(housesData[lang]['additional_content'][26]['title']);
                    }
                }
            }

            // zmena jazyka pre Google mapu
            if (
                map_iframe[lang] != null &&
                map_iframe[lang] != 'undefined' &&
                map_iframe[lang] != undefined
                ) {
                // ////////console.log(map_iframe[lang]);
                pano.setVariableValue('map_iframe', map_iframe[lang]);
                $('.map > iframe').attr('src', map_iframe[lang]);
                
            }

            else {
                // ////////console.log(map_iframe[int]);
                pano.setVariableValue('map_iframe', map_iframe['int']);
                $('.map > iframe').attr('src', map_iframe['int']);
                
                
            }

            // zmena loga 
             // zmena loga 
            
             ////////console.log('načítavam logo');
             ////////console.log(housesData);
             if (
                 $('.vp-logo')
                 
             ) {
                 if (
                     housesData[lang]['additional_content'][15] != ''  && 
                     housesData[lang]['additional_content'][15] != null    
                 ) {
                     if (
                         housesData[lang]['additional_content'][15]['media'] != ''  && 
                         housesData[lang]['additional_content'][15]['media'] != null    
                     ) {
                         $('.vp-logo > img').attr('src', housesData[lang]['additional_content'][15]['media']);
                         ////////console.log('logo : ' + housesData[lang]['additional_content'][15]['media']);
                     }
             
                     else {
                         $('.vp-logo > img').attr('src', 'images/vivapark-logo.svg');
                         ////////console.log('Logo nie je ');
                     }
                 }
             }
 
             else {
                 $('.vp-logo > img').attr('src', 'images/vivapark-logo.svg');
             }
             $('.vp-logo').on('click tap', function () {
                window.location = 'https://tour.baumit.com/';
             });
             
            
          })
          .fail(function() {
            ////////////console.log( "houses loading error" );
        });

        ////////console.log(housesData);
    }

    else {
        ////////////console.log('dáta domov už mám');
        checkHotspots();
        $('#progress').remove(); 
    }
   // //////////console.log(housesData);
}

function playPauseMedia($val) {
    ////console.log('idem spúštať animáciu');
    let patchName = pano.getNodeUserdata(pano.getCurrentNode()).title;

    if (
        pano.getMediaObject(patchName) != null
    ) {
        if (
            pano.getMediaObject(patchName) == null
        ) {
            ////console.log('nullka');
            return;     
        }
        //console.log(pano.getMediaObject(patchName).currentTime);
        
        if ( 
            videoDuration == 0 ||
            videoDurationHalf == 0 
    
            // pano.getMediaObject(patchName).currentTime == 0
        ) {
            ////console.log('teraz nemôžem prehrať');
            // vid = document.getElementById("vid1"); 
            vid = document.getElementById(patchName); 
            ////console.log(vid);
            ////console.log(pano.getMediaObject(patchName).duration);
    
            // pano.getMediaObject(patchName).on('durationchange', function() {
            //     ////console.log('zmenil sa čas' + pano.getMediaObject(patchName).currentTime);
            // });
    
            if (
                vid == null
            ) {
                //return;
            }    
            // videoDuration = vid.duration;
            videoDuration = pano.getMediaObject(patchName).duration;
            videoDurationHalf = (videoDuration/2) -0.20;
            ////////console.log('Môžem prehrať 2 videá naraz');
            ////////console.log(videoDuration+' | '+pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue);
        }
        
        else {
            ////console.log('teraz idem preháať');
            ////////console.log(videoDuration+' | '+pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue);
        
            if ( pano.isPlaying(patchName) == true) {
                ////console.log('Nemôžem prehrať 2 videá naraz');
            }
    
            else {
                ////console.log('sdflsddf');
                vid.ontimeupdate = function() {
                    if (play == true || pano.isPlaying(patchName) == false) {
                        if(this.currentTime >= videoDurationHalf ) {       
                            pano.pauseSound(patchName);
                            play = false;
                            video_nacitane = true;
                            $('.viva-tooltip').removeClass('hidden');
                            
                            return false;
                        }
                    }
                    else {
                        hideTooltips();
                        pano.getMediaObject(patchName).addEventListener('ended', function() {
                            play = true;
                            hideTooltips();
                        });
                    }
                };
    
                if (
                    video_nacitane == true &&
                    $val == false
                ) {
    
    
                }
    
                else {
                    //pano.setVolume(patchName, 0.0);
                    pano.playSound(patchName, "1");
                    
                }
                
            }
        }
    }


}

function playMedia() {
    // ////////console.log('Play media');
    // play = true;
    // vid.ontimeupdate = function() {
    //     if (play == true || pano.isPlaying(patchName) == false) {
    //         if(this.currentTime >= videoDurationHalf ) {       
    //             pano.pauseSound(patchName);
    //             play = false;
    //             $('.viva-tooltip').removeClass('hidden');
    //             return false;
    //         }
    //     }
    //     else {
    //         hideTooltips();
    //         pano.getMediaObject(patchName).addEventListener('ended', function() {
    //             play = true;
    //             hideTooltips();
    //         });
    //     }
        
    // };
    // pano.playSound(patchName, "1");
}

function hideTooltips() {
    var ToolTipsCount = ToolTips.length;
    for (let index = 0; index < ToolTipsCount; index++) {
        ToolTips[index].addClass('hidden');   
    }
}

function removeIntroAnimation() {
    pano.setVariableValue('blurred', false);
    pano.setVariableValue('intro', false);
    addClass(['.mobile-footer'],'active');
    $("#intro").fadeOut("slow", function() {
        $(this).remove();
    });
}

let pointshotspots, pointshotspotsNew;

function checkHotspots() {
    addLoader('loading hotspots data'); 
    let pointshotspots = pano.getCurrentPointHotspots();
    let pointHotspotsNew = [];
    let removeItem = 'viva-tooltip';
    //////////console.log('hľadám hotspoty');

    for (let index = 0; index < pointshotspots.length; index++) {
        
        if (
            pointshotspots[index]['className'].indexOf(removeItem) > 0
        ) {
            pointHotspotsNew.push(pointshotspots[index]);
        }        
    }

    //////////console.log(pointHotspotsNew);

    let houseID = pano.getNodeUserdata(currentNode).source; // ID domu
    let houseTitle = pano.getNodeUserdata(currentNode).title; // ID document
    //////////console.log(houseTitle);
    let position;

    if (
        houseTitle.indexOf('Interier') >= 0
    )
    {
        position = 'interior'
    }

    else {
        position = 'exterior';
    }

    for (let index = 0; index < pointHotspotsNew.length; index++) {
        //////////console.log(housesValues[lang][houseID][position][index+1]['name']);
        //pointHotspotsNew[index]['textContent'] = housesValues[lang][houseID][position][index+1]['name'];


        if (
            housesValues[lang][houseID] &&
            housesValues[lang][houseID][position][index+1] &&
            housesValues[lang][houseID][position][index+1] != 'undefined'
            
            //housesValues[lang][houseID][position][index+1]['products']['id'] != -1
        ){
            if (
                housesValues[lang][houseID][position][index+1]['id'] == -1
            ) {
                $('.viva-tooltip').eq(pointHotspotsNew.length-index-1).attr('data-open','no').children('.triangle-left').removeClass('hover');
            }

            else {
                $('.viva-tooltip').eq(pointHotspotsNew.length-index-1).attr('data-open','true').children('.triangle-left').addClass('hover');    
            }
            $('.viva-tooltip').eq(pointHotspotsNew.length-index-1).children().children().html(housesValues[lang][houseID][position][index+1]['name']);
            $('.viva-tooltip').eq(pointHotspotsNew.length-index-1).removeClass('removed');
            $('.viva-tooltip').eq(pointHotspotsNew.length-index-1).attr('data-product', index+1).attr('data-position', position);

        }
        else {
            $('.viva-tooltip').eq(pointHotspotsNew.length-index-1).addClass('removed');
        }

        
    }

    $('#progress').remove();
    

    //////////console.log(position);
    
}

function checkHotspots_backup() {

        addLoader('loading hotspots data');
        
        // var hotspotsArray = pano.getCurrentPointHotspots();
        // var hotspotsArrayLength =  hotspotsArray.length;
        // ////////////console.log('čekujem');
    
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
        //                 ////////////console.log(tmpSearchingID);
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
        var hotspotsArrayLength =  hotspotsArray.length;
        ////////////console.log('čekujem 2');
        //////////console.log(hotspotsArray);
    
        var tmpProductId;
        var sep = ' ';
        var tmpLang = pano.getVariableValue('lang');
    
        for (var i = 0; i < hotspotsArrayLength; i++) {
    
            // hide all Hotspots
    
            if (hotspotsArray[i].className.indexOf('delete') < 0)
            {
                hotspotsArray[i].className = hotspotsArray[i].className+' delete';
            }
            
            if (hotspotsArray[i].className.indexOf('viva-tooltip') > -1) 
                {
                    tmpProductId = hotspotsArray[i].textContent.substring(hotspotsArray[i].textContent.indexOf("|") + 1);
    
                    // priradenie data-id k hotspotom
                    if (tmpProductId != '') {
                            if (
                                hotspotsArray[i].className.indexOf(tmpProductId) >= 0
                            ) {
                            }
                            else {
                                hotspotsArray[i].className = hotspotsArray[i].className+sep+tmpProductId;        
                                $('.'+tmpProductId).attr('data-id',tmpProductId);
                            } 
                    }
                }
    
                if (tmpProductId != '') {
                    var tmpSearchingID = tmpProductId+productSuffix[lang];
                    if (
                        productData[lang][tmpSearchingID] == undefined ||
                        productData[lang][tmpSearchingID] == null ||
                        productData[lang][tmpSearchingID] == ''
                    )
                    {
                        
                    }
    
                    else {
                        ////////////console.log(tmpSearchingID);
                        //$('.viva-tooltip[data-id="'+tmpProductId+'"] > div > div').text(dataModel[tmpLang][tmpSearchingID].name);
                        var newTmpContent = '<div class="hts-title">'+productData[lang][tmpSearchingID].name+'</div><span>|'+tmpProductId+'</span>';
                        $('.viva-tooltip[data-id="'+tmpProductId+'"] > div > div').html(newTmpContent);
                        hotspotsArray[i].className = hotspotsArray[i].className.replace('delete', '');
                    }
                }
            else {
                hotspotsArray.splice(i, 1);
                i--;
            }
        }
        
        
        
        if (
            housesData[lang]['additional_content'][18] == undefined ||
            housesData[lang]['additional_content'][18] == null ||
            housesData[lang]['additional_content'][18] == 'undefined' 
        )
        {
           $('p.status').text('loading panorama');
        }

        else {
            //////////console.log(housesData[lang]['additional_content']);
            $('p.status').text(housesData[lang]['additional_content'][18]['text']);
        }

        pano.on('tilesready', function addPatch() {
            $('#progress').remove();    
        });

        
}

function nacitajData(productName, product_id, position, open) {
    //////////console.log(position);
    if (
        productNameSave == product_id &&
        productLang == pano.getVariableValue('lang') &&
        open != 'no'
        ) {
        $('.hotspot-loader').remove();
            pano.setVariableValue('infopanel', true);
    }
    else {
        if (
            product_id == '' ||
            product_id == undefined ||
            product_id == null ||
            open == 'no'
        ) {}
        else {
            $('.info-v1 > .head > .content > h2').empty();
            let houseID = pano.getNodeUserdata(currentNode).source; // ID domu
            $('.info-v1 > .head > .content > h2').html(housesValues[lang][houseID][position][product_id]['name']);

            $('.info-v1 > .head > .content > a').remove();
            var urlTarget = urlPrefix[lang]+housesValues[lang][houseID][position][product_id]['details_url'];
            var a = document.createElement("a");
            
            $('.info-v1 > .head > .content').append(a);

            
            //////////console.log(housesData[lang]);
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

            if (
                housesData[lang]['additional_content'][24] == undefined ||
                housesData[lang]['additional_content'][24] == null ||
                housesData[lang]['additional_content'][24] == 'undefined' 
            )
            {
                $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target','_blank').text(moreInfoButton.uk);
            }

            else {
                
                //////////console.log(housesData[lang]['additional_content'][19]['title']);
                $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target','_blank').text(housesData[lang]['additional_content'][24]['title']);
            }
            
            
            $('.content > ul').empty();
             $.each( housesValues[lang][houseID][position][product_id], function( i, el ) {
                var y = '';
                y = i;
                if (
                    y.includes('product_benefit') &&
                    y.indexOf('description') < 1
                    ) {
                    $('.content > ul').append("<li><span>" + el + "</span></li>");
                }
            }); 

            $('.info-v1 > .body > p').empty();
            $('.info-v1 > .body > p').html(housesValues[lang][houseID][position][product_id]['description']);
            $('.info-v1 > .head > .baumit-img > img').remove();

            let imgSrc = 'https://int.baumit.com/'+ housesValues[lang][houseID][position][product_id]['image'];
            $('.info-v1 > .head > .baumit-img').append("<img class='baumit-img' src='"+imgSrc+"'/>");
            pano.setVariableValue('infopanel', true);
            lang = pano.getVariableValue('lang');
            productNameSave = product_id;
        }
    }
}

function showVivaIntro() {
    if (
        currentNode == 'node1' &&
        pano.getVariableValue('floorplan_full') == false &&
        pano.getVariableValue('take_tour') == false
    )  
    {
        $('.viva-start').removeClass('hidden');
    } 
    
    else {
        $('.viva-start').addClass('hidden');
    }
}

function houseInfo(data) {
    $('.viva-start').addClass('hidden');
    $('.viva-house-info > div > .content > h1' ).removeClass('hidden');  
    $('.viva-house-info > div > .content > .row').removeClass('hidden'); 
    $('.viva-house-info > div > .content > .row > .viva-second').removeClass('hidden'); 
    if (
        houseID !== 100
        ) { 
            $('#house-url').addClass('hidden');
            $('.viva-house-info > div > .content > h1' ).empty();
            $('.viva-house-info > div > .content > .headline' ).empty();
            $('.viva-house-info > div > .content > .row > p' ).empty();
            $('#yt').attr('src','');
            $('#yt-video').addClass('hidden');
            
            
        // ak ide o House 0
        if (
            data == 0
        ) {
            if (
                housesData[lang]['additional_content'].length == 0
            )
            {
                //$('.viva-house-info > div > .content > h1' ).text(noData); 
                //$('.viva-house-info > div > .content > .headline').removeClass('hidden').text(noData); 
                $('.viva-house-info > div > .content > .row > p').text(noData); 
                $('#viva-second').addClass('hidden');
            }

            else  {
                if (housesData[lang]['additional_content'][23]) {
                    $('.viva-house-info > div > .content > h1' ).text(housesData[lang]['additional_content'][23]['title']); 
                    $('.viva-house-info > div > .content > .row > p').text(housesData[lang]['additional_content'][23]['content']); 
                }

                else {
                    $('.viva-house-info > div > .content > h1' ).text('About the VIVA Park'); 
                    $('.viva-house-info > div > .content > .row > p').text('The Viva research park is Europe’s largest research facility for comparative building material studies.  Its main objective is to exactly measure and evaluate the impact of different construction materials to living comfort by simulating a typical user behavior.'); 
                }
                
                // if (
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

            
        }
        else {
            comfortLevelSwitch(data);
            var tmpHouseID = data-1;

            var tmpLength = housesData[lang]['buildings'].length;
            ////////////console.log(tmpLength);
            if (
                tmpLength == 0
            )

            {
                $('.viva-house-info > div > .content > h1' ).text(noData); 
                $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(noData); 
                $('.viva-house-info > div > .content > .row > p').text(noData); 
                $('#viva-second').addClass('hidden');
            }

            else {

                // Nadpisy
                if (
                    housesData[lang]['buildings'][tmpHouseID]['house_nr'] == null ||
                    housesData[lang]['buildings'][tmpHouseID]['house_nr'] == 'undefined' ||
                    housesData[lang]['buildings'][tmpHouseID]['house_nr'] == ''
                )

                {
                    $('.viva-house-info > div > .content > h1').text(noData);
                }

                else {
                    $('.viva-house-info > div > .content > h1').text(housesData[lang]['buildings'][tmpHouseID]['house_nr']);
                }

                // Headline
                if (
                    housesData[lang]['buildings'][tmpHouseID]['headline'] == null ||
                    housesData[lang]['buildings'][tmpHouseID]['headline'] == 'undefined' ||
                    housesData[lang]['buildings'][tmpHouseID]['headline'] == ''
                )

                {
                    $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(noData);
                }

                else {
                    $('.viva-house-info > div > .content > .headline').removeClass('hidden').text(housesData[lang]['buildings'][tmpHouseID]['headline']);
                }

                if (
                    housesData[lang]['buildings'][tmpHouseID]['text'] == null ||
                    housesData[lang]['buildings'][tmpHouseID]['text'] == 'undefined' ||
                    housesData[lang]['buildings'][tmpHouseID]['text'] == ''
                )

                {
                    $('.viva-house-info > div > .content > .row > p').text(noData);
                }

                else {
                    $('.viva-house-info > div > .content > .row > p').text(housesData[lang]['buildings'][tmpHouseID]['text']);
                }


                
                
                

                // URL link na button
                if (
                    housesData[lang]['buildings'][tmpHouseID]['link'] != '' &&
                    housesData[lang]['buildings'][tmpHouseID]['link'] != 'undefined'
                ) {
                    var tmpLink = housesData[lang]['buildings'][tmpHouseID]['link'];
    
                    if (

                        housesData[lang]['additional_content'][24]
                        // moreInfoButton[lang] == undefined ||
                        // moreInfoButton[lang] == null ||
                        // moreInfoButton[lang] == 'undefined' 
                    ) {
                        $('#house-url').attr('href',tmpLink).text(housesData[lang]['additional_content'][24]['text']); 
                    }
    
                    else {
                        $('#house-url').attr('href',tmpLink).text(moreInfoButton[uk]);
                    }

                    if (
                        housesData[lang]['additional_content'][19] == undefined ||
                        housesData[lang]['additional_content'][19] == null ||
                        housesData[lang]['additional_content'][19] == 'undefined' 
                    )
                    {
                        let houseID = pano.getNodeUserdata(currentNode).source; // ID domu
                        let houseTitle = pano.getNodeUserdata(currentNode).title; // ID document
                        //////////console.log(houseTitle);
                        let position;
                        var urlTarget = urlPrefix[lang]+housesValues[lang][houseID]['link'];

                        if (
                            houseTitle.indexOf('Interier') >= 0
                        )
                        {
                            position = 'interior'
                        }

                        else {
                            position = 'exterior';
                        }
                        //////////console.log(housesValues[lang][houseID]['link']);
                        
                        $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target','_blank').text(moreInfoButton.uk);
                        $('#house-url').attr('href',tmpLink).text(moreInfoButton.uk);
                    }
        
                    else {
                        //////////console.log(housesData[lang]['additional_content'][19]['title']);
                        $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target','_blank').text(housesData[lang]['additional_content'][19]['title']);
                        $('#house-url').attr('href',tmpLink).text(housesData[lang]['additional_content'][19]['title']);
                    }

                    $('#house-url').removeClass('hidden');
                }

                // YouTube video
                if (
                    housesData[lang]['buildings'][tmpHouseID]['media'] != '' &&
                    housesData[lang]['buildings'][tmpHouseID]['media'] != 'undefined' &&
                    housesData[lang]['buildings'][tmpHouseID]['media'] != null
                    ) 
                {
                    pano.setVariableValue('houseInfo', true);
                    var tmpMedia = housesData[lang]['buildings'][tmpHouseID]['media'];
                    var youtubeURL = 'https://www.youtube.com/embed/'+ tmpMedia.replace('https://youtu.be/','');
                    var tmpWidth = ($('#yt-video').width()/16)*9;
                    $('#yt').attr('src', youtubeURL).css({
                        'height':tmpWidth
                    });
                    $('#yt-video').removeClass('hidden');
                }

                ////////console.log(housesData[lang]['buildings'][tmpHouseID]);
                $('.viva-house-info > div > .parameters').remove();

                ////////console.log(housesData[lang]['buildings'][tmpHouseID]);


                if (
                    housesData[lang]['buildings'][tmpHouseID] != null &&
                    housesData[lang]['buildings'][tmpHouseID] != undefined &&
                    housesData[lang]['buildings'][tmpHouseID] != 'undefined'
                 ){

                // Parametre domu
                if (    
                        housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'] != '' &&
                        housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'] != 'undefined' &&
                        housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'] != null
                    ) 
                {   
                    
                    $('.viva-house-info > div').eq(0).append('<div class="parameters"></div>');
                    

                        $.each(housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'], function (index, value) { 
                            $('.viva-house-info > div > .parameters').append('<h3>' + housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['name'] + '</h3>'); 
                            if (
                                housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'] != '' &&
                                housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'] != 'undefined' &&
                                housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'] != null
                                ) 
                            {
                                $.each(housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'], function (i, data) { 
                                    $('.viva-house-info > div > .parameters').append(
                                        '<div class="parameter-title">' + 
                                            housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'][i]['parameter_name'] + '<span> i  ' + 
                                            '<div class="house-tooltip">' + 
                                                '<div class="house-tooltip-arrow">'+
                                                '</div>' + 
                                                '<div class="house-tooltip-inner">'+ housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'][i]['parameter_tooltip'] + 
                                                
                                                '</div>' + 
                                            '</div>' + 
                                            '</span>' +
                                        '</div>'
                                    );
    
                                    $('.viva-house-info > div > .parameters').append('<div class="parameter-bar"><div></div>');
                                });
                            }
                        });
                    }



                    $('.viva-house-info > div > .parameters > .parameter-title > span' ).on('click tap', function () {
                        $('.viva-house-info > div > .parameters > .parameter-title > span').not(this).children('.house-tooltip').removeClass('active');
                        $(this).children('.house-tooltip').toggleClass('active');
                    });
                    

                }

                else {
                    $('.viva-house-info > div > .content').addClass('full');
                }
            }



            if (
                housesData[lang]['buildings'][tmpHouseID] != null ||
                housesData[lang]['buildings'][tmpHouseID] != undefined
            ) {
                
                
            }          
        }


        houseID = data; 
        $('#progress').remove();
    }
    else { 
        //////////console.log('Dom je už načítaný');
    }

    pano.setVariableValue('houseInfo', true);

    let tmp_count_param = 0;

    if (
        housesData[lang]['buildings'][tmpHouseID] != null && 
        housesData[lang]['buildings'][tmpHouseID] != 'undefined'
    ) {
        $.each(housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'], function (index, value) { 
            $.each(housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'], function (i, data) { 
                ////////console.log(housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'][i]['value']);
    
                function animate_paramater() {
                    $('.parameter-bar').eq(tmp_count_param).children('div').addClass('p'+housesData[lang]['buildings'][tmpHouseID]['parameters']['groups'][index]['parameters'][i]['value']);
                    tmp_count_param = tmp_count_param + 1;
                    ////////console.log('teraz');
                }
                const myTimeout = setTimeout(animate_paramater, 50);
                
            });
        });
    }


}

function house_other_info(data) {
    $('.viva-start').addClass('hidden');
    $('.viva-house-info > div > .content > h1' ).removeClass('hidden');  
    $('.viva-house-info > div > .content > .row').removeClass('hidden'); 
    
    
    if (
        houseID !== 100
        ) { 
            $('#house-url').addClass('hidden');
            $('.viva-house-info > div > .content > h1' ).empty();
            $('.viva-house-info > div > .content > .headline' ).html(subtitlesData[lang]['house_6_method_3']);
            $('.viva-house-info > div > .content > .row > p' ).empty();
            $('#yt').attr('src','');
            $('#yt-video').addClass('hidden');
            
        }

            
        // ak ide o House 0
    pano.setVariableValue('houseInfo', true);
    $('.viva-house-info > div > .content > .row > .viva-second').addClass('hidden'); 
}

function comfortLevel(level) {
    window.randomize = function() {
	    $('.ko-progress-circle').attr('data-progress', level);
    }
    setTimeout(window.randomize, 200);
    
    $('.ko-progress-circle').click(window.randomize);
}

function comfortLevelSwitch(houseID) {
    
    if (
        currentNode == 'node1'
    ) {
        $('#viva-second').addClass('hidden');
    }
    else {
        var tmphouseid = houseID-1;
        ////////////console.log('tmphouseid je : '+tmphouseid);
        if (
            housesData[lang]['buildings'].length == 0
        )

        {
            $('#viva-second').addClass('hidden');
        }

        else {

            if (
                housesData[lang]['buildings'][tmphouseid]['house_comfort'] == null ||
                housesData[lang]['buildings'][tmphouseid]['house_comfort'] == 'undefined' ||
                housesData[lang]['buildings'][tmphouseid]['house_comfort'] == '' 
            )
            {
                $('#viva-second').addClass('hidden');
            }

            else {
                var tmpComfortLevel = housesData[lang]['buildings'][tmphouseid]['house_comfort'];
            ////////////console.log(tmpComfortLevel);
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
                default : 
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
    $.each($('.check-layer > div > span'), function() {
        var tmpComfortLevel = parseInt($(this).attr('id'));
        //////////console.log(tmpComfortLevel);
        var lang = pano.getVariableValue('lang');
        if (
            tmpComfortLevel > 0
        )
        
        {
            tmpComfortLevel--;
        }

        var number = housesData[lang]['buildings'][tmpComfortLevel]['house_comfort'];   
        ////////////console.log(number);
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

        if (
            number == null ||
            number == undefined ||
            number == ''
        ) {
            //$(this).siblings('.tooltip-level').text('null');
            $(this).siblings('.tooltip-level').remove();
            $(this).siblings('.ko-progress-circle').remove();
            
        }

        else {
            $(this).siblings('.tooltip-level').text(number);
            
        }
    });   
     
}

function load_logo() {
    ////////console.log('načítavam logo');
    let tmpLength = housesData[lang]['additional_content'].length;
    if (
        $('.vp-logo')
        
    ) {
        if (
            housesData[lang]['additional_content'][15] != ''  && 
            housesData[lang]['additional_content'][15] != null    
        ) {
            if (
                housesData[lang]['additional_content'][15]['media'] != ''  && 
                housesData[lang]['additional_content'][15]['media'] != null    
            ) {
                $('.vp-logo > img').attr('src', housesData[lang]['additional_content'][15]['media']);
            }
    
            else {
                $('.vp-logo > img').attr('src', 'images/vivapark-logo.svg');
            }
        }
    }

    else {
        $('.vp-logo > img').attr('src', 'images/vivapark-logo.svg');
    }
}

function loadIntroData() {
    //alert('agdg');
    //////////console.log(lang);
    if (
        housesData[lang]['additional_content'] != undefined
    ) {
        var tmpLength = housesData[lang]['additional_content'].length;
        ////////////console.log(tmpLength);
    
        // načítanie "zeleného" loga z API
        if (
            $('.vp-logo')
            
        ) {
            //////////console.log(housesData[lang]['additional_content'][15]['media']);
            if (
                housesData[lang]['additional_content'][15]['media'] != ''  && 
                housesData[lang]['additional_content'][15]['media'] != null    
            ) {
                $('.vp-logo > img').attr('src', housesData[lang]['additional_content'][15]['media']);
            }
    
            else {
                $('.vp-logo > img').attr('src', 'images/vivapark-logo.svg');
            }
            
        }
    
    
    
    
        if (
            tmpLength == 0
        )
    
        {
            ////////////console.log('empthy object !!!!!!!!!!!!!!!!!!!!');
            $('.viva-start .title > div > h1').text(noData);
            $('.viva-start .title > div > span.subtitle').text(noData);
            $('#quickTour').text(noData);
            $('#results').text(noData);
            $('#about').text(noData);   
            $('.viva-start .logo > div > img').attr('src','images/vivapark-logo.svg');
            $('.viva-start').removeClass('hidden');
            
        }
    
        else {
    
            $('.viva-start .title > div > h1').text(housesData[lang]['additional_content'][8]['title']);
            $('.viva-start .title > div > span.subtitle').text(housesData[lang]['additional_content'][8]['content']);
            $('#quickTour').text(housesData[lang]['additional_content'][9]['title']);
            $('#results').text(housesData[lang]['additional_content'][10]['title']);
            $('#about').text(housesData[lang]['additional_content'][11]['title']);
            //$('.viva-start .logo > div > img').attr('src',housesData[lang]['additional_content'][15]['media']);
            $('.viva-start .logo > div > img').attr('src','images/vivapark-logo.svg');
            $('.viva-start').removeClass('hidden');        
        }
    
             
    
        change_tooltip_names(lang, housesData);
    }


}

function tagInfo(value) {
    $('.headline').addClass('hidden');
    $('#viva-second').addClass('hidden');
    $('#yt-video').addClass('hidden');
    $('#house-url').addClass('hidden');
    $('.viva-house-info > div > .content > h1' ).removeClass('hidden');  
    $('.viva-house-info > div > .content > .row').removeClass('hidden'); 
    switch (value) {
        case 'Air Supply':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][1]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][1]['title'];
                var tmpContent = housesData[lang]['additional_content'][1]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break;
        case 'Global Temperature Sensor':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][3]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][3]['title'];
                var tmpContent = housesData[lang]['additional_content'][3]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break;
        case 'Humidifier':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][0]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][0]['title'];
                var tmpContent = housesData[lang]['additional_content'][0]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break;
        case 'Air Exhaust':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][2]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][2]['title'];
                var tmpContent = housesData[lang]['additional_content'][2]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break;
        case 'Built-in sensors':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][13]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][13]['title'];
                var tmpContent = housesData[lang]['additional_content'][13]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break; 
        case 'Temperature sensor':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][14]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][14]['title'];
                var tmpContent = housesData[lang]['additional_content'][14]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break;  
        case 'InteriorValues':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][6]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][6]['title'];
                var tmpContent = housesData[lang]['additional_content'][6]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 

                if (
                    housesData[lang]['additional_content'][6]['media'] != '' &&
                    housesData[lang]['additional_content'][6]['media'] != 'undefined' &&
                    housesData[lang]['additional_content'][6]['media'] != null
                    ) 
                {
                    pano.setVariableValue('houseInfo', true);
                    var tmpMedia = housesData[lang]['additional_content'][6]['media'];
                    var youtubeURL = 'https://www.youtube.com/embed/'+ tmpMedia.replace('https://youtu.be/','');
                    var tmpWidth = ($('#yt-video').width()/16)*9;
                    $('#yt').attr('src', youtubeURL).css({
                        'height':tmpWidth
                    });
                    $('#yt-video').removeClass('hidden');
                }
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break;   
        
        case 'House_6' : 
        if (
            housesData[lang]['additional_content'].length > 0 &&
            housesData[lang]['additional_content'][6]['content'] != null
        )
        {
            $('.viva-house-info > div > .content > .headline' ).html(subtitlesData[lang]['house_6_method_3']);
            
        }

        else {
            $('.viva-house-info > div > .content > h1' ).text(noData);
        }

        $('.viva-house-info > div > .content > .headline' ).removeClass('hidden');
        $('.viva-house-info > div > .content > .headline' ).css({
            'text-align' : 'center'
        });
        break;
        case 'Solidity':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][5]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][5]['title'];
                var tmpContent = housesData[lang]['additional_content'][5]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 

                if (
                    housesData[lang]['additional_content'][5]['media'] != '' &&
                    housesData[lang]['additional_content'][5]['media'] != 'undefined' &&
                    housesData[lang]['additional_content'][5]['media'] != null
                    ) 
                {
                    pano.setVariableValue('houseInfo', true);
                    var tmpMedia = housesData[lang]['additional_content'][5]['media'];
                    var youtubeURL = 'https://www.youtube.com/embed/'+ tmpMedia.replace('https://youtu.be/','');
                    var tmpWidth = ($('#yt-video').width()/16)*9;
                    $('#yt').attr('src', youtubeURL).css({
                        'height':tmpWidth
                    });
                    $('#yt-video').removeClass('hidden');
                }
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break;         
        case 'Insulation':
            if (
                housesData[lang]['additional_content'].length > 0 &&
                housesData[lang]['additional_content'][4]['content'] != null
            )
            {
                var tmpTitle = housesData[lang]['additional_content'][4]['title'];
                var tmpContent = housesData[lang]['additional_content'][4]['content'];
                $('.viva-house-info > div > .content > h1' ).text(tmpTitle);  
                $('.viva-house-info > div > .content > .row > p').text(tmpContent); 

                if (
                    housesData[lang]['additional_content'][4]['media'] != '' &&
                    housesData[lang]['additional_content'][4]['media'] != 'undefined' &&
                    housesData[lang]['additional_content'][4]['media'] != null
                    ) 
                {
                    pano.setVariableValue('houseInfo', true);
                    var tmpMedia = housesData[lang]['additional_content'][4]['media'];
                    var youtubeURL = 'https://www.youtube.com/embed/'+ tmpMedia.replace('https://youtu.be/','');
                    var tmpWidth = ($('#yt-video').width()/16)*9;
                    $('#yt').attr('src', youtubeURL).css({
                        'height':tmpWidth
                    });
                    $('#yt-video').removeClass('hidden');
                }
            }

            else {
                $('.viva-house-info > div > .content > h1' ).text(noData);
                $('.viva-house-info > div > .content > .row > p').text(noData); 
            }
        break;
        case 'Monitor':
            if (
                housesData[lang]['additional_content'].length > 0
            )
            {
                //var tmpTitle = housesData[lang]['additional_content'][7]['title'];
                //var tmpContent = housesData[lang]['additional_content'][7]['content'];
                $('.viva-house-info > div > .content > h1' ).addClass('hidden');  
                $('.viva-house-info > div > .content > .row').addClass('hidden'); 
                

                if (
                    housesData[lang]['additional_content'][7]['media'] != '' &&
                    housesData[lang]['additional_content'][7]['media'] != 'undefined' &&
                    housesData[lang]['additional_content'][7]['media'] != null
                    ) 
                {
                    pano.setVariableValue('houseInfo', true);
                    var tmpMedia = housesData[lang]['additional_content'][7]['media'];
                    var youtubeURL = 'https://www.youtube.com/embed/'+ tmpMedia.replace('https://youtu.be/','');
                    var tmpWidth = ($('#yt-video').width()/16)*9;
                    
                    $('#yt').attr('src', youtubeURL).css({
                        'height':tmpWidth
                    });
                    $('#yt-video').removeClass('hidden');
                }
            }


            else {

            }
        break;
        
        case 'Monitor2':
            if (
                housesData[lang]['additional_content'].length > 0
            )
            {
                //var tmpTitle = housesData[lang]['additional_content'][7]['title'];
                //var tmpContent = housesData[lang]['additional_content'][7]['content'];
                $('.viva-house-info > div > .content > h1' ).addClass('hidden');  
                $('.viva-house-info > div > .content > .row').addClass('hidden'); 
                

                if (
                    housesData[lang]['additional_content'][7]['media'] != '' &&
                    housesData[lang]['additional_content'][7]['media'] != 'undefined' &&
                    housesData[lang]['additional_content'][7]['media'] != null
                    ) 
                {
                    pano.setVariableValue('houseInfo', true);
                    var tmpMedia = housesData[lang]['buildings'][1]['media'];
                    var youtubeURL = 'https://www.youtube.com/embed/'+ tmpMedia.replace('https://youtu.be/','');
                    var tmpWidth = ($('#yt-video').width()/16)*9;
                    
                    $('#yt').attr('src', youtubeURL).css({
                        'height':tmpWidth
                    });
                    $('#yt-video').removeClass('hidden');
                }
            }


            else {

            }
        break;

        case 'Monitor4':
            if (
                housesData[lang]['additional_content'].length > 0
            )
            {
                //var tmpTitle = housesData[lang]['additional_content'][7]['title'];
                //var tmpContent = housesData[lang]['additional_content'][7]['content'];
                $('.viva-house-info > div > .content > h1' ).addClass('hidden');  
                $('.viva-house-info > div > .content > .row').addClass('hidden'); 
                

                if (
                    housesData[lang]['additional_content'][7]['media'] != '' &&
                    housesData[lang]['additional_content'][7]['media'] != 'undefined' &&
                    housesData[lang]['additional_content'][7]['media'] != null
                    ) 
                {
                    pano.setVariableValue('houseInfo', true);
                    var tmpMedia = housesData[lang]['buildings'][1]['media'];
                    var youtubeURL = 'https://www.youtube.com/embed/'+ tmpMedia.replace('https://youtu.be/','');
                    var tmpWidth = ($('#yt-video').width()/16)*9;
                    
                    $('#yt').attr('src', youtubeURL).css({
                        'height':tmpWidth
                    });
                    $('#yt-video').removeClass('hidden');
                }
            }


            else {

            }
        break;
    }
    pano.setVariableValue('houseInfo', true);

}

let housesValues = {};

function getHousesValues(lang, houseID, housesUrl, housesData) {
    addLoader('loading products data');

    if (
        housesValues[lang] == undefined ||
        housesValues[lang] == null ||
        housesValues[lang] == ''
    ) {
        
        housesValues[lang] = {};
        
        var dataModel = $.getJSON( housesUrl, function( products ) {
            $.each( products, function (index, val) {
                if (
                    index == 'buildings'
                ) {
                    $.each( val, function (i, data) {
                        
                        if (housesValues[lang][i+1] == null ||
                            housesValues[lang][i+1] == 'undefined'
                            ) {
                                housesValues[lang][i+1] = {};  
                        }

                        let house_attributes = ['house_nr','headline','house_comfort','text','link','media'];

                        for (let index = 0; index < house_attributes.length; index++) {
                            housesValues[lang][i+1][house_attributes[index]] = data[house_attributes[index]];
                        }

                        housesValues[lang][i+1]['exterior'] = {};
                        housesValues[lang][i+1]['interior'] = {};

                        if (
                            data['layers']
                        ) {
                            let layers_data = ['name','description','image','details_url','product_benefit_1','product_benefit_2','product_benefit_3','id'];

                            $.each(data['layers'], function(index, layers) {

                                function read_data(layers, target, layers_data) {
                                    for (let index = 0; index < layers_data.length; index++) {
                                        
                                        housesValues[lang][i+1][target][layers['name'].substring(1)][layers_data[index]] = layers['products'][layers_data[index]];
                                        
                                    }
                                }

                                if (
                                    layers['name'].indexOf('E') > -1
                                    
                                ) {
                                    if (!(housesValues[lang][i+1]['exterior'][layers['name'].substring(1)])) {
                                        housesValues[lang][i+1]['exterior'][layers['name'].substring(1)] = {}
                                    }
                                    
                                    read_data(layers, 'exterior', layers_data);
                                }

                                if (
                                    layers['name'].indexOf('I') > -1
                                    
                                ) {
                                    if (!(housesValues[lang][i+1]['interior'][layers['name'].substring(1)])) {
                                        housesValues[lang][i+1]['interior'][layers['name'].substring(1)] = {}
                                    }

                                    read_data(layers, 'interior', layers_data);
                                    
                                }
                                //////////console.log(layers);
                            });
                        }
                        

                        
                    });
                }
            });
        }).done(function() {
            //////////console.log('Produkty načítané v poriadku');
            getHousesLink(lang);
            getSubtitlesLink(lang);
            loadHousesData(housesUrl,lang);    
            loadSubtitlesData(subtitlesUrl,lang);
            
            house_8_texts(lang, housesData);        
          })
          .fail(function() {
            //////////console.log( "Chyba pri načítavaní produktov" );
        });
        
    }

    else {
        //////////console.log('dátový model už je načítaný');
        checkHotspots();
        loadIntroData();
        //houses_tour();;
        //add_screens();
    }
    
    
}

function house_8_texts($lang, $housesData) {
    //////////console.log('mením house 8 texts');
    if ( housesData && pano.getCurrentNode() == 'node24' && housesData[lang] 
        
    ) {
        //////////console.log('áno teraz');   
        if (
            housesData[lang]['additional_content'][5]['title']
        ) {
            $('.helper-text.solidity').html(housesData[lang]['additional_content'][5]['title']);
        }

        else {
            $('.helper-text.solidity').html('Solidity counts');
        }

        if (
            housesData[lang]['additional_content'][4]['title']
        ) {
            $('.helper-text.insulation').html(housesData[lang]['additional_content'][4]['title']);
        }

        else {
            $('.helper-text.insulation').html('Insulation first');
        }

        if (
            housesData[lang]['additional_content'][6]['title']
        ) {
            $('.helper-text.interior-values').html(housesData[lang]['additional_content'][6]['title']);
        }

        else {
            $('.helper-text.interior-values').html('Interior values');
        }
        
        
    }
}

function changePanoTitle(lang, housesData) {
    //////////console.log('mením názov');
    //////console.log(parseInt(pano.getNodeUserdata(pano.getCurrentNode()).source) + 1);
    $('.learn-more').unbind();
    $('#next-house').unbind();

    $('#next-house').on('click tap', function () {
        ////console.log(' !!!! ' + pano.getIsLoading());
        if (
            pano.getIsLoading() == false
        ) {
            clearInterval(New_interval);
            let index = is_tour_nodes.indexOf(pano.getCurrentNode());
            ////////console.log('index : ' + index);
            if (
                index != null &&
                index < is_tour_nodes.length - 1
            ) {
                pano.openNext( '{' + is_tour_nodes[index + 1] + '}');
            }

            else {
                pano.openNext( '{' + is_tour_nodes[0]  + '}');
            }
        }

        else {
            ////console.log('ešte nemôžem prepnúť');
        }
        
    });

    $('.learn-more').on('click tap', function () {
        //pano.setVariableValue('baumit_tour', false);
        houseInfo(parseInt(pano.getNodeUserdata(pano.getCurrentNode()).source));
        clearInterval(New_interval);
    });

    
        let node_id = pano.getNodeUserdata(pano.getCurrentNode()).source;
    
        let title = $('.header > .title > div');
    
        lang = pano.getVariableValue('lang');
        switch (node_id) {
            case '1' : 
            case '2' : 
            case '3' : 
            case '4' : 
            case '5' : 
            case '6' : 
            case '7' : 
            case '8' : 
            case '9' : 
            case '10' : 
            case '11' : 
            case '12' : 
            case '13' : 
            if (
                housesData[lang]
            ) {
                title.text(housesData[lang]['buildings'][parseInt(node_id)-1].house_nr);
                // $('.learn-more > span').html(housesData[lang]['buildings'][parseInt(node_id)-1].house_nr);
                $('.learn-more > span').html(pano.getNodeUserdata(pano.getCurrentNode()).source);
            }
                
            break;
            case '0' : 
                title.text('Viva park');
                $('.learn-more > span').html('Viva park');
            break;
        }

        $.each ( $('.hts-np'), function() {
            let hotspot_title = $(this).children('.np-title').children('div').html();
            let foundString;
            if (hotspot_title.indexOf('_') > 0) {
                foundString = hotspot_title.substr(hotspot_title.indexOf('_')+1,);
            }

            else if (hotspot_title.indexOf('.') > 0) {
                foundString = hotspot_title.substr(hotspot_title.indexOf('.')+1,).replace(' ','');
                
            }
            
           // ////////console.log(foundString);
            //////////console.log(housesData[lang]);
            if (!housesData[lang]) {

            }

            else {
                if (housesData[lang]['buildings']) {
                    switch (foundString) {
                        case '01' : 
                        case '1' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][0].house_nr);
                        
                        break;
                        case '02' : 
                        case '2' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][1].house_nr);
                           
                        break;
                        case '03' : 
                        case '3' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][2].house_nr);
                            
                        break;
                        case '04' : 
                        case '4' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][3].house_nr);
                            
                        break;
                        case '05' : 
                        case '5' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][4].house_nr);
                            
                        break;
                        case '06' : 
                        case '6' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][5].house_nr);
                            
                        break;
                        case '07' : 
                        case '7' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][6].house_nr);
                            
                        break;
                        case '08' : 
                        case '8' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][7].house_nr);
                               
                        break;
                        case '09' : 
                        case '9' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][8].house_nr);
                           
                        break;
                        case '10' : 
                        case '10' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][9].house_nr);
                           
                        break;
                        case '11' : 
                        case '11' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][10].house_nr);
                            
                        break;
                        case '12' : 
                        case '12' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][11].house_nr);
                            
                        break;
                        case '13' : 
                        case '13' : 
                            $(this).children('.np-title').children('div').html(housesData[lang]['buildings'][12].house_nr);
                            
                        break;
                
                        case '00' : 
                        $(this).children('.np-title').children('div').html('Viva park');
                            
                        break;
                    }
                }

                house_8_texts();


            }


            
            
        });

        // Zmena názvu domov v slidery
        if ( housesData[lang]) {

            // Zmena názvu domov v slidery
            $.each ($('.swiper-slide'), function (index, data) {;
                switch ($('.swiper-slide').eq(index).attr('data-url')) {
                    case 'node1' : 
                    $('.swiper-slide').eq(index).find('.node-title').html('Viva Park');
                    break;
                    default : 
                    if (
                        housesData[lang]['buildings'] != undefined && 
                        housesData[lang]['buildings'][index-1] != undefined
                    )
                    {
                        $('.swiper-slide').eq(index).find('.node-title').html(housesData[lang]['buildings'][index-1].house_nr);
                       
                    }
                    
                    break;
                }
            });
                    
            

            // Zmena názvu domov vo floorplane
        }

        

    
 
}

function change_tooltip_names($lang, $housesData) {
    //////////console.log('mením tooltipy');
    let go_inside = 'Go inside';
    let go_outside = 'Go outside';    
    let wall_components = 'Wall components';
    let more_info = 'Tooltips #1';
    let house_info = 'House Info';

    if (
        housesData[lang]
    ) {
        if (
            housesData[lang]['additional_content'] 
        ) {
            if (housesData[lang]['additional_content'][20]) { // Go inside
                if (housesData[lang]['additional_content'][20]['title']) {
                    go_inside = housesData[lang]['additional_content'][20]['title'];
                }
            }
    
            if (housesData[lang]['additional_content'][21]) { // Wall components
                if (housesData[lang]['additional_content'][21]['title']) {
                    wall_components = housesData[lang]['additional_content'][21]['title'];
                }
            }
    
            if (housesData[lang]['additional_content'][22]) { // House info
                if (housesData[lang]['additional_content'][22]['title']) {
                    house_info = housesData[lang]['additional_content'][22]['title'];
                }
            }

            if (housesData[lang]['additional_content'][24]) { // More info
                //////////console.log('áno');
                if (housesData[lang]['additional_content'][24]['title']) {
                    more_info = housesData[lang]['additional_content'][24]['title'];
                }
            }

            if (housesData[lang]['additional_content'][25]) { // Go outside
                if (housesData[lang]['additional_content'][25]['title']) {
                    go_outside = housesData[lang]['additional_content'][25]['title'];
                }
            }
        }
        
        let searched_hotspots = ['hts-ext-layer', 'hts-ext-info', 'hts-ext-door', 'hts-int-layer', 'hts-int-info', 'hts-int-door'];
    
        for (let index = 0; index < searched_hotspots.length; index++) {
            switch (index) {
                case 0 : 
               
                $('.'+searched_hotspots[index]+ ' > .layer-tooltip > div').html(wall_components);
                break;
    
                case 1 : 
                $('.'+searched_hotspots[index]+ ' > .layer-tooltip > div').html(house_info);
                break;
    
                case 2 : 
                $('.'+searched_hotspots[index]+ ' > .layer-tooltip > div').html(go_inside);
                break;

                case 3 : 
                $('.'+searched_hotspots[index]+ ' > .layer-tooltip > div').html(wall_components);
                break;

                case 4 : 
                $('.'+searched_hotspots[index]+ ' > .layer-tooltip > div').html(house_info);
                break;

                case 5 : 
                $('.'+searched_hotspots[index]+ ' > .layer-tooltip > div').html(go_outside);
                break;
            }
            
            
        }
    }


}

let take_tour_data = {
    node1 : {
        id : 'node1', // Exterior_00
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                pan : -3,
                tilt : -2.6,
                fov: 60
            },
            1 : {
                id : 'video_2',
                visited : 0,
                pan : -3,
                tilt : -6,
                fov: 60
            }
        }
    },
    node3 : {
        id : 'node3', // Exterior 02
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                pan : -20,
                tilt : -10,
                fov: 84
            }
        }
    },
    node18 : {
        id : 'node18', // Interior 02
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                // pan : -60,
                // tilt: -22
                pan : -25.01,
                tilt: -10,
                fov: 84
            }
        }
    },
    node5 : {
        id : 'node5', // Exterior 04
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                pan : -20.67,
                tilt : -10,
                fov: 84
            },
        }
    },
    node20 : {
        id : 'node20', // Interior 04
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                // pan : -60,
                // tilt : -22, 
                pan : -25.01,
                tilt: -10,
                fov: 84
            }
        }
    },
    node6 : {
        id : 'node6', // Exterior 06
        videos : {
            "active_video" : "video_1",
            0 : {
                id : 'video_1',
                visited : 0,
                pan : -20.67,
                tilt : -10,
                fov: 84
            }
        }
    },
    node22 : {
        id : 'node22', // Interior 06
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                // pan : -60,
                // tilt : -22
                pan : -25.01,
                tilt: -10,
                fov: 84
            }
        }
    },
    // node16 : {
    //     id : 'node16', // Exterior 08
    //     videos : {
    //         0 : {
    //             id : 'video_1',
    //             visited : 0,
    //             pan : -20.67,
    //             tilt : 0.94
    //         }
    //     }
    // },
    node24 : {
        id : 'node24', // Interior 08
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                pan : -60,
                tilt : -22,
                fov: 84
                
            }
        }
    },
    node12 : {
        id : 'node12', // Exterior 10
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                pan : -20.67,
                tilt : -10,
                fov: 84
            }
        }
    },
    node26 : {
        id : 'node26', // Interior 10
        videos : {
            0 : {
                id : 'video_1',
                visited : 0,
                pan : -55,
                tilt : -22,
                fov: 84
                
            },
        }
    }
};

// Take a Tour navigation arrows
//let is_tour_nodes = ['node1', 'node16', 'node24','node12', 'node26','node6', 'node22', 'node3', 'node18', 'node5', 'node20'];
let is_tour_nodes = ['node1', 'node24','node12', 'node26','node6', 'node22', 'node3', 'node18', 'node5', 'node20'];
function take_tour_navigation_arrows() {
   
 
    //////////console.log(is_tour_nodes);

    $('.tt-next').unbind();
    $('.tt-prev').unbind();

    $('.tt-next').on('click tap', function () {
        pano.setVariableValue('take_tour', false);
        let index = is_tour_nodes.indexOf(pano.getCurrentNode());
        ////////console.log('index : ' + index);
        if (
            index != null &&
            index < is_tour_nodes.length - 1
        ) {
            pano.openNext( '{' + is_tour_nodes[index + 1] + '}');
        }

        else {
            pano.openNext( '{' + is_tour_nodes[0]  + '}');
        }
        pano.setVariableValue('take_tour', true);
    });

    $('.tt-prev').on('click tap', function () {
        pano.setVariableValue('take_tour', false);
        let index = is_tour_nodes.indexOf(pano.getCurrentNode());
        ////////console.log('index : ' + index);
        if (
            index != null &&
            index <= 0
        ) {
            pano.openNext( '{' + is_tour_nodes[is_tour_nodes.length-1]  + '}');
            
        }

        else {
            pano.openNext( '{' + is_tour_nodes[index - 1] + '}');
        }
        pano.setVariableValue('take_tour', true);
    });
}




// Take Tour button 
function add_take_tour_button() {
    

    
    $('.viva-start').append(
        '<div class="intro-take-tour">' +  
            '<p>Take<span>Tour</span></p>'+
        '</div>'
    );  
    $('.intro-take-tour').on('click tap', function () {
        pano.setVariableValue('take_tour', true);
        $('.viva-start').addClass('hidden');


        
    });
}


pano.on('configloaded', function(Tooltips) {
    

    // vypnutie video patchov 
    pano.on('changenode', function () {
        pano.setMediaVisibility('video_1', false);
        pano.setMediaVisibility('video_2', false);   

        let index = is_tour_nodes.indexOf(pano.getCurrentNode());
        
            if (
                index == null ||
                index == - 1
            ) {
                $('.take-tour-button').addClass('hidden');
            }

            else {
                $('.take-tour-button').removeClass('hidden');
                pano.setVariableValue('paused_baumit_tour', false);
                
            }

        
    });

    pano.setMediaVisibility('video_1', false);
    pano.setMediaVisibility('video_2', false);


    pano.on('varchanged_take_tour', function (audio) {
        let interval;
        let intervalTime = 0;
        pano.setVolume('_main', 0.0);
        
        function change_scene($active_scene) {
            
            let index = is_tour_nodes.indexOf($active_scene);
            if (
                index != null &&
                index < is_tour_nodes.length - 1
            ) {
                pano.openNext( '{' + is_tour_nodes[index + 1] + '}');
                play_videos();
            }

            else {
                pano.openNext( '{' + is_tour_nodes[0]  + '}');
                play_videos();
            }
        }

        function play_videos () {
            
            let active_scene = pano.getCurrentNode();
            let active_video = take_tour_data[active_scene].videos[0].id;    
            //////////console.log('current scene : '+ active_scene + '| current video : ' + active_video );

            if (
                pano.getMediaObject(active_video) == null ||
                pano.getMediaObject(active_video) == undefined ||
                pano.getMediaObject(active_video) == 'undefined'
            ) {
                change_scene(active_scene);
            }

            else {

                pano.setMediaVisibility( active_video, true);    
                pano.moveTo(take_tour_data[active_scene].videos[0].pan, take_tour_data[active_scene].videos[0].tilt, take_tour_data[active_scene].videos[0].fov, 5);
                pano.setVolume(active_video, 0.0);
                if (
                    pano.getCurrentNode() == 'node22'
                ) {
                    pano.setMediaVisibility('video_slideshow', true); 
                    pano.playSound('video_slideshow');    
                }
                pano.playSound(active_video);
                
                
                

                pano.getMediaObject(active_video).addEventListener('ended', function() {
                    //////console.log('teaz');
                    //pano.setMediaVisibility( active_video, false);

                    if (
                        take_tour_data[active_scene].videos[1] != null &&
                        take_tour_data[active_scene].videos[1] != undefined &&
                        take_tour_data[active_scene].videos[1] != 'undefined'
                    ) {
                        active_video = take_tour_data[active_scene].videos[1].id;  
                        //////////console.log('current scene : '+ active_scene + '| current video : ' + active_video );

                        if (
                            pano.getMediaObject(active_video) == null ||
                            pano.getMediaObject(active_video) == undefined ||
                            pano.getMediaObject(active_video) == 'undefined'
                        ) {
                            interval = setInterval(function(){
                                change_scene(active_scene);
                                clearInterval(interval);
                            }, intervalTime);
                            
                        }

                        else {
                            pano.setMediaVisibility( active_video, true);    
                            pano.moveTo(take_tour_data[active_scene].videos[1].pan, take_tour_data[active_scene].videos[1].tilt, 84, 5);
                            //pano.setVolume(active_video, 0.0);
                            pano.playSound(active_video);
                            
                            
    
                            pano.getMediaObject(active_video).addEventListener('ended', function() {
                                interval = setInterval(function(){
                                    change_scene(active_scene);
                                    clearInterval(interval);
                                }, intervalTime);
                            });
                        }
                    }

                    else {
                        change_scene(active_scene);
                        interval = setInterval(function(){
                            
                            clearInterval(interval);
                        }, intervalTime);
                    }
                });
            }
        }


        

        switch (pano.getVariableValue('take_tour')) {
            case true : 
                $('.take-tour-button').addClass('playing');
                // dočasné vypnutie hotspotov
                //pano.setVariableValue('hotspots', false);
                $('.viva-start').addClass('hidden');
                run_baumit_tour();

                // preventívne skrytie video patchov
                // pano.setMediaVisibility('video_1', false);
                // pano.setMediaVisibility('video_2', false);

                // aktivácia šípok
                take_tour_navigation_arrows();
                
                play_videos();
                
                
                //////////console.log('zapol som take tour');
                break;
            case false : 

                
                $('#houses-info-container').remove();
            
                $('.take-tour-button').removeClass('playing');
                //////////console.log('vypol som take tour');
                pano.setVariableValue('hotspots', true);

                if (
                    pano.getMediaObject('video_1') != null &&
                    pano.getMediaObject('video_1') != undefined && 
                    pano.getMediaObject('video_1') != 'undefined'
                ) {
                 //   pano.setMediaVisibility('video_1', false);
                    pano.stopSound('video_1');
                }

                if (
                    pano.getMediaObject('video_2') != null &&
                    pano.getMediaObject('video_2') != undefined && 
                    pano.getMediaObject('video_2') != 'undefined'
                ) {
                   // pano.setMediaVisibility('video_2', false);
                    pano.stopSound('video_2');
                }

                break;
        }
    });
    
    add_take_tour_button();

    function change_patches() {
        $.each($('img.ggmedia'), function (index, value) {
            let lang = pano.getVariableValue('lang');
            ////////console.log('mením patch');
            let src = $(this).attr('src');

            if (
                src.includes('vr_int_08_patch0') 
            ) {
                $(this).attr('src', 'media/vr_int_08_patch0_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch1') 
            ) {
                $(this).attr('src', 'media/vr_int_08_patch1_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch2') 
            ) {
                $(this).attr('src', 'media/vr_int_08_patch2_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch3') 
            ) {
                $(this).attr('src', 'media/vr_int_08_patch3_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch4') 
            ) {
                $(this).attr('src', 'media/vr_int_08_patch4_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch5') 
            ) {
                $(this).attr('src', 'media/vr_int_08_patch5_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch6') 
            ) {
                $(this).attr('src', 'media/vr_int_08_patch6_'+lang+'.png');
            }

            if (
                src.includes('vr_int_02_patch1') 
            ) {
                $(this).attr('src', 'media/vr_int_02_patch1_'+lang+'.png');
            }

            if (
                src.includes('vr_int_04_patch1') 
            ) {
                $(this).attr('src', 'media/vr_int_04_patch1_'+lang+'.png');
            }
        });
    }

    function check_user_lang (lang) {
        if (
            $.cookie('user_language') != undefined &&
            $.cookie('user_language') != 'undefined' &&
            $.cookie('user_language') != null  
            ) {
                // cookies nie su prázdne 
                lang = $.cookie('user_language').substr($.cookie('user_language').indexOf("=") + 1);
                
                pano.setVariableValue('lang', $.cookie('user_language').substr($.cookie('user_language').indexOf("=") + 1));
               // alert(lang);
                update_lang_content();
        }
    
        else {
            // Jazyk nie je definovaný v Cookies
            
            let user_language = window.navigator.userLanguage || window.navigator.language;
            user_language = user_language.toLowerCase();
            switch (user_language) {
                case 'cz' : 
                case 'cs' : 
                case 'cz-cz' : 
                case 'cz-CZ' : 
                    pano.setVariableValue('lang', 'cz');
                break;
        
                case 'sk' :
                case 'sk-sk' : 
                case 'sk-SK' : 
                    pano.setVariableValue('lang', 'sk');
                break;
        
                case 'at' :
                case 'at-at' : 
                case 'de-at' :
                    pano.setVariableValue('lang', 'at');
                break;
        
                case 'de' :
                case 'de-de' :                     
                    pano.setVariableValue('lang', 'de');
                break;
        
                case 'hr' : 
                case 'hr-hr' : 
                    pano.setVariableValue('lang', 'hr');
                break;
        
                case 'rs' :  // Srbsko
                case 'rs-rs' :  // Srbsko
                case 'sr' :
                case 'sr-sr' :
                    pano.setVariableValue('lang', 'rs');
                break;
        
                case 'si' : // Slovinsko
                case 'si-si' : // Slovinsko
                case 'sl' :
                case 'sl-sl' :
                    pano.setVariableValue('lang', 'si');
                break;
        
                case 'ba' : // Bosna a Hercegovina
                case 'ba-ba' :
                    pano.setVariableValue('lang', 'ba');
                break;
        
                case 'ua' : 
                case 'ua-ua' : 
                case 'uk' :
                case 'uk-uk' : 
                    pano.setVariableValue('lang', 'ua');
                break;
        
                case 'fr' : 
                case 'fr-fr' : 
                    pano.setVariableValue('lang', 'fr');
                break;
                
                case 'es' : 
                case 'es-es' :
                    pano.setVariableValue('lang', 'es');
                break;
        
                case 'cn' : 
                case 'cn-cn' : 
                case 'zh-cn' : 
                    pano.setVariableValue('lang', 'cn');
                break;
        
                case 'gr' : 
                case 'gr-gr' :
                case 'el' :
                case 'el-el' : 
                    pano.setVariableValue('lang', 'gr');
                break;
        
                case 'hu' : 
                case 'hu-ht' :
                    pano.setVariableValue('lang', 'hu');
                break;
        
                case 'tr' : 
                case 'tr-tr' :
                    pano.setVariableValue('lang', 'tr');
                break;
        
                case 'ro' :
                case 'ro-ro' :                     
                    pano.setVariableValue('lang', 'ro');
                break;
        
                case 'en-gb' : 
                case 'en' : 
                    pano.setVariableValue('lang', 'uk');
                break;
        
                case 'it' :
                case 'it-it' :                     
                    pano.setVariableValue('lang', 'it');
                break;
        
                case 'pl' : 
                case 'pl-pl' : 
                    pano.setVariableValue('lang', 'pl');
                break;
        
                case 'lv' :
                case 'lv-lv' :                     
                    pano.setVariableValue('lang', 'lv');
                break;
        
                case 'ru' : 
                case 'ru-ru' : 
                    pano.setVariableValue('lang', 'ru');
                break;
        
                case 'by' :
                case 'by-by' :                     
                case 'be' :
                case 'be-be' :                     
                    pano.setVariableValue('lang', 'by');
                break;
                
                case 'bg' :
                case 'bg-bg' :                     
                    pano.setVariableValue('lang', 'bg');
                break;
        
                case 'lt' :
                case 'lt-lt' :                     
                    pano.setVariableValue('lang', 'lt');
                break;
        
                case 'ee' :
                case 'ee-ee' :                     
                case 'et' :
                case 'et-et' :                     
                    pano.setVariableValue('lang', 'ee');
                break;
        
                case 'mk' :
                case 'mk-mk' :                     
                    pano.setVariableValue('lang', 'mk');
                break;
        
                case 'nl-be' : 
                    pano.setVariableValue('lang', 'be');
                break;
        
                case 'de-ch': 
                    pano.setVariableValue('lang', 'ch');
                break;
        
                case 'ro-mo' : 
                    pano.setVariableValue('lang', 'md');
                break;
    
                default : 
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
        getSubtitlesLink(lang);
        getHousesValues(lang, houseID, housesUrl, housesData);
        changePanoTitle(lang, housesData);
        change_patches();
        
        
    };

    if ($.cookie('sound')) {
        //////////console.log('cookies som načítal ako :'+$.cookie('sound'));
        
        switch ($.cookie('sound')) {
            case 'false':
                pano.setVariableValue('sound', false);
                break;
            
            case 'true':
                //pano.setVariableValue('sound', true);
                break;
        }
    }

    pano.addListener('varchanged_sound', function() {
        switch (pano.getVariableValue('sound')) {
            case true: 
                $.cookie('sound', 'true');
            break;
            case false : 
                $.cookie('sound', 'false');
            break;
        }
    });


    check_user_lang(lang);
    Tooltips = $('.viva-tooltip');
    
    pano.on('varchanged_lang', function() {
        //alert('pozor, zmena');
        $.cookie('user_language', pano.getVariableValue('lang'));
        update_lang_content();
        
        change_floorplan_node_title (housesData, pano.getVariableValue('lang'));
        pano.setVariableValue('baumit_tour', false);

    });

    let tmpTiles = 0;

    let addPatch;

    pano.on('changenode', function nodechange(lang) {
        
       
        if (
            pano.getCurrentNode() == 'node20'
        ) {
            $('#next-house').html('Back to Start');
        }

        else {
            $('#next-house').html('Next house');
        }


        if (
            pano.getCurrentNode() == 'node1'
        ) {
            if (
                pano.getVariableValue('baumit_tour') == true
            ) {
                
                pano.setVariableValue('baumit_tour', false);
                   
                welcome_screen();
            }
        }
        ////console.log(tmpTiles);
        tmpTiles ++;
        //addLoader('loading products data');
        changePanoTitle(lang, housesData); 
        change_tooltip_names(lang, housesData);
        showVivaIntro();
        checkHotspots();
        ToolTips.push($('.viva-tooltip'));
        hideTooltips();
        change_floorplan_node_title (housesData, pano.getVariableValue('lang'));
        //checkHotspots2();
        currentNode = pano.getCurrentNode();
        house_8_texts(lang, housesData);

        pano.setVariableValue('infopanel', false);

        if (
            currentNode == 'node24' ||
            currentNode == 'node18' ||
            currentNode == 'node20' 
        ) {
            change_patches();
        }
    
        if (
            currentNode != 'node30' &&
            currentNode != 'node31' &&
            currentNode != 'node32' &&
            currentNode != 'node33'
        ) {
            patchName = pano.getNodeUserdata(currentNode).title;
            if (
                currentNode != 'node1'
            ) {
                $('.ggskin_external').css({
                    'visibility': 'hidden'
                });
                $('#vid').attr('id', '');
                videoDuration = 0;
                videoDurationHalf = 0;
            
                for (var i = 0; i < allVideos.length; i++) {
                    pano.setMediaVisibility(allVideos[i], 0);
                }

                let tilesready_count = 0;
                
                addPatch = null;
                
                play_Animation();

                
            }
        }
        $('#progress').remove(); 
        
        
    }); 
    pano.on('varchanged_mobile_menu_active', function() {
        
        switch (pano.getVariableValue('mobile_menu_active')) {
            case true : 
            
            $('.viva-start').addClass('hidden');
            break;
        }
    });     
});

function play_Animation() {


    setTimeout(() => {
        if (
            currentNode != 'node1' &&
            // currentNode != 'node16' &&
            currentNode != 'node24' &&
            currentNode != 'node26' &&
            currentNode != 'node30' &&
            currentNode != 'node31' &&
            currentNode != 'node32' &&
            currentNode != 'node33' &&
            pano.getMediaObject(patchName) != null
        ) {
    
            if (
                pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue == null ||
                pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue == undefined ||
                pano.getMediaObject(patchName) == null
                ) {
                //$('#loader').remove();
    
                    if (
                        pano.getVariableValue('floorplan_full') != true
                    )
                    {
                        $('.ggskin_external').css({
                            'visibility': 'visible'
                        });
                    }
                
                }
    
            else {
                pano.setMediaVisibility(allVideos[allVideos.indexOf(pano.getNodeUserdata(currentNode).title)], 1);
                tmpID = pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue;
                $('.ggmedia > source[src="'+tmpID+'"]').parent().attr('id','vid1');
                vid = document.getElementById("vid1");    
                videoDuration = vid.duration;
                videoDurationHalf = (videoDuration/2) -0.20;
                //////////console.log(videoDuration+' | '+videoDurationHalf);
    
                
    
                if (
                    pano.getVariableValue('baumit_tour') == true && pano.getMediaObject(pano.getNodeUserdata(pano.getCurrentNode()).title).currentTime == 0
                ) {
                    playPauseMedia();
                    
                }
    
                if (
                    pano.getVariableValue('take_tour') == true && tilesready_count < 1
                ) {
                  //  ////////console.log(videoDuration+' | '+videoDurationHalf);
                    playMedia();
    
                    tilesready_count++
                }
    
                if (
                    dataModelUpdating == false
                ) {
                    $('#progress').remove();
    
                    if (
                        pano.getVariableValue('floorplan_full') != true
                    )
                    {
                        $('.ggskin_external').css({
                            'visibility': 'visible'
                        });
                    }
                }
            }
        }
    
        else {
            $('#progress').remove();
            if (pano.getVariableValue('floorplan_full') != true)
            {
                $('.ggskin_external').css({
                    'visibility': 'visible'
                });
            }
    
        } 
    }, 1500);

    pano.on('tilesready', function () {
        ////console.log('Tiles sú ready');

      
        
    });
}

pano.addListener('varchanged_houseInfo', function() {
    
    //changePanoTitle();
    switch (pano.getVariableValue('houseInfo')) {
        case true: 
        
            ShowElement(['.viva-house-info']);

            switch (pano.getVariableValue('tagValue')) {
                case 'Monitor' : 
                case 'Monitor2' : 
                case 'Monitor4' : 
                    $('.viva-house-info').addClass('yt-only');
                break;
                default : 
                $('.viva-house-info').removeClass('yt-only');
                break
            }

            variableTrue(['blurred']);
            $('.ggskin_hotspot, .ggskin_external').css({
                'visibility': 'hidden'
            });
        break;
        case false:
            $('#yt').attr('src','');
            showVivaIntro();
            variableFalse(['blurred']);
            HideElement(['.viva-house-info']);
            setTimeout(() => {
                $('.ggskin_hotspot, .ggskin_external').css({
                    'visibility': 'visible'
                });    
            }, 250);
            pano.setVariableValue('hotspots', true);
        break; 
    }
});

pano.addListener('varchanged_footer_apartments', function() {
    pano.setVariableValue('take_tour', false);    
});


function welcome_screen() {
    $('#welcome').remove();

    let title; 
    let subtitle;
    let description; 
    let more_info;
    let about_viva_park, visit_and_enjoy_tour, rules_of_healthy_living, play, virtual_tour;
    

    if (
        housesData[lang]['additional_content'] != undefined
    ) {
        if (
            housesData[lang]['additional_content'][8] == null ||
            housesData[lang]['additional_content'][8] == undefined ||
            housesData[lang]['additional_content'][8] == ''
        ) {
            title = 'If Walls Could Talk';
            content = 'Discover their stories here';
        }
        else {
            title = housesData[lang]['additional_content'][8]['title'];
            subtitle = housesData[lang]['additional_content'][8]['content'];
        }
    
        if (
            housesData[lang]['additional_content'][35] == null ||
            housesData[lang]['additional_content'][35] == undefined ||
            housesData[lang]['additional_content'][35] == ''
        ) {
            description = 'The Viva research park is Europe’s largest research facility for comparative building material studies. Its main objective is to exactly measure and evaluate the impact of different construction materials to living comfort by simulating a typical user behavior';
        }
        else {
            description = housesData[lang]['additional_content'][35]['content'];
        }
    
        if (
            housesData[lang]['additional_content'][19] == null ||
            housesData[lang]['additional_content'][19] == undefined ||
            housesData[lang]['additional_content'][19] == ''
        ) {
            more_info = 'More info';
        }
        else {
            more_info = housesData[lang]['additional_content'][19]['title'];
        }

        if (
            housesData[lang]['additional_content'][47] == null ||
            housesData[lang]['additional_content'][47] == undefined ||
            housesData[lang]['additional_content'][47] == ''
        ) {
            play = 'Play';
        }
        else {
            
            play = housesData[lang]['additional_content'][47].title;
        }

        if (
            housesData[lang]['additional_content'][50] == null ||
            housesData[lang]['additional_content'][50] == undefined ||
            housesData[lang]['additional_content'][50] == ''
        ) {
            rules_of_healthy_living = '3  rules of healthy living';
        }
        else {
            
            rules_of_healthy_living = housesData[lang]['additional_content'][50].title;
        }

        if (
            housesData[lang]['additional_content'][52] == null ||
            housesData[lang]['additional_content'][52] == undefined ||
            housesData[lang]['additional_content'][52] == ''
        ) {
            visit_and_enjoy_tour = 'Visit and enjoy tour';
        }
        else {
            
            visit_and_enjoy_tour = housesData[lang]['additional_content'][52].title;
        }

        if (
            housesData[lang]['additional_content'][51] == null ||
            housesData[lang]['additional_content'][51] == undefined ||
            housesData[lang]['additional_content'][51] == ''
        ) {
            about_viva_park = 'About the VIVA Park';
        }
        else {
            
            about_viva_park = housesData[lang]['additional_content'][51].title;
        }

        if (
            housesData[lang]['additional_content'][9] == null ||
            housesData[lang]['additional_content'][9] == undefined ||
            housesData[lang]['additional_content'][9] == ''
        ) {
            virtual_tour = 'Virtual tour';
        }
        else {
            
            virtual_tour = housesData[lang]['additional_content'][9].title;
        }
        
    
        $('#welcome').remove();
    
        $('body').append(
            '<div id="welcome">'+
                '<div id="wrapper">'+
                    '<div id="header">'+
                        '<h1>' + title + '</h1>'+
                        '<h2>' + subtitle + '</h2>'+
                        '<p>' + description + '</p>'+
                        '<div class="buttons">'+
                            '<button id="play_tour">' + play + '</button>'+
                            '<button id="more_info">' + more_info + '</button>'+
                        '</div>'+
                    '</div>'+
                    '<div id="footer">'+
                        '<div id="research" class="item">'+
                            '<div class="thumbnail">'+
                                '<img src="images/btn-1.jpg" />'+
                            '</div>'+
                            '<div class="text">'+
                                '<h4>' + virtual_tour +'</h4>'+
                            '</div>'+
                        '</div>'+
                        '<div id="rules" class="item">'+
                            '<div class="thumbnail">'+
                                '<img src="images/btn-2.jpg" />'+
                            '</div>'+
                            '<div class="text">'+
                                '<h4>' + rules_of_healthy_living + '</h4>'+
                            '</div>'+
                        '</div>'+
                        // '<div id="about-viva" class="item">'+
                        //     '<div class="thumbnail">'+
                        //         '<img src="images/btn-3.jpg"/>'+
                        //     '</div>'+
                        //     '<div class="text">'+
                        //         '<h4>' + about_viva_park + '</h4>'+
                        //     '</div>'+
                        // '</div>'+
                        '<div id="visit-tour" class="item">'+
                            '<div class="thumbnail">'+
                                '<img src="images/00_Free_tour_icon_f.jpg"/>'+
                            '</div>'+
                            '<div class="text">'+
                                '<h4>' + visit_and_enjoy_tour + '</h4>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );
    
        $('#more_info').unbind();
        $('#more_info').on('click tap', function () {
            
            // $('#welcome').fadeOut();
            pano.setVariableValue('houseID', '0');
            houseInfo(pano.getVariableValue('houseID'));
        });
    
        $('#play_tour').on('click tap', function () {
            $('#play_tour').unbind();
            $('#welcome').fadeOut();
            pano.setVariableValue('hotspots', true);
            //pano.setVariableValue('houses_tour', true);
            pano.setVariableValue('baumit_tour', true);
            let node = pano.getCurrentNode();
            let active_scene = pano.getCurrentNode();
            pano.moveTo(take_tour_data[active_scene].videos[0].pan, take_tour_data[node].videos[0].tilt, take_tour_data[active_scene].videos[0].fov, 5);
        
        });
    
        $('#research').on('click tap', function () {
            $('#research').unbind();
            // $('#welcome').fadeOut();
            pano.setVariableValue('floorplan_full', true);
        });
    
        $('#about-viva').on('click tap', function () {
            $('#about-viva').unbind();
            $('#welcome').fadeOut();
            pano.setVariableValue('houseID', '0');
            houseInfo(pano.getVariableValue('houseID'));
            pano.setVariableValue('hotspots', true);
    
        });
    
        $('#visit-tour').on('click tap', function () {
            $('#visit-tour').unbind();
            $('#welcome').fadeOut();
            pano.setVariableValue('hotspots', true);
        });
        
        $('#welcome').on('click tap', function () {
            $('#welcome').unbind();
            pano.setVariableValue('lang_menu', false);
        });
    
        
        
        run_baumit_tour();
    }


    
}

function loadSubtitlesData(subtitlesUrl, lang) {
    
    addLoader('loading subtitles data');
    if (
        subtitlesData[lang] == undefined ||
        subtitlesData[lang] == null ||
        subtitlesData[lang] == ''
    ) {
        subtitlesData[lang] = {
        };
        var tmpHousesData = $.getJSON( subtitlesUrl, function( data ) {
            $.each( data, function( key, val ) {
                subtitlesData[lang][key] = val;
            });
        })
        .done(function() {
            generate_baumit_data();
            ////////console.log(subtitlesData);
        });
    }
};


function houses_screen() {
    let audio_count = 1;
    let audio = new Audio;
    audio.pause();
    $('#houses-info-container').remove();

    let current_house;
    let house_1;
    let house_2_title;
    let house_2_content;
    let house_3_title;
    let house_3_content;
    let house_4_title;
    let house_4_content;
    let house_5_title;
    let house_5_content;
    let house_6_title;
    let house_6_content;

    let lang = pano.getVariableValue('lang');

    if (
        housesData[lang] == 'undefined' || 
        housesData[lang] == null 
    ) {
        return;
    }
    
    // Hosue #1
    if (
        housesData[lang]['additional_content'][36] == null ||
        housesData[lang]['additional_content'][36] == undefined ||
        housesData[lang]['additional_content'][36] == ''
    ) {
        house_1 = 'Home';
    }
    else {
        house_1 = housesData[lang]['additional_content'][36]['title'];
    }

    // Hosue #2
    if (
        housesData[lang]['additional_content'][37] == null ||
        housesData[lang]['additional_content'][37] == undefined ||
        housesData[lang]['additional_content'][37] == ''
    ) {
        house_2_title = 'Research';
        house_2_content = 'Comparison'
    }
    else {
        house_2_title = housesData[lang]['additional_content'][37]['title'];
        house_2_content = housesData[lang]['additional_content'][37]['content'];
    }

    // Hosue #3
    if (
        housesData[lang]['additional_content'][38] == null ||
        housesData[lang]['additional_content'][38] == undefined ||
        housesData[lang]['additional_content'][38] == ''
    ) {
        house_3_title = 'Research';
        house_3_content = 'Massive Wood House'
    }
    else {
        house_3_title = housesData[lang]['additional_content'][38]['title'];
        house_3_content = housesData[lang]['additional_content'][38]['content'];
    }

    // Hosue #4
    if (
        housesData[lang]['additional_content'][39] == null ||
        housesData[lang]['additional_content'][39] == undefined ||
        housesData[lang]['additional_content'][39] == ''
    ) {
        house_4_title = 'Research';
        house_4_content = 'Wooden Frame House'
    }
    else {
        house_4_title = housesData[lang]['additional_content'][39]['title'];
        house_4_content = housesData[lang]['additional_content'][39]['content'];
    }

    // Hosue #5
    if (
        housesData[lang]['additional_content'][40] == null ||
        housesData[lang]['additional_content'][40] == undefined ||
        housesData[lang]['additional_content'][40] == ''
    ) {
        house_5_title = 'Research';
        house_5_content = 'Concrete House'
    }
    else {
        house_5_title = housesData[lang]['additional_content'][40]['title'];
        house_5_content = housesData[lang]['additional_content'][40]['content'];
    }

    // Hosue #6
    if (
        housesData[lang]['additional_content'][41] == null ||
        housesData[lang]['additional_content'][41] == undefined ||
        housesData[lang]['additional_content'][41] == ''
    ) {
        house_6_title = 'Research';
        house_6_content = 'Full Brick House'
    }
    else {
        house_6_title = housesData[lang]['additional_content'][41]['title'];
        house_6_content = housesData[lang]['additional_content'][41]['content'];
    }

    function select_active_house() {

        switch (pano.getCurrentNode()) {
            case 'node1' : 
                $('#house_1').addClass('active');
                current_house = 'start';
            break;

            // case 'node16' :
            case 'node24' : 
                $('#house_2').addClass('active');
                current_house = 'house_8';
            break;

            case 'node12' : 
            case 'node26' : 
                $('#house_3').addClass('active');
                current_house = 'house_10';
            break;

            case 'node6' : 
            case 'node22' : 
                $('#house_4').addClass('active');
                current_house = 'house_6';
            break;

            case 'node3' : 
            case 'node18' : 
                $('#house_5').addClass('active');
                current_house = 'house_2';
            break;

            case 'node5' : 
            case 'node20' : 
                $('#house_6').addClass('active');
                current_house = 'house_4';
            break;
        }
    }

    select_active_house();

    let current_subtitle
    switch (current_house) {
        case 'start':
            current_subtitle = subtitlesData[lang][current_house + '_welcome'] + '<br><br>' + subtitlesData[lang][current_house + '_quote'] + '<br><br>' + subtitlesData[lang][current_house + '_quote_source'] +  '<br><br>' + subtitlesData[lang][current_house + '_come_along'];
            break;
    
        case 'house_8':
            switch (pano.getCurrentNode()) {
                case 'node24':
                //case 'node16':
                    //current_subtitle = subtitlesData[lang][current_house + '_healthy_living'] + '<br><br>' + subtitlesData[lang][current_house + '_data_method_1']  + '<br><br>' + subtitlesData[lang][current_house + '_data_method_2']  + '<br><br>' + subtitlesData[lang][current_house + '_data_method_3'];        
                    current_subtitle = subtitlesData[lang][current_house + '_healthy_living'];        
                    break;
            
                // case 'node24':
                //     break;
            }
            
            break;

        case 'house_10':

            switch (pano.getCurrentNode()) {
                case 'node12':
                    current_subtitle = subtitlesData[lang][current_house + '_welcome'] + '<br><br>' + subtitlesData[lang][current_house + '_construction'];
                    break;
            
                case 'node26':
                    current_subtitle = subtitlesData[lang][current_house + '_results'];
                    break;
            }
            
            break;

        case 'house_6':
            current_subtitle = subtitlesData[lang][current_house + '_construction'] + '<br><br>' + subtitlesData[lang][current_house + '_desc_1'] + '<br><br>' + subtitlesData[lang][current_house + '_method_1'] + '<br><br>' + subtitlesData[lang][current_house + '_method_2'];
            break;
        case 'house_2':
            current_subtitle = subtitlesData[lang][current_house + '_construction'] + '<br><br>' + subtitlesData[lang][current_house + '_research_1'] + '<br><br>' + subtitlesData[lang][current_house + '_research_2'];
            break;
        case 'house_4':
            current_subtitle = subtitlesData[lang][current_house + '_construction'] + '<br><br>' + subtitlesData[lang][current_house + '_method_1'] + '<br><br>' + subtitlesData[lang][current_house + '_method_2'];
            break;            
    }

    
    // switch (current_house) {
    //     case 'house_8':
    //         audio = new Audio(subtitlesData[lang][current_house + '_audio']); 
    //         audio_count = '';
    //         break;

        
    
    //     default:
    //         audio = new Audio(subtitlesData[lang][current_house + '_audio1']);
    //         audio_count = 1;
    //         break;
    // }

    // pano.on('changenode', function () {
    //     audio.pause();    
    // });

    // audio.play();

    function open_next_node() {
        for (let index = 0; index < is_tour_nodes.length; index++) {
            let i = index+1;
            let node = pano.getCurrentNode();
            ////////console.log(node);
            if (
                node == is_tour_nodes[index]
            ) {

                if (
                    index ==  is_tour_nodes.length
                ) {
                    pano.openNext('{' + is_tour_nodes[0] + '}');
                    return;
                }

                else {
                    pano.openNext('{' + is_tour_nodes[i ] + '}');
                    return;
                }
            }
            
        }
    }


    // audio.addEventListener('ended', function() {
    //     audio_count++;
    //     ////////console.log('skončila 1, púšťam 2');
    //     if (
    //         subtitlesData[lang][current_house + '_audio'+audio_count] !== undefined
    //     ) {
    //         audio = new Audio(subtitlesData[lang][current_house + '_audio'+audio_count]);
    //         audio.play();
    //         audio.addEventListener('ended', function() {
    //             ////////console.log('2 skončila');
    //             open_next_node();
               
    //         });
    //     }

    //     else {
    //         open_next_node();
    //     }
        

    //  });

    let learn_more_about;

    if (
        housesData[lang]['additional_content'][54] == null ||
        housesData[lang]['additional_content'][54] == undefined ||
        housesData[lang]['additional_content'][54] == ''
    ) {
        learn_more_about = 'Learn more';
    }
    else {
        
        learn_more_about = housesData[lang]['additional_content'][54].title;
    }

    $('body').append(
        '<div id="houses-info-container">'+
            '<div class="houses-header">'+
                '<div class="buttons">'+
                    '<img class="play hidden" src="assets/icons/play-houses.svg"/>'+
                    '<img class="pause" src="assets/icons/pause-houses.svg"/>'+
                    '<img class="toggle" src="assets/icons/toggle-houses.svg"/>'+
                    '<button id="next-house">Next house</button>'+
                    '<button id="learn-more" class="learn-more">' + learn_more_about + '&nbsp;<span>'+ pano.getNodeUserdata(pano.getCurrentNode()).source +'</span></button>'+
                '</div>'+
                '<div class="subtitles">'+
                    '<p>' + current_subtitle +'</p>'+
                '</div>'+
            '</div>'+
            '<div class="houses-footer">'+
                '<div id="house_1" class="item">'+
                    '<img class="icon" src="images/house-default.png"/>'+
                    '<p>' + house_1 + '</p>'+
                '</div>'+
                '<div id="house_2" class="item">'+
                    '<img class="icon" src="images/house-default.png"/>'+
                    // '<p>' + house_2_title + '<br>' + house_2_content + '</p>'+
                    '<p>' + house_2_title + '</p>'+
                '</div>'+
                '<div id="house_3" class="item">'+
                    '<img class="icon" src="images/house-massive.png"/>'+
                    // '<p>' + house_3_title + '<br>' + house_3_content + '</p>'+
                    '<p>' + house_3_title + '</p>'+
                '</div>'+
                '<div id="house_4"  class="item">'+
                    '<img class="icon" src="images/house-wooden.png"/>'+
                    // '<p>' + house_4_title + '<br>' + house_4_content + '</p>'+
                    '<p>' + house_4_title + '</p>'+
                '</div>'+
                '<div id="house_5" class="item">'+
                    '<img class="icon" src="images/house-aerated.png"/>'+
                    // '<p>' + house_5_title + '<br>' + house_5_content + '</p>'+
                    '<p>' + house_5_title + '</p>'+
                '</div>'+
                '<div id="house_6" class="item">'+
                    '<img class="icon" src="images/house-brick.png"/>'+
                    // '<p>' + house_6_title + '<br>' + house_6_content + '</p>'+
                    '<p>' + house_6_title + '</p>'+
                '</div>'+
            '</div>'+
        '</div>'
    );

    changePanoTitle(lang, housesData);
   

    $('.play').on('click tap', function () {
        $(this).addClass('hidden');
        $('.pause').removeClass('hidden');
        //pano.setVariableValue('take_tour', true);
        
        
    });

    $('.pause').on('click tap', function () {
        $(this).addClass('hidden');
        $('.play').removeClass('hidden');
        //pano.setVariableValue('take_tour', false);
        
        
    });

    $('#house_1').on('click tap', function () {
        pano.openNext('{node1}');
    });

    $('#house_2').on('click tap', function () {
        // pano.openNext('{node16}');
        pano.openNext('{node24}');
    });

    $('#house_3').on('click tap', function () {
        pano.openNext('{node12}');
    });

    $('#house_4').on('click tap', function () {
        pano.openNext('{node6}');
    });

    $('#house_5').on('click tap', function () {
        pano.openNext('{node3}');
    });

    $('#house_6').on('click tap', function () {
        pano.openNext('{node5}');
    });

    select_active_house();    
}

//let is_tour_nodes = ['node1', 'node16', 'node24', 'node12', 'node26','node6', 'node22', 'node3', 'node18', 'node5', 'node20'];
let baumit_object = {

    // welcome
    node1 : {
        sequences : {
            1 : {
                subtitles_fields : ['start_welcome',],
                audio_fields : ['start_audio1'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            },
            2 :  {
                subtitles_fields : ['start_quote', 'start_quote_source', 'start_come_along'],
                audio_fields : ['start_audio2'],
                video_id : 'video_2',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            } 
        },
    },

    // house_8 exterier
    // node16 : {
    //     sequences : {
    //         1 : {
    //             subtitles_fields : ['house_8_healthy_living', 'house_8_data_method_1', 'house_8_data_method_2', 'house_8_data_method_3'],
    //             audio_fields : ['house_8_audio'],
    //             video_id : 'video_1',
    //             languages : {
    //                 int : {
    //                     subtitles : ''
    //                 }
    //             }
    //         }
    //     }
    // },

    // house_8 interier
    node24 : {
        sequences : {
            1 : {
                //subtitles_fields : ['house_8_healthy_living', 'house_8_data_method_1', 'house_8_data_method_2', 'house_8_data_method_3'],
                subtitles_fields : ['house_8_healthy_living'],
                audio_fields : ['house_8_audio'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    },

    // house_10 exterier
    node12 : {
        sequences : {
            1 : {
                subtitles_fields : ['house_10_construction'],
                audio_fields : ['house_10_audio1'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    },

    // house_10 interier
    node26 : {
        sequences : {
            1 : {
                subtitles_fields : ['house_10_results'],
                audio_fields : ['house_10_audio2'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    },

    // house_6 exterier
    node6 : {
        sequences : {
            1 : {
                subtitles_fields : ['house_6_construction'],
                audio_fields : ['house_6_audio1'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    },

    // house_6 interier
    node22 : {
        sequences : {
            1 : {
                subtitles_fields : ['house_6_desc_1', 'house_6_method_1', 'house_6_method_2', 'house_6_method_3'],
                audio_fields : ['house_6_audio2'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    },

    // house_2 exterier
    node3 : {
        sequences : {
            1 : {
                subtitles_fields : ['house_2_construction'],
                audio_fields : ['house_2_audio1'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    },

    // house_2 interier
    node18 : {
        sequences : {
            1 : {
                subtitles_fields : ['house_2_research_1', 'house_2_research_2'],
                audio_fields : ['house_2_audio2'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    },

    // house_4 exterier
    node5 : {
        sequences : {
            1 : {
                subtitles_fields : ['house_4_construction'],
                audio_fields : ['house_4_audio1'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    },

    // house_4 interier
    node20 : {
        sequences : {
            1 : {
                subtitles_fields : ['house_4_method_1', 'house_4_method_2'],
                audio_fields : ['house_4_audio2'],
                video_id : 'video_1',
                languages : {
                    int : {
                        subtitles : ''
                    }
                }
            }
        }
    }
}

function generate_baumit_data() {
    let lang = pano.getVariableValue('lang');

    $.each(baumit_object, function (index, node) {

        $.each(node, function (number, sequence) {

            $.each(sequence, function (int, data) {
                if (
                    data.languages[lang] == 'undefined' ||
                    data.languages[lang] == undefined || 
                    data.languages[lang] == null 
                ) {
                    data.languages[lang] = {};
                    data.languages[lang].subtitles = '';
                }

                if (
                    data.languages[lang].subtitles == '' 
                ) {
                    for (let index = 0; index < data.subtitles_fields.length; index++) {
                        data.languages[lang].subtitles = data.languages[lang].subtitles + subtitlesData[lang][data.subtitles_fields[index]];   

                        if (
                            index < data.subtitles_fields.length - 1
                        ) {
                            data.languages[lang].subtitles = data.languages[lang].subtitles + '<br><br>'
                        }
                    }
                }
            });
        });
        
    });

    ////////console.log(baumit_object);

    pano.on('changenode', function () { 
        let lang = pano.getVariableValue('lang');
        $('.text-from-api > div').html(subtitlesData[lang].house_8_data_method_1);
        $('.text-from-api-solidity > div').html(housesData[lang]['additional_content'][5].title);
        $('.text-from-api-interior > div').html(housesData[lang]['additional_content'][6].title);
        $('.text-from-api-insulation > div').html(housesData[lang]['additional_content'][4].title);
    });

    
}

let New_interval;
let New_intervalTime = 5000;

function run_baumit_tour() {  
    ////////console.log(baumit_object);
    pano.setVariableValue('hotspots', false);

    let lang = pano.getVariableValue('lang');

    let current_house;
    let active_house;
    let house_1;
    let house_2_title;
    let house_2_content;
    let house_3_title;
    let house_3_content;
    let house_4_title;
    let house_4_content;
    let house_5_title;
    let house_5_content;
    let house_6_title;
    let house_6_content;

    if (
        housesData[lang] == 'undefined' || 
        housesData[lang] == null 
    ) {
        return;
    }
    
    // Hosue #1
    if (
        housesData[lang]['additional_content'][36] == null ||
        housesData[lang]['additional_content'][36] == undefined ||
        housesData[lang]['additional_content'][36] == ''
    ) {
        house_1 = 'Home';
    }
    else {
        house_1 = housesData[lang]['additional_content'][36]['title'];
    }

    // Hosue #2
    if (
        housesData[lang]['additional_content'][37] == null ||
        housesData[lang]['additional_content'][37] == undefined ||
        housesData[lang]['additional_content'][37] == ''
    ) {
        house_2_title = 'Research';
        house_2_content = 'Comparison'
    }
    else {
        house_2_title = housesData[lang]['additional_content'][37]['title'];
        house_2_content = housesData[lang]['additional_content'][37]['content'];
    }

    // Hosue #3
    if (
        housesData[lang]['additional_content'][38] == null ||
        housesData[lang]['additional_content'][38] == undefined ||
        housesData[lang]['additional_content'][38] == ''
    ) {
        house_3_title = 'Research';
        house_3_content = 'Massive Wood House'
    }
    else {
        house_3_title = housesData[lang]['additional_content'][38]['title'];
        house_3_content = housesData[lang]['additional_content'][38]['content'];
    }

    // Hosue #4
    if (
        housesData[lang]['additional_content'][39] == null ||
        housesData[lang]['additional_content'][39] == undefined ||
        housesData[lang]['additional_content'][39] == ''
    ) {
        house_4_title = 'Research';
        house_4_content = 'Wooden Frame House'
    }
    else {
        house_4_title = housesData[lang]['additional_content'][39]['title'];
        house_4_content = housesData[lang]['additional_content'][39]['content'];
    }

    // Hosue #5
    if (
        housesData[lang]['additional_content'][40] == null ||
        housesData[lang]['additional_content'][40] == undefined ||
        housesData[lang]['additional_content'][40] == ''
    ) {
        house_5_title = 'Research';
        house_5_content = 'Concrete House'
    }
    else {
        house_5_title = housesData[lang]['additional_content'][40]['title'];
        house_5_content = housesData[lang]['additional_content'][40]['content'];
    }

    // Hosue #6
    if (
        housesData[lang]['additional_content'][41] == null ||
        housesData[lang]['additional_content'][41] == undefined ||
        housesData[lang]['additional_content'][41] == ''
    ) {
        house_6_title = 'Research';
        house_6_content = 'Full Brick House'
    }
    else {
        house_6_title = housesData[lang]['additional_content'][41]['title'];
        house_6_content = housesData[lang]['additional_content'][41]['content'];
    }

    function select_active_house() {

        switch (pano.getCurrentNode()) {
            case 'node1' : 
                $('#house_1').addClass('active');
                current_house = 'start';
            break;

            // case 'node16' :
            case 'node24' : 
                $('#house_2').addClass('active');
                current_house = 'house_8';
                
            break;

            case 'node12' : 
            case 'node26' : 
                $('#house_3').addClass('active');
                current_house = 'house_10';
            break;

            case 'node6' : 
            case 'node22' : 
                $('#house_4').addClass('active');
                current_house = 'house_6';
            break;

            case 'node3' : 
            case 'node18' : 
                $('#house_5').addClass('active');
                current_house = 'house_2';
            break;

            case 'node5' : 
            case 'node20' : 
                $('#house_6').addClass('active');
                current_house = 'house_4';
            break;
        }
        
    }

    function mark_active_house() {
        $('.houses-footer > .item').removeClass('active');
        select_active_house();
        ////////console.log('markujem ... ' + current_house);
    }

    function open_next_scene () {
        let node = pano.getCurrentNode();

        for (let index = 0; index < is_tour_nodes.length; index++) {
            if (
                is_tour_nodes[index] == node
            ) {
    
                if (
                    index == is_tour_nodes.length
                ) {
                    pano.openNext('{' + is_tour_nodes[0] + '}');
                    
                }
    
                else {
                    ////////console.log(take_tour_data[node].videos[0].pan);
                    let i = index + 1;
                    if (
                        is_tour_nodes[i] == null ||
                        is_tour_nodes[i] == 'undefined'
                    ) {
                        ////////console.log(is_tour_nodes[0]);
                        pano.openNext('{' + is_tour_nodes[0] + '}');
                        
                    }

                    else {
                        ////////console.log(is_tour_nodes[i]);
                        pano.openNext('{' + is_tour_nodes[i] + '}');
                        
                    }
                    
                }
            }
            
        }
    }


    mark_active_house();

    //pano.setVolume('_main', 0.0);
    let audio1 = new Audio();
    let node = pano.getCurrentNode();

    function change_data() {
        
        audio1.pause();
        audio1 = '';

        let max_seq = 3;
        let current_node = pano.getCurrentNode();
        let current_lang = pano.getVariableValue('lang');

        let i = 1;

        function pusti_zvuk() {
            pano.setVariableValue('hotspots', false);
            $('.learn-more');   
            $('#next-house'); 

            if (
                pano.getCurrentNode() != ''
            ) {
                pano.setVolume('_main', 1.0);
            }

                setTimeout( function(){ 
                //console.log('pusti zvuk');
                //pano.pauseSound('video_'+i);
                if (
                    baumit_object[current_node].sequences[i] != null &&
                    baumit_object[current_node].sequences[i] != 'undefined'
                ) {
                    $('.subtitles').html(
                        baumit_object[pano.getCurrentNode()].sequences[i].languages[pano.getVariableValue('lang')].subtitles
                    ); 


                    audio1 = new Audio(subtitlesData[current_lang][baumit_object[current_node].sequences[i].audio_fields[0]]);
                    ////////console.log('index je : ' + i);
                    setTimeout(() => {
                        if (
                         pano.isPlaying('video_'+i)
                        ) {
                         //////console.log('traz začalo video');
                         audio1.play();
                         
                         return;
                        } 
                     }, 100);
                     if (
                        pano.getVariableValue('paused_baumit_tour') == false
                     ) {
                        pano.setMediaVisibility('video_'+i, true);
                        a_video = 'video_' + i;
                     }

                     if (
                        pano.getCurrentNode() == 'node1'
                        ) {
                            audio1.volume =  0.0;
                            pano.setVolume('video_'+i, 1.0);
                            a_video = 'video_' + i;

                        }

                        else {
                            audio1.volume =  0.0;
                            pano.setVolume('video_'+i, 1.0);
                        }

                        if (pano.getCurrentNode() == 'node24') {
                            if (
                                a_video == 'video_1'
                            ) {

                                let interval;
                                pano.getMediaObject(a_video).addEventListener('play', function() {
                                    // //console.log(parseFloat(subtitlesData[lang].house_8_data_method_1_time.replace(':', '.')*100));
                                    // //console.log(parseFloat(subtitlesData[lang].house_8_data_method_2_time.replace(':', '.')*100));
                                    // //console.log(parseFloat(subtitlesData[lang].house_8_data_method_3_time.replace(':', '.')*100));
                                    
                                    let counter = 0;
                                    
                                    let timeObject = {
                                        0 : {
                                            "time" : subtitlesData[lang].house_8_healthy_living_time,
                                            "subtitles" : subtitlesData[lang].house_8_healthy_living
                                        },
                                        1: {
                                            "time" : subtitlesData[lang].house_8_data_method_1_time,
                                            "subtitles" : subtitlesData[lang].house_8_data_method_1
                                        },
                                        2 : {
                                            "time" : subtitlesData[lang].house_8_data_method_2_time,
                                            "subtitles" : subtitlesData[lang].house_8_data_method_2
                                        },
                                        3 : {
                                            "time" : subtitlesData[lang].house_8_data_method_3_time,
                                            "subtitles" : subtitlesData[lang].house_8_data_method_3
                                        }

                                    }

                                    interval = setInterval(checkTime, 100);

                                    function checkTime(){
                                        if (
                                            pano.getCurrentNode() == 'node24'
                                        ) {
                                            if(pano.getMediaObject(a_video).currentTime >= parseFloat(timeObject[counter]['time'].replace(':', '.'))*100){
                                                //  //console.log(timeObject[counter]['subtitles']);
                                                //  //console.log('áno našiel som, counter je ' + counter );
                                                $('.subtitles').html(timeObject[counter]['subtitles']);
                                            }
                                                
                                                let tmpcounter = counter + 1;
                                                if (
                                                    timeObject[tmpcounter] != undefined
                                                ) {
                                                    if (
                                                        pano.getMediaObject(a_video).currentTime >= parseFloat(timeObject[tmpcounter]['time'].replace(':', '.'))*100
                                                    ) {
                                                        ////console.log('zvyšujem counter');
                                                        
                                                        
                                                        
        
                                                        if (
                                                            counter == Object.keys(timeObject).length + 1
                                                        ) {
                                                //            //console.log('cieľ');
                                                            clearInterval(interval);    
                                                            //return
                                                        } else {
                                                            ////console.log('cieľ nie je ');
                                                        }
        
                                                        counter++;
        
        
                                                    } else {
                                                        ////console.log('nerovná sa :: ' + pano.getMediaObject(a_video).currentTime*100 +' | ' + parseFloat(timeObject[counter]['time'].replace(':', '.'))*100 );
                                                    }
                                                }
    
                                                
    
                                                
                                            
    
                                            else {
                                                //console.log('čo ja viem');
                                            }
                                        }
                                        ////console.log('checkujem');

                                        
                                        
    
                                        // if(pano.getMediaObject(a_video).currentTime >= parseFloat(subtitlesData[lang].house_8_data_method_1_time.replace(':', '.'))*100){
                                        //     ////console.log(parseFloat(pano.getMediaObject(a_video).currentTime) + ' : ' + parseFloat(subtitlesData[lang].house_8_data_method_1_time.replace(':', '.')));
                                        //     //console.log(subtitlesData[lang].house_8_data_method_1);
                                        //     //clearInterval(interval);
                                        // }
    
                                        // if(pano.getMediaObject(a_video).currentTime >= parseFloat(subtitlesData[lang].house_8_data_method_2_time.replace(':', '.'))*100){
                                        //     ////console.log(parseFloat(pano.getMediaObject(a_video).currentTime) + ' : ' + parseFloat(subtitlesData[lang].house_8_data_method_2_time.replace(':', '.')));
                                        //     //console.log(subtitlesData[lang].house_8_data_method_2);
                                        //     //clearInterval(interval);
                                        // }
    
                                        // if(pano.getMediaObject(a_video).currentTime >= parseFloat(subtitlesData[lang].house_8_data_method_3_time.replace(':', '.'))*100){
                                        //     ////console.log(parseFloat(pano.getMediaObject(a_video).currentTime) + ' : ' + parseFloat(subtitlesData[lang].house_8_data_method_3_time.replace(':', '.')));
                                        //     //console.log(subtitlesData[lang].house_8_data_method_3);
                                        //     //clearInterval(interval);
                                        // }
    
                                    }
                                 });

                                 pano.getMediaObject(a_video).addEventListener('ended', function() {
                                    clearInterval(interval);  
                                    $('.pause').removeClass('hidden');
                                    $('.play').addClass('hidden');
                                 });
                            }
                        }
                    
                    
                    pano.playSound('video_'+i);
                    a_video = 'video_' + i;
                    
                    //playPauseMedia();

                    if (
                        pano.getCurrentNode() == 'node22'
                    ) {
                        pano.setMediaVisibility('video_slideshow', true); 
                        pano.playSound('video_slideshow');
                    }
                    
                    ////////console.log(subtitlesData[current_lang][baumit_object[current_node].sequences[i].audio_fields[0]]);

                    
                    
                    pano.getMediaObject(a_video).addEventListener('ended', function() {
                       //console.log('Video '+i+' skončilo');
                       a_video = 'video_' + i;

                       if (
                        pano.getMediaObject('video_'+i) != null &&
                        pano.getMediaObject('video_'+i) != 'undefined'
                        ) {
                            pano.setMediaVisibility('video_'+i, false);
                            pano.setMediaVisibility('video_slideshow', false); 
                        }
                        
                        i++;
                        pusti_zvuk(); 
                    });
                    
                    // pano.on('videoended_video_1', function () {
                    //     // //console.log('Video '+i+' skončilo');
                    //     if (
                    //         pano.getMediaObject('video_'+i) != null &&
                    //         pano.getMediaObject('video_'+i) != 'undefined'
                    //     ) {
                    //         pano.setMediaVisibility('video_'+i, false);
                    //         pano.setMediaVisibility('video_slideshow', false); 
                            
                    //     }
                        
                    //     i++;
                    //     pusti_zvuk(); 
                    // });


                    audio1.onended = function() {
                        // //console.log('Video '+i+' skončilo');
                        // if (
                        //     pano.getMediaObject('video_'+i) != null &&
                        //     pano.getMediaObject('video_'+i) != 'undefined'
                        // ) {
                        //     pano.setMediaVisibility('video_'+i, false);
                        //     pano.setMediaVisibility('video_slideshow', false); 
                            
                        // }
                        
                        // i++;
                        // pusti_zvuk(); 
                        
                    };
    
                    //playPauseMedia(false);

    
                    setTimeout( function(){ 
                        
                      }  , 0 );
                    
                }
    
                else  {
                    $('.learn-more');   
                    $('#next-house');   
                    New_interval = setInterval(function(){
                        pano.setMediaVisibility('video_'+i, false);
                        pano.pauseSound('video_'+i);
                        open_next_scene();
                        clearInterval(New_interval);
                        return;
                    }, New_intervalTime);
                    
                    
                }
                
                  }  , 0 );



            
            
            
        }


        console.log('spustil som change_data');
        pusti_zvuk();

        
            //     ////////console.log('index je : ' + i);
            //     ////////console.log(subtitlesData[current_lang][baumit_object[current_node].sequences[i].audio_fields[0]]);
            //     audio1 = new Audio(subtitlesData[current_lang][baumit_object[current_node].sequences[i].audio_fields[0]]);
            //     audio1.play();
            //     audio1.onended = function() {
            //         ////////console.log('Video '+i+' skončilo');
                    
            //     };
            //     i++;
                
            // }

            // else {
            //     ////////console.log('nenee');
            //     i++;
            // }

            
        //   }
                   
        
        
    }

    pano.on('changenode', function mark() {
        video_nacitane = false;
        mark_active_house();
        if (
            pano.getVariableValue('baumit_tour')
        ) {
            let node = pano.getCurrentNode();
            change_data();
            //pano.moveTo(take_tour_data[node].videos[0].pan, take_tour_data[node].videos[0].tilt, 84, 5);
            pano.setPanTiltFov(take_tour_data[node].videos[0].pan, take_tour_data[node].videos[0].tilt, take_tour_data[node].videos[0].fov);
            
        
        }

        else {
            audio1.pause();
        }
        
    });

    let learn_more_about;

    if (
        housesData[lang]['additional_content'][54] == null ||
        housesData[lang]['additional_content'][54] == undefined ||
        housesData[lang]['additional_content'][54] == ''
    ) {
        learn_more_about = 'Learn more';
    }
    else {
        
        learn_more_about = housesData[lang]['additional_content'][54].title;
    }

    
    

    $('#houses-info-container').remove();
    
    $('body').append(
        '<div id="houses-info-container" style="display: none;">'+
            '<div class="houses-header">'+
                '<div class="buttons">'+
                    '<img class="play hidden" src="assets/icons/play-houses.svg"/>'+
                    '<img class="pause" src="assets/icons/pause-houses.svg"/>'+
                    '<img class="toggle" src="assets/icons/toggle-houses.svg"/>'+
                    '<button id="next-house">Next house</button>'+
                    '<button id="learn-more" class="learn-more">' + learn_more_about + '&nbsp;<span>'+ pano.getNodeUserdata(pano.getCurrentNode()).source +'</span></button>'+
                '</div>'+
                '<div class="subtitles">'+
                    '<p>' + baumit_object[pano.getCurrentNode()].sequences[1].languages[lang].subtitles +'</p>'+
                '</div>'+
            '</div>'+
            '<div class="houses-footer">'+
                '<div id="house_1" class="item">'+
                    '<img class="icon" src="images/house-default.png"/>'+
                    '<p>' + house_1 + '</p>'+
                '</div>'+
                '<div id="house_2" class="item">'+
                    '<img class="icon" src="images/house-default.png"/>'+
                    // '<p>' + house_2_title + '<br>' + house_2_content + '</p>'+
                    '<p>' + house_2_title + '</p>'+
                '</div>'+
                '<div id="house_3" class="item">'+
                    '<img class="icon" src="images/house-massive.png"/>'+
                    // '<p>' + house_3_title + '<br>' + house_3_content + '</p>'+
                    '<p>' + house_3_title + '</p>'+
                '</div>'+
                '<div id="house_4"  class="item">'+
                    '<img class="icon" src="images/house-wooden.png"/>'+
                    // '<p>' + house_4_title + '<br>' + house_4_content + '</p>'+
                    '<p>' + house_4_title + '</p>'+
                '</div>'+
                '<div id="house_5" class="item">'+
                    '<img class="icon" src="images/house-aerated.png"/>'+
                    // '<p>' + house_5_title + '<br>' + house_5_content + '</p>'+
                    '<p>' + house_5_title + '</p>'+
                '</div>'+
                '<div id="house_6" class="item">'+
                    '<img class="icon" src="images/house-brick.png"/>'+
                    // '<p>' + house_6_title + '<br>' + house_6_content + '</p>'+
                    '<p>' + house_6_title + '</p>'+
                '</div>'+
            '</div>'+
        '</div>'
    );
    changePanoTitle(lang, housesData);

    // defaultné vyznačenie aktívneho domu
    select_active_house();

pano.on('varchanged_paused_baumit_tour', function () {
    switch (pano.getVariableValue('paused_baumit_tour')) {
        case true : 
            
            pano.setMediaVisibility('video_1', 0);
            pano.setMediaVisibility('video_2', 0);
        break;

        case false : 
        
        pano.setMediaVisibility(a_video, 1);
        pano.playPauseSound(a_video);
        $('.pause').removeClass('hidden');
        $('.play').addClass('hidden');
            
            // switch (pano.getCurrentNode()) {
            //     case 'node1' : 
            //         if (
            //             pano.isPlaying('video_1')
            //         ) {
                        
            //         }    

            //         else if (
            //             pano.isPlaying('video_2')
            //         ) {
            //             pano.setMediaVisibility('video_2', 1);
            //         }
                
            //     break;

            //     default : 
            //     let video = pano.getNodeUserdata(pano.getCurrentNode()).title;
            //     ////console.log(video);
            //         pano.setMediaVisibility('video_1', 1);
            //     break;
            // }
        break;
    }

    if (
        $('.houses-footer').hasClass('hidden') == true
    ) {
        $('.subtitles').addClass('hidden');
    } 
    else {
        $('.subtitles').removeClass('hidden');
    }
});



    $('.play').on('click tap', function () {
        pano.setVariableValue('baumit_tour', true);
        $(this).addClass('hidden');
        $('.pause').removeClass('hidden');
        pano.setVariableValue('paused_baumit_tour', false);
        //audio1.play();    
        
        
    });
    
    $('.pause').on('click tap', function () {
        $(this).addClass('hidden');
        $('.play').removeClass('hidden');  
        //pano.setVariableValue('baumit_tour', false);  
        pano.setVariableValue('paused_baumit_tour', true);
        audio1.pause();    
        if (
            pano.isPlaying('video_1') == true
        ) {
            pano.playPauseSound('video_1');
            a_video = 'video_1';
        }

        if (
            pano.isPlaying('video_2') == true
        ) {
            pano.playPauseSound('video_2');
            a_video = 'video_2';
        }

        $('.subtitles').addClass('hidden');
        
    });

    $('.toggle').on('click tap', function () {
        $('.houses-footer').toggleClass('hidden');
        if (
            $('.houses-footer').hasClass('hidden') == true
        ) {
            $('.subtitles').addClass('hidden');
        } 
        else {
            $('.subtitles').removeClass('hidden');
        }
        
    });

    // zmena domu po kliku na konkrétny dom
    $('#house_1').on('click tap', function () {
        pano.openNext('{node1}');
    });

    $('#house_2').on('click tap', function () {
        pano.openNext('{node24}');
    });

    $('#house_3').on('click tap', function () {
        pano.openNext('{node12}');
    });

    $('#house_4').on('click tap', function () {
        pano.openNext('{node6}');
    });

    $('#house_5').on('click tap', function () {
        pano.openNext('{node3}');
    });

    $('#house_6').on('click tap', function () {
        pano.openNext('{node5}');
    });

    pano.on('varchanged_baumit_tour', function () {
        if (
            !pano.getVariableValue('baumit_tour') 
        ) {
            ////console.log(a_video);
            audio1.pause();
            pano.stopSound(a_video);
            $('#houses-info-container').fadeOut();
            $('.subtitles').addClass('hidden1');
           
        }

        else {
            ////console.log(a_video);
            a_video = 'video_1';
            pano.setMediaVisibility(a_video, 1);
            //audio1.volume = 0.0;
            pano.playSound(a_video);
            if (
                $('.houses-footer').hasClass('hidden') == true
            ) {
                $('.subtitles').addClass('hidden');
            } 
            else {
                $('.subtitles').removeClass('hidden');
            }

            //change_data();
            ////console.log(pano.getMediaObject(pano.getNodeUserdata(pano.getCurrentNode()).title).currentTime);

            play_Animation();
            if (
                pano.getMediaObject(pano.getNodeUserdata(pano.getCurrentNode()).title) != null
            ) {
                if (
                    pano.getMediaObject(pano.getNodeUserdata(pano.getCurrentNode()).title).currentTime == 0 ||
                    pano.getMediaObject(pano.getNodeUserdata(pano.getCurrentNode()).title).currentTime == pano.getMediaObject(pano.getNodeUserdata(pano.getCurrentNode()).title).duration
                ) {
                    videoDuration = 0;
                    videoDurationHalf = 0;
                    playPauseMedia();
                }
            }
            
            $('.pause').removeClass('hidden');
            $('.play').addClass('hidden');
        }
    });
    
}

function download_data($value) {
    let url;
    let title = 'file';
    
    if (
        housesData[lang]['additional_content'][$value] == null ||
        housesData[lang]['additional_content'][$value] == undefined ||
        housesData[lang]['additional_content'][$value] == 'undefined' 
    ) {
        ////////console.log(housesData['int']);
        //////console.log('v jazyku sa nedá stiahnuť');

        switch ($value) {
            case '34' : 
                //////console.log(housesData['int']['additional_content'][$value]['media']);
                url = housesData['int']['additional_content'][$value]['media'];
            break;

            default : 
                //////console.log(housesData['int']['additional_content'][$value]['link_url']);
                url = housesData['int']['additional_content'][$value]['link_url'];
            break;
        }
        

    }
    else {
        //////console.log('v jazyku sa dá stiahnuť' + $value);
        //////console.log(housesData[lang]['additional_content'][$value]);
        ////////console.log(housesData[lang]['additional_content'][$value][target]);
        switch ($value) {
            case '34' : 

                if (
                    housesData[lang]['additional_content'][$value]['media'] == 'undefined' || 
                    housesData[lang]['additional_content'][$value]['media'] == null
                ) {
                    url = housesData['int']['additional_content'][$value]['media'];
                }

                else {
                    url = housesData[lang]['additional_content'][$value]['media'];
                }
                
            break;

            default: 

                if (
                    housesData[lang]['additional_content'][$value]['link_url'] == 'undefined' ||
                    housesData[lang]['additional_content'][$value]['link_url'] == null
                ) {
                    url = housesData['int']['additional_content'][$value]['link_url'];
                }

                else {
                    url = housesData[lang]['additional_content'][$value]['link_url'];
                }

            break;
        }
        
    }

    //////console.log(url);

    

    var link = document.createElement("a");
    link.href = url;
    link.download = title + '.pdf';
    link.target = '_blank'
    link.click();
    link.remove();
}


pano.on('varchanged_baumit_tour', function () {
    switch (pano.getVariableValue('baumit_tour')) {
        case true:
            
            $('#houses-info-container').fadeIn();
            ////////console.log('zapla sa baumit_tour');
            $('.take-tour-button').addClass('playing');
            let node = pano.getCurrentNode();
            
            //pano.moveTo(take_tour_data[node].videos[0].pan, take_tour_data[node].videos[0].tilt, 84, 5);
            pano.setPanTiltFov(take_tour_data[node].videos[0].pan, take_tour_data[node].videos[0].tilt, take_tour_data[node].videos[0].fov);
            
            break;
    
        case false:
            ////////console.log('vypla sa baumit_tour');
            $('.take-tour-button').removeClass('playing');
            
            let i = 3;
            for (let index = 0; index < i; index++) {
                if (
                    pano.getMediaObject('video_'+index) != null &&
                    pano.getMediaObject('video_'+index) != 'undefined'
                ) {
                    pano.setMediaVisibility('video_'+index, false);
                }
                
            }

            $('#houses-info-container').addClass('hidden');
            break;
    }
});

$('.take-tour-button').on('click tap', function () {
    //$('.take-tour-button').unbind();
    $('#welcome').fadeOut();
    pano.setVariableValue('hotspots', true);
    pano.setVariableValue('baumit_tour', !pano.getVariableValue('baumit_tour'));
    
});


$('.lang-menu').parent().addClass('lang-wrapper');

pano.on('varchanged_floorplan_full', function (audio) {
    switch (pano.getVariableValue('floorplan_full')) {
        case true: 
        break;
        case false: 
            pano.setVariableValue('hotspots', true);
        break;
    }
});


// ikona hostspotu dverí zväčšená 1.5X pre interiér
pano.on('changenode', function () {
    let inter_scene = pano.getNodesWithTag('int');
    if(
        jQuery.inArray(pano.getCurrentNode(), inter_scene) !== -1
    )
    {
        $('.enter-hts').addClass('int');
    }

    else {
        $('.enter-hts').removeClass('int');
    }

    

    // videoDuration = 0;
    // videoDurationHalf = 0;
    // play = true;

    if (
        pano.getVariableValue('baumit_tour') == true
    ) {

        play = true;
        
    }
});