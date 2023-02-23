// tlačidlo Map vo Footri
pano.addListener('varchanged_footer_map', function() {
        switch (pano.getVariableValue('footer_map')) {
        case true: 
        $('.viva-start').addClass('hidden');
        HideElement(['.layers-side','.attributes-side']); 
        ShowElement(['.map-side']); 
        variableFalse(['footer_cart','footer_layers','footer_apartments','attributes_side','3D_model']);
        $('.left-side > .item').not('.floorplan').removeClass('active'); 
        addClass(['.map','.hlp-layer'], 'active1'); 
    break;
    case false:

        if (pano.getVariableValue('footer_floorplan') == true || pano.getVariableValue('footer_layers') == true || pano.getVariableValue('footer_chatbot') == true || pano.getVariableValue('footer_social') == true || pano.getVariableValue('attributes_side') == true || pano.getVariableValue('footer_apartments') == true ) {
            HideElement(['.map-side']); 
            removeClass(['.map'], 'active'); 
        }

        else {
            //showVivaIntro();
            HideElement(['.map-side']); 
            removeClass(['.map','.hlp-layer'], 'active'); 
        }
    break; 
    }
});  

// Zmena hodnoty premennej map_full
pano.addListener('varchanged_map_full', function() {
    switch (pano.getVariableValue('map_full')) {
        case true: 
        HideElement(['.map-side']); 
        variableTrue(['blurred']);
        ShowElement(['.map-full']);  
    break;
    case false:
        variableFalse(['blurred']);
        HideElement(['.map-full']);  
    break; 
    }
});
