<script>
import { vivaData } from '../store.js';
import { userLang } from '../store.js';

import { aboutViva } from '../store.js';


import VivaTour from './VivaTour.svelte';

// VARIABLES
let active_house = 0;
let user_lang, productUrl, housesUrl, subtitlesUrl, product_id, tagValue = null;
let intro, fetching_data, lang_data_loading, welcome = true;
let about_viva, about_tag, about_product, product_data_loaded, houses_data_loaded, subtitles_data_loaded, house_info, viva_auto_tour = false;
let _vivaData = {};

let myTimeout;

// aktivácia jQuery
const jq = window.$;

// Linky pre google mapu
const map_iframe = {
    int: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sen!2sen',
    en: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sen!2sen',
    de: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
    at: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
    ch: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1sde!2sde',
    sk: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.1689258579618!2d16.086289315334593!3d47.87505657738802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUyJzMwLjIiTiAxNsKwMDUnMTguNSJF!5e0!3m2!1scz!2ssk!4v1630570707855!5m2!1ssk!2ssk',
}

// API kľúče
const apiToken = {
    cz: 'ZsqPYpxsPHK3EpNwK6l7nOOyoTHIrw21Aw2pAh10BfV3mSl8he06rz1IsJNA',
    sk: 'uuPus1j6IOdtp9p5EKzpusgd2TlXMuDK7C33qC8yof4IvMNCyzIPQEV9dfSI',
    at: 'EJVpr39eQqgZ3CtFudtsOA3QurptILYv6aLjQvOh9DX8VoAvNrRthOJyBXAu',
    de: 'bF6JRVySe9U1xOMWi2Kc8I5pzzgZcjT9LG0F1PrmDkOPHI9nKUBv5It3bjlY',
    hr: 'KdZMZzWIYcj4AVjJ3VK6WvV2zCCQfx5jzDqgXk1A1Er013JaTbqlSuDLPcTZ',
    rs: 'FEVesKJGbx1bEm9hsXijIZwV9E332FtvbFA01YxtKjEi1Sw3AMdT6Gp1uFMk',
    si: 'izOhuLDDFGmEeOTxj3s3x31ZTjgI4Ck5zfqK3X5cAlpgPW5piIxtGwtdX2ZH',
    ba: 'Sjuab7GbAKhg6XNFGkQgLJEJXAxQ6Omwru89ErJ48AfX5uvncjpyjdx4K9xY',
    int: 'AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0',
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
}

const productSuffix = {
    cz: 'BCZ',
    sk: 'BSK',
    at: 'BAT',
    de: 'BDE',
    hr: 'BHR',
    rs: 'BRS',
    si: 'BSI',
    ba: 'BBA',
    int: 'INT',
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
}

// URL prefixy
const urlPrefix = {
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
    int: 'https://int.baumit.com'
}

vivaData.subscribe(value => {
    _vivaData = value;
});

aboutViva.subscribe(value => {
    pano.setVariableValue('blurred', value);
    about_viva = value;
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
                    houses: null,
                    subtitles: null,
                    products: null
                };
            }
            _vivaData[$lang][$type] = json;
            vivaData.update(n => json);

            if ($type == "houses") {
                console.log(_vivaData);
            }

        } else {
            throw new Error(json);
        }
    }
}

