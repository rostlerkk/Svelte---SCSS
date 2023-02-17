"use strict";

var VideoChangeTime = 0;
pano.on('beforechangenode', function () {
  switch (pano.getCurrentNode()) {
    //Panorámy, kde je pinned video s ID localvideo
    case 'node2':
    case 'node4':
    case 'node8':
    case 'node12':
      VideoChangeTime = pano.soundGetTime('localvideo'); // console.log(VideoChangeTime);

      break;
  }
});
pano.on('changenode', function () {
  switch (pano.getCurrentNode()) {
    //Panorámy, kde je pinned video s ID localvideo   
    case 'node2':
    case 'node4':
    case 'node8':
    case 'node12':
      pano.soundSetTime('localvideo', VideoChangeTime);
      break;
  }
});