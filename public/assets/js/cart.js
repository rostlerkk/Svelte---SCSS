var generatePdfButton = $('#generatePDF');
var sendOfferButton = $('#sendOffer');

pano.addListener('varchanged_lang', function changeLang() {
    switch (pano.getVariableValue('lang')) {
        case 'sk':
            generatePdfButton.text('Stiahnuť PDF');
            sendOfferButton.text('Odoslať e-mailom');
            
            break;
        case 'cz':
            generatePdfButton.text('Stáhnout PDF');
            sendOfferButton.text('Odoslat e-mailom');      

            break;
        case 'en':
            generatePdfButton.text('Download PDF');
            sendOfferButton.text('Send e-mail');; 
            break;            
    }
});

var sendButton = $('.button.send');
sendButton.on('click touchstart', function () {
    variableTrue(['cart_full']);
    variableTrue(['sendByMail']);
});


// tlačidlo Cart vo Footri
pano.addListener('varchanged_footer_cart', function() {
    switch (pano.getVariableValue('footer_cart')) {
        case true: 
            variableFalse(['footer_floorplan','footer_map','footer_layers','shortcuts']);
            $('.left-side > .item').removeClass('active'); 
         break;
        case false:
        break; 
    }
});

// Zmena hodnoty premennej cart_full
pano.addListener('varchanged_cart_full', function() {
    switch (pano.getVariableValue('cart_full')) {
        case true: 
        variableTrue(['blurred']);
        ShowElement(['.cart-full']);   
    break;
    case false:
        variableFalse(['blurred']);
        HideElement(['.cart-full']);   
    break; 
    }
});

// pridá ku každému "vyžadovanému" inputu -> za Label znak *
$('input.required').prev('label').append('<span>&nbsp;*</span>');

//zabráni obnoveniu stránky pri kliku na button ODOSLAŤ
$('#submit').submit(function(e) {
    e.preventDefault();
});

// Zoznam premenných pre validáciu elemnetov v CART-e
var required_fields = $('input[type="text"].required');
var form_submit = $('#submit');
var form_checkboxes = $('input[type="checkbox"].validate');

// validácia checkboxov na Carte
function validateCart() {
    var invalid = 0;
    required_fields.each(function () {
        if ($(this).val() == '') {
            invalid++;
        }
    });

    if(invalid > 0) {
        return false;
    }
    else {
        // akcie pri kliknutí na submit button v CONTACT FORM-e, ak sú všetky povinné údaje vyplnené
        pano.setVariableValue('thanks_page', true);
        return true;
    }
}

// Funkcia pre validáciu checkboxov na Carte
function CheckCheckBoxes(variable_id,submit_id) {
    if (variable_id.length == variable_id.filter(':checked').length) {
        submit_id.prop('disabled', false);
        validateCart();
    }
    else {
        submit_id.prop('disabled', true);
    }
}

// Funkcia sa spustí vždy po kliku na jeden z checkboxov na Carte
form_checkboxes.change(function(){
    CheckCheckBoxes(form_checkboxes,form_submit);
});

// Zvýraznenie nevyplnených povinných inputov pri kliknutí na button ODOSLAŤ na CONTACT FORM-e
form_submit.on('click touchstart', function(){
    required_fields.each(function(){
        if ($(this).val() != '') {
            $(this).removeClass('error-input');
            validateCart();
        } else {
            $(this).addClass('error-input');
        }
    });
});

// Akcie pri zmene hodnoty premennej thanks_page
pano.addListener('varchanged_thanks_page', function() {
switch (pano.getVariableValue('thanks_page')) {
    case true: 
        ShowElement(['.thanks-page']);
        HideElement(['.cart-full']);
    break;
    case false:
        variableFalse(['blurred']);
        HideElement(['.thanks-page']);
        variableFalse(['cart_full']);
    break; 
}
});