<script>
  import { current_component } from 'svelte/internal';
    import { userLang } from '../store.js';
    import { aboutViva } from '../store.js';
    import { vivaAutoPlay, vivaIntroAfterEnd, vivaIntro, model } from '../store.js';


    // aktivácia jQuery
    const jq = window.$;

    let isMobile = false;

    let prepni, _vivaIntro, _model = false;

    vivaIntro.subscribe(value => {
        _vivaIntro = value;
    });

    model.subscribe(value => {
        _model = value;
    });


    function checkDevice() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) {
                isMobile = true ;
                
            } else {
                isMobile = false;
            }
    }

    checkDevice();


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
    let subtitleTimeOut_2, subtitleTimeOut_3, subtitleTimeOut_4 = null;

    export let vivaData = null;
    //console.log(vivaData);
    let user_lang = pano.getVariableValue("lang");
    console.log(user_lang);

    userLang.subscribe(value => {
        if (value != undefined && value != "undefined") {
            user_lang = value;
        }
        
        
    });

    let current_house = "start";

    
    let vivaTour, blurred = false;
    let  autoplay = true;
    let subtitles = true;


    pano.on("changenode", function () {
        clearTimeout(timeOut);
        clearInterval(layersTimeOut);
        select_active_house();
        clearTimeout(subtitleTimeOut_2);
        clearTimeout(subtitleTimeOut_3);
        clearTimeout(subtitleTimeOut_4);
        prepni = false;
        

        if (pano.getNodeUserdata(pano.getCurrentNode()).copyright == "tour") {
            jq('.take-tour-button').removeClass('hidden');

        } else {            
            jq('.take-tour-button').addClass('hidden');
        }

        if (autoplay && pano.getVariableValue("vivaTour") == true) {
           play_patch_video();
        }

        if (pano.getVariableValue("vivaTour")) {
            loadSubtitles();
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
                vivaAutoPlay.update(n => true);

                jq('.take-tour-button').removeClass('hidden-desktop');
                break;
        
            default:
                vivaTour = false;
                jq('.take-tour-button').removeClass('playing');
                stop_video();
                clearTimeout(subtitleTimeOut_2);
                clearTimeout(subtitleTimeOut_3);
                clearTimeout(subtitleTimeOut_4);
                vivaAutoPlay.update(n => false);

                if (!isMobile) {
                    jq('.take-tour-button').addClass('hidden-desktop');
                }
                break;
        }
    }) ;  
    
    pano.on("varchanged_lang", function() {
        user_lang = pano.getVariableValue("lang");
        //console.log(user_lang);
    });
    
    

    function toggleAutoplay() {
        
        autoplay = !autoplay;
        vivaAutoPlay.update(n => autoplay);
        

        let currentNode = pano.getCurrentNode();
        let patchName = take_tour_data[currentNode].videos[0].id;



        if (autoplay == true) {
            prepni = true;
            loadSubtitles();
            let currentNode = pano.getCurrentNode();
            let patchName = take_tour_data[currentNode].videos[0].id;

            if (currentNode == "node1") {
                if (pano.getMediaObject("video_1").currentTime == pano.getMediaObject("video_1").duration) {
                    pano.setMediaVisibility( "video_2", true);  
                    pano.playSound("video_2");
                } else {
                    pano.setMediaVisibility(patchName, true);  
                    pano.playSound(patchName);

                    pano.getMediaObject(patchName).addEventListener('ended', function() {
                        pano.setMediaVisibility( "video_2", true);  
                        pano.playSound("video_2");
                        console.log("skončilo sa video");
                    //nextHouse();
                    });
                }
            } else {
                pano.setMediaVisibility(patchName, true);  
                pano.playSound(patchName);
                openLayersVideo();
                
                pano.getMediaObject(patchName).addEventListener('ended', function() {
                    
                    //console.log("skončilo sa video 2");
                    if (prepni) {
                        nextHouse();
                    }
                    
                });
            }
            

        } else {
            clearTimeout(subtitleTimeOut_2);
            clearTimeout(subtitleTimeOut_3);
            clearTimeout(subtitleTimeOut_4);

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
        //console.log("mením dom");
        clearTimeout(timeOut);
        clearTimeout(layersTimeOut);
        clearTimeout(subtitleTimeOut_2);
        clearTimeout(subtitleTimeOut_3);
        clearTimeout(subtitleTimeOut_4);

   
        
        for (let index = 0; index < is_tour_nodes.length; index++) {
            let node = pano.getCurrentNode();
            
            if (
                node == is_tour_nodes[index]
            ) {
                if (
                    node == "node20"
                ) {
                    
                    vivaAutoPlay.update(n => false);
                    autoplay = false;
                    vivaIntroAfterEnd.update(n => true);
                        
                    
                    if ($pan != null) {
                        //pano.openNext('{' + is_tour_nodes[0] + '}', "'" + $pan + "\/" + $tilt + "\/" + $fov + "'");
                        
                        
                       // pano.openNext('{' + is_tour_nodes[0] + '}');
                        //pano.setPanTiltFov($pan,$tilt,$fov);
                    }

                    else {
                        pano.openNext('{' + is_tour_nodes[0] + '}');
                        pano.setVariableValue("vivaTour", false);
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
        //console.log(pano.getMediaObject(patchName));

        jq.html5Loader({
            filesToLoad:   {
                "files": [{
                    "type":"VIDEO",
                    "sources": {
                        "mp4":{
                            "source": pano.getMediaObject(patchName).currentSrc,
                            "size": pano.getMediaObject(patchName).size
                        }
                    }
                }]
            }, // this could be a JSON or simply a javascript object
            onBeforeLoad:       function () {
                ////console.log("začínam buffer")
            },
            onComplete:         function () {
                ////console.log("video načítané, spúšťam video");
                //let video_patch_time = pano.getMediaObject(patchName).duration;
                let pan = take_tour_data[currentNode].videos[0].pan;
                let tilt = take_tour_data[currentNode].videos[0].tilt;
                let fov = take_tour_data[currentNode].videos[0].fov;

                pano.setMediaVisibility( patchName, true);    
                //pano.moveTo(pan, tilt, fov, 5);
                pano.setPanTiltFov(pan,tilt,fov);
                

                pano.playSound(patchName);
                loadSubtitles();

                switch (currentNode) {
                    case "node1":
                        pano.getMediaObject(patchName).addEventListener('ended', function() {
                            let lang = pano.getVariableValue("lang");

                            subitlesString = "";
                            if (vivaData["subtitles"].start_welcome_t[lang] != null) {
                                subitlesString += vivaData.subtitles.start_quote_t[lang] + "<br/>"               
                                subitlesString += vivaData.subtitles.start_quote_source_t[lang]+ "<br/>"               
                                subitlesString += vivaData.subtitles.start_come_along_t[lang]
                            } else {
                                subitlesString += vivaData.subtitles.start_quote_t["int"] + "<br/>"               
                                subitlesString += vivaData.subtitles.start_quote_source_t["int"]+ "<br/>"               
                                subitlesString += vivaData.subtitles.start_come_along_t["int"]
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
                        //console.log("skončilo sa video 3");
                        nextHouse();
                            
                        });
                        break;
                }
            
                

            

                openLayersVideo();
            },
            onElementLoaded:    function ( obj, elm) { 
                
            },
            onUpdate:           function ( percentage ) {
                ////console.log(parseInt(percentage));
            }
        });
        


    }

    function openLayersVideo() {
        
        let currentNode = pano.getCurrentNode();
        //console.log("asgag " + currentNode);
        let patchName = take_tour_data[currentNode].videos[0].id;

        jq.html5Loader({
            filesToLoad:   {
                "files": [{
                    "type":"VIDEO",
                    "sources": {
                        "mp4":{
                            "source": pano.getMediaObject(patchName).currentSrc,
                            "size": pano.getMediaObject(patchName).size
                        }
                    }
                }]
            }, // this could be a JSON or simply a javascript object
            onBeforeLoad:       function () {
                ////console.log("začínam buffer domu")
            },
            onComplete:         function () {
                ////console.log("video domu načítané, spúšťam video");
 
                openLayers();
            },
            onElementLoaded:    function ( obj, elm) { 
                
            },
            onUpdate:           function ( percentage ) {
               
            }
        });

        function openLayers() {
            pano.setVariableValue("playPauseMedia", true);
        }

        function checkEndVideo() {
            let currentNode = pano.getCurrentNode();
            let patchName = take_tour_data[currentNode].videos[0].id;
            if (pano.getMediaObject(patchName) != null) {
                if (pano.getMediaObject(patchName).currentTime  + 4 >  pano.getMediaObject(patchName).duration) {
                    
                    pano.setVariableValue("playPauseMedia", false);
                    clearInterval(layersTimeOut);
                }
            }
            
        }

        //console.log("is mobile : " + isMobile);
        switch (currentNode) {
            case "node1":
            case "node24":
            case "node26":
                
                break;
        
            default: 
                if (!isMobile) {
                    timeOut = setTimeout(openLayers, 2000);
                    layersTimeOut = setInterval(checkEndVideo, 1000);        
                }
                
                break;
        }

        
    }

    let subitlesString= "";

    function loadSubtitles() {
        
       // //console.log("načítavam titulky");
        subitlesString = "";
        if (vivaData["subtitles"] != null) {
        
            let lang = pano.getVariableValue("lang");
            
            switch (currentNode) {
                // exteriér
                case "node1":
                    //console.log(vivaData.subtitles.start_come_along_t);
                   // //console.log(pano.getMediaObject("video_1").currentTime + " : " + pano.getMediaObject("video_1").duration);
                    if (pano.getMediaObject("video_1").currentTime != pano.getMediaObject("video_1").duration ) {
                        if (vivaData["subtitles"].start_welcome_t[lang] != null) {
                            subitlesString += vivaData.subtitles.start_welcome_t[lang]
                            
                        } else {
                            subitlesString += vivaData.subtitles.start_welcome_t["int"]           
                        } 
                    } else {
                        if (vivaData["subtitles"].start_welcome_t[lang] != null) {
                            subitlesString += vivaData.subtitles.start_quote_t[lang] + "<br/>"               
                            subitlesString += vivaData.subtitles.start_quote_source_t[lang] + "<br/>"               
                            subitlesString += vivaData.subtitles.start_come_along_t[lang]
                        } else {
                            subitlesString += vivaData.subtitles.start_quote_t["int"] + "<br/>"               
                            subitlesString += vivaData.subtitles.start_quote_source_t["int"] + "<br/>"               
                            subitlesString += vivaData.subtitles.start_come_along_t["int"]
                        }
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
                    let subtitles_1, subtitles_2, subtitles_3, subtitles_4;
                    if (vivaData["subtitles"]["house_8_healthy_living_t"][lang] != null) {
                        subtitles_1 = vivaData["subtitles"]["house_8_healthy_living_t"][lang];
                        subtitles_2 = vivaData["subtitles"]["house_8_data_method_1_t"][lang];
                        subtitles_3 = vivaData["subtitles"]["house_8_data_method_2_t"][lang];
                        subtitles_4 = vivaData["subtitles"]["house_8_data_method_3_t"][lang];                                 
                    } else {
                        subtitles_1 = vivaData["subtitles"]["house_8_healthy_living_t"]["int"];
                        subtitles_2 = vivaData["subtitles"]["house_8_data_method_1_t"]["int"];
                        subtitles_3 = vivaData["subtitles"]["house_8_data_method_2_t"]["int"];
                        subtitles_4 = vivaData["subtitles"]["house_8_data_method_3_t"]["int"];            
                    }   

                    let currentTime = pano.getMediaObject("video_1").currentTime * 1000;
                    
                                        
                    function changeSub2() {
                        subitlesString = subtitles_2;
                    }

                    function changeSub3() {
                        subitlesString = subtitles_3;
                    }

                    function changeSub4() {
                        subitlesString = subtitles_4;
                    }
                        
                    if (vivaData["subtitles"]["house_8_healthy_living_time"] != null && autoplay) {
                        clearTimeout(subtitleTimeOut_2);
                        clearTimeout(subtitleTimeOut_3);
                        clearTimeout(subtitleTimeOut_4);

                        let first_time = parseFloat(vivaData["subtitles"].house_8_data_method_1_time.replace(':', '.'))*100 * 1000;
                        let second_time = parseFloat(vivaData["subtitles"].house_8_data_method_2_time.replace(':', '.'))*100 * 1000;
                        let third_time = parseFloat(vivaData["subtitles"].house_8_data_method_3_time.replace(':', '.'))*100 * 1000;
                        ////console.log(first_time + " | " + second_time + " | " + third_time);
                        
                        if (currentTime < first_time) {
                            ////console.log(currentTime);
                            subitlesString = subtitles_1;


                            subtitleTimeOut_2 = setTimeout(changeSub2, (first_time - currentTime));
                            subtitleTimeOut_3 = setTimeout(changeSub3, (second_time - currentTime));
                            subtitleTimeOut_4 = setTimeout(changeSub4, (third_time - currentTime));
                        }

                        if (currentTime >= first_time && currentTime < second_time) {
                            subitlesString = subtitles_2;
                            subtitleTimeOut_2 = setTimeout(changeSub2, (first_time - currentTime));
                            subtitleTimeOut_3 = setTimeout(changeSub3, (second_time - currentTime));
                            subtitleTimeOut_4 = setTimeout(changeSub4, (third_time - currentTime));

                        }

                        if (currentTime >= second_time && currentTime < third_time) {
                            subitlesString = subtitles_3;
                            
                            subtitleTimeOut_3 = setTimeout(changeSub3, (second_time - currentTime));
                            subtitleTimeOut_4 = setTimeout(changeSub4, (third_time - currentTime));
                        }

                        if (currentTime >= third_time) {
                            subitlesString = subtitles_4;
                            subtitleTimeOut_4 = setTimeout(changeSub4, (third_time - currentTime));
                        }

                        // setTimeout(() => {
                            
                        // }, timeout);

                    }
                    
                    break;                      
                default:
                    subitlesString = "";
                    break;
            }
            
        }
    }

    function opnehouseInfo() {
        console.log(pano.getVariableValue("houseID"));
        
        
        pano.setVariableValue("houseInfo", true);
    }

    let count = 0;
    function ifWalls() {
        count++;
        let goToStart = true;
        let node = pano.getCurrentNode();

        for (let index = 0; index < is_tour_nodes.length; index++) {
            
            
            if (
                node == is_tour_nodes[index]
            ) {
                goToStart = false;
            }
        }

        switch (goToStart) {
            case true:
                pano.openNext("{node1}", "");
                break;
        
            default:
                
                break;
        }

        pano.setVariableValue("vivaTour", true);
        vivaIntroAfterEnd.update(n => false);
    }

</script>

{#if vivaTour == true && blurred != true}
    {#if vivaData["houses"] != undefined}
            <div id="houses-info-container" class="{subtitles === false ? 'pointer' : ''}">
                <div class="houses-header">
                    
                    <div class="buttons">
                        {#if !autoplay}
                            <img class="play" src="assets/icons/play-houses.svg" alt="play" on:click={() => toggleAutoplay()}>
                        {:else}
                            <img class="pause" src="assets/icons/pause-houses.svg" alt="pause" on:click={() => toggleAutoplay()}>
                        {/if}                        
                        
                        <img class="toggle" src="assets/icons/toggle-houses.svg" alt="toggle" on:click={() => subtitles = !subtitles}>
                        
                        {#each vivaData["houses"]["additional_content"] as item}
                            {#if item.name == "VIVA: Startscreen: Play"}
                                {#if item.title_t[user_lang] != null}
                                    <button id="next-house" on:click={() => nextHouse()}>{item.title_t[user_lang]}</button>
                                {:else}
                                    <button id="next-house" on:click={() => nextHouse()}>{item.title_t["int"]}</button>
                                {/if}
                                
                            {:else}
                            {/if}
                        {/each}
                        
                        {#each vivaData["houses"]["additional_content"] as item}
                            {#if item.name == "Navigation: House info"}
                                {#if current_house != 'start'}
                                    {#if item.title_t[user_lang] != null}
                                        <button id="learn-more" class="learn-more" on:click={() => opnehouseInfo()}>{item.title_t[user_lang]}</button> 
                                    {:else}
                                        <button id="learn-more" class="learn-more" on:click={() => opnehouseInfo()}>{item.title_t["int"]}</button> 
                                    {/if}
                                {:else}
                                    {#if item.title_t[user_lang] != null}
                                        <button id="learn-more" class="learn-more" on:click={() => aboutViva.update(n => true)}>{item.title_t[user_lang]}</button> 
                                    {:else}
                                        <button id="learn-more" class="learn-more" on:click={() => aboutViva.update(n => true)}>{item.title_t["int"]}</button> 
                                    {/if}
                                {/if}
                            {:else}
                                
                            {/if}
                        {/each}
                        
                    </div>
                    <div class="{subtitles === true ? 'subtitles' : 'subtitles hidden'}">
                        <p>{@html subitlesString}</p>
                    </div>
                </div>
                <div class="{subtitles === true ? 'houses-footer' : 'houses-footer hidden'}">
                    
                    {#each vivaData["houses"]["additional_content"] as item}

                        {#if item.name.toLowerCase() == "tour section 1"}
                            {#if item.title_t[user_lang] != undefined}
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
{:else} 
    {#if !isMobile && vivaData["houses"] != undefined && _vivaIntro == false && blurred == false && _model == false}
        <div id="if-walls">
            <img src="images/if-walls.jpg" alt="">
            <div>
                {#each vivaData["houses"]["additional_content"] as item}
                    {#if item.name == "VIVA: Intro: Title"}
                        {#if item.title_t != undefined}
                            {#if item.title_t[user_lang] != undefined}
                                <h3>{item.title_t[user_lang]}</h3>
                            {:else}
                                <h3>{item.title_t["int"]}</h3>
                            {/if}
                        {/if}

                        {#if item.content_t != undefined}
                            {#if item.content_t[user_lang] != undefined}
                                <h5>{item.content_t[user_lang]}</h5>
                            {:else}
                                <h5>{item.content_t["int"]}</h5>
                            {/if}
                        {/if}
                    {/if}

                    {#if item.name == "VIVA: Intro: copy"}
                        {#if item.content_t != undefined}
                            {#if item.content_t[user_lang] != undefined}
                                <p>{item.content_t[user_lang]}</p>
                            {:else}
                                <p>{item.content_t["int"]}</p>
                            {/if}
                        {/if}
                    {/if}

                    {#if item.name == "VIVA: Startscreen: Play"}
                    {#if item.title_t != undefined}
                        {#if item.title_t[user_lang] != undefined}
                            <button on:click={() => ifWalls()}>{item.title_t[user_lang]}</button>
                        {:else}
                            <button on:click={() => ifWalls()}>{item.title_t["int"]}</button>
                        {/if}
                    {/if}
                {/if}
                    

                {/each}
                
            </div>
        </div>
    {/if}

    {#if isMobile && count == 0 && _vivaIntro == false && blurred == false && _model == false}
             <div id="tooltip-viva">
                {#each vivaData["houses"]["additional_content"] as item}
                    {#if item.name == "VIVA: Video Trigger Text"}
                        {#if item.title_t != undefined}
                            {#if item.title_t[user_lang] != undefined}
                                <h3>{item.title_t[user_lang]}</h3>
                            {:else}
                                <h3>{item.title_t["int"]}</h3>
                            {/if}
                        {/if}
                    {/if}
                {/each}

             </div>
        {/if}
{/if}


<style lang="scss">

#if-walls {
    position: absolute;
    width: calc(100% - 100px);
    max-width: 530px;
    z-index: 1;
    bottom: 90px;
    right: 50px;
    background-color: white;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    img {
        max-width: 180px;
        object-fit: cover;
    }

    div {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        h3 {
            color: #7ABB2E;
            font-size: 30px;
            margin: 0;
            order: 10;
        }

        h5 {
            margin: 0;
            color: #565751;
            font-size: 20px;
            order: 20;
        }

        p {
            font-size: 12px;
            order: 30;
        }

        button {
            border-radius: 12px;
            padding: 3px 8px 5px 24px;
            font-size: 12px;
            color: #565751;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            order: 40;

            &::before {
                content: '';
                display: block;
                position: absolute;
                left: 10px;
                background-image: url("../assets/icons/play-button.svg");
                width: 8px;
                height: 12px;
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
    }
}
    
</style>