// Funkcie
function Media2x (variable_id, media_1, media_2) {
    switch (pano.getVariableValue(variable_id)) {
        case 1:
            hideMedia(media_1);
            hideMedia(media_2);
        break;
        case 2:
            showMedia(media_1);
            hideMedia(media_2);
        break;
        case 3:
            hideMedia(media_1);
            showMedia(media_2);
        break;                 
    }
}
function Media3x (variable_id, media_1, media_2, media_3) {
    switch (pano.getVariableValue(variable_id)) {
        case 1:
            hMedia([media_1,media_2,media_3]);
        break;
        case 2:
            hMedia([media_1,media_2,media_3]);
            showMedia(media_1);
        break;
        case 3:
            hMedia([media_1,media_2,media_3]);
            showMedia(media_2);
        break;  
        case 4:
            hMedia([media_1,media_2,media_3]);
            showMedia(media_3);
        break;                         
    }
}
// Kúpeľňa skinka + obklad postele
function Media4x (variable_id, media_1,media_2,media_3,media_4) {
    switch (pano.getVariableValue(variable_id)) {
        case 1:
            hMedia([media_1,media_2,media_3,media_4]);
        break;
        case 2:
            hMedia([media_1,media_2,media_3,media_4]);
            sMedia([media_1,media_2]);
        break;
        case 3:
            hMedia([media_1,media_2,media_3,media_4]);
            sMedia([media_3,media_4]);
        break;  
    }
}
function Media5x (variable_id,media_1,media_2,media_3,media_4,media_5) {
    switch (pano.getVariableValue(variable_id)) {
         case 1:
            hMedia([media_1,media_2,media_3,media_4,media_5]);
        break;
        case 2:
            hMedia([media_1,media_2,media_3,media_4,media_5]);
            sMedia([media_1]);
        break;
        case 3:
            hMedia([media_1,media_2,media_3,media_4,media_5]);
            sMedia([media_2,media_4]);
        break;                 
        case 4:
            hMedia([media_1,media_2,media_3,media_4,media_5]);
            sMedia([media_3,media_5]);
        break;                         
    }
}
function Media6x (variable_id, media_1, media_2, media_3, media_4,media_5,media_6) {
    switch (pano.getVariableValue(variable_id)) {
        case 1:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6]);
            //console.log('Skryl som ' + media_1 + ' a ' + media_2);
        break;
        case 2:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6]);
            sMedia([media_1,media_2,media_3]);
            //console.log('Zobrazil som ' + media_1 + ' a skryl som ' + media_2);
        break;
        case 3:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6]);
            sMedia([media_4,media_5,media_6]);
            //console.log('Zobrazil som ' + media_2 + ' a skryl som ' + media_1);
        break;                 
    }
}
function Media11x (variable_id, media_1, media_2, media_3, media_4, media_5, media_6, media_7, media_8, media_9, media_10, media_11) {
    switch (pano.getVariableValue(variable_id)) {
        case 1:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6,media_7,media_8,media_9,media_10,media_11]);
        break;
        case 2:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6,media_7,media_8,media_9,media_10,media_11]);
            showMedia(media_1);
        break;
        case 3:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6,media_7,media_8,media_9,media_10,media_11]);
            showMedia(media_2);
        break; 
        case 4:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6,media_7,media_8,media_9,media_10,media_11]);
            sMedia([media_3,media_4,media_5]);
        break; 
        case 5:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6,media_7,media_8,media_9,media_10,media_11]);
            sMedia([media_6,media_7,media_8]);
        break; 
        case 6:
            hMedia([media_1,media_2,media_3,media_4,media_5,media_6,media_7,media_8,media_9,media_10,media_11]);
            sMedia([media_9,media_10,media_11]);
        break;                 
    }
}
function FixBugPanoNode1() {
    hMedia(['Limec_schodik_black','Limec_schodik_grey','Limec_terasa_white','Limec_terasa_black','Limec_terasa_grey','Terasa_white_l','Terasa_white_r','Terasa_black_l','Terasa_black_r','Terasa_grey_l','Terasa_grey_r','Vypln_heraklit','Vypln_rastre']);
}
function FixBugPanoNode2() {
    hMedia(['Interier_podlaha_black_1','Interier_podlaha_black_2','Interier_podlaha_black_3','Interier_sokel_black','Interier_podlaha_grey_1','Interier_podlaha_grey_2','Interier_podlaha_grey_3','Interier_sokel_grey','Kuchyna_white','Kuchyna_black','Kuchyna_grey','Luster','Prisadene_svetla','Skrinka01']);
}
function FixBugPanoNode3() {
    hMedia(['Kupelna_sokel_black','Kupelna_podlaha_black','Kupelna_podlaha_grey','Kupelna_sokel_grey','Kupelna_skinka_black','Kupelna_skinka_grey']);
}

