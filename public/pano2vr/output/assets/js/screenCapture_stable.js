var screenShotDiv = '<div class="screenBlurrNew"></div>';
var screenSizesBar = '<div class="screenSize" data-html2canvas-ignore="true"><div id="screen" class="size">screen</div><div id="new" class="size">16:9</div><div id="old" class="size">4:3</div></div>';
var takeScreenShotDiv = '<div class="takeScreenShot" data-html2canvas-ignore="true"><div class="title">Take a screenshot</div></div>';
var closeButtonDiv = '<div class="closeScreenShot" data-html2canvas-ignore="true"></div>';
var downloadButton = '<div class="downloadScreenShot">Stiahnuť obrázok</div>';
var modifyPhoto = '<div class="modifyPhoto"></div>'
var backToTakeScreenShot = '<div class="closeScreenShot back" data-html2canvas-ignore="true"></div>';
var waterMark = '<img class="watermark" src="assets/icons/screenCaptureLogo.svg">';
var borderTopWidth = 50, borderBottomWidth = 50, borderSideWidth = 300; // default value
var canvasWidth = 0, canvasHeight = 0;
var animationTime = 200;
var resolution = 2; // default resolution
var maxWidth = 1024; // ak je screen menší, vypne sa rozlíšenie 16:9 a 4:3
var maxHeight = 768; // ak je screen menší, vypne sa rozlíšenie 16:9 a 4:3
var screenWidth = 0, screenHeight = 0;
var screenShotActive = false, resolutionChangeAllowed = false;
var myCanvas = {};

var mousePressed = false;
var lastX, lastY;
var ctx;


function showMarkerArea(target) {
    const markerArea = new markerjs2.MarkerArea(target);
    markerArea.availableMarkerTypes = markerArea.ALL_MARKER_TYPES;
    //markerArea.availableMarkerTypes = ['FrameMarker', markerjs2.ArrowMarker];
    markerArea.settings.defaultColorSet = ['red', 'green', 'blue'];
    markerArea.settings.defaultColor = 'green';
    markerArea.addRenderEventListener((imgURL) => target.src = imgURL);
    markerArea.show();
}

function hideElementDuringScreenCapture() {
    $('.tooltip, .screenCapture, .intro, .intro-help, .3d_model, .adv-wrapper, .mobile-footer-l-menu, .mobile-footer-r-menu, .header, .footer, .floorplan-full, .floorplan-side, .map-full, .map-side, .shortcuts, .slider-bg, .screenBlurrNew', ).attr('data-html2canvas-ignore', 'true');
    HideElement(['.header','.footer','.shortcuts']);
    removeClass(['.tag-container'], 'active'); // zatvorí TAG hotspot
    variableFalse(['footer_floorplan','footer_map','footer_chatbot','footer_social','attributes_side','attributes_hotspot','lang_menu','shortcuts','mobile_menu_left','mobile_menu_right','settings','footer_apartments']);
    addClass(['.adv-wrapper','.screenCapture','.mobile-footer'], 'hidden');
    LftArrow.css('display','none');
    RgtArrow.css('display','none');
    $('.tooltip').removeClass('active');

    if ( 
        pano.getNodeUserdata(pano.getCurrentNode()).copyright == 'vyberovnik'
    ) {
        $('.footer-apartments').addClass('hidden');
    }
}

function showElementAfterScreenCapture () {
    ShowElement(['.header','.footer','.shortcuts']);            
    variableFalse(['infopanel','footer_global_info']);
    variableFalse(['infopanel','videopanel','footer_global_info','map_full','floorplan_full','pruduct_3D_full','cart_full','thanks_page']);
    removeClass(['.adv-wrapper','.screenCapture','.mobile-footer'], 'hidden');
    addClass(['.closeScreenShot','.takeScreenShot'], 'hidden');
    LftArrow.css('display','block');
    RgtArrow.css('display','block');
    pano.setVariableValue('hotspots', true);

    if ( 
        pano.getNodeUserdata(pano.getCurrentNode()).copyright == 'vyberovnik'
    ) {
        $('.footer-apartments').removeClass('hidden');
    }
}

function animateScreenCapture() {
    $('.screenBlurrNew').animate({borderTopWidth:borderTopWidth, borderBottomWidth:borderBottomWidth,borderLeftWidth:borderSideWidth, borderRightWidth:borderSideWidth},animationTime);
}

