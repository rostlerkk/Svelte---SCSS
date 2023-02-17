function FixBugPanoNode1() {
    hMedia(['Adela','Adelka']);
}
function FixBugPanoNode2() {
    hMedia(['Skrinka']);
}

// Fix Pano2VR bugu
pano.addListener('configloaded', function() {
    FixBugPanoNode1();
    FixBugPanoNode2();
});

pano.on('changenode', function() {
    hMedia(['Adela','Adelka','Skrinka']);
});

