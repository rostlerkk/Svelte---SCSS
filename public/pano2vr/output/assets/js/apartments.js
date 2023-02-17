var byt = $('.byt');
var LastVisited = '';
var CurrentByt = '';
var UserData = [];
var TextLastVisited = '<div class="last-visited">Naposledy<br>zobrazené</div>';
defaultOrientation = 'node13';
var Vyberovnik = 'vyberovnik';

function LastVisitedFlat () {

    // var byt = $('.byt');

    hlpL = (pano.getNodeUserdata(pano.getLastVisitedNode())).copyright;
    
    if ((hlpL != 'vyberovnik') ) {
        LastVisited = hlpL;
       // console.log('Zmeni som LastVisited na : '+LastVisited);
    }

    else {
        
    }

    //console.log(hlpL+ ' | ' +LastVisited);
    byt.find('.last-visited').remove();
        $('#'+LastVisited).append(TextLastVisited);
    //console.log('Po spustení funkcie LastVisitedFlat je premenná hlpL :'+hlpL);
    


    //console.log('Premenná LastVisited : '+LastVisited);
    //ak je iný
    /*
    if ( LastVisited != hlpL) {
        
        
    }

    else {
        if (hlpL == Vyberovnik) {
            byt.find('.last-visited').remove();
        $('#'+LastVisited).append(TextLastVisited);
        }

        else {
            LastVisited = hlpL;
            byt.find('.last-visited').remove();
            $('#'+LastVisited).append(TextLastVisited);
        }
    }*/
}

function FindActivePano() {
    activePano = pano.getCurrentNode();

    byt.removeClass('selected');
    if ( (byt01.indexOf(activePano)) != -1   ) {
        $('#0307').addClass('selected');
    }
    else {
    }

    if ( (byt02.indexOf(activePano)) != -1   ) {
        //console.log('Áno');
        $('#0306').addClass('selected');
    }
    else {
    }

    if ( (byt03.indexOf(activePano)) != -1   ) {
       // console.log('Áno');
        $('#0305').addClass('selected');
    }
    else {
    }


   // LastVisitedFlat(UserData, LastVisited, byt);
    console.log(activePano);
}

function shouldOpenPano(nodeID) {
    if (pano.getCurrentNode() != nodeID) {
        pano.openNext('{'+ nodeID +'}');
    }
    else {
        return;
    }
}

var firstTime = 0;
var firstTimeModel = 0;
activePano = '';
var byt01 = [];
var byt02 = [];
var byt03 = [];
var PanoWithTagOrientation = [];

var filterDivCroll = null;
var filterDiv = null;
var LastVisitedPosition = 0;
var tmpVar = null;

var JumptoLastVisitedFlat = $('.last-visited-button');
var FilterCatResult = $('.filter-cat-results');

function checkFilterHeight (LastVisitedPosition,tmpVar) {
    filterDivScroll = $('.filter-cat-results').prop('scrollHeight');
    filterDiv = $('.filter-cat-results').height();

    LastVisitedPosition = $('.last-visited').parent('div').offset();
    tmpVar = $('.filter-cat-results').offset();
    finalPosition = (LastVisitedPosition.top - tmpVar.top);

    if ((finalPosition < 0) ||(finalPosition > filterDiv)) {
        JumptoLastVisitedFlat.addClass('visible');
    }

    else {
        JumptoLastVisitedFlat.removeClass('visible');

    }
}

JumptoLastVisitedFlat.on('click touchstart', function ScrollToElement() {
    var container = $('.filter-cat-results');
    var scrollTo = $('.last-visited').parent('div');

    var position = scrollTo.offset().top 
            - container.offset().top 
            + container.scrollTop();
  
    container.animate({
       scrollTop : position
    }, 200);
});

FilterCatResult.on('scroll', function() {
    checkFilterHeight(LastVisitedPosition,tmpVar);
});

function openDefaultPano() {
    pano.openNext("{node13}", "");
}

