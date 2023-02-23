<script>
    import { vivaData } from '../store.js';

    // VARIABLES
    let user_lang, productUrl, housesUrl, subtitlesUrl = null;
    let intro, fetching_data, lang_data_loading, welcome = true;
    let about_viva, product_data_loaded, houses_data_loaded, subtitles_data_loaded = false;
    let _vivaData = {};

    // aktivácia jQuery
    const jq = window.$;

    // Linky pre google mapu
    const map_iframe = {
        int : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sen!2sen',
        en : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sen!2sen',
        de : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
        at : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
        ch : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
        sk : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1ssk!2ssk',
    }

    // API kľúče
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

    // URL prefixy
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

    vivaData.subscribe(value => {
        _vivaData = value;
    });

    // získanie dát z API - golbálna funkcia
    async function fetchData($url, $lang, $type, $variable) {
    
        $variable = false;
        if (_vivaData[$lang] == undefined) {
            const res = await fetch($url);
            const json = await res.json();

            if (res.ok) {

                if (_vivaData[$lang] == undefined) {
                    _vivaData[$lang] = {
                        houses : null,
                        subtitles : null,
                        products : null
                    };
                }
                _vivaData[$lang][$type] = json; 
                vivaData.update(n => _vivaData);       

                if ($type == "houses") {
                    console.log(_vivaData);
                }

            } else {
                throw new Error(json);
            }            
        }    
	}
 
    // Zistenie jazyka užívateľa
    function check_user_lang () {

        // zistenie honoty z cookies
        function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);

                }
            }
            return "";
        }
        let cookie_lang = getCookie("user_lang");

        if (cookie_lang != "") {
            // cookies nie su prázdne 
            user_lang = cookie_lang;
            pano.setVariableValue('lang', user_lang);
            //update_lang_content();
        }
    
        else {
            // Jazyk nie je definovaný v Cookies
            user_lang = (window.navigator.userLanguage || window.navigator.language).toLowerCase();
            console.log(window.navigator.userLanguage);
            document.cookie = "user_lang=" + user_lang;
            console.log(user_lang);
            switch (user_lang) {
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
            //update_lang_content();
        }   
        
        
        //getVivaTranslations(user_lang);

        fetchPhpData(user_lang);
        change_map_url();
    }
    
    check_user_lang();

    // Získanie prekladov z API BAUMITU
    function getVivaTranslations($user_lang) {
        getProductLink($user_lang);
        getHousesLink($user_lang);
        getSubtitlesLink($user_lang);
    }

    // ziskanie URL adries
    function getProductLink($lang) {
        productUrl = urlPrefix[$lang]+'/api/products/products?api_token='+apiToken[$lang];
        console.log("Products URL : " + productUrl);
        switch ($lang) {
            case "int":
                if (_vivaData.int == null) {
                    fetchData(productUrl, "int", "products", product_data_loaded);        
                }
                break;
        
            default:
                if (_vivaData.$lang == undefined) {
                    fetchData(productUrl, $lang, "products", product_data_loaded);    
                }

                if (_vivaData.int == null) {
                    fetchData(productUrl, "int", "products", product_data_loaded);        
                }
                break;
        }
    }

    function getHousesLink($lang) {
        housesUrl = urlPrefix[$lang]+'/api/buildings?api_token='+apiToken[$lang];
        console.log("Houses URL : " + housesUrl);

        switch ($lang) {
            case "int":
                if (_vivaData.int == null) {
                    fetchData(housesUrl, "int", "houses", houses_data_loaded);      
                }
            break;
        
            default:
                if (_vivaData.$lang == undefined) {
                    fetchData(housesUrl, $lang, "houses", houses_data_loaded);  
                }

                if (_vivaData.int == null) {
                    fetchData(housesUrl, "int", "houses", houses_data_loaded);
                }
            break;
        }
    }

    function getSubtitlesLink($lang) {
        subtitlesUrl = urlPrefix[$lang]+'/api/building-tour-translations?api_token='+apiToken[$lang];
        console.log("Subtitles URL : " + subtitlesUrl);

        switch ($lang) {
            case "int":
                if (_vivaData.int == null) {
                    fetchData(subtitlesUrl, "int", "subtitles", subtitles_data_loaded);
                }
            break;
        
            default:
                if (_vivaData.$lang == undefined) {
                    fetchData(subtitlesUrl, $lang, "subtitles", subtitles_data_loaded);
                }

                if (_vivaData.int == null) {
                    fetchData(subtitlesUrl, "int", "subtitles", subtitles_data_loaded);
                }
            break;
        }
    }

    pano.on("configloaded", function (){
        let showVivaIntro = null;
        pano.setVariableValue('blurred', false);
        //pano.setVariableValue('intro', false);

        pano.on("varchanged_lang", function() {
            user_lang = pano.getVariableValue("lang");
            document.cookie = "user_lang=" + user_lang; 
            //getVivaTranslations(user_lang);
            check_user_lang();
        });

        pano.on("varchanged_floorplan_full", function () {
            switch (pano.getVariableValue("floorplan_full")) {
                case true:
                    change_floorplan_title();
                    change_comfort_level_floorplan();
                    break;
            
                default:
                    break;
            }
        });


        pano.on("changenode", function () {

            // vypnutie video patchov
            for (let index = 0; index < 3; index++) {
                pano.setMediaVisibility('video_'+index, false);
            }

            // označenie názvu scény
            let node_id = pano.getNodeUserdata(pano.getCurrentNode()).source;
            let title = jq('.header > .title > div');

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
                    let house_title = null;
                    title.text(_vivaData['houses']['buildings'][parseInt(node_id)-1].house_nr);
                break;

                default : 
                    title.text('Viva park');
                break;
            }

            change_hotspots_title();

            
        
        });
	});

    function change_hotspots_title() {
        jq.each ( jq('.hts-np'), function() {
            let hotspot_title = jq(this).children('.np-title').children('div').html();
            let foundString;
            if (hotspot_title.indexOf('_') > 0) {
                foundString = hotspot_title.substr(hotspot_title.indexOf('_')+1,);
            }

            else if (hotspot_title.indexOf('.') > 0) {
                foundString = hotspot_title.substr(hotspot_title.indexOf('.')+1,).replace(' ','');
                
            }
        
            if (_vivaData['houses'] != undefined) {
                if (_vivaData['houses']['buildings'] != null) {
                    switch (foundString) {
                        case '01' : 
                        case '1' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][0].house_nr);
                        
                        break;
                        case '02' : 
                        case '2' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][1].house_nr);
                            
                        break;
                        case '03' : 
                        case '3' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][2].house_nr);
                            
                        break;
                        case '04' : 
                        case '4' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][3].house_nr);
                            
                        break;
                        case '05' : 
                        case '5' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][4].house_nr_t[user_lang]);
                            
                        break;
                        case '06' : 
                        case '6' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][5].house_nr_t[user_lang]);
                            
                        break;
                        case '07' : 
                        case '7' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][6].house_nr_t[user_lang]);
                            
                        break;
                        case '08' : 
                        case '8' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][7].house_nr_t[user_lang]);
                                
                        break;
                        case '09' : 
                        case '9' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][8].house_nr_t[user_lang]);
                            
                        break;
                        case '10' : 
                        case '10' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][9].house_nr_t[user_lang]);
                            
                        break;
                        case '11' : 
                        case '11' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][10].house_nr_t[user_lang]);
                            
                        break;
                        case '12' : 
                        case '12' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][11].house_nr_t[user_lang]);
                            
                        break;
                        case '13' : 
                        case '13' : 
                            jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][12].house_nr_t[user_lang]);
                            
                        break;
                
                        case '00' : 
                        jq(this).children('.np-title').children('div').html('Viva park');
                            
                        break;
                    }
                }
            }
            

        });
    }

    // zmena jazyka pre Google mapu
    function change_map_url() {
        if (
            map_iframe[user_lang] != null &&
            map_iframe[user_lang] != 'undefined' &&
            map_iframe[user_lang] != undefined
        ) {
            pano.setVariableValue('map_iframe', map_iframe[user_lang]);
            jq('.map > iframe').attr('src', map_iframe[user_lang]);
        }

        else {
            pano.setVariableValue('map_iframe', map_iframe['int']);
            jq('.map > iframe').attr('src', map_iframe['int']);
        }
    }

    // zmena zeleného loga 
    function change_logo_img() {
        let logo_src = null;
    
        if (jq('.vp-logo')) {
            if (_vivaData['houses'] != undefined) {
                if (_vivaData['houses']['additional_content'] != undefined) {
                    _vivaData['houses']['additional_content'].forEach(element => {
                        if (element.name.toLowerCase().replace(" ", "") == "viva:logo") {
                            if (element.media_t[user_lang] !== undefined ) {
                                logo_src = element.media_t[user_lang];       
                            } else {
                                if (element.media_t["int"] !== undefined ) {
                                    logo_src = element.media_t["int"];        
                                }
                            }
                        }
                    });
                }
            }
        }

        if (logo_src == null || logo_src == undefined || logo_src == "") {
            jq('.vp-logo > img').attr('src', 'images/vivapark-logo.svg');
        } else {
            jq('.vp-logo > img').attr('src', logo_src);
        }
        
        jq('.vp-logo').on('click tap', function () {
            window.location = 'https://tour.baumit.com/';
        });
    }

    // zmena názvu a podnadpisu vo Floorplane
    function change_floorplan_title() {
        let floorplan_title, floorplan_subtitle = null;
        if (jq('.floorplan-full > .title')) {
            
            if (_vivaData['houses'] != undefined) {
                if (_vivaData['houses']['additional_content'] != undefined) {
                    _vivaData['houses']['additional_content'].forEach(element => {
                        if (element.name == "VIVA: Quick Tour") {
                            if (element.title_t[user_lang] !== undefined ) {
                                floorplan_title = element.name_t[user_lang] + "<span>" + element.title_t[user_lang] + "</span>";       
                            } else {
                                if (element.title_t["int"] !== undefined ) {
                                    floorplan_title = element.name_t["int"] + "<span>" + element.title_t["int"] + "</span>";       
                                }
                            }
                        }
                    });
                }
            }
        }

        jq('.floorplan-full > .title').html(floorplan_title);

        // if (floorplan_title == null || floorplan_title == undefined || floorplan_title == "") {
        //     jq('.floorplan-full > .title').html('images/vivapark-logo.svg');
        // } else {
        //     jq('.floorplan-full > .title').html(floorplan_title);
        // }
    }

    
    // zmena comfort levelu vo floorplane
    function change_comfort_level_floorplan() {
        
        jq.each(jq('.check-layer > div > span'), function() {
            let house_id = parseInt(jq(this).attr('id'));
            if (
                house_id > 0
            )
            
            {
                house_id--;
            }

            let comfort_level = _vivaData["houses"]['buildings'][house_id]['house_comfort']; 
            let finalNumber = 0;

            switch (comfort_level) {
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
            }

            console.log(house_id + " : " + finalNumber);

            

            switch (finalNumber) {
                case 0:
                    jq(this).siblings('.tooltip-level').remove();
                    jq(this).siblings('.ko-progress-circle').remove();
                    break;
            
                default:
                    jq(this).siblings('.ko-progress-circle').attr('data-progress', finalNumber);
                    jq(this).siblings('.tooltip-level').text(_vivaData["houses"]['buildings'][house_id]['house_comfort_t'][user_lang]);
                    break;
            }
            
            

        });
    }

    // Sťahovanie prekladov z API
    async function fetchPhpData($lang) {
        fetching_data = true;
        let api_data = {
            "lang" : $lang, 
            "int_buildings_link" : urlPrefix["int"]+'/api/buildings?api_token='+apiToken["int"],
            "lang_buildings_link" : urlPrefix[$lang]+'/api/buildings?api_token='+apiToken[$lang],
            "int_subtitles_link" : urlPrefix["int"]+'/api/building-tour-translations?api_token='+apiToken["int"],
            "lang_subtitles_link" : urlPrefix[$lang]+'/api/building-tour-translations?api_token='+apiToken[$lang],
            "products" : urlPrefix[$lang]+'/api/products/products?api_token='+apiToken[$lang]
        }

        console.log(api_data);

        const res = await fetch("https://goacaffe.sk/molly/assets/krpano/getValues.php", {
			method: 'POST',
			body: JSON.stringify(api_data)
		})
        const json = await res.json();


        if (res.ok) {
            console.log(json);
            _vivaData = json;
            fetching_data = false;
            intro = true;
            change_hotspots_title();
            change_logo_img();

        } else {
            throw new Error(json);
            fetching_data = false;
        }

        
    }

    function go_to_house_8() {
        intro = false;
        pano.openNext("{node24}", "");
    }

    function quick_tour() {
        intro = false;
        pano.setVariableValue('floorplan_full', true);
    }

    function about_viva_park() {
        intro = false;
        about_viva = true;
    }

    function add_video_patch() {
        let media = "pano2vr/output/media/EXT_VSTUP02_-29_-6_30_0,7.mp4";
        var element=document.createElement('video');
        element.setAttribute('src', media);
        pano.addHotspot("myid",0,90,element);
    }

    add_video_patch();

    $: {
        intro;

        switch (intro) {
            case true:
                
                break;
        
            default:
                pano.setVariableValue("hotspots", true); 
                break;
        }
    }

