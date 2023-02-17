var LastVisitedOrientation = 'node31';
var LastvisitedPano = 'node30';
var LastUsedOrientation = 'node31';
var textLastVisitedSK = 'Naposledy<span>zobrazené</span>';
var textLastVisitedCZ = 'Naposled<span>prohlížené</span>';
var textLastVisitedEN = 'Last<span>visited</span>';
var podlahovaPlochaSK = 'Oodlahová plocha';
var podlahovaPlochaCZ = 'Plocha podahy';
var podlahovaPlochaEN = 'Floor size';
var poschodieSK = 'Poschodie';
var poschodieCZ = 'Poschodí';
var poschodieEN = 'Floor';
var izbySK = 'Izby';
var izbyCZ = 'Izby';
var izbyEN = 'Rooms';
var orientaciaSK = 'Orientácia';
var orientaciaCZ = 'Orientace';
var orientaciaEN = 'Orientation';
var orientaciaINT = 'Orientation';
var orSeverSK = 'sever';
var orSeverCZ = 'sever';
var orSeverEN = 'north';
var orSeverINT = 'north';
var orJuhSK = 'juh';
var orJuhCZ = 'jih';
var orJuhEN = 'south';
var orJuhINT = 'south';
var orVychodSK = 'východ';
var orVychodCZ = 'východ';
var orVychodEN = 'east';
var orVychodINT = 'east';
var orZapadSK = 'západ';
var orZapadCZ = 'západ';
var orZapadEN = 'west';
var orZapadINT = 'west';
var lastVisitedSK = 'Naposledy zobrazené';
var lastVisitedCZ = 'Naposled zobrazené';
var lastvisitedEN = 'Last visited';
var AllFlat = [];
var hlpIntro = 1;
var checked = false;
var firstTimeModel = 0;

var JumptoLastVisitedFlat = $('.last-visited-button');
var FilterCatResult = $('.apartments-wrapper');


function filterCategory(cat1, cat2, cat3) {
    checkFilterHeight();
    // reset results list
    $('.filter-cat-results .f-cat').removeClass('active');
    
    // the filtering in action for all criteria
    var selector = ".filter-cat-results .f-cat";
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
        pano.openNext('{node32}');
    }

    if (cat3 == 'cat-north') {
        pano.openNext('{node30}');
    }

    if (cat3 == 'cat-west') {
        pano.openNext('{node31}');
    }

    if (cat3 == 'cat-east') {
        pano.openNext('{node33}');
    }
    
    // show all results
    $(selector).addClass('active');

    // reset active filter
    filterActive = cat1;
}

$('.filter-cat-results .f-cat').addClass('active');

// call the filtering function when selects are changed
$('.filtering select').change(function() {
    filterCategory($('.filtering select.cat1').val(), $('.filtering select.cat2').val(), $('.filtering select.cat3').val());
});

function checkOrientationNode() {
    if ( pano.getNodeUserdata(pano.getCurrentNode()).copyright != 'vyberovnik' ) {
        LastVisitedOrientation = pano.getNodeUserdata(pano.getCurrentNode()).copyright;
    }
    else {
        LastvisitedPano = pano.getCurrentNode();
        LastUsedOrientation = pano.getCurrentNode();
    }
}

function selectLastVisited() {
    $('.filter-cat-results > .byt.last-visited').removeClass('last-visited');
    $('.filter-cat-results > .byt > .last-visited-txt').remove();
   //$('#'+LastVisitedOrientation).addClass('last-visited');

    $('.filter-cat-results > .last-visited').append('<div class="last-visited-txt">'+textLastVisitedEN+'</div>');  
    
    // switch (pano.getVariableValue('lang')) {
    //     case 'sk':
    //         $('.filter-cat-results > .last-visited').append('<div class="last-visited-txt">'+textLastVisitedSK+'</div>');      
    //         break;
    //     case 'cz':
    //         $('.filter-cat-results > .last-visited').append('<div class="last-visited-txt">'+textLastVisitedCZ+'</div>');        
    //         break;
    //     case 'en':
    //         $('.filter-cat-results > .last-visited').append('<div class="last-visited-txt">'+textLastVisitedEN+'</div>');        
    //         break;            
    // }
}

