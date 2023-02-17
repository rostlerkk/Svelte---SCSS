var autotur = false;


$('.chatbot').on('click touchstart', function(e){ 
    //autotur = true;

    if ( autotur == true) {
        if ( pano.getCurrentNode() == 'node1') {
            pano.moveTo('0','0','70', 1000); 
            $('.item.map').trigger('mouseover');   
        }
    
        else {
            pano.openNext('{node1}');
        }
    
    
        setTimeout(function () {
            pano.setVariableValue('autotour_help', true);
        }, 4000);    
    
        setTimeout(function () {
            pano.setVariableValue('autotour_help', false);
            pano.openNext('{node2}');
        }, 5000);
        setTimeout(function () {
            pano.moveTo('-48','0','70', 1000);
        }, 6000);
        setTimeout(function () {
            pano.setVariableValue('active_attr_group', '0');
            pano.setVariableValue('active_attribute', 'attribute_E');
            $('.attr-E').addClass('active');
            pano.setVariableValue('active_attr_group', '1');
            pano.setVariableValue('attributes_side', true);
            pano.setVariableValue('attributes_hotspot', false);
        }, 8000);
        setTimeout(function () {
            pano.setVariableValue('attribute_E', 1);
            pano.setVariableValue('attribute_I', 0);
        }, 9000);
        setTimeout(function () {
            pano.setVariableValue('attribute_E', 2);
            pano.setVariableValue('attribute_I', 1);
        }, 10000);
        setTimeout(function () {
            pano.setVariableValue('attribute_E', 3);
            pano.setVariableValue('attribute_I', 2);
        }, 11000); 
        setTimeout(function () {
            pano.setVariableValue('attribute_E', 4);
            pano.setVariableValue('attribute_I', 3);
        }, 12000);        
        setTimeout(function () {
            pano.setVariableValue('attributes_side', false);
        }, 13000);        
        setTimeout(function () {
            pano.moveTo('-120','-12','70', 1000);  
        }, 14000);  
    
        setTimeout(function () {
            pano.setVariableValue('active_attr_group', '0');
            pano.setVariableValue('active_attribute', 'attribute_D');
            $('.attr-D').addClass('active');
            pano.setVariableValue('active_attr_group', '1');
            pano.setVariableValue('attributes_side', true);
            pano.setVariableValue('attributes_hotspot', false);
        }, 16000);
        setTimeout(function () {
            pano.setVariableValue('attribute_D', 2);
            pano.setVariableValue('attribute_H', 2);
        }, 17000);
        setTimeout(function () {
            pano.setVariableValue('attribute_D', 3);
            pano.setVariableValue('attribute_H', 3);
        }, 18000);
    
        setTimeout(function () {
            pano.moveTo('-85','-11','70', 1000);  
        }, 19000); 
    
        setTimeout(function () {
            pano.setVariableValue('attributes_side', false);
        }, 20000);        
    
        setTimeout(function () {
            pano.setVariableValue('shortcuts', true);
        }, 21000);        
    
        setTimeout(function () {
            $('.shortcuts-play').trigger('click');
        }, 22000);  
        
        setTimeout(function () {
            $('.shortcuts-pause').trigger('click');
            pano.setVariableValue('shortcuts', false);
            pano.setVariableValue('settings', true);
        }, 36000);  
    
        setTimeout(function () {
            pano.setVariableValue('hotspots', false);
        }, 37000);  
    
        setTimeout(function () {
            pano.setVariableValue('hotspots', true);
        }, 38000); 
        
        setTimeout(function () {
            pano.setVariableValue('settings', false);
        }, 39000); 
    
        setTimeout(function () {
            $('.item.social').trigger('click');
        }, 40000); 
    
        setTimeout(function () {
            pano.setVariableValue('social', false);
            $('.global-info').trigger('click');
        }, 42000); 
    
        setTimeout(function () {
            pano.setVariableValue('infopanel', false);
        }, 45000); 
    
        setTimeout(function () {
            $('.item.map').trigger('click');
        }, 48000); 
    
        setTimeout(function () {
            pano.setVariableValue('footer_map', false);        
            pano.setVariableValue('map_full', true);        
        }, 52000); 
    
        setTimeout(function () {       
            pano.setVariableValue('map_full', false);        
        }, 56000); 
    

    }
    
    else {
        return
    }
});