function activeAttributeBefore (classname) {
    $('.attribute-title > div').empty();
    $('.attribute-description > div').empty();
    $('.' + classname + '> .item').removeClass('active');
    $('.' + classname + '> .active-attribute-image').removeClass();
}

function activeAttributeAfter (classname) {
    $('.attribute-title > div').append(activeAttrName + '<span>'+activeAttrPrice+' €</span>');
    $('.attribute-description > div').append(activeAttrDesc);
    ShowMore();
    $('.' + classname + '>  div:first-child').addClass('active-attribute-image').addClass( $('.' + classname + '> .active').attr('class') );
    $('.full-active-attribute-image').removeAttr('class');
    $('.attributes-values.side').next().addClass('full-active-attribute-image').addClass('side').addClass( $('.' + classname + '> .active').attr('class') );
    $('.attributes-values.hts').next().addClass('full-active-attribute-image').addClass('hts').addClass( $('.' + classname + '> .active').attr('class') );
}

function FindActiveVariableA () {
    activeAttributeBefore('attr-A');
    switch (pano.getVariableValue('attribute_A')) {
        case 1: 
            $('.var-attribute_A-1').addClass('active');
            activeAttrName = attributeA.title[0];
            activeAttrPrice = attributeA.price[0];
            activeAttrDesc = attributeA.desc[0];
        break;
        case 2: 
            $('.var-attribute_A-2').addClass('active');
            activeAttrName = attributeA.title[1];
            activeAttrPrice = attributeA.price[1];
            activeAttrDesc = attributeA.desc[1];
        break;
        case 3: 
            $('.var-attribute_A-3').addClass('active');
            activeAttrName = attributeA.title[2];
            activeAttrPrice = attributeA.price[2];
            activeAttrDesc = attributeA.desc[2];
        break; 
        case 4: 
            $('.var-attribute_A-4').addClass('active');
            activeAttrName = attributeA.title[3];
            activeAttrPrice = attributeA.price[3];
            activeAttrDesc = attributeA.desc[3];
        break;                                                                                                
        case 5: 
            $('.var-attribute_A-5').addClass('active');
            activeAttrName = attributeA.title[4];
            activeAttrPrice = attributeA.price[4];
            activeAttrDesc = attributeA.desc[4];
        break; 
        case 6: 
            $('.var-attribute_A-6').addClass('active');
            activeAttrName = attributeA.title[5];
            activeAttrPrice = attributeA.price[5];
            activeAttrDesc = attributeA.desc[5];
        break; 
    }
    activeAttributeAfter('attr-A');
}

function FindActiveVariableB () {
    activeAttributeBefore('attr-B');
    switch (pano.getVariableValue('attribute_B')) {
        case 1: 
            $('.var-attribute_B-1').addClass('active');
            activeAttrName = attributeB.title[0];
            activeAttrPrice = attributeB.price[0];
            activeAttrDesc = attributeB.desc[0];
        break;
        case 2: 
            $('.var-attribute_B-2').addClass('active');
            activeAttrName = attributeB.title[1];
            activeAttrPrice = attributeB.price[1];
            activeAttrDesc = attributeB.desc[1];
        break;
        case 3: 
            $('.var-attribute_B-3').addClass('active');
            activeAttrName = attributeB.title[2];
            activeAttrPrice = attributeB.price[2];
            activeAttrDesc = attributeB.desc[2];
        break;                                                                                                
    }
    activeAttributeAfter('attr-B');
}

function FindActiveVariableC () {
    activeAttributeBefore('attr-C');
    switch (pano.getVariableValue('attribute_C')) {
        case 1: 
            $('.var-attribute_C-1').addClass('active');
            activeAttrName = attributeC.title[0];
            activeAttrPrice = attributeC.price[0];
            activeAttrDesc = attributeC.desc[0];
        break;
        case 2: 
            $('.var-attribute_C-2').addClass('active');
            activeAttrName = attributeC.title[1];
            activeAttrPrice = attributeC.price[1];
            activeAttrDesc = attributeC.desc[1];
        break;
        case 3: 
            $('.var-attribute_C-3').addClass('active');
            activeAttrName = attributeC.title[2];
            activeAttrPrice = attributeC.price[2];
            activeAttrDesc = attributeC.desc[2];
        break;                                                                                                
    }
    activeAttributeAfter('attr-C');
}

