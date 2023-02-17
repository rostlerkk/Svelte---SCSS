pano.addListener('varchanged_lang_menu', function() {
    switch (pano.getVariableValue('lang_menu')) {
        case true: 
        placeLangMenuBar();
        ShowElement(['.lang-menu']);
        $('.viva-start').addClass('hidden');
    break;
    case false:
        HideElement(['.lang-menu','.hlp-layer']);
    break; 
    }
});

// Otvorenie Lang menu 
$('.language').on('click tap', function(e){
    $('.adv-wrapper').addClass('hidden');
    variableFalse(['settings','shortcuts','app_cart']);
    ShowElement(['.hlp-layer']);
});



var languageItem = $('.item.language');
var languageContainer = $('.lang-menu');

function placeLangMenuBar() {  
    languageContainer.css({'right':''});  
    var offset = languageItem.offset();
    offset.right = $(window).width() - (offset.left + languageItem.outerWidth(true));
    languageContainer.css({
        'right': offset.right
    });
}


pano.on('configloaded', function placeLangMenu() {
    placeLangMenuBar();
})                                     

window.addEventListener('resize', function () {
    myFunction('resize');
});


window.addEventListener("orientationchange", function() {
    myFunction('orientation');
});

function myFunction(value) {
    if (value == 'resize') {
        variableFalse(['lang_menu']);
    } else if (value == 'orientation') {
        variableFalse(['lang_menu']);
    }
}