<script>
    import { vivaData } from '../store.js';
    let user_lang, productUrl, housesUrl, subtitlesUrl = null;
    let lang_data_loading, welcome = true;
    let product_data_loaded, houses_data_loaded, subtitles_data_loaded = false;

    let intro = true;
    let _vivaData = {};

    vivaData.subscribe(value => {
        _vivaData = value;
    });



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
        $variable = true;
        
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
        
        
        getVivaTranslations(user_lang);
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
        pano.setVariableValue('blurred', false);
        //pano.setVariableValue('intro', false);

        pano.on("varchanged_lang", function() {
            user_lang = pano.getVariableValue("lang");
            getVivaTranslations(user_lang);
        });
	});
</script>

{#if lang_data_loading}
    <div id="viva-intro">
        <p>loading configuration ... </p>
    </div>
{/if}

<!-- ak je povolené intro -->
{#if intro}
    {#if _vivaData != null}
        {#if _vivaData[user_lang] != undefined}        
            {#if _vivaData[user_lang]["houses"] != undefined}
            <div id="welcome">
                <div id="wrapper">
                    <div id="header">
                        {#each _vivaData[user_lang]["houses"]["additional_content"] as item}   
                        
                            {#if item.name == "VIVA: Intro: Title"}
                                <h1>{item.title}</h1>
                                <h2>{item.content}</h2>
                            {/if}
                        
                            <!-- NEVIEM ČO TO JE    
                                <p>null</p> 
                            -->
                            <div class="buttons">
                                {#if item.name == "VIVA: Startscreen: Play"}
                                    <button id="play_tour">{item.title}</button>
                                {/if}

                                {#if item.name == "VIVA: Startscreen: More info"}
                                    <button id="more_info">{item.title}</button>
                                {/if}           
                            </div>
                        
                        {/each}
                    </div>
                    <div id="footer">
                        
                            <div id="research" class="item">
                                <div class="thumbnail">
                                    <img src="images/btn-1.jpg">
                                </div>
                                <div class="text">
                                    {#each _vivaData[user_lang]["houses"]["additional_content"] as item}   
                                        {#if item.name == "VIVA: Startscreen: Quick Tour"}
                                            <h4>{item.title}</h4>
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                            <div id="rules" class="item">
                                <div class="thumbnail">
                                    <img src="images/btn-2.jpg">
                                </div>
                                <div class="text">
                                    {#each _vivaData[user_lang]["houses"]["additional_content"] as item}   
                                        {#if item.name == "VIVA: Startscreen: About"}
                                            <h4>{item.title}</h4>
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                            <div id="visit-tour" class="item">
                                <div class="thumbnail">
                                    <img src="images/00_Free_tour_icon_f.jpg">
                                </div><div class="text">
                                    {#each _vivaData[user_lang]["houses"]["additional_content"] as item}   
                                        {#if item.name == "VIVA: Startscreen: Výsledky"}
                                            <h4>{item.title}</h4>
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
{/if}

            
            




<style lang="scss">
    #welcome {
        top: 140px;
    }
    #viva-intro {
        position: absolute;
        left: 0;
        top: 40px;
        width: 100%;
        height: 100%;
        background: red;
        z-index: 0;

        display: flex;
        justify-content : center;
        align-items : center;
        opacity: 0.5;
    }
</style>