function FindActiveVariableD () {
    activeAttributeBefore('attr-D');
    switch (pano.getVariableValue('attribute_D')) {
        case 1: 
            $('.var-attribute_D-1').addClass('active');
            activeAttrName = attributeD.title[0];
            activeAttrPrice = attributeD.price[0];
            activeAttrDesc = attributeD.desc[0];
        break;
        case 2: 
            $('.var-attribute_D-2').addClass('active');
            activeAttrName = attributeD.title[1];
            activeAttrPrice = attributeD.price[1];
            activeAttrDesc = attributeD.desc[1];
        break;
        case 3: 
            $('.var-attribute_D-3').addClass('active');
            activeAttrName = attributeD.title[2];
            activeAttrPrice = attributeD.price[2];
            activeAttrDesc = attributeD.desc[2];
        break;                                                                                                
    }
    activeAttributeAfter('attr-D');
}

function FindActiveVariableE () {
    activeAttributeBefore('attr-E');
    switch (pano.getVariableValue('attribute_E')) {
        case 1: 
            $('.var-attribute_E-1').addClass('active');
            activeAttrName = attributeE.title[0];
            activeAttrPrice = attributeE.price[0];
            activeAttrDesc = attributeE.desc[0];
        break;
        case 2: 
            $('.var-attribute_E-2').addClass('active');
            activeAttrName = attributeE.title[1];
            activeAttrPrice = attributeE.price[1];
            activeAttrDesc = attributeE.desc[1];
        break;
        case 3: 
            $('.var-attribute_E-3').addClass('active');
            activeAttrName = attributeE.title[2];
            activeAttrPrice = attributeE.price[2];
            activeAttrDesc = attributeE.desc[2];
        break; 
        case 4: 
            $('.var-attribute_E-4').addClass('active');
            activeAttrName = attributeE.title[3];
            activeAttrPrice = attributeE.price[3];
            activeAttrDesc = attributeE.desc[3];
        break;                                                                                                        
    }
    activeAttributeAfter('attr-E');
}

function FindActiveVariableF () {
    activeAttributeBefore('attr-F');
    switch (pano.getVariableValue('attribute_F')) {
        case 1: 
            $('.var-attribute_F-1').addClass('active');
            activeAttrName = attributeF.title[0];
            activeAttrPrice = attributeF.price[0];
            activeAttrDesc = attributeF.desc[0];
        break;
        case 2: 
            $('.var-attribute_F-2').addClass('active');
            activeAttrName = attributeF.title[1];
            activeAttrPrice = attributeF.price[1];
            activeAttrDesc = attributeF.desc[1];
        break;
        case 3: 
            $('.var-attribute_F-3').addClass('active');
            activeAttrName = attributeF.title[2];
            activeAttrPrice = attributeF.price[2];
            activeAttrDesc = attributeF.desc[2];
        break;                                                                                                
    }
    activeAttributeAfter('attr-F');
}

function FindActiveVariableG () {
    activeAttributeBefore('attr-G');
    switch (pano.getVariableValue('attribute_G')) {
        case 1: 
            $('.var-attribute_G-1').addClass('active');
            activeAttrName = attributeG.title[0];
            activeAttrPrice = attributeG.price[0];
            activeAttrDesc = attributeG.desc[0];
        break;
        case 2: 
            $('.var-attribute_G-2').addClass('active');
            activeAttrName = attributeG.title[1];
            activeAttrPrice = attributeG.price[1];
            activeAttrDesc = attributeG.desc[1];
        break;
        case 3: 
            $('.var-attribute_G-3').addClass('active');
            activeAttrName = attributeG.title[2];
            activeAttrPrice = attributeG.price[2];
            activeAttrDesc = attributeG.desc[2];
        break;                                                                                                
    }
    activeAttributeAfter('attr-G');
}

function FindActiveVariableH () {
    activeAttributeBefore('attr-H');
    switch (pano.getVariableValue('attribute_H')) {
        case 1: 
            $('.var-attribute_H-1').addClass('active');
            activeAttrName = attributeH.title[0];
            activeAttrPrice = attributeH.price[0];
            activeAttrDesc = attributeH.desc[0];
        break;
        case 2: 
            $('.var-attribute_H-2').addClass('active');
            activeAttrName = attributeH.title[1];
            activeAttrPrice = attributeH.price[1];
            activeAttrDesc = attributeH.desc[1];
        break;
        case 3: 
            $('.var-attribute_H-3').addClass('active');
            activeAttrName = attributeH.title[2];
            activeAttrPrice = attributeH.price[2];
            activeAttrDesc = attributeH.desc[2];
        break;                                                                                                
    }
    activeAttributeAfter('attr-H');
}

