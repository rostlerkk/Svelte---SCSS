<script>

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

    let cookies = document.cookie.split('=');
    let cookies2 = document.cookie;
    
    if (cookies.user_lang == undefined) {
        console.log("jazyk nie je špecifikovaný");
    }

 

    // function check_user_lang (lang) {
    //     if (
    //         $.cookie('user_language') != undefined &&
    //         $.cookie('user_language') != 'undefined' &&
    //         $.cookie('user_language') != null  
    //         ) {
    //             // cookies nie su prázdne 
    //             lang = $.cookie('user_language').substr($.cookie('user_language').indexOf("=") + 1);
                
    //             pano.setVariableValue('lang', $.cookie('user_language').substr($.cookie('user_language').indexOf("=") + 1));
    //            // alert(lang);
    //             update_lang_content();
    //     }
    
    //     else {
    //         // Jazyk nie je definovaný v Cookies
            
    //         let user_language = window.navigator.userLanguage || window.navigator.language;
    //         user_language = user_language.toLowerCase();
    //         switch (user_language) {
    //             case 'cz' : 
    //             case 'cs' : 
    //             case 'cz-cz' : 
    //             case 'cz-CZ' : 
    //                 pano.setVariableValue('lang', 'cz');
    //             break;
        
    //             case 'sk' :
    //             case 'sk-sk' : 
    //             case 'sk-SK' : 
    //                 pano.setVariableValue('lang', 'sk');
    //             break;
        
    //             case 'at' :
    //             case 'at-at' : 
    //             case 'de-at' :
    //                 pano.setVariableValue('lang', 'at');
    //             break;
        
    //             case 'de' :
    //             case 'de-de' :                     
    //                 pano.setVariableValue('lang', 'de');
    //             break;
        
    //             case 'hr' : 
    //             case 'hr-hr' : 
    //                 pano.setVariableValue('lang', 'hr');
    //             break;
        
    //             case 'rs' :  // Srbsko
    //             case 'rs-rs' :  // Srbsko
    //             case 'sr' :
    //             case 'sr-sr' :
    //                 pano.setVariableValue('lang', 'rs');
    //             break;
        
    //             case 'si' : // Slovinsko
    //             case 'si-si' : // Slovinsko
    //             case 'sl' :
    //             case 'sl-sl' :
    //                 pano.setVariableValue('lang', 'si');
    //             break;
        
    //             case 'ba' : // Bosna a Hercegovina
    //             case 'ba-ba' :
    //                 pano.setVariableValue('lang', 'ba');
    //             break;
        
    //             case 'ua' : 
    //             case 'ua-ua' : 
    //             case 'uk' :
    //             case 'uk-uk' : 
    //                 pano.setVariableValue('lang', 'ua');
    //             break;
        
    //             case 'fr' : 
    //             case 'fr-fr' : 
    //                 pano.setVariableValue('lang', 'fr');
    //             break;
                
    //             case 'es' : 
    //             case 'es-es' :
    //                 pano.setVariableValue('lang', 'es');
    //             break;
        
    //             case 'cn' : 
    //             case 'cn-cn' : 
    //             case 'zh-cn' : 
    //                 pano.setVariableValue('lang', 'cn');
    //             break;
        
    //             case 'gr' : 
    //             case 'gr-gr' :
    //             case 'el' :
    //             case 'el-el' : 
    //                 pano.setVariableValue('lang', 'gr');
    //             break;
        
    //             case 'hu' : 
    //             case 'hu-ht' :
    //                 pano.setVariableValue('lang', 'hu');
    //             break;
        
    //             case 'tr' : 
    //             case 'tr-tr' :
    //                 pano.setVariableValue('lang', 'tr');
    //             break;
        
    //             case 'ro' :
    //             case 'ro-ro' :                     
    //                 pano.setVariableValue('lang', 'ro');
    //             break;
        
    //             case 'en-gb' : 
    //             case 'en' : 
    //                 pano.setVariableValue('lang', 'uk');
    //             break;
        
    //             case 'it' :
    //             case 'it-it' :                     
    //                 pano.setVariableValue('lang', 'it');
    //             break;
        
    //             case 'pl' : 
    //             case 'pl-pl' : 
    //                 pano.setVariableValue('lang', 'pl');
    //             break;
        
    //             case 'lv' :
    //             case 'lv-lv' :                     
    //                 pano.setVariableValue('lang', 'lv');
    //             break;
        
    //             case 'ru' : 
    //             case 'ru-ru' : 
    //                 pano.setVariableValue('lang', 'ru');
    //             break;
        
    //             case 'by' :
    //             case 'by-by' :                     
    //             case 'be' :
    //             case 'be-be' :                     
    //                 pano.setVariableValue('lang', 'by');
    //             break;
                
    //             case 'bg' :
    //             case 'bg-bg' :                     
    //                 pano.setVariableValue('lang', 'bg');
    //             break;
        
    //             case 'lt' :
    //             case 'lt-lt' :                     
    //                 pano.setVariableValue('lang', 'lt');
    //             break;
        
    //             case 'ee' :
    //             case 'ee-ee' :                     
    //             case 'et' :
    //             case 'et-et' :                     
    //                 pano.setVariableValue('lang', 'ee');
    //             break;
        
    //             case 'mk' :
    //             case 'mk-mk' :                     
    //                 pano.setVariableValue('lang', 'mk');
    //             break;
        
    //             case 'nl-be' : 
    //                 pano.setVariableValue('lang', 'be');
    //             break;
        
    //             case 'de-ch': 
    //                 pano.setVariableValue('lang', 'ch');
    //             break;
        
    //             case 'ro-mo' : 
    //                 pano.setVariableValue('lang', 'md');
    //             break;
    
    //             default : 
    //                pano.setVariableValue('lang', 'int');
    //             break;
    //         }
    //         update_lang_content();
    //     }
        

        
    // }

    async function getTranslations() {
		const res = await fetch(`/tutorial/random-number`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

    pano.on("configloaded", function (){
		
	});
</script>