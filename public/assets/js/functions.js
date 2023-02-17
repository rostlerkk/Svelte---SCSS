function removeEmpthyDiv (target) {
    var i;
    for (i = 0; i < target.length; i++) {
        $(target[i]).find("div:not([class])").replaceWith(function() { return this.innerHTML; });
    } 
}

// Základné nastavenie času pre zobrazenie/skrytie elementov
var TimeIn = 15;
var TimeOut = 180; // musí byť vyššie ako defaultná hodnota transition v mixins...

// Zobrazenie elementu
function ShowElement(target) {
    var i;
    for (i = 0; i < target.length; i++) {
        $(target[i]).addClass('active');
    }             
    setTimeout(function() {
        var i;
        for (i = 0; i < target.length; i++) {
            $(target[i]).addClass('anim');
        }          
    }, TimeIn);
}
// Skrytie elementu
function HideElement(target) {
    var i;
    for (i = 0; i < target.length; i++) {
        $(target[i]).removeClass('anim');
    }             
    setTimeout(function() {
        var y;
        for (y = 0; y < target.length; y++) {
            $(target[y]).removeClass('active');
        }          
    }, TimeOut);
}  
// Zobrazenie elementu MEDIA (patchu)
function showMedia (source) {
    pano.setMediaVisibility(source, '1', 0);
}
// Skrytie elementu MEDIA (patchu)
function hideMedia (source) {
    pano.setMediaVisibility(source, '0', 0);
}
// Skrytie viacerých elementov MEDIA (patchov)
function sMedia (source){
    var i;
    for (i = 0; i < source.length; i++) {
        showMedia(source[i]);
    }
}
// Skrytie viacerých elementov MEDIA (patchov)
function hMedia (source){
    var i;
    for (i = 0; i < source.length; i++) {
        hideMedia(source[i]);
    }
}
// Globálne funkcie
function addClass(source,clas) {
    var i;
    for (i = 0; i < source.length; i++) {
        $(source[i]).addClass(clas);
    }
}
// Odobratie classy pre element
function removeClass(source,clas) {
    var i;
    for (i = 0; i < source.length; i++) {
        $(source[i]).removeClass(clas);
    }
}
// Toggle classy pre element
function toggleClass(source,clas) {
    var i;
    for (i = 0; i < source.length; i++) {
        $(source[i]).toggleClass(clas);
    }
}  
// Nastavenie premennej na TRUE
function variableTrue(source) {
    var i;
    for (i = 0; i < source.length; i++) {
        pano.setVariableValue(source[i], true);
    }
}
// Nastavenie premennej na FALSE
function variableFalse(source) {
    var i;
    for (i = 0; i < source.length; i++) {
        pano.setVariableValue(source[i], false);
    }
}
// Nastavenie premennej na hodnotu
function SetVariableValue(source, value) {
    var i;
    for (i = 0; i < source.length; i++) {
        pano.setVariableValue(source[i], value);
    }
}  