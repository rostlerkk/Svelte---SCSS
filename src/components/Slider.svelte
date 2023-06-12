<script>
    import { onMount } from 'svelte';
    import { sceneSlider } from '../store.js';
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';

    let mySlider, currentScene, openScene;
    let scenes = [];
    let scenesUserData = [];
    let sceneNavigation = true;

    sceneSlider.subscribe(value => {
		sceneNavigation = value;
	});

    //Splide options
    const options = { 
        rewind: true,
        focus    : 'center',
        trimSpace: false,
        fixedWidth: '240px',
        fixedHeight: '120px',
        pagination: false,
        gap   : '1rem',
    };

    // Pano2VR events
    pano.on('configloaded', function () {
        scenes = pano.getNodeIds();

        scenes.forEach(element => {
            scenesUserData = [...scenesUserData, pano.getNodeUserdata(element)]
        });

        pano.on('changenode', function () {
            currentScene = pano.getCurrentNode();

            for (let index = 0; index < scenes.length; index++) {
                const element = scenes[index];
                if (currentScene == element) {
                    mySlider.splide.go(index);
                }
            }
        });

        openScene = function(scene) {
            pano.openNext('{'+ scene +'}');
        }
    });

    // Splide events
    onMount( () => {
        mySlider.splide.on('active', function() {
            let scene = scenes[mySlider.splide.index];
            openScene(scene);
        })
    } );
</script>

<Splide bind:this={ mySlider } aria-label="My Favorite Images" class="{sceneNavigation ? '' : 'hidden'}" options={options}>
    {#each scenes as scene, index}
        <SplideSlide on:click={() => openScene(scene)}>
            <img src="pano2vr/output/images/thumbnail_nodeimage_{scene}.jpg" alt="Image 1" on:click={() => openScene(scene)}/>
            <span>{scenesUserData[index].title}</span>
        </SplideSlide>
    {/each}
</Splide>
    
   

<style lang="scss">
</style>