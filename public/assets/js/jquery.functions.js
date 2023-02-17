//$('#intro > p').text('načítavam konfiguráciu');
$('#intro > p').text('loading configuration');


pano.on('configloaded', function() {
    //$('#intro > p').text('načítavam panorámy');
    $('#intro > p').text('loading panoramas');
});

var readMoreTxt = '';
var readLessTxt = '';

// function removeIntroAnimation() {
//     pano.setVariableValue('blured', true);
//     pano.on("tilesready", function() {
//         $("#intro").fadeOut("slow", function() {
//             $(this).remove();
//         });
//     });
    
// }

function AddReadMore(readMoreTxt, readLessTxt) {
    switch (pano.getVariableValue('lang')) {
        case 'sk': 
            readMoreTxt = "... zobraziť viac";
            readLessTxt = '... zobraziť menej'
        break;
        case 'en' : 
            readMoreTxt = "... read more";
            readLessTxt = '... read less';
        break;
    }
    var carLmt = 200;
    $(".attribute-description > div").each(function() {
        if ($(this).find(".firstSec").length)
            return;

        var allstr = $(this).text();
        if (allstr.length > carLmt) {
            var firstSet = allstr.substring(0, carLmt);
            var secdHalf = allstr.substring(carLmt, allstr.length);
            var strtoadd = firstSet + "<span class='SecSec'>" + secdHalf + "</span><span class='readMore'  title='Click to Show More'>" + readMoreTxt + "</span><span class='readLess' title='Click to Show Less'>" + readLessTxt + "</span>";
            $(this).html(strtoadd);
        }

    });
    //Read More and Read Less Click Event binding
    $('.readMore').on('click touchstart', function() {
        $(this).parent().toggleClass("showmorecontent");
        $(this).parent().toggleClass("showlesscontent");
    });

    $('.readLess').on('click touchstart', function() {
        $(this).parent().toggleClass("showmorecontent");
        $(this).parent().toggleClass("showlesscontent");
    });
}
$(function() {
    //Calling function after Page Load
    AddReadMore();
});

// Skrytie elementu MEDIA (patchu)
function hideMedia (source) {
    pano.setMediaVisibility(source, '0', 0);
}

// Zobrazenie elementu MEDIA (patchu)
function showMedia (source) {
    pano.setMediaVisibility(source, '1', 0);
}

function najdiAktualnyByt() {
    UserData = pano.getNodeUserdata(pano.getCurrentNode());
    bytID = UserData.copyright; // zistenie ID bytu
    if (bytID == undefined || bytID == '')  {
        console.log('Nepoznám id bytu');
    }
    else {
        //console.log('Aktuálny byt je '+bytID);
    }
};

var IdsFile = 'assets/data/ids.csv';
var importFile = 'assets/data/import.csv';
var hotspotsFile = 'assets/data/hotspots.csv';
var Ids = {}; // Inicializácia nového prázdneho objektu pre ID atribútov
var Flats = {}; // Inicializácia nového prázdneho objektu pre byty a ich atribúty
var patches = {};
var Hotspots = {}; // Inicializácia nového prázdneho objektu pre Hotspoty