</script>

{#if fetching_data}
    <div id="viva-intro">
        <img src="images/loader.svg" alt="">
        <p>loading product data <br /> and translations</p>
    </div>
{/if}

<!-- ak je povolené intro -->
{#if intro}
    {#if _vivaData != null}
            {#if _vivaData["houses"] != undefined}
            <div id="welcome">
                <div id="wrapper">
                    <div id="header">
                        {#each _vivaData["houses"]["additional_content"] as item}   
                            {#if item.name == "VIVA: Intro: Title"}
                                {#if item.title_t[user_lang] != null}
                                    <h1>{item.title_t[user_lang]}</h1>
                                {:else}
                                    <h1>{item.title_t["int"]}</h1>
                                {/if}

                                {#if item.content_t[user_lang] != null}
                                    <h2>{item.content_t[user_lang]}</h2>
                                {:else}
                                    <h2>{item.content_t["int"]}</h2>
                                {/if}
                            {/if}

                            {#if item.name == "Navigation: Company Info"}
                                {#if item.content_t[user_lang] != null}
                                    <p>{item.content_t[user_lang]}</p>
                                {:else}
                                    <p>{item.content_t["int"]}</p>
                                {/if}
                            {/if}
                        {/each}
                        
                        
                           
                        <div class="buttons">
                            {#each _vivaData["houses"]["additional_content"] as item}   
                                {#if item.name == "VIVA: Startscreen: Play"}
                                    {#if item.title_t[user_lang] != null}
                                        <button id="play_tour">{item.title_t[user_lang]}</button>
                                    {:else}
                                        <button id="play_tour">{item.title_t["int"]}</button>
                                    {/if}
                                    <!-- <button id="play_tour">{item.title}</button> -->
                                {/if}

                                {#if item.name == "VIVA: Startscreen: More info"}
                                    <button id="more_info" on:click={() => about_viva_park()}>
                                        {#if item.title_t[user_lang] != null}
                                            {item.title_t[user_lang]}
                                        {:else}
                                            {item.title_t["int"]}
                                        {/if}
                                    </button>
                                    <!-- <button id="more_info">{item.title}</button> -->
                                {/if}           
                            {/each}
                        </div>
                    </div>
                    <div id="footer">
                            <div id="research" class="item" on:click={() => quick_tour()}>
                                <div class="thumbnail">
                                    <img src="images/btn-1.jpg">
                                </div>
                                <div class="text">
                                    {#each _vivaData["houses"]["additional_content"] as item}    
                                        {#if item.name == "VIVA: Startscreen: Button 1"}
                                            {#if item.title_t[user_lang] != null}
                                                <h4>{item.title_t[user_lang]}</h4>
                                            {:else}
                                                <h4>{item.title_t["int"]}</h4>
                                            {/if}
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                            <div id="rules" class="item" on:click={() => go_to_house_8()}>
                                <div class="thumbnail">
                                    <img src="images/btn-2.jpg">
                                </div>
                                <div class="text">
                                    {#each _vivaData["houses"]["additional_content"] as item}    
                                        {#if item.name == "VIVA: Startscreen: 3 rules of healthy living"}
                                            {#if item.title_t[user_lang] != null}
                                                <h4>{item.title_t[user_lang]}</h4>
                                            {:else}
                                                <h4>{item.title_t["int"]}</h4>
                                            {/if}
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                            <div id="visit-tour" class="item" on:click={() => intro = false}>
                                <div class="thumbnail">
                                    <img src="images/00_Free_tour_icon_f.jpg">
                                </div><div class="text">
                                    {#each _vivaData["houses"]["additional_content"] as item}    
                                        {#if item.name == "VIVA: Startscreen: visit and enjoy tour"}
                                            {#if item.title_t[user_lang] != null}
                                                <h4>{item.title_t[user_lang]}</h4>
                                            {:else}
                                                <h4>{item.title_t["int"]}</h4>
                                            {/if}
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
            {/if}
        
    {/if}
{/if}


<!-- v intre ak kliknem na "mode info" -->
{#if about_viva && _vivaData != null}
     <div id="modal" >
        <div class="close" on:click={() => about_viva = false} />
        <div class="content">
            {#each _vivaData["houses"]["additional_content"] as item}    
                {#if item.name == "Navigation: Company Info"}
                    <h1>
                        {#if item.title_t[user_lang] != null}
                            {item.title_t[user_lang]}
                        {:else}
                            {item.title_t["int"]}
                        {/if}
                    </h1>
                    <p>
                        {#if item.content_t[user_lang] != null}
                            {item.content_t[user_lang]}
                        {:else}
                            {item.content_t["int"]}
                        {/if}
                    </p>
                {/if}
            {/each}
        </div>
     </div>
{/if}

        

<style lang="scss">
    #welcome {
        top: 40px;
        left: 0px;
        z-index: 4;
        height: calc(100% - 40px);
    }
    #viva-intro {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: 2;
        display: flex;
        justify-content : center;
        align-items : center;
        opacity: 0.5;
        flex-direction: column;
        z-index: 6;

        p {
            position: relative;
            font-family: "Montserrat-Medium";
            font-size: 11px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 6px;
            padding: 8px;
            margin: 0;
            width: auto;
        }
    }

    #modal {
        z-index: 5;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: white;
        padding: 30px;
        height: auto;
        width: calc(100% - 128px);
        max-width: 800px;
        max-height: calc(100% - 128px);
        overflow: auto;
    }
</style>