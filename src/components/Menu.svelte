<script>
    
    import { fade, fly } from 'svelte/transition';
    import { all_scenes_object } from '../store';
    let gallery_iframe, gallery_html, gallery_images, gallery_video = "";
    export let scenes, scenes_object, aktivna_scena_all_data;

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
    let our_location = pano.getVariableValue("our_location");
    let map_iframe = pano.getVariableValue("map_iframe");
    let settings_hotspots = pano.getVariableValue("settings_hotspots");
    let settings_autorotate = pano.getVariableValue("settings_autorotate");
    let settings_gyroscope = pano.getVariableValue("settings_gyroscope");
    let settings_sounds = pano.getVariableValue("settings_sounds");
    let all_hotspots = pano.getVariableValue("all_hotspots");
    let hts_luftansicht = pano.getVariableValue("hts_luftansicht");
    let scenes_count = 0;
    let scenes_categories = [];
    let scenes_categories_names = [];
    let selected_scenes_category = "all";

    pano.on("varchanged_all_hotspots", function setHotspots() {
        all_hotspots = pano.getVariableValue("all_hotspots");
    });
    pano.on("varchanged_hts_luftansicht", function setHotspots() {
        hts_luftansicht = pano.getVariableValue("hts_luftansicht");
    });
    pano.on("varchanged_settings_hotspots", function setHotspots() {
        settings_hotspots = pano.getVariableValue("settings_hotspots");
    });
    pano.on("varchanged_settings_autorotate", function setAutorotate() {
        let rotate = pano.getVariableValue("settings_autorotate");
        switch (rotate) {
            case false:
                pano.stopAutorotate();
                break;
        
            default:
                pano.startAutorotate("0.05");
                break;
        }
        
        settings_autorotate = rotate;
    });
    pano.on("varchanged_settings_gyroscope", function setGyroscope() {
        settings_gyroscope = pano.getVariableValue("settings_gyroscope");
    });
    pano.on("varchanged_settings_sounds", function setSounds() {
        settings_sounds = pano.getVariableValue("settings_sounds");

        switch (settings_sounds) {
            case true:
                pano.setVolume("_main", "1.0");
            break;
        
            default:
                pano.setVolume("_main", "0.0");
            break;
        }
    });

  function toggle_pano2vr_variable(parameter) {
    pano.setVariableValue(parameter, !pano.getVariableValue(parameter));
  }

  function changeSeason() {
    for (const [key, value] of Object.entries(scenes_object)) {
        const element = scenes_object[key];
        console.log(element);
        if (element.title == aktivna_scena_all_data.title && element.source != aktivna_scena_all_data.source ) {
            pano.openNext('{' + element.id + '}');
        }
    };
  }
</script>


  <div class="app" in:fade out:fade>
  </div>
  


<div id="header" in:fade out:fade>
    <div id="title"></div>
    <div id="title">
        {aktivna_scena_all_data.title}
    </div>
    <div class="weather">
        {#if aktivna_scena_all_data.source != ""}
             {#if aktivna_scena_all_data.source != ""}
                <i class="{aktivna_scena_all_data.source == "Sommer" ? "fa-solid fa-sun w-icon" : "fa-solid fa-snowflake w-icon"}" on:click={() => changeSeason()}></i>
            {/if}
            
        {/if}
    </div>
</div>
<div id="aside" in:fade out:fade></div>

<style lang="scss">

  $blur : blur(10px);
  $bg-color : hsla(0,0%,100%,.55);
  $box-shadow : rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    .menu-icon {
        position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: var(--hover-menu-bg);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background: var(--dropdown-bg);
    }
        i {
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color:white;
            font-size: 14px;
        }
    }

    #header {
      position: absolute;
      top: 10px;
      left: 10px;
      width: calc(100% - 20px);
      height: 50px;
      padding: 0px 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 0 solid #e5e7eb;
      background-color: $bg-color;
      backdrop-filter: $blur;
      -webkit-backdrop-filter: $blur;
      border-radius: 12px;
      box-shadow: $box-shadow;
      z-index: 10;

      .weather {
        width: 30px;
        height: 30px;
        background: #33475b;
        cursor: pointer;
        opacity: 0.7;
        transition: all 0.2s ease-in-out;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .weather:hover {
            opacity: 1
        }

      .weather > .w-icon {
           padding: 10px;
           border-radius: 50%;
           color: white;
           cursor: pointer;
           
       }

        


    }

    #aside {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      width: 50px;
      height: 100px;
      background-color: $bg-color;
      backdrop-filter: $blur;
      -webkit-backdrop-filter: $blur;
      border-radius: 12px;
      box-shadow: $box-shadow;
      z-index: 10;
      box-sizing: border-box;
    }
</style>
