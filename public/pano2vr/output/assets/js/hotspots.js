final = {};
$.ajax({
    url: 'pano.xml', // URL k vygenerovanému XML - Pano2VR
    dataType: 'xml',
    success: function(data){
        var xml_node = $('tour',data);
        var tmpArray = {};
        $.each(xml_node.find('panorama'), function() {
            nodeID = ($(this)[0].id); // Uloženie ID panorámy
            var Nodes = $(this).find('panorama>media>image');
            tmpArray[nodeID] = Nodes;
            final[nodeID] = [];
            // Uloženie ID patchov
            $.each(tmpArray[nodeID], function (index) {
                final[nodeID].push(tmpArray[nodeID][index].id);
            });
        });
    },
    error: function(data){
        console.log('Error loading XML data');
    },
    complete: function (data) {
        pano.on("changenode", function() {
            activeNode = pano.getCurrentNode();
            for (i = 0; i < final[activeNode].length; i++) {
                hideMedia(final[activeNode][i]);
            }
        });
       } 
});