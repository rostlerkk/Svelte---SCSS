var exterierNodes;
var interierNodes;
var currentNode;
var extIntNode = 'ext';

pano.on("configloaded", function() {
    exterierNodes = pano.getNodesWithTag('ext');
    interierNodes = pano.getNodesWithTag('int');    
    console.log(exterierNodes);
    console.log(interierNodes);
});


pano.on("changenode", function() {
    currentNode = pano.getCurrentNode();
    console.log(currentNode);

    if (
        exterierNodes.indexOf(currentNode) > -1 &&
        extIntNode == 'int'
        ) {
            console.log('exterérová pano');
            extIntNode = 'ext';
            //pano.playPauseSound('vzduch', 0);
            pano.playSound('vtaky_background');
        }

    else if (
            interierNodes.indexOf(currentNode) > -1 &&
            extIntNode == 'ext'
            ) {
                console.log('interérová pano');
                extIntNode = 'int';
                pano.playPauseSound('vtaky_background', 0);
                //pano.playSound('vzduch');
                
            }
    else {
        console.log('nezaradená pano');
    }
});