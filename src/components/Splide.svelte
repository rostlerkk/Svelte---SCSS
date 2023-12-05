<script>
    import { onMount } from 'svelte';
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
    import {active_scene} from '../store';
    export let scenes;
    let slider = null;
    

    onMount(() => {
        setTimeout(() => {
            changeSlide();    
        }, 200);
        
    });

    $: {
        slider;
    }

    let aktivna_scena = null;
    active_scene.subscribe( value => {
        aktivna_scena = value;
        changeSlide();
    }); 

    function changeSlide() {
        if (aktivna_scena != null && slider != null) {
            for (let index = 0; index < scenes.length; index++) {
                const scena = scenes[index];
                if (scena == aktivna_scena) {
                    slider.go( index );
                }
            }
        }
    }

    function changeScene(scene) {
        console.log(scene);
        pano.openNext('{' + scene + '}');
    }

    const splideOption = {
        type   : 'slider',
        perPage : 3,
        focus: 'center',
        fixedWidth : 200,     // Presná šírka slidu
        fixedHeight: 100,  
        gap: 10,
        pagination: false,
        padding: '20%',
    }

   
</script>



<Splide options={ splideOption } aria-label="My Favorite Images" bind:this={slider}>
    {#each scenes as item}
        <SplideSlide>
            <div class:active-slide={ item == aktivna_scena}>
                <img src="pano2vr/output/images/thumbnail_nodeimage_{item}.jpg" alt="Image 1" on:click={e => { changeScene(item) }}/>
            </div>
        </SplideSlide>
    {/each}
   
    
  </Splide>


<style>

    img.acitve {
        border: 2px solid white;
    }
    
</style>