$.getScript('assets/js/functions.js');

pano.addListener('varchanged_intro_lang_menu', function() {
    switch (pano.getVariableValue('intro_lang_menu')) {
        case true: 
        ShowElement(['.intro-lang-menu']);
    break;
    case false:
        HideElement(['.intro-lang-menu']);
    break; 
    }
});

// zobrazenie/skrytie hesla na INTRE
function ShowHidePass() {
    var x = document.getElementById('intro-password');
    switch (x.type) {
        case 'password' : 
            x.type = 'text';
            addClass(['.pass-sh'], 'visible');
            removeClass(['.pass-sh'], 'hidden');
        break;
        case 'text' :
            x.type = 'password';
            removeClass(['.pass-sh'], 'visible');
            addClass(['.pass-sh'], 'hidden');
    }
}

// Prepínanie medzi legendou na intre
/* Zvýrazňovanie bodiek */
$('.dot').on('click touchstart', function(){
    $('.dot').removeClass('active');
    $(this).addClass('active');
 });

/* Desktop */ 
$('#bul-1').on('click touchstart', function(){
    SetVariableValue(['bullet'], 1);
});
$('#bul-2').on('click touchstart', function(){
    SetVariableValue(['bullet'], 2);
}); 

/* Mobile */
$('#bul-1-m').on('click touchstart', function(){
    SetVariableValue(['bullet_m'], 1);
});
$('#bul-2-m').on('click touchstart', function(){
    SetVariableValue(['bullet_m'], 2);
}); 
$('#bul-3-m').on('click touchstart', function(){
    SetVariableValue(['bullet_m'], 3);
}); 
$('#bul-4-m').on('click touchstart', function(){
    SetVariableValue(['bullet_m'], 4);
}); 
$('#bul-5-m').on('click touchstart', function(){
    SetVariableValue(['bullet_m'], 5);
}); 
// Koniec Prepínanie medzi legendou na intre

// Zobrazenie aktívnej skupiny hotspotov v legende na intre
pano.addListener('varchanged_bullet', function() {
    switch (pano.getVariableValue('bullet')) {
        case 1: 
            ShowElement(['.bull-1']);
            HideElement(['.bull-2']);
        break;
        case 2:
            ShowElement(['.bull-2']);
            HideElement(['.bull-1']);
        break; 
    }
});

pano.addListener('varchanged_bullet_m', function() {
    switch (pano.getVariableValue('bullet_m')) {
        case 1: 
            ShowElement(['.bull-1-m']);
            HideElement(['.bull-2-m']);
            HideElement(['.bull-3-m']);
            HideElement(['.bull-4-m']);
            HideElement(['.bull-5-m']);
        break;
        case 2:
            ShowElement(['.bull-2-m']);
            HideElement(['.bull-1-m']);
            HideElement(['.bull-3-m']);
            HideElement(['.bull-4-m']);
            HideElement(['.bull-5-m']);
        break; 
        case 3:
            ShowElement(['.bull-3-m']);
            HideElement(['.bull-1-m']);
            HideElement(['.bull-2-m']);
            HideElement(['.bull-4-m']);
            HideElement(['.bull-5-m']);
        break; 
        case 4:
            ShowElement(['.bull-4-m']);
            HideElement(['.bull-1-m']);
            HideElement(['.bull-2-m']);
            HideElement(['.bull-3-m']);
            HideElement(['.bull-5-m']);
        break; 
        case 5:
            ShowElement(['.bull-5-m']);
            HideElement(['.bull-1-m']);
            HideElement(['.bull-2-m']);
            HideElement(['.bull-3-m']);
            HideElement(['.bull-4-m']);
        break; 
    }
});

// zobrazenie/skrytie textu hesla
$( '.pass-sh').on('click tap', function(e){
    ShowHidePass();
});

// zisťovanie zhody hesla
var pswdCheck = false;
$('input[type=password]').keyup(function() {
    var pswd = $(this).val();
    if (pswd == pano.getVariableValue('password')) {
        pswdCheck = true;
        removeClass(['#intro-password'], 'error-input');  
    }
    else {
        addClass(['#intro-password'], 'error-input');  
    }
});

function CheckCheckBoxes(variable_id,submit_id) {
    if (variable_id.length == variable_id.filter(':checked').length) {
        submit_id.prop('disabled', false);
    }
    else {
        submit_id.prop('disabled', true);
    }
}

// Funkcia sa spustí vždy po kliku na jeden z checkboxov na Intre
var intro_form_checkboxes = $('input[type="checkbox"].validate.intro');
var intro_form_submit = $('#intro-submit');
intro_form_checkboxes.change(function(){
    CheckCheckBoxes(intro_form_checkboxes,intro_form_submit);
});




// Akcie po kliknutí na tlačidlo Submit na INTRE
$('#intro-submit').on('click touchstart', function(e){ 
   // Ak sú oba checkboxy zaškrtnuté a ak je heslo správne - heslo je zadané v Skin editore
   if ($('input[type="checkbox"].intro:checked').length > 1 && pswdCheck == true) {
        // $('.floorplan-full').removeClass('active');
        removeIntro(); /* funkcia je definovaná vo functions.js*/
    }
    else {
        $('#intro-password').addClass('error-input');
    }
});