function changeScreenSize(firstResolution, secondResolution) {
    $('.size').on('click touchstart', function() {
        $('.size').removeClass('active');
        $(this).addClass('active');
      });

    if (screenWidth > screenHeight) {  /* Landscape*/
        canvasHeight = screenHeight - borderTopWidth - borderBottomWidth;
        canvasWidth = ((canvasHeight / secondResolution) * firstResolution);

       
        borderSideWidth = (  (screenWidth - canvasWidth ) / 2);
        //.log(canvasWidth+' * '+canvasHeight);
    }

    else { /* Portrait */

        canvasHeight = screenHeight - borderTopWidth - borderBottomWidth;
        canvasWidth = ((canvasHeight / secondResolution) * firstResolution);
        if ( (canvasWidth + 64)  >= screenWidth) {
            canvasWidth = screenWidth - 64;
            canvasHeight = ((canvasWidth / firstResolution) * secondResolution);
        }

        borderSideWidth = (  (screenWidth - canvasWidth ) / 2);
        borderTopWidth = ( (screenHeight - canvasHeight) /2 );
        borderBottomWidth = ( (screenHeight - canvasHeight) /2 );
        //console.log(canvasWidth+' * '+canvasHeight);
    }
}

function addResolutionsBar() {
    if (resolutionChangeAllowed == true) {
        $('#container').append(screenSizesBar);
        switch (resolution) {
            case 1:
                $('#screen').addClass('active');
                break;
            
            case 2: 
                $('#new').addClass('active');
                break;
            case 3: 
            $('#old').addClass('active');
        }

        $('#screen').on('click tap', function() {
            //console.log('fullscreen');
            if ( resolution != 1) {
                resolution = 1;
                $('.screenSize > .size').removeClass('active');
                $(this).addClass('active');
                calculateCanvas();
            }
            
        });
        $('#new').on('click tap', function() {
            //.log('16:9');
            if ( resolution != 2) {
                resolution = 2;
                $('.screenSize > .size').removeClass('active');
                $(this).addClass('active');
                calculateCanvas();
            }
        });
        $('#old').on('click tap', function() {
            //.log('4:3');
            if ( resolution != 3) {
                resolution = 3;
                $('.screenSize > .size').removeClass('active');
                $(this).addClass('active');
                calculateCanvas();
            }
        });
    }

    addTakeScreenShotButton();
}

function createScreenShot(){
    calculateCanvas();
    $('.screenBlurrNew').append(waterMark);
    html2canvas(document.querySelector("#container"), {
        x : borderSideWidth,
        y : borderTopWidth,
        height: canvasHeight,
        width: canvasWidth,
        ignoreElements: true,
        allowTaint: true,
        useCORS: true,
    
      }).then(function(canvas) {
        $('.watermark').remove();
        
        document.querySelector('.screenBlurrNew').appendChild(canvas);
        if (resolutionChangeAllowed == false) {
            $('.screenBlurrNew').css({
                'background-color': 'rgb(0,0,0, 0.7'
            });

            if ( (screenWidth > screenHeight) && ( screenHeight <= 375 ) ) { /* Landscape */
                $('.screenBlurrNew > canvas').css({
                    'width': 'auto',
                    'height': screenHeight - (68*2)
                },animationTime);
            }

            else if ( (screenWidth < screenHeight) && ( screenWidth <= 375 ) ) {  /* Portrait */
                $('.screenBlurrNew > canvas').css({
                    'width': 'auto',
                    'height': screenHeight - (121*2)
                },animationTime);
            }

            else {
                $('.screenBlurrNew > canvas').css({
                    'width': 'auto',
                    'height': screenHeight - (130*2)
                },animationTime);
            }

            downloadPositon();
        }

        else {
            if (resolution == 1) {
                $('.screenBlurrNew').css({
                    'background-color': 'rgb(0,0,0, 0.7'
                });
                $('.screenBlurrNew > canvas').css({
                    'width': 'auto',
                    'height': screenHeight - (32 + 40 + 32 + 32 + 40 + 82 )
                });
            }
        }
        addDownloadButton();

        /* TEST DRAWING */
        $('.downloadScreenShot').on('click touchstart', function() {
           // alert('asfasga');

            //if (  $('#drawingAreaImg').length > 0 ) { 
            if (  resolutionChangeAllowed == true ) { 

                canvas.remove();
                $('.screenBlurrNew').append(waterMark);
                html2canvas(document.querySelector("#container"), {
                    x : borderSideWidth,
                    y : borderTopWidth,
                    height: canvasHeight,
                    width: canvasWidth,
                    ignoreElements: true,
                    allowTaint: true,
                    useCORS: true,
                
                  }).then(function(canvas) {
                    //$('.watermark').remove();
                    var a = document.createElement('a');
                    a.href = canvas.toDataURL("image/png");
                    a.download = 'Molly_screen_capture_v1.png';
                    a.click();
                  });
            }

            else {
                var a = document.createElement('a');
                a.href = canvas.toDataURL("image/png");
                a.download = 'Molly_screen_capture_v2.png';
                a.click();
            }


        });
      });
}