pano.addListener('varchanged_footer_apartments', function footerApartments() {
    switch (pano.getVariableValue('footer_apartments')) {
        case true: 
        $('.tooltip').removeClass('active');
        variableFalse(['app_cart']);
        addClass(['.apartments-side','.item.apartment'], 'active'); 
        ShowElement(['.apartments-side']);
        
        if ( firstTime == 0) {
            $('select').niceSelect();
            byt01 = pano.getNodesWithTag('0307');
            byt02 = pano.getNodesWithTag('0306');
            byt03 = pano.getNodesWithTag('0305');
            firstTime++;
            $('.tooltip.model3D').addClass('active');
            setTimeout(function () { 
                $('.tooltip.model3D').removeClass('active');
            }, 8000);
        }
        variableFalse(['footer_floorplan','footer_map','footer_layers','attributes_side','attributes_hotspot','shortcuts']);
        FindActivePano();

        //pano.openNext('{node13}');
        
        break;
        case false:
            HideElement(['.apartments-side']);    
            removeClass(['.item.apartment'], 'active'); 
        break; 
    }

    //checkFilterHeight(LastVisitedPosition, tmpVar);
});

var filterActive;
var AllFlat = [];

// Naplnenie poľa so všetkými bytmi
$(".byt").each(function(){
    AllFlat.push($(this).attr('id'));
});

// vypnutie farieb všetkých polygon hotspotov
function AllFlatColorChange() {
    jQuery.each( AllFlat, function( i, val ) {
       // console.log(val);
        pano.changePolyHotspotColor(val, 0x000000, 0, 0x000000, 0);
    });
}

// zapnutie farieb všetkých zvolených hotspotov
function SelectedFlatColorChange() {
    Pole = [];
    $(".byt.active").each(function(){
        Pole.push($(this).attr('id'));
    });
    jQuery.each( Pole, function( i, val ) {
        pano.changePolyHotspotColor(val, 0xfffff, 0.2, 0x5956e9, 1);
    });
}

var Pole = [];

function filterCategory(cat1, cat2, cat3) {
        
    // reset results list
    $('.filter-cat-results .f-cat').removeClass('active');
    
    // the filtering in action for all criteria
    var selector = ".filtering .f-cat";
    if (cat1 !== 'cat-all') {
         selector = '[data-cat=' + cat1 + "]";
    }
    if (cat2 !== 'cat-all') {
        selector = selector + '[data-cat2=' + cat2 + "]";
    }
    if (cat3 !== 'cat-all') {
        selector = selector + '[data-cat3=' + cat3 + "]";
    }

    if (cat3 == 'cat-south') {
        pano.openNext('{node14}');
    }

    if (cat3 == 'cat-north') {
        pano.openNext('{node13}');
    }

    if (cat3 == 'cat-west') {
        pano.openNext('{node16}');
    }

    if (cat3 == 'cat-east') {
        pano.openNext('{node15}');
    }
    
    // show all results
    $(selector).addClass('active');

    // reset active filter
    filterActive = cat1;
}

// start by showing all items
$('.filtering .f-cat').addClass('active');

// call the filtering function when selects are changed
$('.filtering select').change(function() {
    
    filterCategory($('.filtering select.cat1').val(), $('.filtering select.cat2').val(), $('.filtering select.cat3').val());
    
    // vypnutie farieb všetkých polygon hotspotov
    AllFlatColorChange();

    // zapnutie farieb všetkých zvolených hotspotov
    SelectedFlatColorChange();

   // LastVisitedFlat(UserData, LastVisited, byt);

});

// Prvé nastavenie aktívneho bytu
$(window).on('load', function(){ 
    AllFlatColorChange();
    SelectedFlatColorChange();
});

pano.on('configloaded', function() {
    // Nájdi panorámy, ktoré obsahujú TAG orientation
    PanoWithTagOrientation = pano.getNodesWithTag('orientacia');
    //LastVisited = (pano.getNodeUserdata(pano.getCurrentNode())).copyright;
   // LastVisited = pano.getNodeUserdata(pano.getLastVisitedNode()).copyright;
    //console.log('Premenná LastVisited bola prázdna, doplnil som : '+LastVisited);
    //UserData = (pano.getNodeUserdata(pano.getCurrentNode()));
    //window.LastVisited = UserData.copyright;
    //console.log('Po načítaní configu je premenná LastVisited : '+window.LastVisited);
    //$('#'+LastVisited).append(TextLastVisited);
});

$('.byt').on('click tap', function() {
    $('.byt').removeClass('selected');
    $(this).addClass('selected');
});




$('.byt > .tour').on('click touchstart', function() {
    variableFalse(['footer_apartments']);
});