// funkcia na vytvorenie objektu s hodnotami atribútov
function readIds(response, Ids) {
    var lines = response.split("\n");
    for (var i = 1; i < lines.length; i++) {
        _attrID = lines[i].split(";")[0];                 // ID atribútu
        _attrGroupName_SK = lines[i].split(";")[1];       // Názov skupiny atribútu SK
        _attrGroupName_EN = lines[i].split(";")[2];       // Názov skupiny atribútu EN
        _attrNames_SK = lines[i].split(";")[3];           // Názvy atribútov SK
        _attrNames_EN = lines[i].split(";")[4];           // Názvy atribútov EN
        _attrDescriptions_SK = lines[i].split(";")[5];    // Popisy atribútov SK
        _attrDescriptions_EN = lines[i].split(";")[6];    // Popisy atribútov EN
        _attrPrices = lines[i].split(";")[7];             // Ceny atribútov
        _attrThumbnails = lines[i].split(";")[8];         // Miniatúry atribútov
        _attrPremium = lines[i].split(";")[9];            // Prémiový produkt
        _attrTarget = lines[i].split(";")[10];            // Target panorámy
        
        // Kontrola nekorektných vstupov
        if (_attrGroupName_SK !== undefined) {
            _attrGroupName_SK = _attrGroupName_SK.toString().replace('\r','').split('|');
        }

        if (_attrGroupName_EN !== undefined) {
            _attrGroupName_EN = _attrGroupName_EN.toString().replace('\r','').split('|');
        }

        if (_attrNames_SK !== undefined) {
            _attrNames_SK = _attrNames_SK.toString().replace('\r','').split('|');
        }

        if (_attrNames_EN !== undefined) {
            _attrNames_EN = _attrNames_EN.toString().replace('\r','').split('|');
        }

        if (_attrDescriptions_SK !== undefined) {
            _attrDescriptions_SK = _attrDescriptions_SK.toString().replace('\r','').split('|');
        }

        if (_attrDescriptions_EN !== undefined) {
            _attrDescriptions_EN = _attrDescriptions_EN.toString().replace('\r','').split('|');
        }

        if (_attrPrices !== undefined) {
            _attrPrices = _attrPrices.toString().replace('\r','').split('|');
        }

        if (_attrThumbnails !== undefined) {
            _attrThumbnails = _attrThumbnails.toString().replace('\r','').split('|');
        }

        if (_attrPremium !== undefined) {
            _attrPremium = _attrPremium.toString().replace('\r','').split('|');
        }

        if (_attrTarget !== undefined ) {
            _attrTarget = _attrTarget.toString().replace('\r','').split('|');
        }


        if (_attrID == undefined || _attrID == '') {
            // fix nekorektných záznamov
        }

        else {
            // Naplnenie objektu údajmi 
            Ids[_attrID] = {
            'id' : _attrID,
    
            _attrGroupName : {
                sk : _attrGroupName_SK, 
                en : _attrGroupName_EN
                
            },
            _attrNames : {
                sk : _attrNames_SK,
                en : _attrNames_EN
            },
            _attrDescriptions : {
                sk : _attrDescriptions_SK,
                en : _attrDescriptions_EN
            },
            _attrPrices : _attrPrices,
            _attrThumbnails : _attrThumbnails,
            _attrPremium : _attrPremium,
            _attrTarget : _attrTarget
            };
        }
    }   
          
    //console.log(Ids);         
    //console.log('objekt s hodnotami atribútov vytvorený...');   
};

