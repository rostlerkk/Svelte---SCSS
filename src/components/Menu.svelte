<script>
    
    import { fade, fly } from 'svelte/transition';
    import { all_scenes_object } from '../store';
    let gallery_iframe, gallery_html, gallery_images, gallery_video = "";
    export let scenes, scenes_object, aktivna_scena_all_data, startScene;

    let asideMenu, showFilter = false;

    let allHotspots = [];

    let hotspots_types = {
        0: {
            id : "luftansicht",
            icon : '<i class="fa-solid fa-helicopter"></i>',
            color: '#6c54a8',
            checked: true,
            pano_var: 'hts_luftansicht',
            enabled : false
        },
        1: {
            id : "bar",
            icon : '<i class="fa-solid fa-martini-glass"></i>',
            color: '#00855d',
            checked: true,
            pano_var: 'hts_bar',
            enabled : false
        },
        2: {
            id : "streetview",
            icon : '<i class="fa-solid fa-street-view"></i>',
            color: 'orange',
            checked: true,
            pano_var: 'hts_streetview',
            enabled : false
        },
        3: {
            id : "einkaufen",
            icon : '<i class="fa-solid fa-basket-shopping"></i>',
            color: '#d01a00',
            checked: true,
            pano_var: 'hts_einkaufen',
            enabled : false
        },
        4: {
            id : "optiker",
            icon : '<i class="fa-solid fa-glasses"></i>',
            color: '#3c84aa',
            checked: true,
            pano_var: 'hts_optiker',
            enabled : false
        },
        5: {
            id : "immobilien",
            icon : '<i class="fa-solid fa-chart-line"></i>',
            color: '#759643;',
            checked: true,
            pano_var: 'hts_immobilien',
            enabled : false
        },
        6: {
            id : "strandbad",
            icon : '<i class="fa-solid fa-water-ladder"></i>',
            color: '#4C8BF5',
            checked: true,
            pano_var: 'hts_strandbad',
            enabled : false
        },
        7: {
            id : "restaurant",
            icon : '<i class="fa-solid fa-utensils"></i>',
            color: '#ef923f',
            checked: true,
            pano_var: 'hts_restaurant',
            enabled : false
        },
        8: {
            id : "cafe",
            icon : '<i class="fa-solid fa-mug-saucer"></i>',
            color: '#b856b6',
            checked: true,
            pano_var: 'hts_cafe',
            enabled : false
        },
        9: {
            id : "hotel",
            icon : '<i class="fa-solid fa-hotel"></i>',
            color: '#aacc64',
            checked: true,
            pano_var: 'hts_hotel',
            enabled : false
        },
        10: {
            id : "mode",
            icon : '<i class="fa-solid fa-shirt"></i>',
            color: '#6c54a8',
            checked: true,
            pano_var: 'hts_mode',
            enabled : false
        },
        11: {
            id : "floristik",
            icon : '<i class="fa-solid fa-seedling"></i>',
            color: '#f8b30d',
            checked: true,
            pano_var: 'hts_floristik',
            enabled : false
        },
        12: {
            id : "businness",
            icon : '<i class="fa-solid fa-shop"></i>',
            color: '#4C8BF5',
            checked: true,
            pano_var: 'hts_businness',
            enabled : false
        },
        13: {
            id : "freizeit",
            icon : '<i class="fa-solid fa-camera"></i>',
            color: '#d01a00',
            checked: true,
            pano_var: 'hts_freizeit',
            enabled : false
        }
    };

    function getAllHotspots() {
      console.log(startScene)
        scenes_object.forEach(element => {
            pano.openNext('{' + element.id + '}');
            let array = pano.getCurrentPointHotspots();
            if (array.length > 0) {
                allHotspots = [...allHotspots, array];

                array.forEach(element => {
                  for (const [key, value] of Object.entries(hotspots_types)) {
                    if (element.ggId.toLowerCase() == value.id) {
                      value.enabled = true;
                    }
                };
                });
            }
        });
        console.log(allHotspots);

        pano.openNext('{' + startScene + '}');
    }

    getAllHotspots();
  

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

    var video = [
      {
        src: "https://www.youtube.com/watch?v=z2X2HaTvkl8",
        thumb: "http://i3.ytimg.com/vi/z2X2HaTvkl8/hqdefault.jpg",
      },
      {
        src: "https://www.youtube.com/watch?v=dZRqB0JLizw",
        thumb: "http://i3.ytimg.com/vi/dZRqB0JLizw/hqdefault.jpg",
      },
      {
        src: "https://vimeo.com/259411563",
        thumb: "https://f.vimeocdn.com/images_v6/lohp/video1_thumbnail.png",
      },
    ];

    var iframe = [
      {
        src: "https://heiligenblut.at/",
        type: "iframe",
        preload: false,
        width: 1000,
        height: 1000,
      },
    ];

    var map = [
      {
        src: "https://www.google.com/maps/@51.5039653,-0.1246493,14.12z",
        width: 800,
        height: 600,
      },
    ];

    function show_gallery(gallery) {
        Fancybox.show(gallery, {
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

    pano.on("varchanged_gallery", function setSounds() {
      
      //  let gallery_data = JSON.parse(pano.getVariableValue("gallery"));
        

        switch (gallery) {
            case "":
                
            break;
        
            default:
                show_gallery(gallery);
            break;
        }
    });

    pano.on("varchanged_video", function setSounds() {
      
      //  let gallery_data = JSON.parse(pano.getVariableValue("gallery"));
        

        switch (video) {
            case "":
                
            break;
        
            default:
                show_gallery(video);
            break;
        }
    });

    pano.on("varchanged_iframe", function setSounds() {
      
      //  let gallery_data = JSON.parse(pano.getVariableValue("gallery"));
        

        switch (iframe) {
            case "":
                
            break;
        
            default:
                show_gallery(iframe);
            break;
        }
    });

    pano.on("varchanged_map", function setSounds() {
      
      //  let gallery_data = JSON.parse(pano.getVariableValue("gallery"));
        

        switch (iframe) {
            case "":
                
            break;
        
            default:
                show_gallery(iframe);
            break;
        }
    });

    

  function toggle_pano2vr_variable(parameter) {
    console.log(parameter);
    pano.setVariableValue(parameter, !pano.getVariableValue(parameter));
  }

  function changeSeason() {
    for (const [key, value] of Object.entries(scenes_object)) {
        const element = scenes_object[key];
        
        if (element.title == aktivna_scena_all_data.title && element.source != aktivna_scena_all_data.source ) {
            console.log(element);
            pano.openNext('{' + element.id + '}');
        }
    };
  }

  function showAll() {
    for (const [key, value] of Object.entries(hotspots_types)) {
        value.checked = true;
    };
    hotspots_types = hotspots_types;
  }

  $: {
    hotspots_types;
    for (const [key, value] of Object.entries(hotspots_types)) {
        pano.setVariableValue(value.pano_var, value.checked);
    };

  }

  
</script>
  
    <div id="header" in:fade out:fade>
        <div class="flex-row">
            <div class="header-icon" on:click={() => showFilter = !showFilter}>
                <i class="fa-solid fa-filter"></i>
            </div>
            <div class="header-icon active" on:click={() => changeSeason()}>    
                {#if aktivna_scena_all_data.source != ""}
                    <i class="{aktivna_scena_all_data.source == "Sommer" ? "fa-solid fa-sun w-icon" : "fa-solid fa-snowflake w-icon"}"></i>
                {/if}
            </div>
        </div>
        <div id="title">
            {aktivna_scena_all_data.title}
        </div>
        <div class="flex-row">
            <div class="header-icon" class:active={settings_autorotate}>
                <i class="fa-solid fa-arrows-rotate" on:click={() => toggle_pano2vr_variable('settings_autorotate')}></i>
            </div>
            <div class="header-icon">
                <i class="fa-solid fa-vr-cardboard" on:click={() => pano.toggleVR()}></i>
            </div>
            <div class="header-icon" class:active={all_hotspots}>
                <i class="fa-solid fa-location-dot" on:click={() => toggle_pano2vr_variable('all_hotspots')}></i>
            </div>

            
        </div>
    </div>

    <div class:active={showFilter} id="off-canvas-menu">
        <div id="filter">
            <div class="filter-title"><span on:click={() => showFilter = !showFilter}>Close filter</span><span on:click={() => showAll()}>Show all</span></div>
            {#each Object.entries(hotspots_types) as [index, value]}
            {#if value.enabled}
              <div class="checkbox flexx" >
                <label class="switch has-label">
                    <div class="switch-icon">
                        <input type="checkbox" bind:checked={value.checked} name="checkbok-1" id="checkbok-1" />
                        <span class="track"><span class="thumb"></span></span>
                    </div>
                    <div class="row">
                        <div style="color: {value.color}">
                            {@html value.icon}
                        </div>
                        <div class="label-title">{value.id}</div>
                        
                    </div>
                </label>
                    
                    <!-- {@html value.icon}
                    <span>{value.id}</span>  -->
                
              </div>
            {/if}
            
            {/each}
        </div>
    </div>

    <div id="footer">
        <div class="menu">
            
        </div>
        <div class="menu">
            <a>Datenschutz</a>
            <a>Disclaimer</a>
            <a>Impressum</a>
        </div>
    </div>


<style lang="scss">

  $blur : blur(10px);
  $bg-color : hsla(0,0%,100%,.55);
  $box-shadow : rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  #footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: auto;
    padding: 4px 16px;
    background-color: rgba(4, 145, 208, 0.8);
    display: flex;
    justify-content: space-between;
    align-content: center;
    z-index: 10;
    color: white;
    font-size: 12px;
    box-sizing: border-box;

    .menu {
        display: flex;
        justify-content: space-between;
        align-content: center;
        gap: 10px;
        height: 100%;
    }
  }

  #filter {
    display: flex;
    flex-direction: column;
  }

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
      height: 36px;
      padding: 0px 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 0 solid #e5e7eb;
      background-color: $bg-color;
      backdrop-filter: $blur;
      -webkit-backdrop-filter: $blur;
      border-radius: 6px;
      box-shadow: $box-shadow;
      z-index: 10;
      transition: all 0.2s ease-in-out;
      

      .header-icon {
        width: 26px;
        height: 26px;
        background: #33475b;
        cursor: pointer;
        opacity: 0.6;
        transition: all 0.2s ease-in-out;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);

        &.active, &:hover {
            opacity: 1
        }
      }

     

      .weather > .w-icon {
           border-radius: 4px;
           color: #111111;
           cursor: pointer;
           
           
       }

        


    }

    #aside {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%) scaleY(0.4);
      width: 30px;
      height: 100px;
      background-color: $bg-color;
      backdrop-filter: $blur;
      -webkit-backdrop-filter: $blur;
      border-radius: 6px;
      box-shadow: $box-shadow;
      z-index: 10;
      box-sizing: border-box;
      
      transition: transform 0.26s ease;

        &.active {
            height: calc(100% - 60px);
            margin-top: 24px;
            width: 60px;
            transform: translateY(-50%) scaleY(1);
        }
    }

    #off-canvas-menu {
        position: absolute;
        top: 0px;
        left: -252px;
        width: 250px;
        height: 100%;
        z-index: 100;
        border: 0 solid #e5e7eb;
        background-color: $bg-color;
        backdrop-filter: $blur;
        -webkit-backdrop-filter: $blur;
        box-shadow: $box-shadow;
        z-index: 10;
        transition: all 0.2s ease-in-out;
        opacity: 0;

        &.active {
            left: 0px;
            opacity: 1;
        }
    }
    
