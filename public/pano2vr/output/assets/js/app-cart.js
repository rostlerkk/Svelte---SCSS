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
$('.header-cart').on('click tap', function() {

});

pano.addListener('varchanged_app_cart', function() { 
    console.group('košík sa zmenil');
    switch (pano.getVariableValue('app_cart')) {
        case true: 
            ElementHeight('window', $cartHeight);
            variableFalse(['settings']);
            pano.setVariableValue('shortcuts', false);
            ShowElement(['.app-cart']);
            addClass(['.adv-wrapper'],'hidden');
            addClass(['.hlp-layer'],'active');
            variableFalse(['lang_menu']);
            $('.tooltip').removeClass('active');
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

// Zistenie počtu izieb v prehliadke
window.pocetIzieb = 0;
function countOfRooms(element,target) {
    countOf = 0;
    pocet = 0;
    for ( pocet in element) {
        if (element.hasOwnProperty(pocet)) {
            countOf++;
        }
    }
    window.pocetIzieb = countOf;
    //console.log(window.pocetIzieb);
}

// Zistenie počtu Atribútov v byte
window.pocetAtributov = 0;
function countOfVariables(element,target) {
    countOf = 0;
    pocet = 0;

    $.each( Flat.byt01.Rooms, function(index, item) {
        $.each( item.Groups, function(index, item) {
            pocet++;
        });
    });
    window.pocetAtributov = pocet;
    //console.log(window.pocetAtributov);
}

//Nájdenie názvov všetkých atribútov pre konkrétny byt
var AllVariables = [];
function FindAllVariables() {
    $.each( Flat.byt01.Rooms, function(index, item) {
        $.each( item.Groups, function(index, item) {
            AllVariables.push(index);  
        });        
    });
    //console.log(AllVariables);
}

var FirstTime = 1;
// Nastavenie zobrazenia modrej fajky pri názve Skupiny Atribútov
var selectByPremium = false; // false - riadi sa podľa default hodnoty, true - riadi sa poďla premium označenia hodnoty atribútu
var text = '';


// Vypísanie všetkých atribútov pre daný byt s aktuálnymi hodnotami do košíka

function VypisAtributdoKosika(BytID){
    var attributesGroup = $('.attributes-group');
    var valuesGroup = $('.values-group');
    // premazanie kosika
    //console.log('Id aktuálneho bytu je :'+BytID);
    attributesGroup.empty();
    // konkrétny byt v prehliadke
    $.each(Flat[BytID].Rooms, function(index, item) {
        // každý atribút v konkrétom byte
        $.each( item.Groups, function(index, item) {

            // Ak sa má zobraziť modrá fajka podľa hodnoty atribútu "PREMIUM"
            if ( selectByPremium == true) {
                if ((item.premium[((pano.getVariableValue(index))-1)]) ==  'yes' ) {
                    var loopedElement = 
                    '<div class="attributes-item opened">'+
                        '<div>'+
                            '<div class="att-title premium" id='+index+'>'+item.heading+'<span class="closed"></span></div>'+
                                '<div class="values-group">'+
                                    '<div class="value">'+
                                        '<div class="left">'+
                                            '<div class="thumb '+ item.img[((pano.getVariableValue(index))-1)] +'"></div>'+
                                            '<div class="parameters">'+
                                                '<div class="param-title">'+ item.title[((pano.getVariableValue(index))-1)] +'</div>'+
                                                '<div class="param-description">'+ item.subtitle +'</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="right">'+
                                            '<div class="param-price">'+ item.price[((pano.getVariableValue(index))-1)] +'</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                        '</div>';
                }
                else {
                    var loopedElement = 
                    '<div class="attributes-item opened">'+
                        '<div>'+
                            '<div class="att-title" id='+index+'>'+item.heading+'<span class="closed"></span></div>'+
                                '<div class="values-group">'+
                                    '<div class="value">'+
                                        '<div class="left">'+
                                            '<div class="thumb '+ item.img[((pano.getVariableValue(index))-1)] +'"></div>'+
                                            '<div class="parameters">'+
                                                '<div class="param-title">'+ item.title[((pano.getVariableValue(index))-1)] +'</div>'+
                                                '<div class="param-description">'+ item.subtitle +'</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="right">'+
                                            '<div class="param-price">'+ item.price[((pano.getVariableValue(index))-1)] +'</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                        '</div>';
                };
            }
            
            // Ak sa má zobraziť modrá fajka podľa DEFAULT hodnoty atribútu
            else {
                if ( ((pano.getVariableValue(index))) ==  item.default ) {
                    var loopedElement = 
                    '<div class="attributes-item opened">'+
                        '<div>'+
                            '<div class="att-title" id='+index+'>'+item.heading+'<span class="closed"></span></div>'+
                                '<div class="values-group">'+
                                    '<div class="value">'+
                                        '<div class="left">'+
                                            '<div class="thumb '+ item.img[((pano.getVariableValue(index))-1)] +'"></div>'+
                                            '<div class="parameters">'+
                                                '<div class="param-title">'+ item.title[((pano.getVariableValue(index))-1)] +'</div>'+
                                                '<div class="param-description">'+ item.subtitle +'</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="right">'+
                                            '<div class="param-price">'+ item.price[((pano.getVariableValue(index))-1)] +'</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                        '</div>';
                }

                else {
                    var loopedElement = 
                    '<div class="attributes-item opened">'+
                        '<div>'+
                            '<div class="att-title premium" id='+index+'>'+item.heading+'<span class="closed"></span></div>'+
                                '<div class="values-group">'+
                                    '<div class="value">'+
                                        '<div class="left">'+
                                            '<div class="thumb '+ item.img[((pano.getVariableValue(index))-1)] +'"></div>'+
                                            '<div class="parameters">'+
                                                '<div class="param-title">'+ item.title[((pano.getVariableValue(index))-1)] +'</div>'+
                                                '<div class="param-description">'+ item.subtitle +'</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="right">'+
                                            '<div class="param-price">'+ item.price[((pano.getVariableValue(index))-1)] +'</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'
                        '</div>';
                };
            }
            // pridá atribút ako HTML element do premennej text
            text += loopedElement;

            // pridaj HTML kód do divu attributes-group
            attributesGroup.append(loopedElement); 

            // Všetký okrem prvého divu s classou values-group pridaj classu hidden - zbaľ skupinu
            valuesGroup.each(function(index) {
                /*
                if ( index === 0) {
                    $(this).removeClass('hidden');
                    }
                    else {
                    $(this).addClass('hidden');
                    }
                */
            });
        });
    });

    // Spočítavanie hodnôt všetkých elementov v košíku
    var sum = null;
    var paramPrice = $(".param-price");
    var totalPrice = $('.total-price');
    paramPrice.each(function() {
        sum += parseInt(this.innerHTML);
    });

    // konvertovanie ceny na lokálny formát
    sum = parseInt(sum).toLocaleString();
    totalPrice.text(sum);

    // Toggle Sekcia    
    var attTitle = $('.att-title');
    // Rozbaliť/skryť div values-group a zmena ikony + a - vedľa názvu skupiny atribútov
    attTitle.on('click tap', function(e) {
       $(this).next('.values-group').slideToggle(250);
       $(this).find('span').toggleClass('opened');
    });
}

// Aktualizácia hodnoty atribútu v košíku
function UpdateValueInCart(attributeName, BytID) {
    var variableName = attributeName;
    var variableID = '#'+attributeName;
    $.each( Flat[BytID].Rooms, function(index, item) {
        $.each( item.Groups, function(index, item) {
            if (index == variableName) {
                $(variableID).next('.values-group').find('.thumb').removeAttr('class').addClass('thumb').addClass(item.img[((pano.getVariableValue(index))-1)]);
                $(variableID).next('.values-group').find('.param-title').empty().append(item.title[((pano.getVariableValue(index))-1)]);
                $(variableID).next('.values-group').find('.param-description').empty().append(item.subtitle);
                $(variableID).next('.values-group').find('.param-price').empty().append(item.price[((pano.getVariableValue(index))-1)]);

                if (selectByPremium == true) {
                    if ((item.premium[((pano.getVariableValue(index))-1)]) ==  'yes' ) {
                        $(variableID).addClass('premium');    
                        return false;
                    }
    
                    else {
                        $(variableID).removeClass('premium');    
                    }
                }
    
                else {
                    if ( ((pano.getVariableValue(index))) ==  item.default ) {
                        $(variableID).removeClass('premium'); 
                        return false;
                    }
    
                    else {
                        $(variableID).addClass('premium');  
                    }
                }
            }
            //return false;
        });        
    });
    UpdateTotalPrice();
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
var BytID = '0307'; // Defaultná hodnota prázdna, nájde si vždy po zmene panorámy
var UserData = [];
var FirstTime = 0;

function GenerateCart(BytID, UserData) {
    if (UserData.copyright != 'vyberovnik') {
        VypisAtributdoKosika(BytID);
        //console.log('Vypísal som nový košík');
        var NewBytID = UserData.copyright;
    }

    

      /*  if (NewBytID != BytID) {
            console.log('Nové ID bytu je : '+NewBytID+', staré ID bytu je :'+BytID);
            VypisAtributdoKosika(BytID);
            BytID = NewBytID;
            console.log('Nové ID bytu je : '+BytID);
            
        }*/
    
}
var headerCart = $('.header-cart');
pano.on('changenode', function() {
    // premaž pole UserData
    UserData = [];
    //Načítaj aktuálne UserData
    UserData = (pano.getNodeUserdata(pano.getCurrentNode()));
    //console.log(UserData);

    BytID = UserData.copyright;
    //console.log('Aktuálny BYT ID : '+BytID);
    GenerateCart(BytID, UserData);

    if (UserData.copyright == 'vyberovnik') {
        headerCart.css('display', 'none');
    }
    else {
        headerCart.removeAttr('style');
    }
});

var cartButton = $('#cart-full');
cartButton.on('click tap', function() {
   pano.setVariableValue('cart_full', true);
});
