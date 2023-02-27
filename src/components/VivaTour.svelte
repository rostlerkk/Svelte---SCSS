<script>
    import { userLang } from '../store.js';
    import { aboutViva } from '../store.js';

    let is_tour_nodes = ['node1', 'node24','node12', 'node26','node6', 'node22', 'node3', 'node18', 'node5', 'node20'];

    export let vivaData, user_lang = null;

    userLang.subscribe(value => {
        user_lang = value;
    });

    let current_house = "start";

    
    let vivaTour, autoplay, blurred = false;
    let subtitles = true;

    // aktivácia jQuery
    const jq = window.$;

    pano.on("changenode", function () {
        select_active_house();

        if (pano.getNodeUserdata(pano.getCurrentNode()).copyright == "tour") {
            jq('.take-tour-button').removeClass('hidden');
        } else {
            jq('.take-tour-button').addClass('hidden');
        }

        
    });

        pano.on("varchanged_blurred", function() {
            blurred = pano.getVariableValue("blurred");
        });
    
        pano.on("varchanged_vivaTour", function() {
            console.log(pano.getVariableValue("vivaTour"));
            switch (pano.getVariableValue("vivaTour")) {
                
                case true:
                    vivaTour = true;
                    jq('.take-tour-button').addClass('playing');
                    break;
            
                default:
                    vivaTour = false;
                    jq('.take-tour-button').removeClass('playing');
                    break;
            }
        }) ;       
    

    function toggleAutoplay() {
        autoplay = !autoplay;
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

    function nextHouse() {
        for (let index = 0; index < is_tour_nodes.length; index++) {
            let node = pano.getCurrentNode();
            
            if (
                node == is_tour_nodes[index]
            ) {
                if (
                    node == is_tour_nodes[is_tour_nodes.length - 1]
                ) {
                    pano.openNext('{' + is_tour_nodes[0] + '}');
                    return;
                }

                else {
                    pano.openNext('{' + is_tour_nodes[index + 1] + '}');
                    return;
                }
            }
        }
    }


</script>

{#if vivaTour == true && blurred != true}
    <div class="pizda">{vivaData["houses"]}</div>
    {#if vivaData["houses"] != undefined}
            <div id="houses-info-container">
                <div class="houses-header">
                    <div class="buttons">
                        {#if autoplay}
                            <img class="play" src="assets/icons/play-houses.svg" alt="play" on:click={() => toggleAutoplay()}>
                        {:else}
                            <img class="pause" src="assets/icons/pause-houses.svg" alt="pause" on:click={() => toggleAutoplay()}>
                        {/if}                        
                        
                        <img class="toggle" src="assets/icons/toggle-houses.svg" alt="toggle" on:click={() => subtitles = !subtitles}>
                        
                            <button id="next-house" on:click={() => nextHouse()}>Next house</button>
                            
                        
                        
                        <button id="learn-more" class="learn-more" on:click={() => aboutViva.update(n => true)}>Learn more&nbsp;<span>Viva park</span></button>
                    </div>
                    <div class="{subtitles === true ? 'subtitles' : 'subtitles hidden'}">
                        <p>Welcome to the VIVA research park. Europe’s largest comparative research project for building materials.</p>
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