function FindActiveVariableI () {
    activeAttributeBefore('attr-I');
    switch (pano.getVariableValue('attribute_I')) {
        case 1: 
            $('.var-attribute_I-1').addClass('active');
            activeAttrName = attributeI.title[0];
            activeAttrPrice = attributeI.price[0];
            activeAttrDesc = attributeI.desc[0];
        break;
        case 2: 
            $('.var-attribute_I-2').addClass('active');
            activeAttrName = attributeI.title[1];
            activeAttrPrice = attributeI.price[1];
            activeAttrDesc = attributeI.desc[1];
        break;
        case 3: 
            $('.var-attribute_I-3').addClass('active');
            activeAttrName = attributeI.title[2];
            activeAttrPrice = attributeI.price[2];
            activeAttrDesc = attributeI.desc[2];
        break;                                                                                                
    }
    activeAttributeAfter('attr-I');
}

// Fix Pano2VR bugu
pano.addListener('configloaded', function() {
    FixBugPanoNode1();
    FixBugPanoNode2();
    FixBugPanoNode3();

    /* Nastavenie základných hodnôt atribútov */
    activeAttrName = attributeA.title[0];
    activeAttrPrice = attributeA.price[0];
    activeAttrDesc = attributeA.desc[0];


    $('.active-attribute-image').removeClass();
    $('.attr-A > div:first-child').addClass('active-attribute-image').addClass( $('.attr-A > .active').attr('class') );
    $('.attr-B > div:first-child').addClass('active-attribute-image').addClass( $('.attr-B > .active').attr('class') );
    $('.attr-C > div:first-child').addClass('active-attribute-image').addClass( $('.attr-C > .active').attr('class') );
    $('.attr-D > div:first-child').addClass('active-attribute-image').addClass( $('.attr-D > .active').attr('class') );
    $('.attr-E > div:first-child').addClass('active-attribute-image').addClass( $('.attr-E > .active').attr('class') );
    $('.attr-F > div:first-child').addClass('active-attribute-image').addClass( $('.attr-F > .active').attr('class') );
    $('.attr-G > div:first-child').addClass('active-attribute-image').addClass( $('.attr-G > .active').attr('class') );
    $('.attr-H > div:first-child').addClass('active-attribute-image').addClass( $('.attr-H > .active').attr('class') );
    $('.attr-I > div:first-child').addClass('active-attribute-image').addClass( $('.attr-I > .active').attr('class') );
    $('.attr-J > div:first-child').addClass('active-attribute-image').addClass( $('.attr-J > .active').attr('class') );
    $('.attr-K > div:first-child').addClass('active-attribute-image').addClass( $('.attr-K > .active').attr('class') );
});

