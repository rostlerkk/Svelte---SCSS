$().uvod();

let housesData, lang = null;

// Načítanie scriptov
//$.getScript('assets/js/advertisement.js');
//$.getScript('assets/js/apartments.js');
//$.getScript('assets/js/attributes_values.js');
//$.getScript('assets/js/attributes.js');
//$.getScript('assets/js/attributes_new.js');
//$.getScript('assets/js/app-cart.js');
//$.getScript('assets/js/autotour.js');
//$.getScript('assets/js/cart.js');
//$.getScript('assets/js/basket.js');
//$.getScript('assets/js/data.js');
$.getScript('assets/js/floorplan.js');
$.getScript('assets/js/global-info.js');
$.getScript('assets/js/hlp-layer.min.js');
// //$.getScript('assets/js/chatbot.min.js');
$.getScript('assets/js/infopanel.min.js');
$.getScript('assets/js/languages.min.js');
$.getScript('assets/js/localvideo.js');
$.getScript('assets/js/map.min.js');
// //$.getScript('assets/js/messenger.js');
$.getScript('assets/js/pinned-videos.js');
$.getScript('assets/js/settings.min.js');
// $.getScript('assets/js/shortcuts.min.js');
$.getScript('assets/js/social.js');
$.getScript('assets/js/sounds.min.js');
$.getScript('assets/js/videopanel.js');
$.getScript('assets/js/tooltip.js');

// Načitanie obrázkov (aktívna položka vo Footri) pred ich zobrazením.
$.fn.preload = function() {
    this.each(function(){
    $('<img/>')[0].src = this;
    });
}
// Zoznam obrázkov, ktoré majú byť načítané pri štarte 
$([
    'images/vivapark-logo.svg',
    //'assets/icons/woow-logo-black.svg',
    'assets/icons/apartments_active.svg',
    'assets/icons/floorplan_active.svg',
    'assets/icons/map_active.svg',
    //'assets/icons/cart_active.svg',
    //'assets/icons/layers_active.svg',
    'assets/icons/social_active.svg',
    'assets/icons/global-info_active.svg',
    'assets/icons/floorplan_active.svg',
    //'assets/icons/vr_active.svg',
    //'assets/icons/chatbot_active.svg',
    'assets/icons/checked.svg',
    'assets/icons/prev_h.svg',
    'assets/icons/sound_off.svg',
    'assets/icons/close.svg',
    'assets/icons/resize.svg',
    //'assets/icons/premium.svg',
    //'assets/icons/screenCapture_h.svg',
    //'assets/icons/screenCapture.svg',
    //'assets/icons/close_screenCapture_h.svg',
    //'assets/icons/close_screenCapture.svg',
    //'assets/icons/screenCapture_fullscreen.svg',
    //'assets/icons/screenCapture_fullscreen_active.svg',
    //'assets/icons/screenCapture_new_active.svg',
    //'assets/icons/screenCapture_new.svg',
    //'assets/icons/screenCapture_old_active.svg',
    //'assets/icons/screenCapture_old.svg',
    //'assets/icons/screenCapture_download.svg',
    //'assets/icons/screenCapture_download_h.svg',
    //'assets/icons/screenCapture_arrow.svg',
    'assets/icons/modify_h.svg',
    'assets/icons/model_move.svg',
    'assets/icons/model_scroll.svg',
    'assets/icons/pinch.svg',
    'assets/icons/tap_drag.svg',
    'assets/icons/check-hlp.svg',
    'assets/icons/checked-hlp.svg',
    'media/Patch_ikony_int/ICON_INT_DOOR_ON.png',
    'media/ICON_INT_DOOR_OFF.png',
    'media/Patch_ikony_int/ICON_INT_INFO_ON.png',
    'media/ICON_INT_INFO_OFF.png',
    'media/Patch_ikony_int/ICON_INT_LAYERS_ON.png',
    'media/ICON_INT_LAYERS_OFF.png',
    'media/Patch_ikony_ext/ICON_EXT_DOOR_ON.png',
    'media/ICON_EXT_DOOR_OFF.png',
    'media/Patch_ikony_ext/ICON_EXT_INFO_ON.png',
    'media/ICON_EXT_INFO_OFF.png',
    'media/Patch_ikony_ext/ICON_EXT_LAYERS_ON.png',
    'media/ICON_EXT_LAYERS_OFF.png',
    'media/Patch_ikony_int/Ikony_Dom_08_FINAL/MONITOR_NONACTIVE.png',
    'media/Patch_ikony_int/Ikony_Dom_08_FINAL/MONITOR_ACTIVE.png',
    'media/Patch_ikony_int/Ikony_Dom_08_FINAL/SOLIDITY_NONACTIVE.png',
    'media/Patch_ikony_int/Ikony_Dom_08_FINAL/SOLIDITY_ACTIVE.png',
    'media/Patch_ikony_int/Ikony_Dom_08_FINAL/INTERIORVALUES_NONACTIVE.png',
    'media/Patch_ikony_int/Ikony_Dom_08_FINAL/INTERIORVALUES_ACTIVE.png',
    'media/Patch_ikony_int/Ikony_Dom_08_FINAL/INSULATION_NONACTIVE.png',
    'media/Patch_ikony_int/Ikony_Dom_08_FINAL/INSULATION_ACTIVE.png'
])
.preload();

