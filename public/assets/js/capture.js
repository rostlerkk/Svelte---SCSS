$(window).on('load', function(){ 
/*
  $('.btn-default').on('click touchstart', function() {
    html2canvas(document.querySelector('.specific'), {
              allowTaint: true,
        foreignObjectRendering: true,
        imageTimeout: 0,
        proxy: 'http://localhost:50317/vgk-PKc0',
        useCORS: true,
        onrendered: function(canvas) {          
            document.body.appendChild(canvas);
          return Canvas2Image.saveAsPNG(canvas);
        },

    });
  });
  */
});




function takeScreenshot() {
    console.log('Začal som ..');
    html2canvas(document.querySelector('body'), {
        //allowTaint: false,
        //foreignObjectRendering: true,
        imageTimeout: 0,
        useCORS: true,
        onrendered: function(canvas) {          
            document.body.appendChild(canvas);
          return Canvas2Image.saveAsPNG(canvas);
        },
  });
}


