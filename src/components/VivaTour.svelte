<script>
    import { userLang } from '../store.js';
    import { aboutViva } from '../store.js';

    let is_tour_nodes = ['node1', 'node24','node12', 'node26','node6', 'node22', 'node3', 'node18', 'node5', 'node20'];
    let take_tour_data = {
        node1 : {
            id : 'node1', // Exterior_00
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    pan : -3,
                    tilt : -2.6,
                    fov: 60
                },
                1 : {
                    id : 'video_2',
                    visited : 0,
                    pan : -3,
                    tilt : -6,
                    fov: 60
                }
            }
        },
        node3 : {
            id : 'node3', // Exterior 02
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    pan : -20,
                    tilt : -10,
                    fov: 84
                }
            }
        },
        node18 : {
            id : 'node18', // Interior 02
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    // pan : -60,
                    // tilt: -22
                    pan : -25.01,
                    tilt: -10,
                    fov: 84
                }
            }
        },
        node5 : {
            id : 'node5', // Exterior 04
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    pan : -20.67,
                    tilt : -10,
                    fov: 84
                },
            }
        },
        node20 : {
            id : 'node20', // Interior 04
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    // pan : -60,
                    // tilt : -22, 
                    pan : -25.01,
                    tilt: -10,
                    fov: 84
                }
            }
        },
        node6 : {
            id : 'node6', // Exterior 06
            videos : {
                "active_video" : "video_1",
                0 : {
                    id : 'video_1',
                    visited : 0,
                    pan : -20.67,
                    tilt : -10,
                    fov: 84
                }
            }
        },
        node22 : {
            id : 'node22', // Interior 06
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    // pan : -60,
                    // tilt : -22
                    pan : -25.01,
                    tilt: -10,
                    fov: 84
                }
            }
        },
        // node16 : {
        //     id : 'node16', // Exterior 08
        //     videos : {
        //         0 : {
        //             id : 'video_1',
        //             visited : 0,
        //             pan : -20.67,
        //             tilt : 0.94
        //         }
        //     }
        // },
        node24 : {
            id : 'node24', // Interior 08
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    pan : -60,
                    tilt : -22,
                    fov: 84
                    
                }
            }
        },
        node12 : {
            id : 'node12', // Exterior 10
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    pan : -20.67,
                    tilt : -10,
                    fov: 84
                }
            }
        },
        node26 : {
            id : 'node26', // Interior 10
            videos : {
                0 : {
                    id : 'video_1',
                    visited : 0,
                    pan : -55,
                    tilt : -22,
                    fov: 84
                    
                },
            }
        }
    };

    let timeOut, layersTimeOut = null;

    export let vivaData, user_lang = null;

    userLang.subscribe(value => {
        user_lang = value;
    });

    let current_house = "start";

    
    let vivaTour, blurred = false;
    let  autoplay = true;
    let subtitles = true;

    // aktivácia jQuery
    const jq = window.$;

    pano.on("changenode", function () {
        clearInterval(timeOut);
        select_active_house();

        if (pano.getNodeUserdata(pano.getCurrentNode()).copyright == "tour") {
            jq('.take-tour-button').removeClass('hidden');
        } else {
            jq('.take-tour-button').addClass('hidden');
        }

        if (autoplay && pano.getVariableValue("vivaTour") == true) {
            
           play_patch_video();
        }
    });

    pano.on("varchanged_blurred", function() {
        blurred = pano.getVariableValue("blurred");
    });

    pano.on("varchanged_vivaTour", function() {
        
        switch (pano.getVariableValue("vivaTour")) {
            
            case true:
                vivaTour = true;
                jq('.take-tour-button').addClass('playing');
                play_patch_video();
                break;
        
            default:
                vivaTour = false;
                jq('.take-tour-button').removeClass('playing');
                stop_video();
                break;
        }
    }) ;       
    

    function toggleAutoplay() {
        autoplay = !autoplay;
        

        let currentNode = pano.getCurrentNode();
        let patchName = take_tour_data[currentNode].videos[0].id;

        if (autoplay == true) {
            let currentNode = pano.getCurrentNode();
            let patchName = take_tour_data[currentNode].videos[0].id;

            if (pano.getMediaObject("video_1").currentTime == pano.getMediaObject("video_1").duration) {
                pano.setMediaVisibility( "video_2", true);  
                pano.playSound("video_2");
            } else {
                pano.setMediaVisibility( patchName, true);  
                pano.playSound(patchName);
            }
            
            
            
            
        } else {

            if (pano.getMediaObject("video_1").currentTime == pano.getMediaObject("video_1").duration) {
                pano.pauseSound("video_2");
            } else {
                pano.pauseSound(patchName);
            }
            
            
        }
    }

    function select_active_house() {
        switch (pano.getCurrentNode()) {
            case 'node1' : 
                jq('#house_1').addClass('active');
                current_house = 'start';
            break;

            case 'node16' :
            case 'node24' : 
                jq('#house_2').addClass('active');
                current_house = 'house_8';
            break;

            case 'node12' : 
            case 'node26' : 
                jq('#house_3').addClass('active');
                current_house = 'house_10';
            break;

            case 'node6' : 
            case 'node22' : 
                jq('#house_4').addClass('active');
                current_house = 'house_6';
            break;

            case 'node3' : 
            case 'node18' : 
                jq('#house_5').addClass('active');
                current_house = 'house_2';
            break;

            case 'node5' : 
            case 'node20' : 
                jq('#house_6').addClass('active');
                current_house = 'house_4';
            break;
        }
    }

    function selectNode($parameter) {
        pano.openNext('{' + $parameter + '}');
    }

    function nextHouse($pan, $tilt, $fov) {
        
        for (let index = 0; index < is_tour_nodes.length; index++) {
            let node = pano.getCurrentNode();
            
            if (
                node == is_tour_nodes[index]
            ) {
                if (
                    node == is_tour_nodes[is_tour_nodes.length - 1]
                ) {
                    if ($pan != null) {
                        //pano.openNext('{' + is_tour_nodes[0] + '}', "'" + $pan + "\/" + $tilt + "\/" + $fov + "'");
                        pano.openNext('{' + is_tour_nodes[0] + '}');
                        //pano.setPanTiltFov($pan,$tilt,$fov);
                    }

                    else {
                        pano.openNext('{' + is_tour_nodes[0] + '}');
                    }
                    
                    return;
                }

                else {
                    if ($pan != null) {
                        pano.openNext('{' + is_tour_nodes[index + 1] + '}');
                        //pano.setPanTiltFov($pan,$tilt,$fov);
                        //pano.openNext('{' + is_tour_nodes[index + 1] + '}', "'" + $pan + "\/" + $tilt + "\/" + $fov + "'");
                    }
                    else {
                        pano.openNext('{' + is_tour_nodes[index + 1] + '}');
                    }
                    
                    return;
                }
            }
        }
    }

    function stop_video() {
        let currentNode = pano.getCurrentNode();
        let patchName = take_tour_data[currentNode].videos[0].id;
        pano.setMediaVisibility( patchName, false);  
        pano.stopSound(patchName);
        pano.stopSound("video_2");
        pano.setMediaVisibility( "video_2", false);  
        pano.setVariableValue("playPauseMedia", false);
        clearInterval(timeOut);
    }

    function play_patch_video() {
        subitlesString = "";
        let currentNode = pano.getCurrentNode();
        
        let patchName = take_tour_data[currentNode].videos[0].id;
        
        //let video_patch_time = pano.getMediaObject(patchName).duration;
        let pan = take_tour_data[currentNode].videos[0].pan;
        let tilt = take_tour_data[currentNode].videos[0].tilt;
        let fov = take_tour_data[currentNode].videos[0].fov;

        
        if (vivaData["subtitles"] != null) {
            
            let lang = pano.getVariableValue("lang");
            
            switch (currentNode) {
                // exteriér
                case "node1":
                    if (vivaData["subtitles"].start_welcome_t[lang] != null) {
                        subitlesString += vivaData.subtitles.start_welcome_t[lang]
                       
                    } else {
                        subitlesString += vivaData.subtitles.start_welcome_t["int"]           
                    }
                    
                    break;
                // Dom 10 - exteriér
                case "node12":
                    if (vivaData["subtitles"]["house_10_construction_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_10_welcome_t"][lang] + "<br/>"            
                        subitlesString += vivaData["subtitles"]["house_10_construction_t"][lang]            
                    } else {
                        subitlesString += vivaData["subtitles"]["house_10_welcome_t"]["int"] + "<br/>"            
                        subitlesString += vivaData["subtitles"]["house_10_construction_t"]["int"]            
                    }
                    break;

                // Dom 10 - interiér
                case "node26":
                    if (vivaData["subtitles"]["house_10_results_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_10_results_t"][lang]            
                    } else {
                        subitlesString += vivaData["subtitles"]["house_10_results_t"]["int"]            
                    }
                    break;                    
            
                // Dom 6 - exteriér
                case "node6":
                    if (vivaData["subtitles"]["house_6_construction_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_6_construction_t"][lang]            
                    } else {
                        subitlesString += vivaData["subtitles"]["house_6_construction_t"]["int"]            
                    }
                    break;                     

                // Dom 6 - interiér
                case "node22":
                    if (vivaData["subtitles"]["house_6_desc_1_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_6_desc_1_t"][lang] + "<br/>"            
                        subitlesString += vivaData["subtitles"]["house_6_method_1_t"][lang] + "<br/>"                     
                        subitlesString += vivaData["subtitles"]["house_6_method_2_t"][lang]
                    } else {
                        subitlesString += vivaData["subtitles"]["house_6_desc_1_t"]["int"] + "<br/>"            
                        subitlesString += vivaData["subtitles"]["house_6_method_1_t"]["int"] + "<br/>"                     
                        subitlesString += vivaData["subtitles"]["house_6_method_2_t"]["int"]       
                    }
                    break;
                // Dom 2 - exteriér
                case "node3":
                    if (vivaData["subtitles"]["house_2_construction_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_2_construction_t"][lang]           
                                          
                    } else {
                        subitlesString += vivaData["subtitles"]["house_2_construction_t"]["int"]           
                    }                    
                    break;                                         

                // Dom 2 - interiér
                case "node18":
                    if (vivaData["subtitles"]["house_2_research_1_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_2_research_1_t"][lang] + "<br/>"   
                        subitlesString += vivaData["subtitles"]["house_2_research_2_t"][lang]
                                          
                    } else {
                        subitlesString += vivaData["subtitles"]["house_2_research_1_t"]["int"] + "<br/>"            
                        subitlesString += vivaData["subtitles"]["house_2_research_2_t"]["int"]
                    }                    
                    break;   

                // Dom 4 - exteriér
                case "node5":
                    if (vivaData["subtitles"]["house_4_construction_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_4_construction_t"][lang]           
                                          
                    } else {
                        subitlesString += vivaData["subtitles"]["house_4_construction_t"]["int"]           
                    }                    
                    break;  
                    
                // Dom 4 - interiér
                case "node20":
                    if (vivaData["subtitles"]["house_4_method_1_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_4_method_1_t"][lang] + "<br/>"       
                        subitlesString += vivaData["subtitles"]["house_4_method_2_t"][lang]           
                                          
                    } else {
                        subitlesString += vivaData["subtitles"]["house_4_method_1_t"]["int"] + "<br/>"           
                        subitlesString += vivaData["subtitles"]["house_4_method_2_t"]["int"]           
                    }                    
                    break;  
                    
                // Dom 8 - interiér
                case "node24":
                    let subtitles_1, subtitles_2, subtitles_3;
                    if (vivaData["subtitles"]["house_8_healthy_living_t"][lang] != null) {
                        subitlesString += vivaData["subtitles"]["house_8_healthy_living_t"][lang]
                        let subtitleTimeOut = null;

                        subitlesString += vivaData["subtitles"]["house_8_data_method_1_t"][lang] + "<br/>"
                        subitlesString += vivaData["subtitles"]["house_8_data_method_2_t"][lang] + "<br/>" 
                        subitlesString += vivaData["subtitles"]["house_8_data_method_3_t"][lang]           
                                          
                    } else {
                        subitlesString += vivaData["subtitles"]["house_8_healthy_living_t"]["int"] + "<br/>"           
                        subitlesString += vivaData["subtitles"]["house_8_data_method_1_t"]["int"] + "<br/>"
                        subitlesString += vivaData["subtitles"]["house_8_data_method_2_t"]["int"] + "<br/>" 
                        subitlesString += vivaData["subtitles"]["house_8_data_method_3_t"]["int"]             
                    }                    
                    break;                      
                default:
                    subitlesString = "";
                    break;
            }
            
        }
        
        
        pano.setMediaVisibility( patchName, true);    
        //pano.moveTo(pan, tilt, fov, 5);
        pano.setPanTiltFov(pan,tilt,fov);
        

        pano.playSound(patchName);

        switch (currentNode) {
            case "node1":
                pano.getMediaObject(patchName).addEventListener('ended', function() {
                    let lang = pano.getVariableValue("lang");

                    subitlesString = "";
                    if (vivaData["subtitles"].start_welcome_t[lang] != null) {
                        subitlesString += vivaData.subtitles.start_quote_t[lang] + "<br/>"               
                        subitlesString += vivaData.subtitles.start_quote_source_t[lang]
                    } else {
                        subitlesString += vivaData.subtitles.start_quote_t["int"] + "<br/>"               
                        subitlesString += vivaData.subtitles.start_quote_source_t["int"]
                    }
                    pano.setMediaVisibility("video_2", true); 
                    pano.playSound("video_2");   

                    pano.getMediaObject("video_2").addEventListener('ended', function() {
                        nextHouse();
                    });
                    
                });
                break;
        
            default:
                pano.getMediaObject(patchName).addEventListener('ended', function() {
                    nextHouse();
                });
                break;
        }
        

        
        function openLayers() {
            pano.setVariableValue("playPauseMedia", true);
        }

        function checkEndVideo() {
            if (pano.getMediaObject(patchName).currentTime  + 4 >  pano.getMediaObject(patchName).duration) {
                pano.setVariableValue("playPauseMedia", false);
                clearInterval(layersTimeOut);
            }
        }

        switch (currentNode) {
            case "node1":
            case "node24":
                
                break;
        
            default:
                timeOut = setTimeout(openLayers, 2000);
                layersTimeOut = setInterval(checkEndVideo, 1000);
                break;
        }

    }

    let subitlesString= "";