pano.on('changenode', function() {
    addClass(['.group-2'], 'hidden'); // skrytie druhej skupiny atribútov - bug
    $( "img[src^='media/Lustre_8K_1000px.png']" ).addClass('zIndex'); // fix bugu - prekrývanie Skrinky cez Luste

    switch (pano.getCurrentNode()) {      
        //Exteriér
        case 'node1': 
            Media11x ('attribute_A','Limec_schodik_black','Limec_schodik_grey','Limec_terasa_white','Terasa_white_l','Terasa_white_r','Limec_terasa_black','Terasa_black_l','Terasa_black_r','Limec_terasa_grey','Terasa_grey_l','Terasa_grey_r');     
            Media2x ('attribute_B','Vypln_heraklit','Vypln_rastre'); 
            // Zatvorenie videa "ADELKA" po skončení
            pano.getMediaObject('Adelka').addEventListener('ended', function() {
                pano.setMediaVisibility('Adelka', 0, 250);
                variableTrue(['hotspots']);
                pano.playPauseSound("koma", "1"); /* pustí zvuk na pozadí */
            });

            // Zatvorenie videa "ADELA" po skončení
            pano.getMediaObject('Adela').addEventListener('ended', function() {
                pano.setMediaVisibility('Adela', 0, 250);
                variableTrue(['hotspots']);
                pano.playPauseSound("koma", "1"); /* pustí zvuk na pozadí */
            });
        break;
        //Interiér
        case 'node2':            
            Media6x ('attribute_D','Interier_podlaha_black_1','Interier_podlaha_black_2','Interier_podlaha_black_3','Interier_podlaha_grey_1','Interier_podlaha_grey_2','Interier_podlaha_grey_3');     
            Media5x ('attribute_E','Kuchyna_white','Kuchyna_black','Kuchyna_grey','Interier_sokel_black','Interier_sokel_grey');   
            Media2x ('attribute_F','Luster','Prisadene_svetla'); 
            hMedia(['Skrinka01']);
            
            pano.getMediaObject('Skrinka01').addEventListener('ended', function() {
                pano.setMediaVisibility('Skrinka01', 0, 250);
                variableTrue(['hotspots']);
            });

            
        break;
        case 'node8':            
            Media6x ('attribute_D','Interier_podlaha_black_1','Interier_podlaha_black_2','Interier_podlaha_black_3','Interier_podlaha_grey_1','Interier_podlaha_grey_2','Interier_podlaha_grey_3');     
            Media5x ('attribute_E','Kuchyna_white','Kuchyna_black','Kuchyna_grey','Interier_sokel_black','Interier_sokel_grey');    
            Media2x ('attribute_F','Luster','Prisadene_svetla');  
            hMedia(['Skrinka02']);
            
            pano.getMediaObject('Skrinka02').addEventListener('ended', function() {
                pano.setMediaVisibility('Skrinka02', 0, 250);
                variableTrue(['hotspots']);
            });
        break;
        case 'node4':            
            Media6x ('attribute_D','Interier_podlaha_black_1','Interier_podlaha_black_2','Interier_podlaha_black_3','Interier_podlaha_grey_1','Interier_podlaha_grey_2','Interier_podlaha_grey_3');     
            Media5x ('attribute_E','Kuchyna_white','Kuchyna_black','Kuchyna_grey','Interier_sokel_black','Interier_sokel_grey');    
            Media2x ('attribute_F','Luster','Prisadene_svetla');  
            hMedia(['Skrinka03']); 

            pano.getMediaObject('Skrinka03').addEventListener('ended', function() {
                pano.setMediaVisibility('Skrinka03', 0, 250);
                variableTrue(['hotspots']);
            });
        break; 
        //Kúpeľňa 
        case 'node5':
            Media2x ('attribute_H','Kupelna_podlaha_black','Kupelna_podlaha_grey'); 
            Media4x ('attribute_I','Kupelna_skinka_black','Kupelna_sokel_black','Kupelna_skinka_grey','Kupelna_sokel_grey'); 
        break;
        case 'node6':
            Media2x ('attribute_H','Kupelna_podlaha_black','Kupelna_podlaha_grey'); 
            Media4x ('attribute_I','Kupelna_skinka_black','Kupelna_sokel_black','Kupelna_skinka_grey','Kupelna_sokel_grey'); 
        break;
        case 'node7':
            Media2x ('attribute_H','Kupelna_podlaha_black','Kupelna_podlaha_grey'); 
            Media4x ('attribute_I','Kupelna_skinka_black','Kupelna_sokel_black','Kupelna_skinka_grey','Kupelna_sokel_grey'); 
        break;  
        
        case 'node11': 
        Media11x ('attribute_A','Limec_schodik_black','Limec_schodik_grey','Limec_terasa_white','Terasa_white_l','Terasa_white_r','Limec_terasa_black','Terasa_black_l','Terasa_black_r','Limec_terasa_grey','Terasa_grey_l','Terasa_grey_r');     
        Media2x ('attribute_B','Vypln_heraklit','Vypln_rastre'); 
            

        // Zatvorenie videa "ADELKA" po skončení
        pano.getMediaObject('Adelka').addEventListener('ended', function() {
            pano.setMediaVisibility('Adelka', 0, 250);
            variableTrue(['hotspots']);
            pano.playPauseSound("koma", "1"); /* pustí zvuk na pozadí */
        });

        // Zatvorenie videa "ADELA" po skončení
        pano.getMediaObject('Adela').addEventListener('ended', function() {
            pano.setMediaVisibility('Adela', 0, 250);
            variableTrue(['hotspots']);
            pano.playPauseSound("koma", "1"); /* pustí zvuk na pozadí */
        });
    break;
    }
});