// funkcia na vytvorenie objektu s bytmi a ich atribútmi
function readFlats(response, Flats) {
    var lines = response.split("\n");
    var _flatID = '';
    var _flatAttrID = '';
    var _flatAttrGroup = '';

    for (var i = 1; i < lines.length; i++) {
        _flatID = lines[i].split(";")[0];                 // ID Bytu
        _flatAttrID = lines[i].split(";")[1];             // ID atribútu
        _flatAttrName = lines[i].split(";")[2];           // Názov atribútu
        _flatAttrPrices = lines[i].split(";")[3];         // Ceny atribútu - nepovinný parameter, ak nie je zadaný, načíta sa z objektu Ids
        _flatAttrGrouped = lines[i].split(";")[4];        // Zoskupený atribút (Y|N) - nepovinný parameter, ak nie je zadaný, zapíše sa N
        _flatAttrExtended = lines[i].split(";")[5];       // Doplnkový atribút (Y|N) - nepovinný parameter, ak nie je zadaný, zapíše sa N
        _flatAttrGlobalChange = lines[i].split(";")[6];   // Globálna zmena (1,2 ...) - nepovinný parameter
        _flatAttrActiveItem = lines[i].split(";")[7];     // Doplnkový atribút (1,1 ...) - nepovinný parameter, ak nie je zadaný, predvolí sa prvý záznam

        if (_flatAttrID == '' || _flatAttrID == null || _flatAttrID == undefined) {
        }
        else {   
            

            if ( _flatAttrActiveItem == '' || _flatAttrActiveItem == '\r' ) {
                //globalSettings.allVariables[_flatAttrID].activeItem = 0;
            }

            else {
                //globalSettings.allVariables[_flatAttrID].activeItem = _flatAttrActiveItem.toString().replace('\r','');
            } 

            
        }
        

        // Zápis záznamov
        function AddItem() {
            // Načítanie ID bytu
            Flats[_flatID][_flatAttrID] = {
                'id': _flatAttrID,
            };

            Flats[_flatID][_flatAttrID].groupName = {
                //'title': _flatAttrName,
                sk : Ids[_flatAttrID]._attrGroupName.sk,
                en : Ids[_flatAttrID]._attrGroupName.en
            };

            // Ak nie je zadaný názov skupiny, načítaj ho z Ids
            // if (_flatAttrName == '' || _flatAttrName == '\r') {
            //     Flats[_flatID][_flatAttrID].title = {
            //        'title': Ids[_flatAttrID]._attrGroupName.sk,
            //         sk : Ids[_flatAttrID]._attrGroupName.sk,
            //         en : Ids[_flatAttrID]._attrGroupName.en
            //     };
            // }

            // else {
                Flats[_flatID][_flatAttrID].title = {
                    //'title': _flatAttrName,
                    sk : Ids[_flatAttrID]._attrGroupName.sk,
                    en : Ids[_flatAttrID]._attrGroupName.en
                };
            // }

            Flats[_flatID][_flatAttrID].target = _flatAttrID;

            // Načítanie názvov atribútov
            Flats[_flatID][_flatAttrID].names = {
                sk : Ids[_flatAttrID]._attrNames.sk,
                en : Ids[_flatAttrID]._attrNames.en
            };

            Flats[_flatID][_flatAttrID].targetUrl = Ids[_flatAttrID]._attrTarget;

            // Načítanie popisov atribútov
            Flats[_flatID][_flatAttrID].descriptions = {
                sk : Ids[_flatAttrID]._attrDescriptions.sk,
                en : Ids[_flatAttrID]._attrDescriptions.en
            };

            // Ak nie sú zadané ceny Atribútov v import.csv, načítaj ich z objektu Ids.
            if (_flatAttrPrices == '' || _flatAttrPrices == '\r' ) {
                Flats[_flatID][_flatAttrID].prices = Ids[_flatAttrID]._attrPrices; 
            }

            else {
                Flats[_flatID][_flatAttrID].prices = _flatAttrPrices.toString().replace('\r','').split('|');
            }

            // Načítanie miniatúr atribútov
            Flats[_flatID][_flatAttrID].thumbnails = Ids[_flatAttrID]._attrThumbnails;            
            
            //Načítanie zoskupeného produktu
            if (_flatAttrGrouped == '') {
                Flats[_flatID][_flatAttrID].grouped = '';
            }

            else {
                Flats[_flatID][_flatAttrID].grouped = _flatAttrGrouped.toString().replace('\r','');
            }

            //Načítanie doplnkového atribútu
            if (_flatAttrExtended == '' || _flatAttrExtended == '\r')  {
            }

            else {
                Flats[_flatID][_flatAttrID].extended = _flatAttrExtended.toString().replace('\r','');
            } 

            //Načítanie globálnej zmeny atribútov
            if (_flatAttrGlobalChange == '' || _flatAttrGlobalChange == '\r')  {
                Flats[_flatID][_flatAttrID].globalChange = '';
            }

            else {
                Flats[_flatID][_flatAttrID].globalChange = _flatAttrGlobalChange.toString().replace('\r','');
            }             
            
            //Načítanie aktívneho atribútu
            
            if ( _flatAttrActiveItem == '' || _flatAttrActiveItem == '\r' ) {
                Flats[_flatID][_flatAttrID].activeItem = 0;
            }

            else {
                Flats[_flatID][_flatAttrID].activeItem = _flatAttrActiveItem.toString().replace('\r','');
            } 
            
            // Načítanie miniatúr atribútov
            Flats[_flatID][_flatAttrID].premium = Ids[_flatAttrID]._attrPremium; 

            if ( _flatAttrActiveItem == '' || _flatAttrActiveItem == '\r' ) {
                Flats[_flatID][_flatAttrID].default = 0;
            }

            else {
                Flats[_flatID][_flatAttrID].default = _flatAttrActiveItem.toString().replace('\r','');
            } 
        }

        if (_flatID == '') {
        }

        //ak byt existuje, zapíše do neho hodnoty
        else if (_flatID in Flats ) {
            AddItem();   
        }

        // Ak byt ešte neexistuje, vytvorí nový objekt a potom do neho zapíše hodnoty
        else { 
            Flats[_flatID] = {};
            AddItem();
        }
    }
    
};