function calculateCanvas() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();
    //console.log('prepočítavam ...');
        
    if (( ( (screenWidth > maxWidth) && (screenWidth > screenHeight) ) /* Landcape*/ || ( (screenWidth < screenHeight) && (screenHeight > maxHeight)) /* Portrait*/ )) {
        resolutionChangeAllowed = true;
        //console.log('Ide o veľký display');
        switch (resolution) {
            // FullScreen
            case 1:
                canvasWidth = $(window).width();
                canvasHeight = $(window).height();  
                borderTopWidth = 0;
                borderBottomWidth = 0;
                borderSideWidth = 0;
                break;
            // 16:9
            case 2:
                borderTopWidth = 32 + 40 +32; // 32px margin buttonu X a 40px výška buttonu X
                borderBottomWidth = 32 + 40 + 82 // 32 a 82 px margin buttou X a 40px výška buttonu X
                changeScreenSize(16,9);
                
                break;
            // 4:3        
            case 3:
                borderTopWidth = 32 + 40 +32; // 32px margin buttonu X a 40px výška buttonu X
                borderBottomWidth = 32 + 40 + 82 // 32 a 82 px margin buttou X a 40px výška buttonu X
                changeScreenSize(4,3);
            break;
            //default: resolution;
        }
        
    }

    else {
        resolutionChangeAllowed = false;
        resolution = 1;
        borderSideWidth = 0;
        borderTopWidth = 0;
        borderBottomWidth = 0;
        canvasWidth = screenWidth;
        canvasHeight = screenHeight;
    }

    // zmení veľkosť vyznačenej obrazovky
    animateScreenCapture();

    if ( $('.screenBlurrNew > canvas').length > 0)  {
        //console.log('posúvam capture');
        $('.screenBlurrNew > canvas').animate({width:canvasWidth, height: canvasHeight});
    }
}

function closeScreenShot() {
    $('.screenBlurrNew, .screenSize, .modifyPhoto').remove();
    showElementAfterScreenCapture();
    screenShotActive = false;
}

function addTakeScreenShotButton () {  
    $('#container').append(takeScreenShotDiv);
    $('.takeScreenShot').on('click tap', function() {
        createScreenShot();
        $('.screenSize, .takeScreenShot, .closeScreenShot').remove();
        addCloseBackButton();
    });
}

function addCloseScreenShotButton() {
    $('#container').append(closeButtonDiv);
    $('.closeScreenShot').on('click tap', function() {
        screenShotActive = false;
        showElementAfterScreenCapture();
        $('.screenSize, .screenBlurrNew, .modifyPhoto, #drawingAreaImg').remove();
    });
}

function addCloseBackButton () {
    $('#container').append(closeButtonDiv);
    $('.closeScreenShot').on('click tap', function() {
        $('.screenBlurrNew > canvas, .closeScreenShot, .downloadScreenShot, .modifyPhoto, #drawingAreaImg').remove();
        if (resolution == 1) {
            $('.screenBlurrNew').css({
                 'background-color': 'unset'
            });
        }
        addCloseScreenShotButton();
        addResolutionsBar();
    });
}