$('#0307').on('click tap', function(e) {
    if($(e.target).hasClass('tour')) return;
    pano.moveTo(-30.76,18.56,60,3000);
    
});
$('#0307 > .tour').on('click touchstart', function() {
    if (pano.getCurrentNode() != 'node1') {
        pano.openNext('{node1}', "");
    }
    else {
        return;
    }
    
});

$('#0306').on('click tap', function(e) {
    if($(e.target).hasClass('tour')) return;
    pano.moveTo(-30.73,14.57,60,3000);
    
});

$('#0306 > .tour').on('click touchstart', function() {
    switch (pano.getVariableValue('attribute_C')) {    
        case 1: 
            shouldOpenPano('node2', "");
        break;
        case 2: 
            shouldOpenPano('node8', "");
        break;
        case 3: 
            shouldOpenPano('node4', "");
        break;
    }
});

$('#0305').on('click tap', function(e) {
    if($(e.target).hasClass('tour')) return;
    pano.moveTo(18.96,-13.5,60,3000);
});

$('#0305 > .tour').on('click touchstart', function() {
    switch (pano.getVariableValue('attribute_G')) {    
        case 1: 
            shouldOpenPano('node7', "");
        break;
        case 2:
            shouldOpenPano('node5', "");                
        break;
        case 3: 
            shouldOpenPano('node6', "");
        break;
    }
});

$('.rgt-arrow').on('click tap', function() {   
    if (firstTime < 1)  {
        $('select').niceSelect();
    }

    $('select').niceSelect();
    switch (pano.getCurrentNode()) {
        case 'node13': 
           // pano.openNext('{node16}');  
           $('.option[data-value="cat-west"]').trigger('click');
        break;
        case 'node16': 
          //  pano.openNext('{node14}');  
           $('.option[data-value="cat-south"]').trigger('click');
        break;        
        case 'node14': 
           // pano.openNext('{node15}');  
           $('.option[data-value="cat-east"]').trigger('click');
        break;                
        case 'node15': 
            //pano.openNext('{node13}');  
            $('.option[data-value="cat-north"]').trigger('click');
        break;                
    }
});

$('.lft-arrow').on('click tap', function() {
    if (firstTime < 1)  {
        $('select').niceSelect();
    }
    
    
    switch (pano.getCurrentNode()) {
        case 'node13': 
            //pano.openNext('{node15}'); 
            $('.option[data-value="cat-east"]').trigger('click'); 
        break;
        case 'node16': 
            //pano.openNext('{node13}'); 
            $('.option[data-value="cat-north"]').trigger('click'); 
        break;        
        case 'node14': 
            //pano.openNext('{node16}');  
            $('.option[data-value="cat-west"]').trigger('click');
        break;                
        case 'node15': 
            //pano.openNext('{node14}');  
            $('.option[data-value="cat-south"]').trigger('click');
        break;                
    }
});



// Zisťovanie posledne otvorenej svetovej strany
pano.on('changenode', function() {
    // kontrola či má aktuána panoráma TAG orientation
    LastVisitedFlat(LastVisited);

    if ( jQuery.inArray(pano.getCurrentNode(), PanoWithTagOrientation) !== -1)  {
        addClass(['.item.layers', '.item.floorplan', '.header-cart', '.item.apartments','.shortcuts-icon'], 'hidden');
        HideElement(['.shortcuts']);
    }

    else {
        removeClass(['.item.layers', '.item.floorplan', '.header-cart', '.item.apartments', '.shortcuts-icon'], 'hidden');
        ShowElement(['.shortcuts']);
    }
    $('.lft-arrow').addClass('hidden');
    $('.rgt-arrow').addClass('hidden');
    $('.map-side').removeClass('apartments');

    switch (pano.getCurrentNode()) {
        case 'node13':  // sever
            $('.map-side').addClass('apartments');       
        break;
        case 'node14': // juh
            $('.map-side').addClass('apartments');
        break;
        case 'node15': // východ
            $('.map-side').addClass('apartments');
        break;
        case 'node16': // západ
            $('.map-side').addClass('apartments');
        break;
    }
    
    if  (pano.getCurrentNode() != defaultOrientation) {
        switch (pano.getCurrentNode()) {
            case 'node13':  // sever
                defaultOrientation = 'node13';
                $('.map-side').addClass('apartments');
            break;
            case 'node14': // juh
                defaultOrientation = 'node14';
                $('.map-side').addClass('apartments');
            break;
            case 'node15': // východ
                defaultOrientation = 'node15';
                $('.map-side').addClass('apartments');
            break;
            case 'node16': // západ
                defaultOrientation = 'node16';
                $('.map-side').addClass('apartments');
            break;
        }

    }

    else {
    }

    AllFlatColorChange();
    SelectedFlatColorChange();

    // Skrytie ikon ak sa jedná o panorámy : 
    switch (pano.getCurrentNode()) {
        case 'node13': 
        case 'node14':
        case 'node15':            
        case 'node16':
            $('.lft-arrow').removeClass('hidden');
            $('.rgt-arrow').removeClass('hidden');
            HideElement(['.shortcuts']);
        break;
    }


});