</script>

{#if vivaTour == true && blurred != true}
    {#if vivaData["houses"] != undefined}
            <div id="houses-info-container">
                <div class="houses-header">
                    <div class="buttons">
                        {#if !autoplay}
                            <img class="play" src="assets/icons/play-houses.svg" alt="play" on:click={() => toggleAutoplay()}>
                        {:else}
                            <img class="pause" src="assets/icons/pause-houses.svg" alt="pause" on:click={() => toggleAutoplay()}>
                        {/if}                        
                        
                        <img class="toggle" src="assets/icons/toggle-houses.svg" alt="toggle" on:click={() => subtitles = !subtitles}>
                        
                            <button id="next-house" on:click={() => nextHouse()}>Next house</button>
                            
                        
                        
                        <button id="learn-more" class="learn-more" on:click={() => aboutViva.update(n => true)}>Learn more&nbsp;<span>Viva park</span></button>
                    </div>
                    <div class="{subtitles === true ? 'subtitles' : 'subtitles hidden'}">
                        <p>{@html subitlesString}</p>
                    </div>
                </div>
                <div class="{subtitles === true ? 'houses-footer' : 'houses-footer hidden'}">
                    
                    {#each vivaData["houses"]["additional_content"] as item}

                        {#if item.name.toLowerCase() == "tour section 1"}
                            {#if item.content_t[user_lang] != undefined}
                                <div id="house_1" class="{current_house === 'start' ? 'item active' : 'item'}" on:click={() => selectNode("node1")}><img class="icon" src="images/house-default.png" alt="house_1"><p>{item.title_t[user_lang]}</p></div>
                            {:else}
                                <div id="house_1" class="{current_house === 'start' ? 'item active' : 'item'}" on:click={() => selectNode("node1")}><img class="icon" src="images/house-default.png" alt="house_1"><p>{item.title_t["int"]}</p></div>
                            {/if}
                        {/if}

                        {#if item.name.toLowerCase() == "tour section 2"}
                            {#if item.content_t[user_lang] != undefined}
                                <div id="house_2" class="{current_house === 'house_8' ? 'item active' : 'item'}" on:click={() => selectNode("node24")}><img class="icon" src="images/house-default.png" alt="house_2"><p>{item.content_t[user_lang]}</p></div>
                            {:else}
                                <div id="house_2" class="{current_house === 'house_8' ? 'item active' : 'item'}" on:click={() => selectNode("node24")}><img class="icon" src="images/house-default.png" alt="house_2"><p>{item.content_t["int"]}</p></div>
                            {/if}
                        {/if}

                        {#if item.name.toLowerCase() == "tour section 3"}
                            {#if item.content_t[user_lang] != undefined}
                                <div id="house_3" class="{current_house === 'house_10' ? 'item active' : 'item'}" on:click={() => selectNode("node12")}><img class="icon" src="images/house-massive.png" alt="house_3"><p>{item.content_t[user_lang]}</p></div>
                                
                            {:else}
                                <div id="house_3" class="{current_house === 'house_10' ? 'item active' : 'item'}" on:click={() => selectNode("node12")}><img class="icon" src="images/house-massive.png" alt="house_3"><p>{item.content_t["int"]}</p></div>
                            {/if}
                        {/if}

                        {#if item.name.toLowerCase() == "tour section 4"}
                            {#if item.content_t[user_lang] != undefined}
                                <div id="house_4" class="{current_house === 'house_6' ? 'item active' : 'item'}" on:click={() => selectNode("node6")}><img class="icon" src="images/house-wooden.png" alt="house_4"><p>{item.content_t[user_lang]}</p></div>
                                
                            {:else}
                                <div id="house_4" class="{current_house === 'house_6' ? 'item active' : 'item'}" on:click={() => selectNode("node6")}><img class="icon" src="images/house-wooden.png" alt="house_4"><p>{item.content_t["int"]}</p></div>
                                
                            {/if}
                        {/if}

                        {#if item.name.toLowerCase() == "tour section 5"}
                            {#if item.content_t[user_lang] != undefined}
                                <div id="house_5" class="{current_house === 'house_2' ? 'item active' : 'item'}" on:click={() => selectNode("node3")}><img class="icon" src="images/house-aerated.png" alt="house_5"><p>{item.content_t[user_lang]}</p></div>
                                
                            {:else}
                                <div id="house_5" class="{current_house === 'house_2' ? 'item active' : 'item'}" on:click={() => selectNode("node3")}><img class="icon" src="images/house-aerated.png" alt="house_5"><p>{item.content_t["int"]}</p></div>
                                
                            {/if}
                        {/if}

                        {#if item.name.toLowerCase() == "tour section 6"}
                            {#if item.content_t[user_lang] != undefined}
                                <div id="house_6" class="{current_house === 'house_4' ? 'item active' : 'item'}" on:click={() => selectNode("node5")}><img class="icon" src="images/house-brick.png" alt="house_6"><p>{item.content_t[user_lang]}</p></div>
                                
                            {:else}
                                <div id="house_6" class="{current_house === 'house_4' ? 'item active' : 'item'}" on:click={() => selectNode("node5")}><img class="icon" src="images/house-brick.png" alt="house_6"><p>{item.content_t["int"]}</p></div>
                                
                            {/if}
                        {/if}

                    {/each}
                </div>
            </div>
        
        
    {/if}
    
{/if}


<style lang="scss">
    
</style>