// funkcia na vytvorenie objektu s hotspotmi
function readHotspots(response, Hotspots) {
    var lines = response.split("\n");
    for (var i = 1; i < lines.length; i++) {
        _panoID = lines[i].split(";")[0];                 // ID panorámy
        _hotspotID = lines[i].split(";")[1];              // HotspotID
        _hotspotSkinTemplate = lines[i].split(";")[2];    // Hotspot Skin Template
        _pan = lines[i].split(";")[3];                    // Hotspot PAN
        _tilt = lines[i].split(";")[4];                   // Hotspot TITL
        _hotspotTitle_SK = lines[i].split(";")[5];        // Názvy hotspotov SK
        _hotspotTitle_EN = lines[i].split(";")[6];        // Názvy hotspotov EN
        _hotspotDescriptions_SK = lines[i].split(";")[7]; // Popisy hotspotov SK
        _hotspotDescriptions_EN = lines[i].split(";")[8]; // Popisy hotspotov EN        
        _hotspotURL = lines[i].split(";")[9];             // Hotspot URL
        _hotspotTarget = lines[i].split(";")[1];         // Hotspot Target

        // Zápis záznamov
        function AddHotspot() {
            // Načítanie ID bytu
            Hotspots[_panoID][_hotspotID] = {
                'id': _hotspotID.toString().replace('\r',''),
            };

            Hotspots[_panoID][_hotspotID] = {
                skinTemplate : _hotspotSkinTemplate.toString().replace('\r',''),
                PAN : _pan.toString().replace('\r',''),
                TILT : _tilt.toString().replace('\r',''),
                _hotspotTitle : {
                    sk : _hotspotTitle_SK.toString().replace('\r',''),
                    en : _hotspotTitle_EN.toString().replace('\r','')
                },
                _hotspotDescription : {
                    sk : _hotspotDescriptions_SK.toString().replace('\r',''),
                    en : _hotspotDescriptions_EN.toString().replace('\r','')
                },
                url : _hotspotURL,
                target : _hotspotTarget.toString().replace('\r','')
            }
        }
           

        if (_panoID == '') {
        }

        //ak byt existuje, zapíše do neho hodnoty
        else if (_panoID in Hotspots ) {
            AddHotspot();   
        }

        // Ak byt ešte neexistuje, vytvorí nový objekt a potom do neho zapíše hodnoty
        else { 
            Hotspots[_panoID] = {};
            AddHotspot();
        }
        
    }      
    //console.log(Ids);         
    //console.log('objekt s hodnotami atribútov vytvorený...');   
}

function nacitajId() {
    // Načítanie súbor s definíciami atribútov
    $.ajax({
        type: 'GET', 
        url: IdsFile,
        dataType: 'text',  
        success: function importIds(response) {  
            //console.log('Načítavam 1. CSV súbor "ids.csv"...');
            readIds(response, Ids);
           // console.log('Načítal som  1. CSV súbor "ids.csv"...');
            nacitajByty();
        },
        error: function() {
            console.log('Chyba pri načítavaní CSV súboru "ids.csv" !');
        },
        complete: function() {
            console.log('1. CSV súbor načítaný korektne - Atribúty OK.');
            
        }
    });
}

function nacitajByty() {
    $.ajax({
        type: 'GET', 
        url: importFile,
        dataType: 'text',  
        success: function importFlats(response) {  
           // console.log('Načítavam 2. CSV súbor "import.csv"...');
            readFlats(response, Flats);
           // console.log('Načítal som 2. CSV súbor "import.csv"...');
            nacitajPatche();
        },
        error: function() {
            console.log('Chyba pri načítavaní CSV súboru "import.csv" !');
        }, 
        complete: function() {
            console.log('2. CSV súbor načítaný korektne - BYTY OK.');
            //console.log(Flats[bytID]);
            //console.log(Flats);
            
        }
    });
}

function nacitajPatche() {
    $.ajax({
        url: 'pano.xml', // URL k vygenerovanému XML - Pano2VR
        dataType: 'xml',
        success: function importPatches(data){
            var xml_node = $('tour', data);
            var tmpArray = {};
            $.each(xml_node.find('panorama'), function() {
                nodeID = ($(this)[0].id); // Uloženie ID panorámy
                var Nodes = $(this).find('panorama>media>image');
                tmpArray[nodeID] = Nodes;
                patches[nodeID] = [];
                // Uloženie ID patchov
                $.each(tmpArray[nodeID], function (index) {
                    patches[nodeID].push(tmpArray[nodeID][index].id);
                });
            });
           // console.log('Načítavam patche zo XML');
           //targetAttr = 'limec';
           UpdateCurrentPatches();
            nacitajHotspoty();
            
            $.getScript('extended.js');
            pano.on('changenode', function() {
                attributesReady();
                UpdateCurrentPatches();
            });
        },
        error: function(data){
            console.log('Error loading XML data');
        },
        complete: function  (data) {
            //console.log('Skončil som ajaxové načítavanie pano.xml');
        } 
    });
}