// vypnutie farieb všetkých polygon hotspotov
function AllFlatColorChange(notFlat) {
    jQuery.each( AllFlat, function( i, val ) {
       // console.log(val);
       if (val != notFlat) {
        pano.hideOnePolyHotspot(val);
       }
        else {
            pano.showOnePolyHotspot(val);
        }
    });
    pano.setVariableValue('footer_apartments', true);
}

pano.on('configloaded', function changeSelectDesign() {    
    selectLastVisited();
    $('select').niceSelect();
    // Naplnenie poľa so všetkými bytmi
    $(".byt > .byt-wrapper").each(function(){
        AllFlat.push($(this).attr('id'));
    });

    $('.last-visited-button').text(lastVisitedSK);
});

// Zmena jazyka -> preklady
pano.addListener('varchanged_lang', function changeLang() {
    switch (pano.getVariableValue('lang')) {
        case 'sk':
            $('.last-visited-txt').html(textLastVisitedSK);
            $('.byt > .byt-wrapper > .size > span').html(podlahovaPlochaSK);  
            $('.byt > .byt-wrapper > .stock > span').html(poschodieSK);          
            $('.byt > .byt-wrapper > .rooms > span').html(izbySK);
            $('.nice-select.cat1 > span.current').html(poschodieSK);
            $('.nice-select.cat1 > ul > li[data-value="cat-all"]').html(poschodieSK);
            $('.nice-select.cat2 > span.current').html(izbySK);
            $('.nice-select.cat2 > ul > li[data-value="cat-all"]').html(izbySK);
            $('.nice-select.cat3 > span.current').html(orientaciaSK);
            $('.nice-select.cat3 > ul > li[data-value="cat-all"]').html(orientaciaSK);
            $('.nice-select.cat3 > ul > li[data-value="cat-north"]').html(orSeverSK);
            $('.nice-select.cat3 > ul > li[data-value="cat-south"]').html(orJuhSK);
            $('.nice-select.cat3 > ul > li[data-value="cat-east"]').html(orVychodSK);
            $('.nice-select.cat3 > ul > li[data-value="cat-west"]').html(orZapadSK);
            $('.last-visited-button').html(lastVisitedSK);
            break;
        case 'cz':
            $('.last-visited-txt').html(textLastVisitedCZ);        
            $('.byt > .byt-wrapper > .size > span').html(podlahovaPlochaCZ);  
            $('.byt > .byt-wrapper > .stock > span').html(poschodieCZ);          
            $('.byt > .byt-wrapper > .rooms > span').html(izbyCZ); 
            $('.nice-select.cat1 > span.current').html(poschodieCZ);
            $('.nice-select.cat1 > ul > li[data-value="cat-all"]').html(poschodieCZ);
            $('.nice-select.cat2 > span.current').html(izbyCZ);
            $('.nice-select.cat2 > ul > li[data-value="cat-all"]').html(izbyCZ);
            $('.nice-select.cat3 > span.current').html(orientaciaCZ);
            $('.nice-select.cat3 > ul > li[data-value="cat-all"]').html(orientaciaCZ);
            $('.nice-select.cat3 > ul > li[data-value="cat-north"]').html(orSeverCZ);
            $('.nice-select.cat3 > ul > li[data-value="cat-south"]').html(orJuhCZ);
            $('.nice-select.cat3 > ul > li[data-value="cat-east"]').html(orVychodCZ);
            $('.nice-select.cat3 > ul > li[data-value="cat-west"]').html(orZapadCZ);
            $('.last-visited-button').text(lastVisitedCZ);
            break;
        case 'en':
            $('.last-visited-txt').html(textLastVisitedEN); 
            $('.byt > .byt-wrapper > .size > span').html(podlahovaPlochaEN);  
            $('.byt > .byt-wrapper > .stock > span').html(poschodieEN);                 
            $('.byt > .byt-wrapper > .rooms > span').html(izbyEN);
            $('.nice-select.cat1 > span.current').html(poschodieEN);
            $('.nice-select.cat1 > ul > li[data-value="cat-all"]').html(poschodieEN);
            $('.nice-select.cat2 > span.current').html(izbyEN);
            $('.nice-select.cat2 > ul > li[data-value="cat-all"]').html(izbyEN);
            $('.nice-select.cat3 > span.current').html(orientaciaEN);
            $('.nice-select.cat3 > ul > li[data-value="cat-all"]').html(orientaciaEN);
            $('.nice-select.cat3 > ul > li[data-value="cat-north"]').html(orSeverEN);
            $('.nice-select.cat3 > ul > li[data-value="cat-south"]').html(orJuhEN);
            $('.nice-select.cat3 > ul > li[data-value="cat-east"]').html(orVychodEN);
            $('.nice-select.cat3 > ul > li[data-value="cat-west"]').html(orZapadEN);
            $('.last-visited-button').text(lastvisitedEN);
            break;            
    }
});