/* Main Component Styles */
label.checkbox {
  position: relative;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
}
label.checkbox .check-icon {
  position: relative;
  display: inline-block;
  height: 14px;
  width: 14px;
  border: solid 1px #d6dce3;
  background-color: #f0f3f6;
  border-radius: 3px;
  transition: 0.2s all ease-in-out;
}
label.checkbox .check-icon:before {
  content: "";
  position: absolute;
  inset: 0;
  transition: 0.2s all ease-in-out;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg aria-hidden='true' focusable='false' data-prefix='far' data-icon='check' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='svg-inline--fa fa-check fa-w-16' style=''%3e%3cpath fill='%23fff' d='M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z' class=''%3e%3c/path%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 65%;
  background-position: center center;
  transform: scale(1.3);
  opacity: 0;
}
label.checkbox input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
label.checkbox input[type=checkbox]:checked + .check-icon {
  border-color: #3057d5;
  background: #3057d5;
}
label.checkbox input[type=checkbox]:checked + .check-icon:before {
  transform: scale(1);
  opacity: 1;
}
label.checkbox input[type=checkbox]:focus ~ .check-icon {
  box-shadow: 0 0 0 4px rgba(47, 86, 212, 0.1);
}
label.checkbox > div:first-child {
  display: inline-flex;
}
label.checkbox.checkbox-square .check-icon {
  border-radius: 0;
}
label.checkbox.checkbox-circular .check-icon {
  border-radius: 50%;
}
label.checkbox.has-label {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  align-items: center;
}
label.checkbox.has-label-multiple {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  align-items: flex-start;
}
label.checkbox.has-label-multiple .check-icon {
  top: 5px;
}