function addDownloadButton () {
    //$('#container').append(downloadButton, modifyPhoto);
    $('#container').append(downloadButton);
    downloadPositon();

    $('.modifyPhoto').on('click tap', function() {
        $('#container').prepend($('<img>',{id:'drawingAreaImg',src:'assets/icons/transparent.png'}));

        if (resolution == 1) {
            tmpWidth = $('.screenBlurrNew > canvas').width();
            console.log(tmpWidth);
            tmpHeight = $('.screenBlurrNew > canvas').height();
            console.log(tmpHeight);
            console.log($('.screenBlurrNew > canvas').height()+' * '+$('.screenBlurrNew > canvas').width());
            tmpTopMargin = $('.screenBlurrNew > canvas').css('top');
            tmpLeftmMargin = $('.screenBlurrNew > canvas').css('margin-left');
            
            $('#drawingAreaImg').css({
                'top': tmpTopMargin,
                'left': tmpLeftmMargin,
                'width': tmpWidth,
                'height': tmpHeight
            });
        }

        else {
            $('#drawingAreaImg').css({
                'top': borderTopWidth,
                'left': borderSideWidth,
                'width': canvasWidth,
                'height': canvasHeight
            });
        }
        
        let markerArea = new markerjs2.MarkerArea(document.querySelector('#drawingAreaImg'));
        // register an event listener for when user clicks OK/save in the marker.js UI
        markerArea.addRenderEventListener(dataUrl => {
        // we are setting the markup result to replace our original image on the page
        // but you can set a different image or upload it to your server
        // dataUrl = 'assets/icons/transparent.png';
        document.querySelector('#drawingAreaImg').src = dataUrl;
    });
    markerArea.show();
    });
}

function downloadPositon () {
    //console.log('sss');
    if (resolutionChangeAllowed == false) {

        if ( (screenWidth > screenHeight) ) { /* Landscape */
                var tmp = (screenWidth - $('.screenBlurrNew > canvas').width())/2;
            $('.downloadScreenShot').css({
                bottom: 16,
                left: tmp
            }); 

            $('.modifyPhoto').css({
                bottom: 16,
                right: tmp
            }); 
        }

        else if ( (screenWidth < screenHeight) ) {  /* Portrait */
            $('.downloadScreenShot').css({
                bottom: 16,
                left: 16
            }); 

            $('.modifyPhoto').css({
                bottom: 16,
                right: 16
            }); 
        }

        else {
            $('.downloadScreenShot').css({
                bottom: borderBottomWidth - 16,
                right: 96
            }); 

            $('.modifyPhoto').css({
                bottom: borderBottomWidth - 16,
                left: 96
            }); 
        }
    }

    else {

        if ( resolution == 1 ) {
            var tmp = (screenWidth - $('.screenBlurrNew > canvas').width())/2;
            var tmp2 = ((screenHeight - $('.screenBlurrNew > canvas').height())/2) - 40 -16;
            $('.downloadScreenShot').css({
                bottom: tmp2,
                left: tmp
            }); 

            $('.modifyPhoto').css({
                bottom: tmp2,
                right: tmp
            }); 
        }

        else {
            $('.downloadScreenShot').css({
                bottom: borderBottomWidth - 32 - 40,
                left: borderSideWidth
            });

            $('.modifyPhoto').css({
                bottom: borderBottomWidth - 32 - 40,
                right: borderSideWidth
            });
        }
        
    }  
}

function initScreenCapture () {
    // skrytie elementov, ktoré nemajú byť zachytené
    hideElementDuringScreenCapture();
    pano.setVariableValue('hotspots', false);

    // kontrola, či sa má pridať element screenBlurNew
    if ( $('.screenBlurrNew').length == 0) {
        $('#container').append(screenShotDiv);
        //console.log('inicializácia funkcie initScreenCapture');
    }

    else {
        //console.log('už sa nachádza');
    }

    calculateCanvas();
    addTakeScreenShotButton();
    screenShotActive = true;  
    addResolutionsBar(); 
    addCloseScreenShotButton();
}

$('.screenCapture').on('click tap', function() {
    initScreenCapture();
});

function resizeCanvas(){
    calculateCanvas();
    //.log('Zmenilo sa rozlíšenie');
    

    if ($('.downloadScreenShot').length > 0 ) {
        $('.downloadScreenShot, .screenBlurrNew > canvas, .closeScreenShot').remove();
        addTakeScreenShotButton();
        addCloseScreenShotButton();
        $('.screenBlurrNew').css({
            'background-color': 'unset'
        });
    }
    addResolutionsBar();
}


