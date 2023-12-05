<script>
    import { onMount } from 'svelte';
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
    import {active_scene} from '../store';
    export let scenes_object;
    let slider = null;
    

    onMount(() => {

        // nastavenie správneho thumbanilu
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
            for (const [key, value] of Object.entries(scenes_object)) {
                const scena = scenes_object[key];
                
                if (scena.id == aktivna_scena) {
                    slider.go( parseInt(key) );
                }
            }
        }
    }

    function changeScene(scene) {
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
    {#each Object.entries(scenes_object) as [index, value]}
        <SplideSlide>
            <div class:active-slide={ value.id == aktivna_scena}>
                <img src="pano2vr/output/images/thumbnail_nodeimage_{value.id}.jpg" alt="{value.id}" on:click={e => { changeScene(value.id) }}/>
                <span>{value.title}</span>    
            </div>
        </SplideSlide>
    {/each}
   
    
  </Splide>


<style>

    img.acitve {
        border: 2px solid white;
    }
    
</style>