var shortcuts = $('.shortcuts');
var lastVisitedPano = '';

function checkLastNode() {
    if ( pano.getNodeUserdata(pano.getCurrentNode()).copyright != 'vyberovnik' ) {
        lastVisitedPano = pano.getCurrentNode();
    }
}

pano.on('changenode', function apartmentsChangeNode() {
    checkOrientationNode();
    checkLastNode();
    selectLastVisited();
    // zapínanie a vypínanie ShortCuts ikony
    if ( pano.getNodeUserdata(pano.getCurrentNode()).copyright == 'vyberovnik' ) {
        JumptoLastVisitedFlat.removeClass('visible');
        shortcuts.addClass('hidden');
        $('.footer > .left-side > div').addClass('hidden');
        $('.footer > .left-side > .map, .footer > .left-side > .apartment').removeClass('hidden');
        $('.header-cart').addClass('hidden');   

        $('.mobile-footer').addClass('apartment');
    }

    else {
        $('.header-cart').removeClass('hidden');  
        $('.mobile-footer').removeClass('apartment');
        $('.footer > .left-side > div').removeClass('hidden');
        shortcuts.removeClass('hidden');
        return;
    }
});

// Listen for orientation changes
window.addEventListener("orientationchange", function() {
    // Announce the new orientation number
    if (
        pano.getNodeUserdata(pano.getCurrentNode()).copyright == 'vyberovnik'
    ) {
        if( window.innerHeight > window.innerWidth && window.Width > 550 ) {
            $('#container').append('<div class="apart-blur"> <img src="images/orientation.png"/> </div>');
        }

        else {
            $('.apart-blur').remove();
        }
    }
  }, false );

var tooltipApartFristTime = 0;
var tooltipModelFristTime = 0;

pano.addListener('varchanged_footer_apartments', function footerApartments() {
    $('.viva-start').remove();
    switch (pano.getVariableValue('footer_apartments')) {
        case true: 
        if ($(window).width() >= 768 && tooltipApartFristTime < 1)  {
            $('.tooltip').remove();
            $('#container > style').remove();
            var offset = $('.model-off').offset();
            $('#container').append('<div class="tooltip vyberovnik">'+ tooltip3Dmodel['int'] +'</div>');
            var position = (offset.left) + ( ($('.model-off').outerWidth() - $('.tooltip.vyberovnik').outerWidth()) / 2 );
            var bottom =  $(window).height() - offset.top +8;
            var leftPositionAfter = (($('.tooltip.vyberovnik').outerWidth() / 2 )- 8);

            $('.tooltip.vyberovnik').css({
                'left': position,
                'right': 'auto',
                'bottom' : bottom
            });

            $('#container').append('<style>.tooltip:after{left: ' + leftPositionAfter + 'px; right: auto;}</style>');
            $('.tooltip').delay(timeOut).fadeOut();
        }

        tooltipApartFristTime++
        
            if ( pano.getCurrentNode() != LastUsedOrientation ) {
                pano.openNext("{"+ LastUsedOrientation +"}", "");
            }
            
            variableFalse(['footer_floorplan','footer_map','footer_layers','attributes_side','attributes_hotspot','app_cart', '3D_model']);
            addClass(['.item.apartment'], 'active'); 
            //ShowElement(['.apartments-side']);
        
        break;
        case false:
            HideElement(['.apartments-side']);    
            removeClass(['.item.apartment'], 'active'); 
        break;
    }
});

