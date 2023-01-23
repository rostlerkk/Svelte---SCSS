<script>

    let map_link = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10500.902039411158!2d2.2913514905137315!3d48.85391001859112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1slv!2slv!4v1622011463926!5m2!1slv!2slv";
    
    pano.on("configloaded", function() {
        // pano.addVariable('gallery_iframe', 0, "lama");
        console.log(pano.getVariableValue("gallery_iframe"));
    });
    // Image gallery
    var gallery = [
    {
        src: "https://lipsum.app/id/2/800x600",
        thumb: "https://lipsum.app/id/2/80x80",
        caption: "First image",
    },
    {
        src: "https://lipsum.app/id/3/800x600",
        thumb: "https://lipsum.app/id/3/80x80",
        caption: "Second image",
    },
    {
        src: "https://lipsum.app/id/4/800x600",
        thumb: "https://lipsum.app/id/4/80x80",
        caption: "Third image",
    },
    ];

    function show_gallery() {
        Fancybox.show(gallery, {
        // Your options go here
        });
    }

    function show_dialog() {
        Fancybox.show([{ src: "#dialog-content", type: "inline" }]);
    }
</script>

<div id="fancy-panel">
    <a href="https://lipsum.app/id/1/1024x768" data-fancybox="gallery" data-caption="Optional caption"><i class="fa-solid fa-image"></i></a>
    <i class="fa-solid fa-images" on:click={() => show_gallery()}></i>
    <i class="fa-solid fa-circle-info" on:click={() => show_dialog()}></i>
    <a href="http://media.w3.org/2010/05/sintel/trailer.mp4" data-fancybox> <i class="fa-solid fa-video"></i> </a>
    <a href="{map_link}" data-fancybox data-type="iframe" data-preload="false" data-width="640" data-height="480"> <i class="fa-solid fa-map"></i></a>

    <button data-fancybox data-src="#dialog-content">
        HTML element
      </button>
      
      <div id="dialog-content" style="display:none;">
        <h2>Hello, world!</h2>
        <p>
          <input type="text" value="HTML content" />
        </p>
      </div>
</div>



<style lang="scss">
    #fancy-panel {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius : 6px;
    padding: 6px 16px;
    min-height: 20px;
    gap: 6px;

        a {
            position: relative;
            color: unset;
            
        }
    }

    
</style>