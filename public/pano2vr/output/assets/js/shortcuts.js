var x;
// Akcie pri zmene hodnoty premennej shortcuts
pano.addListener('varchanged_shortcuts', function() {
    switch (pano.getVariableValue('shortcuts')) {
        case true: 
            $('.viva-start').addClass('hidden');
            addClass(['.shortcuts', '.slider-bg'], 'move'); 
            $('.shortcuts > .shortcuts-icon').addClass('rotate');
            removeClass(['.shortcuts-navigation','.shortcuts-logo'], 'hidden');
            HideElement(['.footer']);
            addClass(['.mobile-footer, .screenCapture'], 'hidden');
            variableFalse(['footer_floorplan','footer_map','footer_chatbot','footer_social','attributes_side','attributes_hotspot','lang_menu','mobile_menu_left','mobile_menu_right']);
            addClass(['.hlp-layer'], 'active'); 

            

        break;
        case false:
            $('.shortcuts > .shortcuts-icon').removeClass('rotate');
            addClass(['.shortcuts-navigation', '.shortcuts-logo'], 'hidden');
            removeClass(['.shortcuts','.slider-bg'], 'move'); 
            ShowElement(['.footer']);
            removeClass(['.mobile-footer, .screenCapture'], 'hidden');
            removeClass(['.hlp-layer'], 'active'); 

            progressBar.removeClass('anim');
            clearInterval(interval);
            autoplay = false;
            autoplayIcon.removeAttr('style');
        break; 
    }
});

// Zapínanie a vypínanie AUTO TOUR selection

var progressBar = $('.progresbar');
function PlayTour() {
    progressBar.removeClass('anim');
    let tmp_node_id = pano.getCurrentNode();
    let tmp_id = pano.getNodeUserdata(pano.getCurrentNode()).source;
    let my_array = allArrays['panoArray'+sliderTags[0]];
    let current_index = my_array.indexOf(tmp_node_id) + 1;
    if (current_index >= my_array.length) {
        pano.openNext('{'+my_array[0]+'}');
    }

    else {
        pano.openNext('{'+my_array[current_index]+'}');
    }
    $('.progresbar').addClass('anim');
}

var interval;
var autoplay = false;
var autoplayIcon = $('.shortcuts-play');

autoplayIcon.on('click touchstart', function(){
    $(this).css('background-color','rgba(89, 86, 233, 1)');
    if (autoplay == false) {
        progressBar.addClass('anim');
        interval = setInterval(PlayTour, 5000);
    }
    autoplay = true;
});

stopAutoPlayIcon = $('.shortcuts-pause');
stopAutoPlayIcon.on('click touchstart', function(e){
    progressBar.removeClass('anim');
    clearInterval(interval);
    autoplay = false;
    autoplayIcon.removeAttr('style');
});

/* otvorenie ďalšej panorámy */
//END Zapínanie a vypínanie AUTO TOUR selection
var allArrays = {};

var sliderTags = ['house'];

let AllSliders = {};
pano.on("configloaded", function() {

    for (let index = 0; index < sliderTags.length; index++) {
        allArrays['panoArray'+sliderTags[index]] = pano.getNodesWithTag(sliderTags[index]);   
        $('.slider-'+sliderTags[index]).attr('id',sliderTags[index]);
    }


    for ( index = 0; index < sliderTags.length; index++) {
        AllSliders[sliderTags[index]] = pano.getNodesWithTag(sliderTags[index]);
        $('.slider-'+sliderTags[index]).attr('id',sliderTags[index]);
    }

    // --> vytvorenie HTML pre slider
    $('.slider-bg').append(
        '<div class="swiper">'+
                '<div class="swiper-wrapper"></div>'+
                '<div class="swiper-pagination"></div>'+
                    '<div class="swiper-button-prev"></div>'+
                    '<div class="swiper-button-next"></div>'+
                '</div>'+
        '</div>');

    let copyright = pano.getNodeUserdata(pano.getCurrentNode()).source;

    function open_swiper_slide() {
        $('.swiper-slide').unbind();
        $('.swiper-slide').on('click tap', function() {
            pano.openNext('{'+$(this).find('img').attr('data-url')+'}');
        });

        $('.swiper-button-next').unbind();
        $('.swiper-button-next').on('click tap', function () {
            let tmp_node_id = pano.getCurrentNode();
            let tmp_id = pano.getNodeUserdata(pano.getCurrentNode()).source;

            let my_array = allArrays['panoArray'+sliderTags[0]];

            let current_index = my_array.indexOf(tmp_node_id);
        
            if (current_index == my_array.length) {
                pano.openNext('{'+my_array[0]+'}');
            }

            else {
                pano.openNext('{'+my_array[current_index+1]+'}');
            }
        });

        $('.swiper-button-prev').unbind();
        $('.swiper-button-prev').on('click tap', function () {
            let tmp_node_id = pano.getCurrentNode();
            let tmp_id = pano.getNodeUserdata(pano.getCurrentNode()).copyright;

            let my_array = allArrays['panoArray'+sliderTags[0]];

            let current_index = my_array.indexOf(tmp_node_id);
        
            if (current_index == 0) {
                pano.openNext('{'+my_array[my_array.length]+'}');
            }

            else {
                pano.openNext('{'+my_array[current_index-1]+'}');
            }



        });
    }
    
    function add_slider($id) {
        //console.log($id);
        if ( $id != 'vyberovnik') {
            let id = sliderTags[0];
        
            for (let index = 0; index < allArrays['panoArray'+id].length; index++) {
                //console.log(allArrays['panoArray'+id][index]);
                swiper.appendSlide(['<div class="swiper-slide" data-url="'+allArrays['panoArray'+id][index]+'"><img data-url="'+allArrays['panoArray'+id][index]+'" src="images/node_image_'+allArrays['panoArray'+id][index]+'.png"><div class="node-title">'+ pano.getNodeUserdata(allArrays['panoArray'+id][index]).comment+'</div></div>']);
            }
            open_swiper_slide();
        }
    }

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        slidesPerView: 'auto',
        spaceBetween: 16,
        direction: 'horizontal',
        effect: 'slide',    
        centeredSlides : true,
        speed: 1000,
        slideActiveClass : 'slide-active',
        slideToClickedSlide : false,
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }

      });

      
    add_slider(pano.getNodeUserdata(pano.getCurrentNode()).copyright);

    pano.on('changenode', function() {
        //console.log('node id : ' +pano.getCurrentNode());
        //swiper.update();
        let active_node = pano.getCurrentNode();
        if ($('.swiper-wrapper').find('[data-url='+active_node+']') != null && $('.swiper-wrapper').find('[data-url='+active_node+']') != undefined) {
            //open_swiper_slide();

            let index_new = $('.swiper-wrapper').find('[data-url='+active_node+']').index();
            swiper.slideTo(index_new, 1000, true);
        }
    });

    $('.byt.f-cat > .tour').on('click tap', function() {
        console.log('sgd');
        swiper.removeAllSlides();
        let id = $(this).parent().attr('id').replace('byt-','');
        add_slider(id);
        swiper.update();
        swiper.slideTo(0);
        swiper.updateSlidesClasses(); 
    });

});

  