pano.addListener('varchanged_3D_model', function model3D() {
    console.log('zmena');
    switch (pano.getVariableValue('3D_model')) {
        case true: 
        $('.cloudimage-360').attr('data-amount', '201');
        window.CI360.init();
        
        if ($(window).width() >= 768 && tooltipModelFristTime < 1)  {
            $('.tooltip').remove();
            $('#container > style').remove();
            var offset = $('.model-on').offset();
            $('#container').append('<div class="tooltip vyberovnik">'+ tooltipApartments['int'] +'</div>');
            var position = (offset.left) + ( ($('.model-on').outerWidth() - $('.tooltip.vyberovnik').outerWidth()) / 2 );
            var bottom =  $(window).height() - offset.top +8;
            var leftPositionAfter = (($('.tooltip.vyberovnik').outerWidth() / 2 )- 8);

            $('.tooltip.vyberovnik').css({
                'left': position,
                'right': 'auto',
                'bottom' : bottom
            });

            $('#container').append('<style>.tooltip:after{left: ' + leftPositionAfter + 'px; right: auto;}</style>');
            $('.tooltip').delay(timeOut).fadeOut();
        }

        tooltipModelFristTime++

            // if ($('#3DObject').attr('src') == '' ) {
            //     $('#3DObject').attr('src', 'object2vr/output/loop.html');
            // }
            $('.arrows, .screenCapture').addClass('hidden');
            $('.model-blur').addClass('active');

            
            if ($('.intro-help').length > 0 ) {
                $('.intro-help').removeClass('hidden');
            }
            $('#3d-confirm').on('click tap', function(){

                if ( $('input[id="1"]:checked').length > 0 ) {
                    $('.intro-help').fadeOut("normal", function() {
                        $(this).remove();
                    });
                }

                else {
                    $('.intro-help').addClass('hidden');
                }
                
            });

            
        

        break;
        case false:
            
            $('.intro-help').addClass('hidden');
            $('.model-blur').removeClass('active');
            $('.arrows, .screenCapture').removeClass('hidden');
            window.CI360.destroy();
        break;
    } 
});

$('.rgt-arrow').on('click tap', function() {   
    switch (pano.getCurrentNode()) {
        case 'node30':  
           pano.openNext('{node31}');
        break;
        case 'node31': 
            pano.openNext('{node32}');
        break;        
        case 'node32': 
            pano.openNext('{node33}');
        break;                
        case 'node33': 
            pano.openNext('{node30}');
        break;                
    }
});

$('.lft-arrow').on('click tap', function() {
    
    switch (pano.getCurrentNode()) {
        case 'node30': 
        pano.openNext('{node33}');
        break;
        case 'node31': 
        pano.openNext('{node30}');
        break;        
        case 'node32': 
        pano.openNext('{node31}');
        break;                
        case 'node33': 
        pano.openNext('{node32}');
        break;                
    }
});

function bytyTrigger(bytID) {
    $('.byt').removeClass('selected').css({'border-bottom': ''});
    $(bytID).addClass('selected').prev('div').css({
        'border-bottom': 0
    });
}


$('.byt').on('click tap', function(e) {
    $('.byt').removeClass('selected').css({'border-bottom': ''});
    $(this).addClass('selected').prev('div').css({
        'border-bottom': 0
    });


});

