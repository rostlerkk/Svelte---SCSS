<script>   
    let gallery_iframe, gallery_html, gallery_images, gallery_video = "";

     pano.on("configloaded", function() {
        //gallery_iframe = pano.getVariableValue("gallery_iframe");
        pano.on("varchanged_gallery_iframe", function() {
            console.log("gallery_iframe");
            gallery_iframe = pano.getVariableValue("gallery_iframe");
        });

        //gallery_html = pano.getVariableValue("gallery_html");
        pano.on("varchanged_gallery_html", function() {
            console.log("gallery_html");
            gallery_html = pano.getVariableValue("gallery_html");
        });

        //gallery_images = "https://lipsum.app/id/1/1024x768, https://lipsum.app/id/2/1024x768";
        pano.on("varchanged_gallery_images", function() {
            console.log("gallery_images");
            gallery_images = pano.getVariableValue("gallery_images");
        });

        
        //gallery_video = "http://media.w3.org/2010/05/sintel/trailer.mp4";
        pano.on("varchanged_gallery_video", function() {
            console.log("gallery_video");
            gallery_video = pano.getVariableValue("gallery_video");
        });
    
    });

    // open Gallery iFrame modul
    $: {
        gallery_iframe;

        if (gallery_iframe != null && gallery_iframe != "") {
            
            const fancybox_iframe = new Fancybox.show([
                {
                    src: gallery_iframe,
                    type: "iframe"
                }
            ]);

            fancybox_iframe.on("destroy", (fancybox_iframe, slide) => {
                pano.setVariableValue("gallery_iframe","");
            });
        }
    }

    // open Gallery HTML modul
    $: {
        gallery_html;

        if (gallery_html != null && gallery_html != "") {
            
            const fancybox_html = new Fancybox.show([
                {
                    src: gallery_html,
                    type: "html",
                }
            ]);

            fancybox_html.on("destroy", (fancybox, slide) => {
                pano.setVariableValue("gallery_html","");
            });
        }
    }

    // open Gallery Images
    $: {
        gallery_images;

        if (gallery_images != null && gallery_images != "") {
            let gallery_src_ = gallery_images.split(",");

            let gallery_src = [];
        
            // crating array of oject
            for (let index = 0; index < gallery_src_.length; index++) {
                const image = gallery_src_[index];
                let tmp_object = {
                    src : image, 
                    type : "image"
                }
                gallery_src.push(tmp_object);
            }

            if (gallery_images != null && gallery_images != "") {
                const fancybox_images = new Fancybox.show(
                    gallery_src
                );

                fancybox_images.on("destroy", (fancybox_images, slide) => {
                    pano.setVariableValue("gallery_images","");
                });
            }

        }
    }

    // open Gallery Video modul
    $: {
        gallery_video;

        if (gallery_video != null && gallery_video != "") {
            console.log(gallery_video);
            const fancybox_video = new Fancybox.show([
                {
                    src: gallery_video,
                    type: "video"
                }
            ]);

            fancybox_video.on("destroy", (fancybox_video, slide) => {
                pano.setVariableValue("gallery_video","");
            });
        }
    }

    


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

<!-- <div id="fancy-panel">
    <a href="https://lipsum.app/id/1/1024x768" data-fancybox="gallery" data-caption="Optional caption"><i class="fa-solid fa-image"></i></a>
    <i class="fa-solid fa-images" on:click={() => show_gallery()}></i>
    <i class="fa-solid fa-circle-info" on:click={() => show_dialog()}></i>
    <a href="http://media.w3.org/2010/05/sintel/trailer.mp4" data-fancybox> <i class="fa-solid fa-video"></i> </a>

    <button data-fancybox data-src="#dialog-content">
        HTML element
      </button>
      
      <div id="dialog-content" style="display:none;">
        <h2>Hello, world!</h2>
        <p>
          <input type="text" value="HTML content" />
        </p>
      </div>
</div> -->



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