function nacitajHotspoty() {
    $.ajax({
        type: 'GET', 
        url: hotspotsFile,
        dataType: 'text',  
        success: function importHotspots(response) {  
            //console.log('Načítavam 3. CSV súbor "hotspots.csv"...');
            readHotspots(response, Hotspots);
            //console.log('Načítal som 2. CSV súbor "import.csv"...');
            //nacitajPatche();
            //console.log(Hotspots);
            
            if ( attributesAllow == true ) {
                attributesReady();
            }

            
            //removeIntroAnimation();
        },
        error: function() {
            console.log('Chyba pri načítavaní CSV súboru "hotspots.csv" !');
        }, 
        complete: function() {
            //console.log('3. CSV súbor načítaný korektne - Hotspoty OK.');
            //console.log(Flats[bytID]);
            //console.log(Flats);

            pano.on('varchanged_lang', function() {

                if ( attributesAllow == true  ) {
                    updateTexts();
                    generateCart(Flats);
                }
                
            });
            
        }
    });
}

var pocetPatchov;

function UpdateCurrentPatches() { 
        najdiAktualnyByt();
        activeNode = pano.getCurrentNode(); // Zistenie aktuálnej panorámy


    
        if (patches[activeNode] == undefined || patches[activeNode].length == 0 || Flats[bytID] == undefined ) {
            //console.log('Nemôžem spustiť aktualizáciu patchov, objekt nie je načítaný');
        }
    
        else {
            pocetPatchov = patches[activeNode].length; // načítanie počtu patchov pre aktuálnu panorámu
            if (pocetPatchov > 0) {
                for (i = 0; i <pocetPatchov; i++) { // skrytie všetkých patchov, ktoré prislúchajú k aktuálnej panoráme
                    hideMedia(patches[activeNode][i]);
                }
            }
        
            else {
                console.log('nemôžem aktualizovať patche ... ');
            }
        
            patchesNames = []; // prečistenie poľa
            
            if (pocetPatchov > 0 || Flats[bytID] != undefined ) {
                for (i = 0; i < pocetPatchov; i++) {
                    if(jQuery.inArray(patches[activeNode][i].split('_')[0], patchesNames) !== -1) {
                    }
                    else {
                        patchesNames.push(patches[activeNode][i].split('_')[0]);
                    }
                }
        
                for (i = 0; i < patchesNames.length; i++) {
                    //console.log(Flats[bytID]);
                    aTitle = patchesNames[i];
                    //console.log(patchesNames[i]);
                    aItem = (Flats[bytID][(patchesNames[i])].activeItem);
                    patchName = aTitle+'_'+aItem;
                    showMedia(patchName);        
                }
            } 
            else {
                console.log('nemôžem aktualizovať patche ... ');
    
            }
    
        }

}

function attributesReady() {
        var hts = $('.hts');
        
        var numItems = hts.length;

        if (numItems > 0) {
            counter = numItems;
        activeItem = pano.getCurrentNode();
        
        //console.log(activeItem);
        var keys = Object.keys(Hotspots[activeItem]);
        //console.log(keys);
    
        for (i = 0; i < numItems; i++) {    
            counter--
    
            
                hts.eq(i).attr('data-target',keys[counter]); 
        }
        $('.hts-attributes').on('click touchstart', function() {
            targetAttr = $(this).attr('data-target');
            pano.setVariableValue('attributes_side', !pano.getVariableValue('attributes_side'));
            UpdateCurrentPatches();
        });
        generateCart(Flats);
    
        }

        else {
        }
        //console.log('Počet hotspotov je '+numItems);
        
}