$('.byt > .tour').on('click tap', function() {
    variableFalse(['footer_apartments']);
});

function openCorrectPano(flatID, targetElement, node1, node2, node3) {
    switch (Flats[flatID][targetElement].activeItem) {    
        case 0: 
            pano.openNext('{'+node1+'}','');
        break;
        case 1: 
            pano.openNext('{'+node2+'}','');
        break;
        case 2: 
            pano.openNext('{'+node3+'}','');
        break;
    }
}

// Mapovanie bytov a klikov na ne 
$('#b-307.byt-wrapper').on('click tap', function() {
    AllFlatColorChange($(this).attr('id'));
    
    // zmeň pozíciu
    pano.moveTo(24.35,-4.54,60,1000);
    pano.showOnePolyHotspot($(this).attr('id'));
});
$('#307-tour').on('click tap', function() {
    pano.openNext('{node1}');
});

$('#b-306.byt-wrapper').on('click tap', function() {
    AllFlatColorChange($(this).attr('id'));
    pano.showOnePolyHotspot($(this).attr('id'));
    // zmeň pozíciu
    pano.moveTo(24.16,-9.54,60,1000);
});

$('#306-tour').on('click tap', function() {
    openCorrectPano('306','interierObklad','node2','node8','node4');
});

$('#b-305.byt-wrapper').on('click tap', function() {
    AllFlatColorChange($(this).attr('id'));
    pano.showOnePolyHotspot($(this).attr('id'));
    // zmeň pozíciu
    pano.moveTo(23.96,-14.53,60,1000);
});

$('#305-tour').on('click tap', function() {
    openCorrectPano('305','kupelnaObklad','node7','node5','node6');
    //pano.openNext('{node1}');
});

$('#307').mouseover(function() {
    pano.showOnePolyHotspot('b-307');
});

$('#307').mouseleave(function() {
    if (  $(this).hasClass("selected") == false ) {
        pano.hideOnePolyHotspot('b-307');
    }   
});

$('#306').mouseover(function() {
    pano.showOnePolyHotspot('b-306');
});

$('#306').mouseleave(function() {
    if (  $(this).hasClass("selected") == false ) {
        pano.hideOnePolyHotspot('b-306');
    } 
});

$('#305').mouseover(function() {
    pano.showOnePolyHotspot('b-305');
});

$('#305').mouseleave(function() {
    if (  $(this).hasClass("selected") == false ) {
        pano.hideOnePolyHotspot('b-305');
    }   
});

// Scroll section
var filterDivScroll = 0;
var filterDiv = null;
var LastVisitedPosition = 0;
var tmpVar = null;
function checkFilterHeight() {
    filterDivScroll = FilterCatResult.get(0).scrollHeight;
    filterDiv = FilterCatResult.height();


    LastVisitedPosition = $('.last-visited').offset();
    tmpVar = FilterCatResult.offset();
    finalPosition = (LastVisitedPosition.top - tmpVar.top);

    if ( !$('.last-visited').hasClass('active') ) {
        JumptoLastVisitedFlat.removeClass('visible');
        return;
        
    }

    else {
        if ((finalPosition < 45) || (finalPosition > filterDiv)) {
            JumptoLastVisitedFlat.addClass('visible');
        }
    
        else {
            JumptoLastVisitedFlat.removeClass('visible');
    
        }
    }

    
}

JumptoLastVisitedFlat.on('click touchstart', function ScrollToElement() {
    var container = FilterCatResult;
    var scrollTo = $('.last-visited');

    var position = scrollTo.offset().top 
            - (container.offset().top + 139) 
            + container.scrollTop();
  
    container.animate({
       scrollTop : position
    }, 200);
});

FilterCatResult.on('scroll', function() {
    checkFilterHeight();
});


function useLastVisited() {
    pano.openNext("{"+ lastVisitedPano +"}", "");
}