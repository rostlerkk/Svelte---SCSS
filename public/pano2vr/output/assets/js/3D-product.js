// Zmena hodnoty premennej product_3D_full
pano.addListener('varchanged_pruduct_3D_full', function() {
    switch (pano.getVariableValue('pruduct_3D_full')) {
        case true: 
        variableTrue(['blurred']);
        ShowElement(['.product-3D-full']);   
    break;
    case false:
        variableFalse(['blurred']);
        HideElement(['.product-3D-full']);   
    break; 
    }
});