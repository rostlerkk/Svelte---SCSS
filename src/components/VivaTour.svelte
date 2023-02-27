<script>
    import { userLang } from '../store.js';
    import { aboutViva } from '../store.js';


    export let vivaData, user_lang = null;

    userLang.subscribe(value => {
        user_lang = value;
    });

    let current_house = "start";

    
    let vivaTour, autoplay, blurred = false;

    // aktivácia jQuery
    const jq = window.$;

    pano.on("changenode", function () {
        select_active_house();
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

            // case 'node16' :
            case 'node16' : 
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

</script>

{#if vivaTour == true && blurred != true}
    <div class="pizda">{vivaData["houses"]}</div>
    {#if vivaData["houses"] != undefined}
            <div id="houses-info-container">
                <div class="houses-header">
                    <div class="buttons">
                        <img class="play" src="assets/icons/play-houses.svg" alt="play">
                        <img class="pause hidden" src="assets/icons/pause-houses.svg" alt="pause">
                        <img class="toggle" src="assets/icons/toggle-houses.svg" alt="toggle">
                        {#each vivaData["houses"]["additional_content"] as item}
                            {#if item.name == "Video Tour button: Next"}
                                {#if !autoplay}
                                    <button id="next-house" on:click={() => toggleAutoplay()}>{item.title.split(' ', 1)[0]} house</button>
                                {:else}
                                    <button id="next-house" on:click={() => toggleAutoplay()}>{item.title.split(' ').pop()}</button>
                                {/if}
                                
                            {/if}
                        {/each}
                        
                        <button id="learn-more" class="learn-more" on:click={() => aboutViva.update(n => true)}>Learn more&nbsp;<span>Viva park</span></button>
                    </div>
                    <div class="subtitles hidden">
                        <p>Welcome to the VIVA research park. Europe’s largest comparative research project for building materials.</p>
                    </div>
                </div>
                <div class="houses-footer">
                    
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
                                <div id="house_2" class="{current_house === 'house_8' ? 'item active' : 'item'}" on:click={() => selectNode("node16")}><img class="icon" src="images/house-default.png" alt="house_2"><p>{item.content_t[user_lang]}</p></div>
                            {:else}
                                <div id="house_2" class="{current_house === 'house_8' ? 'item active' : 'item'}" on:click={() => selectNode("node16")}><img class="icon" src="images/house-default.png" alt="house_2"><p>{item.content_t["int"]}</p></div>
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