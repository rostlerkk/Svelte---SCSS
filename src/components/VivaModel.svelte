<script>
    let lastVisitedNode = "node1";
    let lastVisitedModel = "node30";
    let interactive_model = "Interactive 3D model";
    let select_houses = "Select houses";
    let lang = pano.getVariableValue("lang");

    let show_model_helper = true;

    let show_model = false
    

    export let vivaData;

    function translateButtons() {
        if (vivaData != null) {
            vivaData['houses']['additional_content'].forEach(element => {
                if (element.name == "Interactive 3D model") {
                    if (element.title_t[lang] != null) {
                        interactive_model = element.title_t[lang]
                    } else {
                        interactive_model = element.title_t["int"]
                    }
                }

            }); 
        }
    }

    translateButtons();
    

    // aktivácia jQuery
    const jq = window.$;

    pano.on("changednode", function() {
        let currentNode = pano.getCurrentNode();
        if (pano.getNodeUserdata(currentNode).copyright == "vyberovnik") {
            lastVisitedModel = currentNode;
        } else {
            lastVisitedNode = currentNode;
        }
    });

    pano.on("varchanged_lang", function() {
        translateButtons();
    });

    pano.on("varchanged_vivaModel", function() {
        switch (pano.getVariableValue("vivaModel")) {
            case true:
                pano.setVariableValue("blurred", true);
                

                if (show_model_helper) {
                    jq(".intro-help").removeClass("hidden");

                    jq("#3d-confirm").on("click", function() {
                        jq(".intro-help").addClass("hidden");
                    });
                    jq(".no-more").on("change", function() {
                        if(this.checked) {
                            show_model_helper = false;
                        } else {
                            show_model_helper = false;
                        
                        }
                    });
                } else {
                    jq(".intro-help").remove();
                }
                

                

                
                
                show_model = true;
                break;

            default : 
                //pano.setVariableValue("blurred", false);
                show_model = false;
            break;
        }
        
    });
    pano.on("varchanged_footer_apartments", function() {

        switch (pano.getVariableValue("footer_apartments")) {
            case true:
                
                jq(".orientation-button.model-off > div").html(interactive_model);
                pano.openNext('{' + lastVisitedModel + '}');                
                break;
        
            default:
                jq(".orientation-button.model-on > div").html(select_houses);
                pano.openNext('{' + lastVisitedNode + '}');
                break;
        }
    });

    jq('.rgt-arrow').on('click tap', function () {
        switch (pano.getCurrentNode()) {
            case 'node30':
            pano.openNext('{node31}');
            break;

            case 'node31':
            pano.openNext('{node32}');
            break;

            case 'node32':
            pano.openNext('{node33}');
            break;

            case 'node33':
            pano.openNext('{node30}');
            break;
        }
    });
    jq('.lft-arrow').on('click tap', function () {
    switch (pano.getCurrentNode()) {
        case 'node30':
        pano.openNext('{node33}');
        break;

        case 'node31':
        pano.openNext('{node30}');
        break;

        case 'node32':
        pano.openNext('{node31}');
        break;

        case 'node33':
        pano.openNext('{node32}');
        break;
    }
    });
</script>

{#if show_model}
    <div id="mySpriteSpin"></div>

    <script type='text/javascript'>
        $("#mySpriteSpin").spritespin({
          // path to the source images.
            source: SpriteSpin.sourceArray('../assets/3d/{frame}.jpg', {
                frame: [1,201],
            
            }),
            width: 420,
            height: 327,
            sense: -1,
            responsive: true,
            animate: false,
            plugins: [
            'progress',
            '360',
            'drag'
            ]
        });
        </script>
{/if}

<style lang="scss">
    /* your styles go here */
    #mySpriteSpin {
        position: absolute;
        top: 0px !important;
        left: 0px !important;
        z-index: 9 !important;
        padding: Opx !important;
        margin: 0px !important; 
        width: 100% !important;

        background: rgba(255, 254, 254, 0.5) 0% 0% no-repeat padding-box;
        backdrop-filter: blur(40px) !important;
        -webkit-backdrop-filter: blur(40px) !important;
        -moz-filter: blur(40px);
    }


    .spritespin {
    width: 100%;
    }
</style>