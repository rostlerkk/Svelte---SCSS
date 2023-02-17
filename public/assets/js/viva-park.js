

var dataModelUpdating = false;

let allVideos = ['Exterier_01','Exterier_02','Exterier_03','Exterier_04','Exterier_05','Exterier_06','Exterier_07','Exterier_08','Exterier_09','Exterier_10','Exterier_11','Exterier_12','Exterier_13','Interier_01','Interier_02','Interier_03','Interier_04','Interier_05','Interier_06','Interier_07','Interier_08','Interier_09','Interier_11','Interier_12','Interier_13'];
var patchName;
var play = true;
var videoDuration = 0;
var videoDurationHalf = 0;
var vid;
var tmpID;
var dataModel = {};
var houseID = '';
var loader = '<img src="images/loader.svg" class="hotspot-loader">';
var hotspotsArray = [];

var apiToken = {
    tokenCZ : 'ZsqPYpxsPHK3EpNwK6l7nOOyoTHIrw21Aw2pAh10BfV3mSl8he06rz1IsJNA',
    tokenSK : 'uuPus1j6IOdtp9p5EKzpusgd2TlXMuDK7C33qC8yof4IvMNCyzIPQEV9dfSI',
    tokenAT : 'EJVpr39eQqgZ3CtFudtsOA3QurptILYv6aLjQvOh9DX8VoAvNrRthOJyBXAu',
    tokenDE : 'bF6JRVySe9U1xOMWi2Kc8I5pzzgZcjT9LG0F1PrmDkOPHI9nKUBv5It3bjlY',
    tokenHR : 'KdZMZzWIYcj4AVjJ3VK6WvV2zCCQfx5jzDqgXk1A1Er013JaTbqlSuDLPcTZ',
    tokenRS : 'FEVesKJGbx1bEm9hsXijIZwV9E332FtvbFA01YxtKjEi1Sw3AMdT6Gp1uFMk',
    tokenSI : 'izOhuLDDFGmEeOTxj3s3x31ZTjgI4Ck5zfqK3X5cAlpgPW5piIxtGwtdX2ZH',
    tokenBA : 'Sjuab7GbAKhg6XNFGkQgLJEJXAxQ6Omwru89ErJ48AfX5uvncjpyjdx4K9xY',
    tokenINT : 'AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0',
    tokenUA : 'COyMGTwBy8YgEyZanLTWyTuaoGbDpTOB13BNAHAqDNLgU7PzbGouJKYcfZIo',
    tokenFR : 'e2AwJInW59w310Ve0DUEBRLL1Je8eqkf4BTTHwtCbz2YIwjXS20TaMpPHdum',
    tokenES : 'k2Mb4GufP8ED3B5wRQelPHY9NimPax2VDd8utmZKLNYc3IwdGuCiZRwe7fvF',
    tokenCN : 'Wf4qqUqX5qoPSvT0EzQezjt2ieaIIOUTNSmHT9VPwCDbJ1tqgmN5E32RuOSz',
    tokenGR : 'DADpDgerXpQ2QchZMpjN6Rsrx4q1s7m9r1AW4hcpWi2bH9DBfP2j998gJgKl',
    tokenHU : 'zG3XR4VrL5ZWh7rQlCydbGd0ysYmCziX0VOhyhEx7A3xmE9fysWf9uYhrRQR',
    tokenTR : 'RxX7fNvn9yiRmB3iGZtDYyyiMTA9nUmqXZg7dCoXP55XnOyvXJKEjr12iuhe',
    tokenRO : 'mrsKaiGNc28HA49VDcZjEnof8uvjJBa4pd45M6McUq0wR8T6gYWCDgsAy3i9',
    tokenUK : 'xF8BmqraDqPNxx4LfcepYpqGde0oPbu7kRtARznJxxFTiD1PukPbcdZl9cPg',
    tokenIT : 'UYgEsu0OxQv8zkgPnOiVLh0TTGD0aiYe2GVog2o7ithQ8fadPYRr40GNOxDY',
    tokenPL : '4vtMautl3wPGnzZLogvUE6x7tZkweWzo7vQBXJCVjZbtjxigxue33NRCahrR',
    tokenLV : 'UBP0CW3yVvzlw24fmTgFrXIya84dV4rEQIjaCJT4G35BdMRbiVvIYdVb4cSQ',
    tokenRU : 'llN4GmBb0uWIQlr9lyfaF7qR7DmDs733Fp8wkiJs0sduzwoEG9NBvqYpSONe',
    tokenBY : 'xARlEVKEW4lpeuyGt8Hb8LnY63P9SjMopyEKlemGSOTzsGZ1MD6wIZvCGBs0',
    tokenBG : 'cEyeSbL3VQDR9kLRUCWuHIqOT5ID59T05VVbNNbkm0bylEylgIfsDBvpAgqJ',
    tokenLT : 'jgqtiedWmx17W0csUqPuaYNf1JqOCAytsdec8k739pljn83OEBft2vixQ9jn',
    tokenEE : '7c0WUsKukTHuIw2rix2E7eRfn9wVSrd89hwNJLgtBz4JfHUh2UPclt4bQvZI',
    tokenMK : 'JhFW6xr1bV0HjEhyCv4pIvK3X9ZMPsa25YaNkjlAPQL2izaZwvaWMNagpO00',
    tokenBENL : 'cqElSqSIpHckBG14OZAxTIzUlA4i2lIHaFzMNVYgTW5zfOeyk6FiMIWU1FtP',
    tokenCH : 'PoCX0p3qavOP4RL8Ke7ZiGUhidi6iT69zZ7QHNo8OOiatgjdES4iDXqeEz9p',
    tokenMD : 'M3Amm8ZznQ3BoROYdKeq2iEtwSjPoFc9Egf4wV8JerAMnkQvbzakElhNHCIS',
    tokenBEFR : 'M73nHM2cKlyK8WRkmNjGHhhEtgpq5xrvBcwgxrpXCZLoEFyiiLhxaeRTpdt2'
    
}

