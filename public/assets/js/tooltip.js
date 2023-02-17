var timeOut = 2500;

$('.m-menu').on('click touchstart', function(e){ 
    $('.tooltip').remove();
});

function toolTip(that, tooltipName) {
    $('.tooltip').remove();
    $('#container > style').remove();
    var offsetTooltip = $(that).offset();
    //console.log(offsetTooltip);
    
    var bottom = $(window).height() - offsetTooltip.top +8;
    var right = $(window).width() - offsetTooltip.left - $(that).width();
    var leftPositionAfter = offsetTooltip.left- ( ( $(that).width()/2) - 8);
    var rightPositionAfter = right - ( ( $(that).width()/2) - 8);
    
    //console.log(offsetTooltip);
    if (
        that['className'].indexOf('attr-item') > -1 
    ) {
        
        offsetTooltip = $('.header-cart').offset();
        $('#container').append('<div class="tooltip cart">'+ tooltipBasket[pano.getVariableValue('lang')] +'</div>');
            var position = (offsetTooltip.left) + ( ($('.header-cart > div').outerWidth() - $('.tooltip.cart').outerWidth()) / 2 );
           // console.log(position);
            var top =  56;
            var leftPositionAfter = (($('.tooltip.cart').outerWidth() / 2 )- 8);

            $('.tooltip.cart').css({
                'left': position,
                'right': 'auto',
            });

            $('#container').append('<style>.tooltip:after{left: ' + leftPositionAfter + 'px; right: auto;}</style>');
    }

    else  {
        $('#container').append('<div class="tooltip">'+ tooltipName +'</div>');
        if (offsetTooltip.left <  right) {
            $('.tooltip').css({
                'left': 24,
                'right' : 'auto',
                'bottom' : bottom
            });
            $('#container').append('<style>.tooltip:after{left: ' + leftPositionAfter + 'px; right: auto;}</style>');
        }
    
        else {
            $('.tooltip').css({
                'right': 24,
                'left' : 'auto',
                'bottom' : bottom
            });
            $('#container').append('<style>.tooltip:after{right: ' + rightPositionAfter + 'px; left auto;}</style>');
            
        }
    }

 
   $('.tooltip').delay(timeOut).fadeOut();
}

var tooltipUnavailable = {
    sk : 'Funkcionalita nie je pre tento projekt dostupná',
    cz : 'Funkce není pro tento projekt dostupná',
    en : 'Functionality is not available for this project'
    
}

var tooltip3Dmodel = {
    sk : 'Pre vstup do interaktívneho modelu kliknite tu',
    cz : 'Pro vstup do interaktivního modelu klikněte zde',
    en : 'Click here to enter the interactive model',
    int : 'Click here to enter the interactive model'
}

var tooltipApartments = {
    sk : 'Pre výber apartmánov kliknite tu',
    cz : 'Pro výběr apartmánů klikněte zde',
    en : 'Click here to select apartments',
    int : 'Click here to select houses '
}

var tooltipBasket = {
    sk : 'Váš výber bol uložený',
    cz : 'Váš výběr byl uložen',
    en : 'Your selection has been saved'
}

$('.item.floorplan').on('click touchstart', function showTooltip() {
    //toolTip(this, tooltipUnavailable[pano.getVariableValue('lang')]);
});

$('.item.map').on('click touchstart', function showTooltip() {
   // toolTip(this, tooltipUnavailable[en]);
});

$('.item.layers').on('click touchstart', function showTooltip() {
    toolTip(this, tooltipUnavailable[en]);
});

$('.item.apartment').on('click touchstart', function showTooltip() {
    //toolTip(this, tooltipUnavailable[pano.getVariableValue('lang')]);
});

$('.item.social').on('click touchstart', function showTooltip() {
    //toolTip(this, tooltipUnavailable[pano.getVariableValue('lang')]);
});

$('.item.global-info').on('click touchstart', function showTooltip() {
    //toolTip(this, tooltipUnavailable[pano.getVariableValue('lang')]);
});

$('.item.vr').on('click touchstart', function showTooltip() {
    toolTip(this, tooltipUnavailable[en]);
});

$('.item.chatbot').on('click touchstart', function showTooltip() {
    toolTip(this, tooltipUnavailable[en]);
});