var LftArrow = $('.arrows.lft-arrow');
var RgtArrow = $('.arrows.rgt-arrow');
// Akcie pri zmene hodnoty premennej blurred
pano.addListener('varchanged_blurred', function() {
    $('.tooltip').remove();
    $('.viva-start').addClass('hidden');
    switch (pano.getVariableValue('blurred')) {
        case true: 
        $('.ggskin_hotspot, .ggskin_external').css({
            'visibility': 'hidden'
        });
        HideElement(['.header','.footer','.shortcuts']);
        removeClass(['.tag-container'], 'active'); // zatvorí TAG hotspot
        variableFalse(['footer_floorplan','footer_map','footer_layers','footer_chatbot','footer_social','attributes_side','attributes_hotspot','lang_menu','shortcuts','mobile_menu_left','mobile_menu_right','settings','new_blur']);
        if (pano.getNodeUserdata(pano.getCurrentNode()).copyright == 'orientacia')
        {
            variableTrue(['footer_apartments']);
        }
        addClass(['.adv-wrapper','.screenCapture'], 'hidden');
        ShowElement(['.back-blur']);
        LftArrow.css('display','none');
        RgtArrow.css('display','none');
        
    break;
    case false:
        setTimeout(() => {
            $('.ggskin_hotspot, .ggskin_external').css({
                'visibility': 'visible'
            });    
        }, 250);
        HideElement(['.back-blur']);
        ShowElement(['.header','.footer','.shortcuts']);            
        variableFalse(['infopanel','footer_global_info']);
        variableFalse(['infopanel','videopanel','footer_global_info','map_full','floorplan_full','pruduct_3D_full','cart_full','thanks_page','houseInfo']);
        removeClass(['.adv-wrapper','.screenCapture'], 'hidden');
        LftArrow.css('display','block');
        RgtArrow.css('display','block');
        //showVivaIntro();
    break; 
    }
});

var newBlurrDiv = $('.new-blur');
pano.addListener('varchanged_new_blur', function() {
    switch (pano.getVariableValue('new_blur')) {
        case true: 
            newBlurrDiv.removeClass('hidden');
        break;
        case false:
            newBlurrDiv.addClass('hidden');
        break;
    }
});

pano.addListener('varchanged_mobile_menu_active', function() {
    switch (pano.getVariableValue('mobile_menu_active')) {
        case true: 
        break;
        case false:
            variableFalse(['attributes_side','footer_social','footer_chatbot','footer_layers','footer_map','footer_floorplan','mobile_menu_left','mobile_menu_right'])
        break; 
    }
});
var settingsFinished = false;
var CleanedDivs = $('.clean');

$(window).on('load', function(){ 
   // Základné upravenie štruktúry DIV a elementov - /* Pano2VR BUG */
    
    if (pano.configloaded = true) {
        setTimeout(function () {          
            CleanedDivs.removeAttr('style')
                        .find('div').removeAttr('style')
                        .find('br').remove()
                        .removeClass('ggskin ggskin_container ggskin_text clean delete'); // odstráni classy pridané Pano2VR vrátane classy clean a delete.
            removeEmpthyDiv(['.hotspots-group','.map-side','.layers-wrapper > .layer','.link-field','.attributes-group > .group','.model-3D-iframe']);
            $('.infopanel').find('div:first').addClass('content');
            $('.videopanel').find('div:first').addClass('video');
            $('.map-full').find('div:first').addClass('content');
            $('.thanks-page').find('div:first').addClass('content');
            $('.shortcuts-navigation').unwrap();

            // Nastavenie Slovenské jazyka /* Pano2VR BUG */
            //pano.setVariableValue('lang', 'int');
            // Aktívna panoráma na floorplane /* Pano2VR BUG*/
            removeClass(['.check-layer'], 'active');
            $('span.active').closest('.check-layer').addClass('active');
            // zastavenie autotour po kliku na niektorú z panorám v slidery
            $('.ggskin_nodeimage').on('click tap', function() {
                $('.shortcuts-pause').trigger('click');
            });
            //console.log('config ready');
            settingsFinished = true;
        }, 0);
    }
});




// zobrazenie/skrytie elementov na tour dvojklikom
/*
$('div:not([class])').slice( 3,4 ).on('dblclick', function() {
    $(this).addClass('lama');
    console.log('alert');
    toggleClass(['.header','.footer','.shortcuts','.hts','.mobile-footer','.mobile-footer-l-menu','.mobile-footer-r-menu','.tooltip'],'show-hide');  
});
*/

/*
var touchtime = 0;
$('div:not([class])').slice( 3,4 ).on('click', function() {
    if (touchtime == 0) {
        // set first click
        touchtime = new Date().getTime();
    } else {
        // compare first click to this click and see if they occurred within double click threshold
        if (((new Date().getTime()) - touchtime) < 100) {
            // double click occurred
            toggleClass(['.header','.footer','.shortcuts','.hts','.mobile-footer','.mobile-footer-l-menu','.mobile-footer-r-menu','.tooltip'],'show-hide');  
            touchtime = 0;
        } else {
            // not a double click so set as a new first click
            touchtime = new Date().getTime();
        }
    }
});

*/