label.radio {
  position: relative;
}
label.radio .radio-icon {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: solid 1px #d6dce3;
  background-color: #f0f3f6;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
}
label.radio .radio-icon:before {
  content: "";
  position: absolute;
  inset: 0;
  transition: all 0.2s ease-in-out;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='circle' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='svg-inline--fa fa-circle fa-w-16'%3e%3cpath fill='%23fff' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z' class=''%3e%3c/path%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center center;
  opacity: 0;
}
label.radio input[type=radio] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
label.radio input[type=radio]:checked + .radio-icon {
  background: #2f57d5;
  border-color: #2f57d5;
}
label.radio input[type=radio]:checked + .radio-icon:before {
  transform: scale(0.5);
  opacity: 1;
}
label.radio input[type=radio]:focus ~ .radio-icon {
  box-shadow: 0 0 0 4px rgba(47, 86, 212, 0.1);
}
label.radio > div:first-child {
  display: inline-flex;
}
label.radio.has-label {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  align-items: center;
}
label.radio.has-label-multiple {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  align-items: flex-start;
}
label.radio.has-label-multiple .radio-icon {
  top: 5px;
}

label.switch {
  --switch-size: 30px;
  --thumb-gap: 4px;
  --thumb-size: calc(var(--switch-size) * 0.55 - var(--thumb-gap));
  --thumb-active-offset: calc(var(--switch-size) / 2);
  --track-radius: calc(var(--switch-size) / 1.6666);
  --thumb-color: #fff;
  --track-color: rgba(0, 0, 0, 0.07);
  --accent-color: rgba(4, 145, 208, 1.0);
  --transition: 200ms ease;
  cursor: pointer;
}
label.switch .track {
  width: var(--switch-size);
  height: calc(var(--switch-size) / 1.6666);
  background: var(--track-color);
  border-radius: var(--track-radius);
  border-radius: calc(var(--track-radius) / 2);
  display: flex;
  align-items: center;
  box-shadow: inset 0px 0px 4px -2px rgba(0, 0, 0, 0.129);
  transition: 250ms ease;
}
label.switch .thumb {
  display: inline-block;
  background: var(--thumb-color);
  width: var(--thumb-size);
  height: var(--thumb-size);
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
  transform: translateX(var(--thumb-gap));
  transition: transform 250ms ease-in-out;
}
label.switch input[type=checkbox] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
label.switch input[type=checkbox]:checked + .track {
  background: var(--accent-color);
}
label.switch input[type=checkbox]:checked + .track .thumb {
  transform: translateX(var(--thumb-active-offset));
}
label.switch input[type=checkbox]:focus + .track {
  box-shadow: inset 0px 0px 4px 1px rgba(0, 0, 0, 0.09);
}
label.switch.has-inidicator .thumb {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
label.switch.has-inidicator .thumb:before {
  content: "";
  position: absolute;
  width: 2px;
  height: 6px;
  background: #d71830;
}
label.switch.has-inidicator input[type=checkbox]:checked + .track .thumb:before {
  background: var(--accent-color);
}
label.switch.has-label {
  display: flex;
  grid-template-areas: "col-1 col-2 col-3";
  grid-gap: 10px;
  align-items: center;
}
label.switch.has-label .off {
  color: rgba(0, 0, 0, 0.6);
  grid-area: col-1;
  transition: var(--transition);
}
label.switch.has-label .on {
  color: rgba(0, 0, 0, 0.3);
  grid-area: col-3;
  transition: var(--transition);
}
label.switch.has-label .track {
  grid-area: col-2;
}
label.switch.has-label input[type=checkbox]:checked ~ .on {
  color: rgba(0, 0, 0, 0.6);
}
label.switch.has-label input[type=checkbox]:checked ~ .off {
  color: rgba(0, 0, 0, 0.3);
}

.row {
    display: flex;
    gap: 8px;
}

.switch-icon {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40px;
}

.flexx {
    cursor: pointer;
    border-bottom: 1px dashed #c0c0c5;
    height: 30px;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #f0f3f6;
    }
}

.label-title {
    font-size: 14px;
    text-transform: capitalize;
}

.filter-title {
    background-color: #bc2381;
    color: white;
    padding: 4px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
    }
}

.flex-row {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

#title {
    background: rgba(4, 145, 208, 0.8);
  color: white;
  font-size: 14px;
  padding: 2px 12px;
  border-radius: 4px;
}
</style>