var productSuffix = {
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

var urlPrefix = {
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
    be_fr : 'https://baumit.fr',
    int : 'https://int.baumit.com'
}

var moreInfoButton = {
    cz : 'Více info',
    sk : 'Viac info',
    uk : 'More info'
}

var jsonUrl = 'https://dev.baumit.';
var liveServerUrl = 'https://baumit.';
var key = '&pro_epim_productnr';
var productNameSave = '';
var productLang = '';

pano.on('changenode', function nodechange() {
    $('.viva-tooltip').addClass('hidden');

    if (
        //pano.getCurrentNode() != 'node24' &&
        pano.getCurrentNode() != 'node30' &&
        pano.getCurrentNode() != 'node31' &&
        pano.getCurrentNode() != 'node32' &&
        pano.getCurrentNode() != 'node33'
    ) {
        checkHotspots();
        patchName = pano.getNodeUserdata(pano.getCurrentNode()).title;
        if (
            patchName != 'Exterier_00' 
        ) {
            $('.ggskin_external').css({
                'visibility': 'hidden'
            });
            $('#container').append(loader);
            $('#vid').attr('id', '');
            videoDuration = 0;
            videoDurationHalf = 0;
        
            for (var i = 0; i < allVideos.length; i++) {
                pano.setMediaVisibility(allVideos[i], 0);
            }
    
            pano.on('tilesready', function addPatch() {
                play = true;
    
                if (
                    pano.getCurrentNode() != 'node16' &&
                    pano.getCurrentNode() != 'node26' &&
                    pano.getCurrentNode() != 'node30' &&
                    pano.getCurrentNode() != 'node31' &&
                    pano.getCurrentNode() != 'node32' &&
                    pano.getCurrentNode() != 'node33'
                ) {
    
                    if (
                        pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue == null ||
                        pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue == undefined ||
                        pano.getMediaObject(patchName) == null
                        ) {
                        $('.hotspot-loader').remove();
                        $('.ggskin_external').css({
                            'visibility': 'visible'
                        });
                    }
        
                    else {
                        pano.setMediaVisibility(allVideos[allVideos.indexOf(pano.getNodeUserdata(pano.getCurrentNode()).title)], 1);
                        tmpID = pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue;
                        $('.ggmedia > source[src="'+tmpID+'"]').parent().attr('id','vid1');
                        vid = document.getElementById("vid1");    
                        videoDuration = vid.duration;
                        videoDurationHalf = (videoDuration/2) -0.20;
                        console.log(videoDuration+' | '+videoDurationHalf);
        
                        if (
                            dataModelUpdating == false
                        ) {
                            $('.hotspot-loader').remove();
                            $('.ggskin_external').css({
                                'visibility': 'visible'
                            });
                        }
                    }
    
                }
    
                else {
                    $('.hotspot-loader').remove();
                    $('.ggskin_external').css({
                        'visibility': 'visible'
                    });
                }
                
    
                
                
            });
        }
    }




});

function comfortLevel(level) {
    window.randomize = function() {
	    $('.ko-progress-circle').attr('data-progress', level);
    }
    setTimeout(window.randomize, 200);
    
    $('.ko-progress-circle').click(window.randomize);
}

function comfortLevelSwitch(data) {
    console.log(dataModel[pano.getVariableValue('lang')][data]['House Comfort']);
    switch (dataModel[pano.getVariableValue('lang')][data]['House Comfort']) {
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

function playPauseMedia() {
    if ( 
        videoDuration == 0 ||
        videoDurationHalf == 0 
    ) {

    }

    else {

            console.log(videoDuration+' | '+pano.getMediaObject(patchName).lastElementChild.attributes.src.nodeValue);
    
    if ( pano.isPlaying(patchName) == true) {
        console.log('Nemôžem prehrať 2 videá naraz');
    }

    else {

        

        vid.ontimeupdate = function() {
            if (play == true || pano.isPlaying(patchName) == false) {
                if(this.currentTime >= videoDurationHalf ) {       
                    pano.pauseSound(patchName);
                    play = false;
                    $('.viva-tooltip').removeClass('hidden');
                    return false;
                }
            }
            else {
                $('.viva-tooltip').addClass('hidden');
                pano.getMediaObject(patchName).addEventListener('ended', function() {
                    $('.viva-tooltip').addClass('hidden');
                    play = true;
                    $('.viva-tooltip').addClass('hidden');
                });
            }
            
        };
        pano.playSound(patchName, "1");
    }

    }

 
}
function nacitajData(productName) {
    if (
        productNameSave == productName &&
        productLang == pano.getVariableValue('lang')
        ) {
        $('.hotspot-loader').remove();
        console.log('pozor nie je zmena');
        pano.setVariableValue('infopanel', true);
    }
    else {
        if (
            productName == '' ||
            productName == undefined ||
            productName == null
        ) {}
        else {
            $('.info-v1 > .head > .content > h2').empty();
            $('.info-v1 > .head > .content > a').remove();
            $('.content > ul').empty();
            $('.info-v1 > .body > p').empty();
            $('.info-v1 > .head > .baumit-img > img').remove();
            console.log('je je zmena');
            //console.log(productNameSave);
            pano.setVariableValue('infopanel', true);
            //$('#container').append(loader);
            lang = pano.getVariableValue('lang');
            //searchFor = productName;
            switch (lang) {
                case 'sk':
                    url = liveServerUrl+'sk'+'/api/products/products?api_token='+apiToken.tokenSK;
                break;
                case 'cz':
                    url = liveServerUrl+'cz'+'/api/products/products?api_token='+apiToken.tokenCZ;
                break;
                case 'at':
                    url = liveServerUrl+'at'+'/api/products/products?api_token='+apiToken.tokenAT;
                break;
                case 'de':
                    url = liveServerUrl+'de'+'/api/products/products?api_token='+apiToken.tokenDE;
                break;
                case 'en':
                    url = 'https://baumit.co.uk'+'/api/products/products?api_token='+apiToken.tokenEN;
                break;
                case 'hr':
                    url = liveServerUrl+'hr'+'/api/products/products?api_token='+apiToken.tokenHR;
                break;      
                case 'rs':
                    url = liveServerUrl+'rs'+'/api/products/products?api_token='+apiToken.tokenRS;
                break;  
                case 'si':
                    url = liveServerUrl+'si'+'/api/products/products?api_token='+apiToken.tokenSI;
                break;      
                case 'ba':
                    url = liveServerUrl+'ba'+'/api/products/products?api_token='+apiToken.tokenBA;
                break; 
                case 'ua':
                    url = liveServerUrl+'ua'+'/api/products/products?api_token='+apiToken.tokenUA;
                break;    
                case 'fr':
                    url = liveServerUrl+'fr'+'/api/products/products?api_token='+apiToken.tokenFR;
                break;   
                case 'es':
                    url = liveServerUrl+'es'+'/api/products/products?api_token='+apiToken.tokenES;
                break;       
                case 'cn':
                    url = liveServerUrl+'cn'+'/api/products/products?api_token='+apiToken.tokenCN;
                break;   
                case 'gr':
                    url = liveServerUrl+'gr'+'/api/products/products?api_token='+apiToken.tokenGR;
                break;  
                case 'hu':
                    url = liveServerUrl+'hu'+'/api/products/products?api_token='+apiToken.tokenHU;
                break; 
                case 'tr':
                    url = 'https://baumit.com.tr'+'/api/products/products?api_token='+apiToken.tokenTR;
                break; 
                case 'ro':
                    url = liveServerUrl+'ro'+'/api/products/products?api_token='+apiToken.tokenRO;
                break;   
                case 'uk':
                    url = liveServerUrl+'co.uk'+'/api/products/products?api_token='+apiToken.tokenUK;
                break;  
                case 'it':
                    url = liveServerUrl+'it'+'/api/products/products?api_token='+apiToken.tokenIT;
                break; 
                case 'pl':
                    url = liveServerUrl+'pl'+'/api/products/products?api_token='+apiToken.tokenPL;
                break;    
                case 'lv':
                    url = liveServerUrl+'lv'+'/api/products/products?api_token='+apiToken.tokenLV;
                break;  
                case 'ru':
                    url = liveServerUrl+'ru'+'/api/products/products?api_token='+apiToken.tokenRU;
                break;  
                case 'by':
                    url = liveServerUrl+'by'+'/api/products/products?api_token='+apiToken.tokenBY;
                break;         
                case 'bg':
                    url = liveServerUrl+'bg'+'/api/products/products?api_token='+apiToken.tokenBG;
                break;   
                case 'lt':
                    url = liveServerUrl+'lt'+'/api/products/products?api_token='+apiToken.tokenLT;
                break;  
                case 'ee':
                    url = liveServerUrl+'ee'+'/api/products/products?api_token='+apiToken.tokenEE;
                break;  
                case 'mk':
                    url = liveServerUrl+'mk'+'/api/products/products?api_token='+apiToken.tokenMK;
                break;  
                case 'beNl':
                    url = 'https://baumit.be'+'/api/products/products?api_token='+apiToken.tokenBENL;
                break; 
                case 'ch':
                    url = 'https://ch.baumit.com'+'/api/products/products?api_token='+apiToken.tokenCH;
                break; 
                case 'md':
                    url = liveServerUrl+'md'+'/api/products/products?api_token='+apiToken.tokenMD;
                break; 
                case 'beFr':
                    url = 'https://fr.baumit.be'+'/api/products/products?api_token='+apiToken.tokenBEFR;
                break;                 
                case 'int':
                    url = 'https://int.baumit.com'+'/api/products/products?api_token='+apiToken.tokenINT;
                break;                                                                                                                                                                                              
            }
            //console.log(url);
            productNameSave = productName;
            productLang = pano.getVariableValue('lang');
            key = productNameSave+productSuffix[lang];
            console.log(key);
            var imgSrc = 'https://int.baumit.com/'+ dataModel[lang][key]['image'];
            $('.info-v1 > .head > .baumit-img').append("<img class='baumit-img' src='"+imgSrc+"'/>");
            //$('.info-v1 > .head > .baumit-img > img').attr('src', imgSrc);
            var urlTarget = urlPrefix[lang]+dataModel[lang][key]['details_url'];
            var a = document.createElement("a");
            
            $('.info-v1 > .head > .content').append(a);

            if (
                moreInfoButton[pano.getVariableValue('lang')] == undefined ||
                moreInfoButton[pano.getVariableValue('lang')] == null ||
                moreInfoButton[pano.getVariableValue('lang')] == 'undefined' 
            ) {
                $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target','_blank').text(moreInfoButton.uk);
            }

            else  {
                $('.info-v1 > .head > .content > a').attr('href', urlTarget).attr('target','_blank').text(moreInfoButton[pano.getVariableValue('lang')]);
            }
            
            $('.info-v1 > .head > .content > h2').append(dataModel[lang][key]['name']);
            $.each( dataModel[lang][key], function( i, el ) {
                var y = '';
                y = i;
                if (
                    y.includes('product_benefit') &&
                    y.indexOf('description') < 1
                    ) {
                    $('.content > ul').append("<li><span>" + el + "</span></li>");
                }
            }); 
            $('.info-v1 > .body > p').append(dataModel[lang][key]['description']);
        }
    }
}
function checkHotspots() {
    hotspotsArray = [];
    hotspotsArray = pano.getCurrentPointHotspots();
    console.log('čekujem');

    var tmpProductId;
    var sep = ' ';
    var tmpLang = pano.getVariableValue('lang');

    for (i = 0; i < hotspotsArray.length; i++) {

        // hide all Hotspots

        if (hotspotsArray[i].className.indexOf('delete') < 0)
        {
            hotspotsArray[i].className = hotspotsArray[i].className+' delete';
        }

        
        
        if (hotspotsArray[i].className.indexOf('viva-tooltip') > -1) 
            {
                tmpProductId = hotspotsArray[i].textContent.substring(hotspotsArray[i].textContent.indexOf("|") + 1);
                
                
                //console.log(tmpProductId);

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
                var tmpSearchingID = tmpProductId+productSuffix[tmpLang];
                if (
                    dataModel[pano.getVariableValue('lang')][tmpSearchingID] == undefined ||
                    dataModel[pano.getVariableValue('lang')][tmpSearchingID] == null ||
                    dataModel[pano.getVariableValue('lang')][tmpSearchingID] == ''
                )
                {
                    
                }

                else {
                    console.log(tmpSearchingID);
                    //$('.viva-tooltip[data-id="'+tmpProductId+'"] > div > div').text(dataModel[tmpLang][tmpSearchingID].name);
                    var newTmpContent = '<div class="hts-title">'+dataModel[pano.getVariableValue('lang')][tmpSearchingID].name+'</div><span>|'+tmpProductId+'</span>';
                    $('.viva-tooltip[data-id="'+tmpProductId+'"] > div > div').html(newTmpContent);
                    hotspotsArray[i].className = hotspotsArray[i].className.replace('delete', '');
                }
            }
            



            
        //     str = hotspotsArray[i].textContent.substring(hotspotsArray[i].textContent.indexOf("|") + 1);
        //     var suff = productSuffix[pano.getVariableValue('lang')];
        //     //hotspotsArray[i].title = str;

        //     if (
        //         str != ''
        //     ) {
        //         hotspotsArray[i].className = hotspotsArray[i].className+' hidden '+str+productSuffix[pano.getVariableValue('lang')];
        //         $('.'+str+suff).attr('data-id',str);
        //     }
            

            
        //     //hotspotsArray[i].className = hotspotsArray[i].className+' '+tmpElement;
        //     var searchID = str+suff;
        //     console.log('hľadám : '+searchID);

        //     if (
        //         dataModel[pano.getVariableValue('lang')][searchID] == undefined ||
        //         dataModel[pano.getVariableValue('lang')][searchID] == null ||
        //         dataModel[pano.getVariableValue('lang')][searchID] == ''
        //     )
        //     {
        //         hotspotsArray[i].className = hotspotsArray[i].className+' delete';
        //     }
        //     else {
        //         var tmpStr = hotspotsArray[i].className;
        //         hotspotsArray[i].className =  tmpStr.replace('delete', '');
                
        //         $('.viva-tooltip[data-id="'+str+'"] > div > div').text(dataModel[pano.getVariableValue('lang')][searchID].name);
        //     }
        // } 
        
        else {
           // console.log(hotspotsArray[i]);
            hotspotsArray.splice(i, 1);
            i--;
        }
    }
    //console.log(hotspotsArray);

    
    //var hotspotsArray = pano.getPointHotspotIds();
    // console.log(hotspotsArray);
    // var searchValue = 2;

    // for (i = 0; i < hotspotsArray.length; i++) {
    //     if (
    //         hotspotsArray[i].indexOf('Point') > -1
    //     ) {
    //         console.log(hotspotsArray[i]);
    //         hotspotsArray.splice(i, 1);
    //         i--;
    //     }
    //     //var newArr = $(arr).not([searchValue]).get();
    //     //hotspotsArray.splice(hotspotsArray[index].indexOf('Point'),1);
        
        
    // }
    // console.log(hotspotsArray);
}
function houseInfo(data) {
    var searchFor;
    houseIDtitle = pano.getNodeUserdata(pano.getCurrentNode()).comment; 
    pano.setVariableValue('houseInfo', true);

    
    if (
        houseID !== data
        ) {
            $('#container').append(loader);
            $('#house-url').addClass('hidden');
            $('.viva-house-info > div > .content > h1' ).empty();
            $('.viva-house-info > div > .content > .row > p' ).empty();
            $('#yt').attr('src','');
            $('#yt-video').addClass('hidden');
            

            comfortLevelSwitch(data);
            
            
        if (
            data == 0
        ) {
            houseID = 0;
        }
        else {
            houseID = pano.getNodeUserdata(pano.getCurrentNode()).comment; 
        }
        lang = pano.getVariableValue('lang');
        //searchFor = productName;

        if (
            (dataModel[lang][houseID] != null || dataModel[lang][houseID] != undefined)
        ) {

            // ak ide o House 0
            if (
                dataModel[lang][houseID]['House No.'] == '0'

            ){
                $('.viva-house-info > div > .content > h1' ).append(dataModel[lang][houseID]['Headline']);
            }

            else {
                $('.viva-house-info > div > .content > h1' ).append(houseIDtitle);
            }
            
            $('.viva-house-info > div > .content > .row > p' ).append(dataModel[lang][houseID]['Text']);
            

            if (
                dataModel[lang][houseID]['Media'] != ''
            ) {
                var youtubeURL = 'https://www.youtube.com/embed/'+ dataModel[lang][houseID]['Media'].replace('https://youtu.be/','');
                var tmpWidth = ($('#yt-video').width()/16)*9;
                $('#yt').attr('src', youtubeURL).css({
                    'height':tmpWidth
                });
                $('#yt-video').removeClass('hidden');
            }

            if (
                dataModel[lang][houseID]['Link'] != ''
            ) {

                if (
                    moreInfoButton[pano.getVariableValue('lang')] == undefined ||
                    moreInfoButton[pano.getVariableValue('lang')] == null ||
                    moreInfoButton[pano.getVariableValue('lang')] == 'undefined' 
                ) {
                    $('#house-url').attr('href',dataModel[lang][houseID]['Link']).text(moreInfoButton.uk); 
                }

                else {
                    $('#house-url').attr('href',dataModel[lang][houseID]['Link']).text(moreInfoButton[pano.getVariableValue('lang')]);
                }
                $('#house-url').removeClass('hidden');
            }
        }
        $('.hotspot-loader').remove();
    }
    else {   
    }
}
function getLink(lang, liveServerUrl, apiToken) {
    switch (lang) {
        case 'sk':
            url = liveServerUrl+'sk'+'/api/products/products?api_token='+apiToken.tokenSK;
            console.log(url);
        break;
        case 'cz':
            url = liveServerUrl+'cz'+'/api/products/products?api_token='+apiToken.tokenCZ;
        break;
        case 'at':
            url = liveServerUrl+'at'+'/api/products/products?api_token='+apiToken.tokenAT;
        break;
        case 'de':
            url = liveServerUrl+'de'+'/api/products/products?api_token='+apiToken.tokenDE;
        break;
        case 'en':
            url = 'https://baumit.co.uk'+'/api/products/products?api_token='+apiToken.tokenEN;
        break;
        case 'hr':
            url = liveServerUrl+'hr'+'/api/products/products?api_token='+apiToken.tokenHR;
        break;      
        case 'rs':
            url = liveServerUrl+'rs'+'/api/products/products?api_token='+apiToken.tokenRS;
        break;  
        case 'si':
            url = liveServerUrl+'si'+'/api/products/products?api_token='+apiToken.tokenSI;
        break;      
        case 'ba':
            url = liveServerUrl+'ba'+'/api/products/products?api_token='+apiToken.tokenBA;
        break; 
        case 'ua':
            url = liveServerUrl+'ua'+'/api/products/products?api_token='+apiToken.tokenUA;
        break;    
        case 'fr':
            url = liveServerUrl+'fr'+'/api/products/products?api_token='+apiToken.tokenFR;
        break;   
        case 'es':
            url = liveServerUrl+'es'+'/api/products/products?api_token='+apiToken.tokenES;
        break;       
        case 'cn':
            url = liveServerUrl+'cn'+'/api/products/products?api_token='+apiToken.tokenCN;
        break;   
        case 'gr':
            url = liveServerUrl+'gr'+'/api/products/products?api_token='+apiToken.tokenGR;
        break;  
        case 'hu':
            url = liveServerUrl+'hu'+'/api/products/products?api_token='+apiToken.tokenHU;
        break; 
        case 'tr':
            url = 'https://baumit.com.tr'+'/api/products/products?api_token='+apiToken.tokenTR;
        break; 
        case 'ro':
            url = liveServerUrl+'ro'+'/api/products/products?api_token='+apiToken.tokenRO;
        break;   
        case 'uk':
            url = liveServerUrl+'co.uk'+'/api/products/products?api_token='+apiToken.tokenUK;
            console.log(url);
        break;  
        case 'it':
            url = liveServerUrl+'it'+'/api/products/products?api_token='+apiToken.tokenIT;
        break; 
        case 'pl':
            url = liveServerUrl+'pl'+'/api/products/products?api_token='+apiToken.tokenPL;
        break;    
        case 'lv':
            url = liveServerUrl+'lv'+'/api/products/products?api_token='+apiToken.tokenLV;
        break;  
        case 'ru':
            url = liveServerUrl+'ru'+'/api/products/products?api_token='+apiToken.tokenRU;
        break;  
        case 'by':
            url = liveServerUrl+'by'+'/api/products/products?api_token='+apiToken.tokenBY;
        break;         
        case 'bg':
            url = liveServerUrl+'bg'+'/api/products/products?api_token='+apiToken.tokenBG;
        break;   
        case 'lt':
            url = liveServerUrl+'lt'+'/api/products/products?api_token='+apiToken.tokenLT;
        break;  
        case 'ee':
            url = liveServerUrl+'ee'+'/api/products/products?api_token='+apiToken.tokenEE;
        break;  
        case 'mk':
            url = liveServerUrl+'mk'+'/api/products/products?api_token='+apiToken.tokenMK;
        break;  
        case 'beNl':
            url = 'https://baumit.be'+'/api/products/products?api_token='+apiToken.tokenBENL;
        break; 
        case 'ch':
            url = 'https://ch.baumit.com'+'/api/products/products?api_token='+apiToken.tokenCH;
        break; 
        case 'md':
            url = liveServerUrl+'md'+'/api/products/products?api_token='+apiToken.tokenMD;
        break; 
        case 'beFr':
            url = 'https://fr.baumit.be'+'/api/products/products?api_token='+apiToken.tokenBEFR;
        break;                 
        case 'int':
            url = 'https://int.baumit.com'+'/api/products/products?api_token='+apiToken.tokenINT;
        break;                                                                                                                                                                                              
    }
    return url;
}
function createDataModel() {
    $('.ggskin_external').css({
        'visibility': 'hidden'
    });
    dataModelUpdating = true;
    $('#container').append(loader);
    var lang = pano.getVariableValue('lang');

    if (
        dataModel[lang] == undefined ||
        dataModel[lang] == null ||
        dataModel[lang] == {}
    ) {
        dataModel[lang] = {}
        var searchID = 'pro_epim_productnr';
        getLink(lang, liveServerUrl, apiToken);

        $.getJSON( url, function( data ) {
            $.each( data, function( key, val ) {
                var tmpID = data[key][searchID];
                if (
                    tmpID == undefined ||
                    tmpID == null ||
                    tmpID == ''
                ) {
                    if (
                        data[key]['House No.'] != '' ||
                        data[key]['House No.'] != undefined ||
                        data[key]['House No.'] != null 
                    ) {
                        var tmpIDHouses = data[key]['House No.'];
                        dataModel[lang][tmpIDHouses] = {};
                        dataModel[lang][tmpIDHouses] = {
                            'House No.' : data[key]['House No.'],
                            'Headline' : data[key]['Headline'],
                            'Text' : data[key]['Text'],
                            'Media' : data[key]['Media'],
                            'House Comfort' : data[key]['House Comfort'],
                            'Link' : data[key]['Link'],
                        }
                    }
                }

                else {
                    dataModel[lang][tmpID] = {};
                    dataModel[lang][tmpID] = {
                        'name' : data[key]['name'],
                        'epim_name' : data[key]['epim_name'],
                        'epim_name' : data[key]['epim_name'],
                        'additional_name' : data[key]['additional_name'],
                        'description' : data[key]['description'],
                        'product_benefit_1' : data[key]['product_benefit_1'],
                        'product_benefit_2' : data[key]['product_benefit_2'],
                        'product_benefit_3' : data[key]['product_benefit_3'],
                        'product_benefit_1' : data[key]['product_benefit_1'],
                        'image' : data[key]['image'],
                        'details_url' : data[key]['details_url']
                    };
                }
            
                
            });
            console.log(dataModel);
            $('.hotspot-loader').remove();
            dataModelUpdating = false;
            checkHotspots();
            if (
                pano.getVariableValue('blurred') == false
            ) {
                $('.ggskin_external').css({
                    'visibility': 'visible'
                });
            }

            
        });
        
    }

    else {
        $('.hotspot-loader').remove();
        dataModelUpdating = false;
        checkHotspots();

        if (
            pano.getVariableValue('blurred') == false
        ) {
            $('.ggskin_external').css({
                'visibility': 'visible'
            });
        }
        
    }   
    
    
    
}
pano.addListener('varchanged_lang', function() {
    createDataModel();
});
pano.addListener('varchanged_houseInfo', function() {
    switch (pano.getVariableValue('houseInfo')) {
        case true: 
            ShowElement(['.viva-house-info']);
            variableTrue(['blurred']);
            $('.ggskin_hotspot, .ggskin_external').css({
                'visibility': 'hidden'
            });
        break;
        case false:
            variableFalse(['blurred']);
            HideElement(['.viva-house-info']);
            setTimeout(() => {
                $('.ggskin_hotspot, .ggskin_external').css({
                    'visibility': 'visible'
                });    
            }, 250);
        break; 
    }
});

createDataModel();