function generateCart(Flats) {
    $('.attributes-group').empty();
    var appScrollcontent = $('.app-cart > .attributes-group');
    var $cartHeight = 0;
    function ElementHeight (element, cartHeight) {
        cartHeight = $(element).height();
    //console.log(cartHeight);
        appScrollcontent.css('max-height',(cartHeight - 374));
    }

    $( window ).resize(function() {
    ElementHeight('window', $cartHeight);
    //console.log('spustil som prerátanie výšky okna');
    //console.log($cartHeight);
    });
    // Otvárani a zatváranie Košíka
    pano.addListener('varchanged_app_cart', function() { 
        switch (pano.getVariableValue('app_cart')) {
            case true: 
                ElementHeight('window', $cartHeight);
                variableFalse(['settings','shortcuts']);
                ShowElement(['.app-cart']);
                addClass(['.adv-wrapper'],'hidden');
                addClass(['.hlp-layer'],'active');
                variableFalse(['lang_menu']);
            break;
            case false: 
                HideElement(['.app-cart']);
                removeClass(['.adv-wrapper'],'hidden');
                removeClass(['.hlp-layer'],'active');
            break;
        }
    });

    // Zatvorenie košíka po kliku na HLP-LAYER vrstvu
    var hlpLayer = $('.hlp-layer');
    hlpLayer.on('click tap', function() {
        variableFalse(['app_cart']);
    });

    // Zatvorenie košíka ak je premenná BLUR true
    pano.addListener('varchanged_blurred', function() {
        switch (pano.getVariableValue('blurred')) {
            case true:  
                hlpLayer.removeClass('active');
                variableFalse(['app_cart']);
            break;
        }
    });

    addItemToCart(Flats);
    UpdateTotalPrice();
}

var CartDescLimit = 35;

function addItemToCart(Flats) {
    var attrGroup = $('.attributes-group');
    attrGroup.empty();
    lang = pano.getVariableValue('lang');
    bytID = UserData.copyright; // zistenie ID bytu

    

    $.each(Flats[bytID], function(index, item) {
        activeItem = item.activeItem;

        function shortText(item) {
            //console.log(item.descriptions[lang][activeItem]);
            txt = item.descriptions[lang][activeItem];
            if (txt.length > CartDescLimit) {
                
                txt = txt.substring(0,CartDescLimit) + ' ...';
                //console.log(txt);
                return txt;
            }

            else {
                return item.descriptions[lang][activeItem];
            }
        }

        if (selectByPremium == true) {
           // console.log('target je :'+item.names[lang][activeItem]);
            if (Flats[bytID][index].premium[activeItem] ==  'premium' ) {
                var loopedElement = 
                '<div class="attributes-item opened">'+
                    '<div>'+
                        '<div class="att-title premium" id='+index+'>'+item.groupName[lang][0]+'<span class="closed"></span></div>'+
                            '<div class="values-group">'+
                                '<div class="value">'+
                                    '<div class="left">'+
                                        '<div class="thumb '+ item.thumbnails[activeItem] +'"></div>'+
                                        '<div class="parameters">'+
                                            '<div class="param-title">'+item.names[lang][activeItem]+'</div>'+
                                            
                                            '<div class="param-description">'+shortText(item)+'</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="right">'+
                                        '<div class="param-price">'+item.prices[activeItem]+'</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    '</div>';
                attrGroup.append(loopedElement);   
            }
    
            else {
                var loopedElement = 
                '<div class="attributes-item opened">'+
                    '<div>'+
                        '<div class="att-title" id='+index+'>'+item.groupName[lang][0]+'<span class="closed"></span></div>'+
                            '<div class="values-group">'+
                                '<div class="value">'+
                                    '<div class="left">'+
                                        '<div class="thumb '+ item.thumbnails[activeItem] +'"></div>'+
                                        '<div class="parameters">'+
                                            '<div class="param-title">'+item.names[lang][activeItem]+'</div>'+
                                            '<div class="param-description">'+shortText(item)+'</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="right">'+
                                        '<div class="param-price">'+item.prices[activeItem]+'</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    '</div>';
                attrGroup.append(loopedElement);   
            }
        }

        else {
            if ( activeItem == Flats[bytID][index].default ) {
                var loopedElement = 
                '<div class="attributes-item opened">'+
                    '<div>'+
                        '<div class="att-title" id='+index+'>'+item.groupName[lang][0]+'<span class="closed"></span></div>'+
                            '<div class="values-group">'+
                                '<div class="value">'+
                                    '<div class="left">'+
                                        '<div class="thumb '+ item.thumbnails[activeItem] +'"></div>'+
                                        '<div class="parameters">'+
                                            '<div class="param-title">'+item.names[lang][activeItem]+'</div>'+
                                            '<div class="param-description">'+shortText(item)+'</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="right">'+
                                        '<div class="param-price">'+item.prices[activeItem]+'</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    '</div>';
                attrGroup.append(loopedElement); 
            }
    
            else {
                var loopedElement = 
                '<div class="attributes-item opened">'+
                    '<div>'+
                        '<div class="att-title premium" id='+index+'>'+item.groupName[lang][0]+'<span class="closed"></span></div>'+
                            '<div class="values-group">'+
                                '<div class="value">'+
                                    '<div class="left">'+
                                        '<div class="thumb '+ item.thumbnails[activeItem] +'"></div>'+
                                        '<div class="parameters">'+
                                            '<div class="param-title">'+item.names[lang][activeItem]+'</div>'+
                                            '<div class="param-description">'+shortText(item)+'</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="right">'+
                                        '<div class="param-price">'+item.prices[activeItem]+'</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'
                    '</div>';
                attrGroup.append(loopedElement);  
            }
        }
    });

    

    // Toggle Sekcia    
    var attTitle = $('.att-title');
    // Rozbaliť/skryť div values-group a zmena ikony + a - vedľa názvu skupiny atribútov

    attTitle.on('click tap', function(e) {
        $(this).next('.values-group').slideToggle(250);
        $(this).find('span').toggleClass('opened');
     });
}

