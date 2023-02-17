// tlačidlo ChatBot
pano.addListener('varchanged_footer_chatbot', function() {
    switch (pano.getVariableValue('footer_chatbot')) {
        case true: 
        //ShowElement(['.chatbot-container']);
        HideElement(['.social-container']);
        variableFalse(['footer_social','footer_global_info']);
        $('.right-side > .item').removeClass('active'); 
        addClass(['.chatbot'], 'active'); 
        
    break;
    case false:
        removeClass(['.chatbot','.hlp-layer'], 'active'); 
        HideElement(['.chatbot-container']);
    break; 
    }
});  