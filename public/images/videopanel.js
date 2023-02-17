// Akcie pri zmene hodnoty premennej videopanel
pano.addListener('varchanged_videopanel', function() {
    switch (pano.getVariableValue('videopanel')) {
        case true: 
        variableTrue(['blurred']);
        removeClass(['.back-blur','.videopanel'], 'hidden');   
    break;
    case false:
        variableFalse(['blurred']);
        addClass(['.back-blur','.videopanel'], 'hidden'); 
    break; 
    }
});