function updateItemInCart(targetAtribute, Flats) {
    lang = pano.getVariableValue('lang');
    activeItem = Flats[bytID][targetAttr].activeItem;


    function shortText(targetAttr) {
        txt = Flats[bytID][targetAttr].descriptions[lang][activeItem];
        if (txt.length > CartDescLimit) {
            
            txt = txt.substring(0,CartDescLimit) + ' ...';
            console.log(txt);
            return txt;
        }

        else {
            return txt;
        }
    }

    $('#'+targetAtribute).next('.values-group').find('.param-title').empty().append(Flats[bytID][targetAttr].names[lang][activeItem]);
    $('#'+targetAtribute).next('.values-group').find('.thumb').removeAttr('class').addClass('thumb').addClass(Flats[bytID][targetAttr].thumbnails[activeItem]);
    $('#'+targetAtribute).next('.values-group').find('.param-description').empty().append(shortText(targetAttr));
    $('#'+targetAtribute).next('.values-group').find('.param-price').empty().append(Flats[bytID][targetAttr].prices[activeItem]);

    if (selectByPremium == true) {
        if (Flats[bytID][targetAttr].premium[activeItem] ==  'premium' ) {
            $('#'+targetAtribute).addClass('premium');    
        }

        else {
            $('#'+targetAtribute).removeClass('premium');    
        }
    }

    else {
        if ( activeItem == Flats[bytID][targetAttr].default ) {
            $('#'+targetAtribute).removeClass('premium'); 
        }

        else {
            $('#'+targetAtribute).addClass('premium');  
        }
    }

    var GlobalChange = Flats[bytID][targetAttr].globalChange;

    if (GlobalChange !== '') {
        $.each(Flats[bytID], function(index, item) {
            if (Flats[bytID][index].globalChange == GlobalChange && Flats[bytID][targetAttr] !== Flats[bytID][index]  ) {
                $('#'+index).next('.values-group').find('.param-title').empty().append(Flats[bytID][index].names[lang][activeItem]);
                $('#'+index).next('.values-group').find('.thumb').removeAttr('class').addClass('thumb').addClass(Flats[bytID][index].thumbnails[activeItem]);
                $('#'+index).next('.values-group').find('.param-description').empty().append(shortText(index));
                $('#'+index).next('.values-group').find('.param-price').empty().append(Flats[bytID][index].prices[activeItem]);

            }
        });       
        
    }


    
}

// Prepočet celkovej ceny košíka (Cena spolu)
function UpdateTotalPrice() {
    var sum = null;
    $(".param-price").each(function() {
        sum += parseInt(this.innerHTML);
    });

    // konvertovanie ceny na lokálny formát
    sum = parseInt(sum).toLocaleString();
    $('.total-price').empty().append(sum);
}