$('#0307').mouseover(function() {
    pano.showOnePolyHotspot('0307');
});

$('#0307').mouseleave(function() {
    pano.hideOnePolyHotspot('0307');
});

$('#0306').mouseover(function() {
    pano.showOnePolyHotspot('0306');
});

$('#0306').mouseleave(function() {
    pano.hideOnePolyHotspot('0306');
});

$('#0305').mouseover(function() {
    pano.showOnePolyHotspot('0305');
});

$('#0305').mouseleave(function() {
    pano.hideOnePolyHotspot('0305');
});

$('#0304').mouseover(function() {
    pano.showOnePolyHotspot('0304');
});

$('#0304').mouseleave(function() {
    pano.hideOnePolyHotspot('0304');
});

$('#0303').mouseover(function() {
    pano.showOnePolyHotspot('0303');
});

$('#0303').mouseleave(function() {
    pano.hideOnePolyHotspot('0303');
});

$('#0302').mouseover(function() {
    pano.showOnePolyHotspot('0302');
});

$('#0302').mouseleave(function() {
    pano.hideOnePolyHotspot('0302');
});

$('#0301').mouseover(function() {
    pano.showOnePolyHotspot('0301');
});

$('#0301').mouseleave(function() {
    pano.hideOnePolyHotspot('0301');
});

var hlpIntro = 1;
//console.log(hlpIntro);

var checked = false;

$('.intro-help > .button').on('click tap', function(){
    $('.intro-help').addClass('hidden');
});


var activeApartments_side = false;


$('#3dObject').on('load', function(){
    console.log('iframe načítný');
});



pano.addListener('varchanged_3D_model', function model3D() {
    switch (pano.getVariableValue('3D_model')) {
        case true: 
        $('.tooltip').removeClass('active');
        $('#3DObject').attr('src', 'object2vr/output/loop.html');
        $('.model-blur').addClass('active');

        
        // Kontrola, či sa ná zobraziť INTRO SCREEN
        if ( $('input[name="intro-hlp"]:checked').length > 0 ) {
            checked = true;

            if (checked == false && pano.getVariableValue('3D_model') == true)  {
                $('.intro-help').removeClass('hidden');
            }
            hlpIntro++;
        }

        if (checked == false && pano.getVariableValue('3D_model') == true)  {
            $('.intro-help').removeClass('hidden');
        }
        hlpIntro++;

        // Kontrola, či sa má zobraziť ToolTip
        if ( firstTimeModel == 0) {
            $('.tooltip.vyberovnik').addClass('active');
            setTimeout(function () { 
                $('.tooltip.vyberovnik').removeClass('active');
             }, 8000);
            firstTimeModel++;

            $('.intro-help').removeClass('hidden');
        }


        $('.lft-arrow').addClass('hidden');
        $('.rgt-arrow').addClass('hidden');
            
            if (pano.getVariableValue('footer_apartments') == true) {
                activeApartments_side = true;
            }

            else {
                activeApartments_side = false;
            }
            
            pano.setVariableValue('footer_apartments', false);    

        break;
        case false: 
            $('.model-blur').removeClass('active');
            if (activeApartments_side == true) {
                pano.setVariableValue('footer_apartments', true);
            }
            $('.intro-help').addClass('hidden');
            $('.lft-arrow').removeClass('hidden');
            $('.rgt-arrow').removeClass('hidden');
            $('.tooltip.model').removeClass('active');
        break;
    }

});