//Exteriér Limec
pano.addListener('varchanged_attribute_A', function() {
    switch (pano.getCurrentNode()) {
        case 'node1': 
            Media11x ('attribute_A','Limec_schodik_black','Limec_schodik_grey','Limec_terasa_white','Terasa_white_l','Terasa_white_r','Limec_terasa_black','Terasa_black_l','Terasa_black_r','Limec_terasa_grey','Terasa_grey_l','Terasa_grey_r');     
        break;
        case 'node11': 
        Media11x ('attribute_A','Limec_schodik_black','Limec_schodik_grey','Limec_terasa_white','Terasa_white_l','Terasa_white_r','Limec_terasa_black','Terasa_black_l','Terasa_black_r','Limec_terasa_grey','Terasa_grey_l','Terasa_grey_r');     
    break;
    

    }
});

// Exteriér Výplň
pano.addListener('varchanged_attribute_B', function() {
    switch (pano.getCurrentNode()) {
        case 'node1': 
            Media2x ('attribute_B','Vypln_heraklit','Vypln_rastre');     
        break;
        case 'node11': 
        Media2x ('attribute_B','Vypln_heraklit','Vypln_rastre');     
    break;
    }
});

// Podlaha
pano.addListener('varchanged_attribute_D', function() {
    switch (pano.getCurrentNode()) {
        case 'node2': 
            Media6x ('attribute_D','Interier_podlaha_black_1','Interier_podlaha_black_2','Interier_podlaha_black_3','Interier_podlaha_grey_1','Interier_podlaha_grey_2','Interier_podlaha_grey_3');     
        break;
        case 'node8': 
            Media6x ('attribute_D','Interier_podlaha_black_1','Interier_podlaha_black_2','Interier_podlaha_black_3','Interier_podlaha_grey_1','Interier_podlaha_grey_2','Interier_podlaha_grey_3');     
        break;
        case 'node4': 
            Media6x ('attribute_D','Interier_podlaha_black_1','Interier_podlaha_black_2','Interier_podlaha_black_3','Interier_podlaha_grey_1','Interier_podlaha_grey_2','Interier_podlaha_grey_3');     
        break;                        
    }
});

// Kuchyňa
pano.addListener('varchanged_attribute_E', function() {
    switch (pano.getCurrentNode()) {
        case 'node2': 
            Media5x ('attribute_E','Kuchyna_white','Kuchyna_black','Kuchyna_grey','Interier_sokel_black','Interier_sokel_grey');    
        break;
        case 'node8': 
            Media5x ('attribute_E','Kuchyna_white','Kuchyna_black','Kuchyna_grey','Interier_sokel_black','Interier_sokel_grey');    
        break;
        case 'node4': 
            Media5x ('attribute_E','Kuchyna_white','Kuchyna_black','Kuchyna_grey','Interier_sokel_black','Interier_sokel_grey');    
        break;
    }
});

// Svetlá
pano.addListener('varchanged_attribute_F', function() {
    switch (pano.getCurrentNode()) {
        case 'node2': 
            Media2x ('attribute_F','Luster','Prisadene_svetla');    
        break;
        case 'node8': 
            Media2x ('attribute_F','Luster','Prisadene_svetla');    
        break;
        case 'node4': 
            Media2x ('attribute_F','Luster','Prisadene_svetla');    
        break;
    }
});    

// Kúpeľňa podlaha
pano.addListener('varchanged_attribute_H', function() {
    switch (pano.getCurrentNode()) {
        case 'node5': 
            Media2x ('attribute_H','Kupelna_podlaha_black','Kupelna_podlaha_grey'); 
        break;
        case 'node6': 
            Media2x ('attribute_H','Kupelna_podlaha_black','Kupelna_podlaha_grey'); 
        break;
        case 'node7': 
            Media2x ('attribute_H','Kupelna_podlaha_black','Kupelna_podlaha_grey'); 
        break;
    }
});    

//Kúpeľňa skrinka
pano.addListener('varchanged_attribute_I', function() {
    switch (pano.getCurrentNode()) {
        case 'node5': 
        Media4x ('attribute_I','Kupelna_skinka_black','Kupelna_sokel_black','Kupelna_skinka_grey','Kupelna_sokel_grey'); 
        break;
        case 'node6': 
        Media4x ('attribute_I','Kupelna_skinka_black','Kupelna_sokel_black','Kupelna_skinka_grey','Kupelna_sokel_grey'); 
        break;
        case 'node7': 
        Media4x ('attribute_I','Kupelna_skinka_black','Kupelna_sokel_black','Kupelna_skinka_grey','Kupelna_sokel_grey'); 
        break;
    }
});   



