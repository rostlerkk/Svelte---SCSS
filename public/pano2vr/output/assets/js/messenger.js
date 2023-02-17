pano.addListener('varchanged_blurred', function() {
    switch (pano.getVariableValue('blurred')) {
        case true:
            $('.fb_dialog_content').removeClass('active');
        break;
        case false:
            $('.fb_dialog_content').addClass('active');
        break;
    }
});