// Zistenie jazyka užívateľa
function check_user_lang() {

    // zistenie honoty z cookies
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
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
    } else {
        // Jazyk nie je definovaný v Cookies
        user_lang = (window.navigator.userLanguage || window.navigator.language).toLowerCase();
        console.log(window.navigator.userLanguage);
        document.cookie = "user_lang=" + user_lang;
        console.log(user_lang);
        userLang.update(n => user_lang);
        switch (user_lang) {
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
    productUrl = urlPrefix[$lang] + '/api/products/products?api_token=' + apiToken[$lang];
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
    housesUrl = urlPrefix[$lang] + '/api/buildings?api_token=' + apiToken[$lang];
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
    subtitlesUrl = urlPrefix[$lang] + '/api/building-tour-translations?api_token=' + apiToken[$lang];
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

    pano.on("configloaded", function() {
        let showVivaIntro = null;
        pano.setVariableValue('blurred', false);
        //pano.setVariableValue('intro', false);

        jq('.take-tour-button').on('click tap', function () {
            pano.setVariableValue("vivaTour", !pano.getVariableValue("vivaTour"));
            intro = false;
        });

        pano.on("varchanged_lang", function() {
            user_lang = pano.getVariableValue("lang");
            document.cookie = "user_lang=" + user_lang;
            //getVivaTranslations(user_lang);
            check_user_lang();
            // show_layers(false);
            pano.setVariableValue("playPauseMedia", false);
        });

        pano.on("varchanged_floorplan_full", function() {
            switch (pano.getVariableValue("floorplan_full")) {
                case true:
                    change_floorplan_title();
                    change_comfort_level_floorplan();
                    break;

                default:
                    break;
            }
        });

        pano.on("varchanged_houseInfo", function() {
            let currentNode = pano.getCurrentNode();
            house_info = pano.getVariableValue("houseInfo");
            active_house = parseInt(pano.getNodeUserdata(currentNode).source) - 1;

            switch (house_info) {
                case "0":
                    pano.setVariableValue("blurred", false);
                    break;
            
                default:
                    pano.setVariableValue("blurred", true);
                    break;
            }
        });

        pano.on("varchanged_viva_global_info", function() {
            switch (pano.getVariableValue("viva_global_info")) {
                case true:
                    
                    aboutViva.update(n => true);
                    pano.setVariableValue("blurred", true);
                    break;

                default:
                    aboutViva.update(n => false);
                    
                    pano.setVariableValue("blurred", false);
                    break;
            }
        });

        pano.on("varchanged_product_ID", function() {
            product_id = pano.getVariableValue("product_ID");
            switch (pano.getVariableValue("product_ID")) {
                case "0":
                    about_product = false;
                    pano.setVariableValue("blurred", false);
                    break;
            
                default:
                    about_product = true;
                    pano.setVariableValue("blurred", true);
                break;
            }
        });

        pano.on("varchanged_tagValue", function() {
            tagValue = pano.getVariableValue("tagValue");
            switch (pano.getVariableValue("tagValue")) {
                case "0":
                    about_tag = false;
                    pano.setVariableValue("blurred", false);
                    break;
            
                default:
                    about_tag = true;
                    pano.setVariableValue("blurred", true);
                break;
            }
        });

        pano.on("varchanged_playPauseMedia", function() {
            let patchName = pano.getNodeUserdata(pano.getCurrentNode()).title;
            //console.log(patchName);
            if (patchName != null && patchName != undefined) {

                let videoDuration;
                switch (patchName) {
                    case "Interier_03":
                        videoDuration = 3.208333;
                        break;
                    case "Exterier_06" : 
                        videoDuration = 3.916666;
                        break;
                
                    default:
                        videoDuration = 4.166666;
                        break;
                }

                let half = (videoDuration / 2) * 1000;
                //console.log(videoDuration + " / " + half);

                switch (pano.getVariableValue("playPauseMedia")) {
                    case true:
                        jq(".pulse-layer").css({
                            "display" : "none"
                        });
                        pano.playSound(patchName);

                        myTimeout = setTimeout(() => {
                            pano.pauseSound(patchName);
                            jq(".pulse-layer").css({
                                "display" : "flex"
                            });
                            show_layers(true);
                        }, half);
                        break;

                    default:
                        if (pano.soundGetTime(patchName) > 0) {
                            jq(".pulse-layer").css({
                                "display" : "none"
                            });
                            show_layers(false);
                            pano.playSound(patchName);
                            myTimeout = setTimeout(() => {
                                pano.stopSound(patchName);
                                pano.soundSetTime(patchName, 0);
                                jq(".pulse-layer").css({
                                    "display" : "flex"
                                });
                            }, half);
                        }
                        //pano.soundSetTime(patchName, half);
                        

                        break;
                }
            }
            
        });

        pano.on("changenode", function() {
            clearTimeout(myTimeout);
            pano.setVariableValue("playPauseMedia", false);
            // vypnutie video patchov
            for (let index = 0; index < 3; index++) {
                pano.setMediaVisibility('video_' + index, false);
            }

            // označenie názvu scény
            let node_id = pano.getNodeUserdata(pano.getCurrentNode()).source;
            let title = jq('.header > .title > div');

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
                    let house_title = null;
                    title.text(_vivaData['houses']['buildings'][parseInt(node_id) - 1].house_nr);
                    break;

                default:
                    title.text('Viva park');
                    break;
            }

            change_hotspots_title();
            change_patches();

        });

        pano.on("varchanged_download_data", function() {
            let donwloadValue = pano.getVariableValue("download_data");
            let link;
            switch (pano.getVariableValue("download_data")) {
                case "0":
                    
                    break;
                case "VIVA: House 8, book" :
                    
                        if (_vivaData['houses'] != undefined) {
                            if (_vivaData['houses']['additional_content'] != undefined) {
                                _vivaData['houses']['additional_content'].forEach(element => {
                                    if (element.name == donwloadValue) {

                                        if (element.media_t[user_lang] !== undefined && element.media_t[user_lang] !== null) {
                                            link = element.media_t[user_lang];
                                        } else {
                                            if (element.media_t["int"] !== undefined) {
                                                link = element.media_t["int"];
                                            }
                                        }
                                        window.open(link, '_blank');
                                    }
                                });
                            }
                        }
                    break;
                default:
                    
                    if (_vivaData['houses'] != undefined) {
                        if (_vivaData['houses']['additional_content'] != undefined) {
                            _vivaData['houses']['additional_content'].forEach(element => {
                                if (element.name == donwloadValue) {

                                    if (element.link_url_t[user_lang] !== undefined && element.link_url_t[user_lang] !== null) {
                                        link = element.link_url_t[user_lang];
                                    } else {
                                        if (element.link_url_t["int"] !== undefined) {
                                            link = element.link_url_t["int"];
                                        }
                                    }
                                    window.open(link, '_blank');
                                }
                            });
                        }
                    }
                break;
            }
        });

    });


    function show_layers($value) {
    switch ($value) {
        case false:
            jq(".viva-tooltip").addClass("hidden");
            
            break;
    
        default:
            if (_vivaData["products"] != null) {
                const hotspots = pano.getCurrentPointHotspots(); 
                hotspots.forEach(hotspot => {
                    if (hotspot.ggId == "ToolTip" || hotspot.ggId == "ToolTip Right") {
                        const product_id = hotspot.textContent.replace("<span>", "").replace("</span>", "").split("|").pop() + productSuffix[user_lang];
                        const product_id_clear = hotspot.textContent.split("|").pop();
                        
                        if (product_id != null && product_id != undefined) {
                            
                            _vivaData["products"].forEach(product => {
                                if (product.pro_epim_productnr == product_id) {
                                    jq(".pr" + product_id_clear).html(product.name + "<span>|" + product_id_clear + "</span>");
                                    jq(".pr" + product_id_clear).parent().parent().parent().removeClass("hidden");
                                }
                            });
                        }
                    }
                });
            }
        break;
    }
    
}

function change_hotspots_title() {
    jq.each(jq('.hts-np'), function() {
        let hotspot_title = jq(this).children('.np-title').children('div').html();
        let foundString;
        if (hotspot_title.indexOf('_') > 0) {
            foundString = hotspot_title.substr(hotspot_title.indexOf('_') + 1, );
        } else if (hotspot_title.indexOf('.') > 0) {
            foundString = hotspot_title.substr(hotspot_title.indexOf('.') + 1, ).replace(' ', '');

        }

        if (_vivaData['houses'] != undefined) {
            if (_vivaData['houses']['buildings'] != null) {
                switch (foundString) {
                    case '01':
                    case '1':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][0].house_nr);

                        break;
                    case '02':
                    case '2':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][1].house_nr);

                        break;
                    case '03':
                    case '3':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][2].house_nr);

                        break;
                    case '04':
                    case '4':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][3].house_nr);

                        break;
                    case '05':
                    case '5':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][4].house_nr_t[user_lang]);

                        break;
                    case '06':
                    case '6':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][5].house_nr_t[user_lang]);

                        break;
                    case '07':
                    case '7':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][6].house_nr_t[user_lang]);

                        break;
                    case '08':
                    case '8':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][7].house_nr_t[user_lang]);

                        break;
                    case '09':
                    case '9':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][8].house_nr_t[user_lang]);

                        break;
                    case '10':
                    case '10':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][9].house_nr_t[user_lang]);

                        break;
                    case '11':
                    case '11':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][10].house_nr_t[user_lang]);

                        break;
                    case '12':
                    case '12':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][11].house_nr_t[user_lang]);

                        break;
                    case '13':
                    case '13':
                        jq(this).children('.np-title').children('div').html(_vivaData['houses']['buildings'][12].house_nr_t[user_lang]);

                        break;

                    case '00':
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
    } else {
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
                        if (element.media_t[user_lang] !== undefined) {
                            logo_src = element.media_t[user_lang];
                        } else {
                            if (element.media_t["int"] !== undefined) {
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

    jq('.vp-logo').on('click tap', function() {
        window.open('https://tour.baumit.com/', '_blank');
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
                        if (element.title_t[user_lang] !== undefined) {
                            floorplan_title = element.name_t[user_lang] + "<span>" + element.title_t[user_lang] + "</span>";
                        } else {
                            if (element.title_t["int"] !== undefined) {
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
        if (house_id > 0) {
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
        "lang": $lang,
        "int_buildings_link": urlPrefix["int"] + '/api/buildings?api_token=' + apiToken["int"],
        "lang_buildings_link": urlPrefix[$lang] + '/api/buildings?api_token=' + apiToken[$lang],
        "int_subtitles_link": urlPrefix["int"] + '/api/building-tour-translations?api_token=' + apiToken["int"],
        "lang_subtitles_link": urlPrefix[$lang] + '/api/building-tour-translations?api_token=' + apiToken[$lang],
        "products": urlPrefix[$lang] + '/api/products/products?api_token=' + apiToken[$lang]
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
    aboutViva.update(n => true);
}

function add_video_patch() {
    let media = "pano2vr/output/media/EXT_VSTUP02_-29_-6_30_0,7.mp4";
    var element = document.createElement('video');
    element.setAttribute('src', media);
    pano.addHotspot("myid", 0, 90, element);
}

function close_house_info() {
    house_info = false;
    aboutViva.update(n => false);
    pano.setVariableValue("houseInfo", false);
    pano.setVariableValue("viva_global_info", false);
    pano.setVariableValue("blurred", false);
}

function close_about_product(){
    pano.setVariableValue("product_ID", "0");
    about_product = false;
    pano.setVariableValue("blurred", false);
    
}

function close_about_tag(){
    pano.setVariableValue("tagValue", "0");
    pano.setVariableValue("blurred", false);
    about_tag = false;
    
}

function toogleVivaTour() {
    console.log(pano.getVariableValue("vivaTour"));
    pano.setVariableValue("vivaTour", !pano.getVariableValue("vivaTour"));  
    console.log(pano.getVariableValue("vivaTour"));
    intro = false;
}


function change_patches() {
        jq.each(jq('img.ggmedia'), function (index, value) {
            let lang = pano.getVariableValue('lang');
            ////////console.log('mením patch');
            let src = jq(this).attr('src');

            if (
                src.includes('vr_int_08_patch0') 
            ) {
                jq(this).attr('src', 'media/vr_int_08_patch0_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch1') 
            ) {
                jq(this).attr('src', 'media/vr_int_08_patch1_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch2') 
            ) {
                jq(this).attr('src', 'media/vr_int_08_patch2_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch3') 
            ) {
                jq(this).attr('src', 'media/vr_int_08_patch3_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch4') 
            ) {
                jq(this).attr('src', 'media/vr_int_08_patch4_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch5') 
            ) {
                jq(this).attr('src', 'media/vr_int_08_patch5_'+lang+'.png');
            }

            if (
                src.includes('vr_int_08_patch6') 
            ) {
                jq(this).attr('src', 'media/vr_int_08_patch6_'+lang+'.png');
            }

            if (
                src.includes('vr_int_02_patch1') 
            ) {
                jq(this).attr('src', 'media/vr_int_02_patch1_'+lang+'.png');
            }

            if (
                src.includes('vr_int_04_patch1') 
            ) {
                jq(this).attr('src', 'media/vr_int_04_patch1_'+lang+'.png');
            }
        });
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
    {#if _vivaData != null && _vivaData != undefined}
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
                            <button id="play_tour" on:click={() => toogleVivaTour()}>{item.title_t[user_lang]}</button>
                            {:else}
                            <button id="play_tour" on:click={() => toogleVivaTour()}>{item.title_t["int"]}</button>
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

<!-- v intre ak kliknem na "more info" -->
{#if (about_viva && _vivaData != null && _vivaData["houses"] != undefined)}
    <div id="modal" >
        <div class="close" on:click={() => close_house_info()} />
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

<!-- ak kliknem vo footri na ikonu global info -->
{#if house_info == true}
    {#if active_house != -1}
        <div id="viva-house-info">
            <div>
                <div class="close" on:click={() => close_house_info()}/>
                    <div class="content">
                        {#if _vivaData != null}
                            {#if _vivaData["houses"] != null}
                                {#if _vivaData["houses"]["buildings"] != null}
                                    {#if _vivaData["houses"]["buildings"][active_house]["house_nr_t"][user_lang] != undefined}
                                        <h1>{_vivaData["houses"]["buildings"][active_house]["house_nr_t"][user_lang]}</h1>
                                    {:else}
                                        <h1>{_vivaData["houses"]["buildings"][active_house]["house_nr_t"]["int"]}</h1>
                                    {/if}

                                    {#if _vivaData["houses"]["buildings"][active_house]["headline_t"][user_lang] != undefined}
                                        <div class="headline">{_vivaData["houses"]["buildings"][active_house]["headline_t"][user_lang]}</div>
                                    {:else}
                                        <div class="headline">{_vivaData["houses"]["buildings"][active_house]["headline_t"]["int"]}</div>
                                    {/if}

                                    <div class="row">
                                        <p class="text">
                                            {#if _vivaData["houses"]["buildings"][active_house]["text_t"][user_lang] != undefined && _vivaData["houses"]["buildings"][active_house]["text_t"][user_lang] != null}
                                            {_vivaData["houses"]["buildings"][active_house]["text_t"][user_lang]}
                                            {:else}
                                                {#if _vivaData["houses"]["buildings"][active_house]["text_t"]["int"] != undefined && _vivaData["houses"]["buildings"][active_house]["text_t"]["int"] != null}
                                                    {_vivaData["houses"]["buildings"][active_house]["text_t"]["int"]}
                                                {/if}
                                            
                                            {/if}
                                        </p>
                                        {#if _vivaData["houses"]["buildings"][active_house]["parameters_t"] != undefined && _vivaData["houses"]["buildings"][active_house]["parameters_t"][user_lang]}
                                            <div id="viva-second">
                                                {#if _vivaData["houses"]["buildings"][active_house]["parameters_t"][user_lang]["groups"][3] != undefined}
                                                <div class="comfort">
                                                    {#if _vivaData["houses"]["buildings"][active_house]["parameters_t"][user_lang]["groups"][3]["parameters"][0]["parameter_name"] != undefined}
                                                    {_vivaData["houses"]["buildings"][active_house]["parameters_t"][user_lang]["groups"][3]["parameters"][0]["parameter_name"]}
                                                    {:else}
                                                    {_vivaData["houses"]["buildings"][active_house]["parameters_t"]["int"]["groups"][3]["parameters"][0]["parameter_name"]}
                                                    {/if}
                                                </div>

                                                <div class="house-tooltip">
                                                    <div class="house-tooltip-arrow"></div>
                                                    <div class="house-tooltip-inner">{_vivaData["houses"]['buildings'][active_house]['house_comfort_t'][user_lang]}</div>
                                                </div>

                                                {#if _vivaData["houses"]['buildings'][active_house]['house_comfort_t'][user_lang] == "High"}
                                                <div class="ko-progress-circle" data-progress="100">
                                                    <div class="ko-circle">
                                                        <div class="full ko-progress-circle__slice">
                                                            <div class="ko-progress-circle__fill"></div>
                                                        </div>
                                                        <div class="ko-progress-circle__slice">
                                                            <div class="ko-progress-circle__fill"></div>
                                                            <div class="ko-progress-circle__fill ko-progress-circle__bar"></div>
                                                        </div>
                                                    </div>
                                                    <div class="ko-progress-circle__overlay"></div>
                                                </div>
                                                {/if}

                                                {#if _vivaData["houses"]['buildings'][active_house]['house_comfort_t'][user_lang] == "Medium"}
                                                <div class="ko-progress-circle" data-progress="60">
                                                    <div class="ko-circle">
                                                        <div class="full ko-progress-circle__slice">
                                                            <div class="ko-progress-circle__fill"></div>
                                                        </div>
                                                        <div class="ko-progress-circle__slice">
                                                            <div class="ko-progress-circle__fill"></div>
                                                            <div class="ko-progress-circle__fill ko-progress-circle__bar"></div>
                                                        </div>
                                                    </div>
                                                    <div class="ko-progress-circle__overlay"></div>
                                                </div>
                                                {/if}

                                                {#if _vivaData["houses"]['buildings'][active_house]['house_comfort_t'][user_lang] == "Low"}
                                                <div class="ko-progress-circle" data-progress="30">
                                                    <div class="ko-circle">
                                                        <div class="full ko-progress-circle__slice">
                                                            <div class="ko-progress-circle__fill"></div>
                                                        </div>
                                                        <div class="ko-progress-circle__slice">
                                                            <div class="ko-progress-circle__fill"></div>
                                                            <div class="ko-progress-circle__fill ko-progress-circle__bar"></div>
                                                        </div>
                                                    </div>
                                                    <div class="ko-progress-circle__overlay"></div>
                                                </div>
                                                {/if}
                                                {/if}
                                            </div>
                                        {/if}
                                    </div>

                                    <!-- Youtube video -->
                                    {#if _vivaData["houses"]["buildings"][active_house]["media_t"] != undefined}
                                        {#if _vivaData["houses"]["buildings"][active_house]["media_t"][user_lang] != undefined}
                                            <div id="yt-video">
                                                <iframe id="yt" src="https://www.youtube.com/embed/{_vivaData["houses"]["buildings"][active_house]["media_t"][user_lang].split("/").pop()}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="100%" frameborder="0"></iframe>
                                            </div>
                                        {:else}
                                            {#if _vivaData["houses"]["buildings"][active_house]["media_t"]["int"] != undefined}
                                                <div id="yt-video">
                                                    <iframe id="yt" src="https://www.youtube.com/embed/{_vivaData["houses"]["buildings"][active_house]["media_t"]["int"].split("/").pop()}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="100%" frameborder="0"></iframe>
                                                </div>
                                            {/if}
                                        {/if}
                                    {/if}

                                    <!-- Button viac info -->
                                    {#if _vivaData["houses"]["buildings"][active_house]["link_t"][user_lang] != undefined || _vivaData["houses"]["buildings"][active_house]["link_t"][user_lang] != ""}
                                        <a id="house-url" href="{_vivaData["houses"]["buildings"][active_house]["link_t"][user_lang]}" target="_blank" class="">Viac</a>
                                    {:else}
                                        <a id="house-url" href="{_vivaData["houses"]["buildings"][active_house]["link_t"]["int"]}" target="_blank" class="">Viac</a>
                                    {/if}

                                {/if}
                            {/if}
                        {/if}
                    </div>

                    <div class="parameters">
                        {#if _vivaData["houses"]["buildings"][active_house]["parameters_t"] != undefined &&
                        _vivaData["houses"]["buildings"][active_house]["parameters_t"][user_lang] != undefined &&
                        _vivaData["houses"]["buildings"][active_house]["parameters_t"][user_lang]["groups"] != undefined
                        }
                            {#each Object.entries(_vivaData["houses"]["buildings"][active_house]["parameters_t"][user_lang]["groups"]) as [key, value], index(key)}
                                <h3>{value.name}</h3>
                                {#each Object.entries(value.parameters) as [kluc, hodnota], index(kluc)}
                                    <div class="parameter-title">{hodnota["parameter_name"]}
                                        <span> i
                                            <div class="house-tooltip">
                                                <div class="house-tooltip-arrow"></div>
                                                <div class="house-tooltip-inner">{hodnota["parameter_tooltip"]}</div>
                                            </div>
                                        </span>
                                    </div>
                                    <div class="parameter-bar">
                                        <div class="p{hodnota["value"]}"></div>
                                    </div>
                                {/each}
                            {/each}
                        {/if}
                </div>
            </div>
        </div>
    {:else}
        <div id="modal" >
            <div class="close"  on:click={() => aboutViva.update(n => false)}
                on:click={() => close_house_info()} />
            <div class="content">
                {#each _vivaData["houses"]["additional_content"] as item}
                    {#if item.name == "VIVA: Startscreen: About"}
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
{/if}

<!-- ak kliknem na vrstvu (produkt) na stene/múre -->
{#if about_product}
    <div id="infopanel" class="infopanel baumit">  
        <div class="close" on:click={() => close_about_product()}/>
        <div class="content">
            <div class="info-v1">
                {#each _vivaData["products"] as product}
                    {#if product.pro_epim_productnr == product_id + productSuffix[user_lang]}
                        <section class="head">
                            <div class="baumit-img">
                                <img class="baumit-img" src="{urlPrefix[user_lang]}{product.image}" />
                            </div>
                            <div class="content">
                                <h2>{product.name}</h2>

                                <ul class="baumit">
                                    {#if product.product_benefit_1 != undefined}
                                        <li><span>{product.product_benefit_1}</span></li>
                                    {/if}

                                    {#if product.product_benefit_2 != undefined}
                                        <li><span>{product.product_benefit_2}</span></li>
                                    {/if}

                                    {#if product.product_benefit_3 != undefined}
                                        <li><span>{product.product_benefit_3}</span></li>
                                    {/if}
                                </ul>

                                {#each _vivaData["houses"]["additional_content"] as item}
                                     {#if item.name == "Navigation: More Info"}
                                         {#if item.title_t[user_lang] != undefined}
                                            <a href="{urlPrefix[user_lang]}{product.details_url}" target="_blank">{item.title_t[user_lang]}</a>
                                        {:else}
                                            <a href="{urlPrefix[user_lang]}{product.details_url}" target="_blank">{item.title_t["int"]}</a>
                                         {/if}
                                     {/if}
                                {/each}
                                
                            </div>
                        </section>
                        <section class="body">
                            <p>{product.description}</p>    
                        </section>
                    {/if}

                {/each}
            </div>
        </div>
    </div> 
{/if}

{#if about_tag}
    <div id="viva-house-info" class="{tagValue === 'computer screen' ? 'tag yt-only' : 'tag'}">
        <div class="close" on:click={() => close_about_tag()}/>
            <div class="content">
                {#each _vivaData["houses"]["additional_content"] as item}
                    
                    {#if tagValue == "Global Temperature Sensor" ||
                        tagValue == "Air Supply" ||
                        tagValue == "Humidifier" ||
                        tagValue == "Air Exhaust" || 
                        tagValue == "Built-in sensors" ||
                        tagValue == "Temperature sensor for the surface temperature" }
                        {#if "viva: " + tagValue.toLowerCase() == item.name.toLowerCase()}
                            {#if item.title_t[user_lang] != undefined && item.title_t[user_lang] != null}
                                <h1>{item.title_t[user_lang]}</h1>
                            {:else}
                                <h1>{item.title_t["int"]}</h1>
                            {/if}

                            <div class="row">
                                {#if item.content_t[user_lang] != undefined && item.content_t[user_lang] != null}
                                    <p class="text">{item.content_t[user_lang]}</p>
                                {:else}
                                    <p class="text">{item.content_t["int"]}</p>
                                {/if}
                            </div>
                            
                        {/if}

                    {/if}

                    {#if tagValue == "Solidity counts" ||
                         tagValue == "Insulation first" ||
                         tagValue == "Interior values"}   
                    
                        {#if "VIVA: House 8, result: " + tagValue == item.name}
                            {#if item.title_t[user_lang] != undefined && item.title_t[user_lang] != null}
                                <h1>{item.title_t[user_lang]}</h1>
                            {:else}
                                <h1>{item.title_t["int"]}</h1>
                            {/if}

                            <div class="row">
                                {#if item.content_t[user_lang] != undefined && item.content_t[user_lang] != null}
                                    <p class="text">{item.content_t[user_lang]}</p>
                                {:else}
                                    <p class="text">{item.content_t["int"]}</p>
                                {/if}
                            </div>

                            <!-- Youtube video -->
                            {#if item["media_t"] != undefined}
                            {#if item["media_t"][user_lang] != undefined}
                                <div id="yt-video">
                                    <iframe id="yt" src="https://www.youtube.com/embed/{item["media_t"][user_lang].split("/").pop()}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="100%" frameborder="0"></iframe>
                                </div>
                            {:else}
                                {#if item["media_t"]["int"] != undefined}
                                    <div id="yt-video">
                                        <iframe id="yt" src="https://www.youtube.com/embed/{item["media_t"]["int"].split("/").pop()}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="100%" frameborder="0"></iframe>
                                    </div>
                                {/if}
                            {/if}
                        {/if}
                            
                        {/if}
                    {/if}

                    {#if tagValue == "computer screen"}   
                    
                        {#if "VIVA: House 8, " + tagValue == item.name}
                            <!-- {#if item.title_t[user_lang] != undefined && item.title_t[user_lang] != null}
                                <h1>{item.title_t[user_lang]}</h1>
                            {:else}
                                <h1>{item.title_t["int"]}</h1>
                            {/if}

                            <div class="row">
                                {#if item.content_t[user_lang] != undefined && item.content_t[user_lang] != null}
                                    <p class="text">{item.content_t[user_lang]}</p>
                                {:else}
                                    <p class="text">{item.content_t["int"]}</p>
                                {/if}
                            </div> -->

                            <!-- Youtube video -->
                            {#if item["media_t"] != undefined}
                            {#if item["media_t"][user_lang] != undefined}
                                <div id="yt-video">
                                    <iframe id="yt" src="https://www.youtube.com/embed/{item["media_t"][user_lang].split("/").pop()}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="100%" frameborder="0"></iframe>
                                </div>
                            {:else}
                                {#if item["media_t"]["int"] != undefined}
                                    <div id="yt-video">
                                        <iframe id="yt" src="https://www.youtube.com/embed/{item["media_t"]["int"].split("/").pop()}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="100%" frameborder="0"></iframe>
                                    </div>
                                {/if}
                            {/if}
                        {/if}
                            
                        {/if}
                    {/if}
                     
                {/each}
                
            </div>
            

            

            
        <!-- <div class="content">
            <div class="info-v1">
                {#each _vivaData["products"] as product}
                    {#if product.pro_epim_productnr == product_id + productSuffix[user_lang]}
                        <section class="head">
                            <div class="baumit-img">
                                <img class="baumit-img" src="{urlPrefix[user_lang]}{product.image}" />
                            </div>
                            <div class="content">
                                <h2>{product.name}</h2>

                                <ul class="baumit">
                                    {#if product.product_benefit_1 != undefined}
                                        <li><span>{product.product_benefit_1}</span></li>
                                    {/if}

                                    {#if product.product_benefit_2 != undefined}
                                        <li><span>{product.product_benefit_2}</span></li>
                                    {/if}

                                    {#if product.product_benefit_3 != undefined}
                                        <li><span>{product.product_benefit_3}</span></li>
                                    {/if}
                                </ul>

                                {#each _vivaData["houses"]["additional_content"] as item}
                                    {#if item.name == "Navigation: More Info"}
                                        {#if item.title_t[user_lang] != undefined}
                                            <a href="{urlPrefix[user_lang]}{product.details_url}" target="_blank">{item.title_t[user_lang]}</a>
                                        {:else}
                                            <a href="{urlPrefix[user_lang]}{product.details_url}" target="_blank">{item.title_t["int"]}</a>
                                        {/if}
                                    {/if}
                                {/each}
                                
                            </div>
                        </section>
                        <section class="body">
                            <p>{product.description}</p>    
                        </section>
                    {/if}

                {/each}
            </div>
        </div> -->
    </div> 
{/if}

{#if _vivaData.houses != null}
    <VivaTour vivaData={_vivaData}/>
{/if}


<style lang="scss">
    #infopanel, #viva-house-info {
        display: flex;
        opacity: 1;
        transform: scale(1);
    }

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
        justify-content: center;
        align-items: center;
        opacity: 0.5;
        flex-direction: column;
        z-index: 100;

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
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        height: auto;
        width: calc(100% - 128px);
        max-width: 800px;
        max-height: calc(100% - 128px);
        overflow: auto;
    }

    #viva-house-info {
        background-color: white;
        z-index: 6;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 64px);
        max-width: 940px;
        height: calc(100% - 168px);
        max-height: 680px;
        overflow: auto;
        padding: 40px;
        box-sizing: border-box;
        transition: all 0.25s ease-in-out;
        div {
            &:not(.close) {
                height: -webkit-max-content;
                height: -moz-max-content;
                height: max-content;
                box-sizing: border-box;
            }
        }
        >div {
            &:not(.close) {
                display: flex;
                width: 100%;
            }
        }
        .content {
            overflow: auto;
            box-sizing: border-box;
            font-size: 15px;
            color: #333333;
            line-height: 1.42857143;
            max-width: 700px;
            padding: 0 0 58px 0;
            width: 100%;
            max-width: -webkit-max-content;
            max-width: -moz-max-content;
            max-width: max-content;
            .row {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                #viva-second {
                    margin: 20px 50px;
                    .comfort {
                        font-size: 16px;
                        font-weight: 500;
                        text-transform: uppercase;
                        margin: 0px 0px 10px 0px;
                    }
                }
                #viva-second.hidden {
                    display: none;
                }
                .house-tooltip {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    margin-bottom: 10px;
                }
                .house-tooltip-arrow {
                    bottom: 0;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px 5px 0;
                    border-top-color: #000000;
                }
                .house-tooltip-inner {
                    max-width: 200px;
                    padding: 3px 8px;
                    line-height: 1.42857143;
                    font-size: 11px;
                    color: #ffffff;
                    text-align: center;
                    background-color: #000000;
                    border-radius: 4px;
                    &::after {
                        content: "";
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 0;
                        height: 0;
                        border-top: solid 5px #000;
                        border-left: solid 5px transparent;
                        border-right: solid 5px transparent;
                    }
                }
                .ko-progress-circle {
                    position: relative;
                    width: 70px;
                    height: 70px;
                    max-width: 70px;
                    max-height: 70px;
                    margin: 0 auto;
                    flex: 1;
                    background-color: #e2e2e2;
                    border-radius: 50%;
                    .ko-progress-circle__slice {
                        width: 70px;
                        height: 70px;
                        position: absolute;
                        -webkit-backface-visibility: hidden;
                        transition: transform 1s;
                        border-radius: 50%;
                        clip: rect(0px, 70px, 70px, 35px);
                        .ko-progress-circle__fill {
                            clip: rect(0px, 35px, 70px, 0px);
                            background-color: #75b727;
                        }
                    }
                    .ko-progress-circle__fill {
                        width: 70px;
                        height: 70px;
                        position: absolute;
                        -webkit-backface-visibility: hidden;
                        transition: transform 1s;
                        border-radius: 50%;
                    }
                    .ko-progress-circle__overlay {
                        width: 35px;
                        height: 35px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: #fbfbfb;
                        border-radius: 50%;
                    }
                }
                .ko-progress-circle.hidden {
                    display: none;
                }
                .ko-progress-circle[data-progress="0"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(0deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(0deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(0deg);
                    }
                }
                .ko-progress-circle[data-progress="1"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(1.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(1.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(3.6deg);
                    }
                }
                .ko-progress-circle[data-progress="2"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(3.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(3.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(7.2deg);
                    }
                }
                .ko-progress-circle[data-progress="3"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(5.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(5.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(10.8deg);
                    }
                }
                .ko-progress-circle[data-progress="4"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(7.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(7.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(14.4deg);
                    }
                }
                .ko-progress-circle[data-progress="5"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(9deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(9deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(18deg);
                    }
                }
                .ko-progress-circle[data-progress="6"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(10.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(10.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(21.6deg);
                    }
                }
                .ko-progress-circle[data-progress="7"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(12.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(12.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(25.2deg);
                    }
                }
                .ko-progress-circle[data-progress="8"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(14.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(14.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(28.8deg);
                    }
                }
                .ko-progress-circle[data-progress="9"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(16.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(16.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(32.4deg);
                    }
                }
                .ko-progress-circle[data-progress="10"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(18deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(18deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(36deg);
                    }
                }
                .ko-progress-circle[data-progress="11"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(19.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(19.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(39.6deg);
                    }
                }
                .ko-progress-circle[data-progress="12"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(21.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(21.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(43.2deg);
                    }
                }
                .ko-progress-circle[data-progress="13"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(23.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(23.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(46.8deg);
                    }
                }
                .ko-progress-circle[data-progress="14"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(25.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(25.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(50.4deg);
                    }
                }
                .ko-progress-circle[data-progress="15"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(27deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(27deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(54deg);
                    }
                }
                .ko-progress-circle[data-progress="16"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(28.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(28.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(57.6deg);
                    }
                }
                .ko-progress-circle[data-progress="17"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(30.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(30.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(61.2deg);
                    }
                }
                .ko-progress-circle[data-progress="18"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(32.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(32.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(64.8deg);
                    }
                }
                .ko-progress-circle[data-progress="19"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(34.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(34.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(68.4deg);
                    }
                }
                .ko-progress-circle[data-progress="20"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(36deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(36deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(72deg);
                    }
                }
                .ko-progress-circle[data-progress="21"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(37.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(37.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(75.6deg);
                    }
                }
                .ko-progress-circle[data-progress="22"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(39.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(39.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(79.2deg);
                    }
                }
                .ko-progress-circle[data-progress="23"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(41.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(41.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(82.8deg);
                    }
                }
                .ko-progress-circle[data-progress="24"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(43.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(43.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(86.4deg);
                    }
                }
                .ko-progress-circle[data-progress="25"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(45deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(45deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(90deg);
                    }
                }
                .ko-progress-circle[data-progress="26"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(46.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(46.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(93.6deg);
                    }
                }
                .ko-progress-circle[data-progress="27"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(48.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(48.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(97.2deg);
                    }
                }
                .ko-progress-circle[data-progress="28"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(50.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(50.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(100.8deg);
                    }
                }
                .ko-progress-circle[data-progress="29"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(52.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(52.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(104.4deg);
                    }
                }
                .ko-progress-circle[data-progress="30"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(54deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(54deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(108deg);
                    }
                }
                .ko-progress-circle[data-progress="31"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(55.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(55.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(111.6deg);
                    }
                }
                .ko-progress-circle[data-progress="32"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(57.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(57.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(115.2deg);
                    }
                }
                .ko-progress-circle[data-progress="33"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(59.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(59.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(118.8deg);
                    }
                }
                .ko-progress-circle[data-progress="34"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(61.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(61.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(122.4deg);
                    }
                }
                .ko-progress-circle[data-progress="35"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(63deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(63deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(126deg);
                    }
                }
                .ko-progress-circle[data-progress="36"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(64.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(64.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(129.6deg);
                    }
                }
                .ko-progress-circle[data-progress="37"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(66.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(66.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(133.2deg);
                    }
                }
                .ko-progress-circle[data-progress="38"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(68.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(68.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(136.8deg);
                    }
                }
                .ko-progress-circle[data-progress="39"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(70.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(70.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(140.4deg);
                    }
                }
                .ko-progress-circle[data-progress="40"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(72deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(72deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(144deg);
                    }
                }
                .ko-progress-circle[data-progress="41"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(73.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(73.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(147.6deg);
                    }
                }
                .ko-progress-circle[data-progress="42"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(75.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(75.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(151.2deg);
                    }
                }
                .ko-progress-circle[data-progress="43"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(77.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(77.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(154.8deg);
                    }
                }
                .ko-progress-circle[data-progress="44"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(79.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(79.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(158.4deg);
                    }
                }
                .ko-progress-circle[data-progress="45"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(81deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(81deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(162deg);
                    }
                }
                .ko-progress-circle[data-progress="46"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(82.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(82.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(165.6deg);
                    }
                }
                .ko-progress-circle[data-progress="47"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(84.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(84.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(169.2deg);
                    }
                }
                .ko-progress-circle[data-progress="48"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(86.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(86.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(172.8deg);
                    }
                }
                .ko-progress-circle[data-progress="49"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(88.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(88.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(176.4deg);
                    }
                }
                .ko-progress-circle[data-progress="50"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(90deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(90deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(180deg);
                    }
                }
                .ko-progress-circle[data-progress="51"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(91.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(91.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(183.6deg);
                    }
                }
                .ko-progress-circle[data-progress="52"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(93.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(93.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(187.2deg);
                    }
                }
                .ko-progress-circle[data-progress="53"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(95.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(95.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(190.8deg);
                    }
                }
                .ko-progress-circle[data-progress="54"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(97.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(97.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(194.4deg);
                    }
                }
                .ko-progress-circle[data-progress="55"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(99deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(99deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(198deg);
                    }
                }
                .ko-progress-circle[data-progress="56"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(100.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(100.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(201.6deg);
                    }
                }
                .ko-progress-circle[data-progress="57"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(102.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(102.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(205.2deg);
                    }
                }
                .ko-progress-circle[data-progress="58"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(104.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(104.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(208.8deg);
                    }
                }
                .ko-progress-circle[data-progress="59"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(106.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(106.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(212.4deg);
                    }
                }
                .ko-progress-circle[data-progress="60"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(108deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(108deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(216deg);
                    }
                }
                .ko-progress-circle[data-progress="61"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(109.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(109.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(219.6deg);
                    }
                }
                .ko-progress-circle[data-progress="62"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(111.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(111.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(223.2deg);
                    }
                }
                .ko-progress-circle[data-progress="63"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(113.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(113.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(226.8deg);
                    }
                }
                .ko-progress-circle[data-progress="64"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(115.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(115.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(230.4deg);
                    }
                }
                .ko-progress-circle[data-progress="65"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(117deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(117deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(234deg);
                    }
                }
                .ko-progress-circle[data-progress="66"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(118.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(118.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(237.6deg);
                    }
                }
                .ko-progress-circle[data-progress="67"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(120.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(120.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(241.2deg);
                    }
                }
                .ko-progress-circle[data-progress="68"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(122.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(122.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(244.8deg);
                    }
                }
                .ko-progress-circle[data-progress="69"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(124.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(124.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(248.4deg);
                    }
                }
                .ko-progress-circle[data-progress="70"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(126deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(126deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(252deg);
                    }
                }
                .ko-progress-circle[data-progress="71"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(127.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(127.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(255.6deg);
                    }
                }
                .ko-progress-circle[data-progress="72"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(129.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(129.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(259.2deg);
                    }
                }
                .ko-progress-circle[data-progress="73"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(131.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(131.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(262.8deg);
                    }
                }
                .ko-progress-circle[data-progress="74"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(133.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(133.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(266.4deg);
                    }
                }
                .ko-progress-circle[data-progress="75"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(135deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(135deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(270deg);
                    }
                }
                .ko-progress-circle[data-progress="76"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(136.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(136.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(273.6deg);
                    }
                }
                .ko-progress-circle[data-progress="77"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(138.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(138.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(277.2deg);
                    }
                }
                .ko-progress-circle[data-progress="78"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(140.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(140.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(280.8deg);
                    }
                }
                .ko-progress-circle[data-progress="79"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(142.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(142.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(284.4deg);
                    }
                }
                .ko-progress-circle[data-progress="80"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(144deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(144deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(288deg);
                    }
                }
                .ko-progress-circle[data-progress="81"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(145.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(145.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(291.6deg);
                    }
                }
                .ko-progress-circle[data-progress="82"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(147.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(147.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(295.2deg);
                    }
                }
                .ko-progress-circle[data-progress="83"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(149.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(149.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(298.8deg);
                    }
                }
                .ko-progress-circle[data-progress="84"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(151.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(151.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(302.4deg);
                    }
                }
                .ko-progress-circle[data-progress="85"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(153deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(153deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(306deg);
                    }
                }
                .ko-progress-circle[data-progress="86"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(154.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(154.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(309.6deg);
                    }
                }
                .ko-progress-circle[data-progress="87"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(156.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(156.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(313.2deg);
                    }
                }
                .ko-progress-circle[data-progress="88"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(158.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(158.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(316.8deg);
                    }
                }
                .ko-progress-circle[data-progress="89"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(160.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(160.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(320.4deg);
                    }
                }
                .ko-progress-circle[data-progress="90"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(162deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(162deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(324deg);
                    }
                }
                .ko-progress-circle[data-progress="91"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(163.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(163.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(327.6deg);
                    }
                }
                .ko-progress-circle[data-progress="92"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(165.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(165.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(331.2deg);
                    }
                }
                .ko-progress-circle[data-progress="93"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(167.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(167.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(334.8deg);
                    }
                }
                .ko-progress-circle[data-progress="94"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(169.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(169.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(338.4deg);
                    }
                }
                .ko-progress-circle[data-progress="95"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(171deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(171deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(342deg);
                    }
                }
                .ko-progress-circle[data-progress="96"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(172.8deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(172.8deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(345.6deg);
                    }
                }
                .ko-progress-circle[data-progress="97"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(174.6deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(174.6deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(349.2deg);
                    }
                }
                .ko-progress-circle[data-progress="98"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(176.4deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(176.4deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(352.8deg);
                    }
                }
                .ko-progress-circle[data-progress="99"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(178.2deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(178.2deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(356.4deg);
                    }
                }
                .ko-progress-circle[data-progress="100"] {
                    .ko-progress-circle__slice.full {
                        transform: rotate(180deg);
                    }
                    .ko-progress-circle__fill {
                        transform: rotate(180deg);
                    }
                    .ko-progress-circle__fill.ko-progress-circle__bar {
                        transform: rotate(360deg);
                    }
                }
            }
            .row.hidden {
                display: none;
            }
            h1 {
                font-weight: 500;
                font-size: 36px;
                line-height: 1.1;
                margin: 0;
            }
            h1.hidden {
                display: none;
            }
            .headline {
                font-weight: 400;
                font-size: 20px;
                line-height: 1;
                margin: 10px 0 0 0;
            }
            .headline.hidden {
                display: none;
            }
            p {
                font-family: "Poppins", sans-serif;
                flex: 1;
                margin-top: 20px;
            }
            #yt-video {
                width: 100%;
                aspect-ratio: 16/9;
            }
            #yt-video.hidden {
                display: none;
            }
            #house-url {
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                text-align: center;
                min-width: 200px;
                display: inline-block;
                padding: 15px 30px;
                border: 2px solid #000000;
                margin: 15px 0;
                text-decoration: none;
                color: inherit;
            }
            #house-url.hidden {
                display: none;
            }
        }
        .content.full {
            width: 100%;
            max-width: -webkit-max-content;
            max-width: -moz-max-content;
            max-width: max-content;
        }
        .parameters {
            // width: 40%;
            padding: 0 20px 20px 20px;
            overflow: visible;
            h3 {
                text-transform: uppercase;
            }
            .parameter-bar {
                width: 100%;
                height: 7px;
                background-color: #f5f5f5;
                position: relative;
                margin: 5px 0;
                >div {
                    width: 0%;
                    transition: width .8s ease !important;
                }
                .p1 {
                    width: 0%;
                    width: 33.3333%;
                    height: 7px;
                    background-color: #74b743;
                    position: relative;
                }
                .p2 {
                    width: 66.6666%;
                    height: 7px;
                    background-color: #74b743;
                    position: relative;
                }
                .p3 {
                    width: 100%;
                    height: 7px;
                    background-color: #74b743;
                    position: relative;
                }
                div.p1 {
                    transition: width .8s ease !important;
                }
                div.p2 {
                    transition: width .8s ease !important;
                }
                div.p3 {
                    transition: width .8s ease !important;
                }
                &::before {
                    content: '';
                    width: 4px;
                    height: 7px;
                    left: 33%;
                    top: 0;
                    background: #fff;
                    position: absolute;
                    z-index: 100;
                }
                &::after {
                    content: '';
                    width: 4px;
                    height: 7px;
                    left: 66%;
                    top: 0;
                    background: #fff;
                    position: absolute;
                    z-index: 100;
                }
            }
            .parameter-title {
                position: relative;
                span {
                    position: relative;
                    color: #ffffff;
                    font-size: 11px;
                    line-height: 15px;
                    background: #000000;
                    border-radius: 50%;
                    width: 15px;
                    height: 15px;
                    display: inline-block;
                    margin-top: -4px;
                    text-align: center;
                    vertical-align: text-top;
                    cursor: pointer;
                    margin-left: 3px;
                }
                .house-tooltip {
                    display: none;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    margin-bottom: 10px;
                    width: -webkit-max-content;
                    width: -moz-max-content;
                    width: max-content;
                    z-index: 99999;
                    transition: all 0.25s ease-in-out;
                }
                .house-tooltip.active {
                    display: flex;
                    position: absolute;
                    bottom: 16px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .house-tooltip-arrow {
                    bottom: 0;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px 5px 0;
                    border-top-color: #000000;
                }
                .house-tooltip-inner {
                    max-width: 200px;
                    padding: 3px 8px;
                    line-height: 1.42857143;
                    font-size: 11px;
                    color: #ffffff;
                    text-align: center;
                    background-color: #000000;
                    border-radius: 4px;
                    &::after {
                        content: "";
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 0;
                        height: 0;
                        border-top: solid 5px #000;
                        border-left: solid 5px transparent;
                        border-right: solid 5px transparent;
                    }
                }
            }
        }
    }
    #viva-house-info.yt-only {
        width: calc(100% - 64px);
        height: -webkit-max-content;
        height: -moz-max-content;
        height: max-content;
        max-height: 700px;
        div {
            &:not(.close) {
                width: 100%;
                .content {
                    max-width: 100%;
                }
            }
        }
    }

    #viva-house-info.tag {
        height: auto;
        z-index: 3;
        .content {
            flex-direction: column;
            padding: 0;
            overflow: hidden;
        }
    }

    #viva-house-info.active {
        display: flex;
    }
    #viva-house-info.anim {
        opacity: 1;
        transform: scale(1);
    }

    .viva-tooltip {
        &:hover {
            background-color: black;
            color: white;
        }
    }

    @media (max-width: 680px) {
        #viva-house-info {
            padding: 52px 16px 16px 16px;
        }

        #viva-house-info .content #house-url {
            min-width: auto;
        }
    }

    @media (max-width: 800px) {
        .infopanel.baumit .info-v1 .head {
            flex-direction: column;
        }

        #viva-house-info>div {
            flex-direction: column;
        }

        #viva-house-info .content {
            width: 100%;
        }

        #viva-house-info .parameters {
            width: 100%;
        }

        #viva-house-info .parameters h3 {
            font-weight: 500;
            text-transform: uppercase;
            font-size: 14px;
        }

        #viva-house-info .parameters .parameter-title {
            font-size: 13px;
        }

        #viva-house-info {
            max-width: calc(100% - 32px);
            max-height: calc(100% - 32px);
        }

        #viva-house-info .content h1 {
            font-size: 30px;
            margin: 0 auto;
        }

        #viva-house-info .content p {
            font-size: 16px;
        }

        #viva-house-info .content {
            padding: 0px 16px 16px;
            display: flex;
            flex-direction: column;
        }

        #viva-house-info .content .row::after {
            display: none;
        }

        #viva-house-info .content #yt-video {
            margin-top: 20px;
        }
    }

    @media (max-width: 500px) {
        #viva-house-info .content .row {
            flex-direction: column-reverse;
            align-items: center;
            margin-top: 10px;
        }

        #viva-house-info .content p {
            margin: 10px 0px 0px;
        }
    }
</style>