// Zmena aktívneho prvku/atribútu pre skupinu attribute_A
pano.addListener('varchanged_attribute_A', function() {
    FindActiveVariableA();
});
// Zmena aktívneho prvku/atribútu pre skupinu attribute_B
pano.addListener('varchanged_attribute_B', function() {
    FindActiveVariableB();
});

// Zmena aktívneho prvku/atribútu pre skupinu attribute_C
pano.addListener('varchanged_attribute_C', function() {
   // $('.attr-C > .item').removeClass('active');
    $('.level-wrapper > .level').addClass('hidden');
    FindActiveVariableC();
}); 

// Zmena aktívneho prvku/atribútu pre skupinu attribute_D
pano.addListener('varchanged_attribute_D', function() {
   // $('.attr-D > .item').removeClass('active');
   FindActiveVariableD();
});  
    
// Zmena aktívneho prvku/atribútu pre skupinu attribute_E
pano.addListener('varchanged_attribute_E', function() {
   // $('.attr-E > .item').removeClass('active');
   FindActiveVariableE();
});   

// Zmena aktívneho prvku/atribútu pre skupinu attribute_F
pano.addListener('varchanged_attribute_F', function() {
    $('.attr-F > .item').removeClass('active');
    FindActiveVariableF();
});    

// Zmena aktívneho prvku/atribútu pre skupinu attribute_G
pano.addListener('varchanged_attribute_G', function() {
    $('.attr-G > .item').removeClass('active');
    FindActiveVariableG();
});    

// Zmena aktívneho prvku/atribútu pre skupinu attribute_H
pano.addListener('varchanged_attribute_H', function() {
    $('.attr-H > .item').removeClass('active');
    FindActiveVariableH();
});      

// Zmena aktívneho prvku/atribútu pre skupinu attribute_I
pano.addListener('varchanged_attribute_I', function() {
    $('.attr-I > .item').removeClass('active');
    FindActiveVariableI();
});  

// Zmena aktívneho prvku/atribútu pre skupinu attribute_J
pano.addListener('varchanged_attribute_J', function() {
    $('.attr-J > .item').removeClass('active');
    activeAttributeBefore('attr-J');
    switch (pano.getVariableValue('attribute_J')) {
        case 1: 
            $('.var-attribute_J-1').addClass('active');
        break;
        case 2: 
            $('.var-attribute_J-2').addClass('active');
        break;
        case 3: 
            $('.var-attribute_J-3').addClass('active');
        break;
        case 4: 
            $('.var-attribute_J-4').addClass('active');
        break;
        case 5: 
            $('.var-attribute_J-5').addClass('active');
        break;
        case 6: 
            $('.var-attribute_J-6').addClass('active');
        break;  
        case 7: 
            $('.var-attribute_J-7').addClass('active');
        break;  
        case 8: 
            $('.var-attribute_J-8').addClass('active');
        break;  
        case 9: 
            $('.var-attribute_J-9').addClass('active');
        break;  
        case 10: 
            $('.var-attribute_J-10').addClass('active');
        break;                                                                                                
    }
    activeAttributeAfter('attr-J');
});      

/*  Zmena zobrazenia aktívnej skupiny atribútov COLOR/MATERIAL*/
pano.addListener('varchanged_active_attr_group', function() {
    removeClass(['.attr-group'], 'active'); // všetkým skupinám atribútov odoberie classu Active 
    switch (pano.getVariableValue('active_attr_group')) {
        case 1: // Zvolená prvá skupiny atribútov (color)
            removeClass(['.group'], 'active');
            addClass(['.group-1'], 'active');

            switch (pano.getVariableValue('active_attribute')) {
                case 'attribute_A':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-A').addClass('active');
                    FindActiveVariableA();
                break;
                case 'attribute_C':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-C').addClass('active');
                    FindActiveVariableC();
                break;
                case 'attribute_D':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-D').addClass('active');
                    FindActiveVariableD();
                break;   
                case 'attribute_E':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-E').addClass('active');
                    FindActiveVariableE();
                break;  
                case 'attribute_F':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-F').addClass('active');
                    FindActiveVariableF();
                break;  
                case 'attribute_G':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-G').addClass('active');
                    FindActiveVariableG();
                break;   
                case 'attribute_H':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-H').addClass('active');
                    FindActiveVariableH();
                break;                      
                case 'attribute_I':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-I').addClass('active');
                    FindActiveVariableI();
                break;  
                case 'attribute_J':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-J').addClass('active');
                break;  
                case 'attribute_K':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-K').addClass('active');
                break;  
                case 'attribute_L':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-L').addClass('active');
                break;  
                case 'attribute_M':
                    removeClass(['.attr-group'], 'active');
                    $('.attr-M').addClass('active');
                break;                                                                                                                                                                                                                                
            }
        break;
        case 2: // Zvolená druhá skupiny atribútov (material)
            removeClass(['.group'], 'active');
            addClass(['.group-2'], 'active');
            switch (pano.getVariableValue('active_attribute')) {
                case 'attribute_B':
                    removeClass(['.attr-group'], 'active');
                    
                    $('.attribute-title > div').empty();
                    $('.attribute-description > div').empty();
                    $('.attr-B').addClass('active');
                    FindActiveVariableB();
                break;                                                                                                                                                                                                                 
            }             
    break; 
    }
});


// Akcie pri zmene hodnoty premennej attributes side
pano.addListener('varchanged_attributes_side', function() {
    switch (pano.getVariableValue('attributes_side')) {
        case true: 
            position = ($('.attributes-side').outerHeight() - 258);
            //console.log(position);
            $('.full-active-attribute-image.side').css('bottom', position);
            HideElement(['.layers-side','.map-side']); 
            ShowElement(['.attributes-side']); 
            variableFalse(['footer_map','footer_layers','footer_apartments','footer_apartments']);
            $('.left-side > .item').removeClass('active'); 
            variableFalse(['shortcuts']);      
            
            switch (pano.getVariableValue('active_attribute')) {
                case 'attribute_A': 
                    FindActiveVariableA();
                break;
                case 'attribute_B': 
                    FindActiveVariableB();
                break;
                case 'attribute_C': 
                    FindActiveVariableC();
                break;
                case 'attribute_D': 
                    FindActiveVariableD();
                break;
                case 'attribute_E': 
                    FindActiveVariableE();
                break;
                case 'attribute_F': 
                    FindActiveVariableF();
                break;
                case 'attribute_G': 
                    FindActiveVariableG();
                break;
                case 'attribute_H': 
                    FindActiveVariableH();
                break;
                case 'attribute_I': 
                    FindActiveVariableI();
                break;                                                
            }


            
            //ShowMore();
            
        break;
        case false:
            if (pano.getVariableValue('footer_floorplan') == true || pano.getVariableValue('footer_layers') == true || pano.getVariableValue('footer_chatbot') == true || pano.getVariableValue('footer_social') == true || pano.getVariableValue('footer_map') == true || pano.getVariableValue('footer_social') == true || pano.getVariableValue('footer_apartments') == true ) {
                $('.attr-group').removeClass('active');
                addClass(['.group-2'], 'hidden');
                HideElement(['.attributes-side']);   
            }
    
            else {
                $('.attr-group').removeClass('active');
                addClass(['.group-2'], 'hidden');
                HideElement(['.attributes-side']);   
            }
        break; 
    }
});


// počet slov, ktoré sa zobrazia v popise atribúty. Ostatné slová sa orežú.
var pocetSlov = 115;
function ShowMore () {
    if ($(".attribute-description > div").text().length > pocetSlov) {
        $(".attribute-description > div").textlimit(pocetSlov).append(' <span class="more">Zobraziť viac</span>');
    }
    else {   
    }
    
    $('.attribute-description > div > span.more').on('click touchstart', function() {
        $(".attribute-description > div").empty().append($fullText);
    });
}

/* aktivácia hotspotu - Atribúty HOTSPOT */ 
pano.addListener('varchanged_attributes_hotspot', function() {
    switch (pano.getVariableValue('attributes_hotspot')) {
        case true: 
            // $('.hts .hts-attributes').remmoveClass('hidden');
            addClass(['.attributes-hotspot'], 'active');
        break;
        case false: 
            // $('.hts .hts-attributes').addClass('hidden');
            removeClass(['.attributes-hotspot'], 'active');
        break;
    }
});
/* KONIEC aktivácia hotspotu - Atribúty */ 

// Funkcia na orezávanie textu.
var fullText = '';
$.fn.textlimit = function(limit)
{
    return this.each(function(index,val)                       
    {
        var $elem = $(this);
        var $limit = limit;
        var $strLngth = $(val).text().length;  // Getting the text
        $fullText = $(val).text();
        if($strLngth > $limit)
        {
          $($elem).text($($elem).text().substr( 0, $limit )+ "...");
        }
    })
};

var position = $('.active-attribute-image').offset();
//console.log(position);


var attributesHotspotIcon = $('.attr-hotspot-inner');
var attributesHotspot = $('.attributes-hotspot');