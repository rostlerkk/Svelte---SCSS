<script>
    import { onMount } from 'svelte';
    import { Splide, SplideSlide } from '@splidejs/svelte-splide';
    import '@splidejs/svelte-splide/css';
    import {active_scene} from '../store';
    export let scenes_object, aktivna_scena_all_data;
    let slider = null;
    let sliderActive = false;

    onMount(() => {

        // nastavenie správneho thumbanilu
        setTimeout(() => {
            changeSlide();    
        }, 200);
        
    });

    $: {
        aktivna_scena_all_data;

        console.log(aktivna_scena_all_data.source);
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

    function changeSeason() {
    for (const [key, value] of Object.entries(scenes_object)) {
        const element = scenes_object[key];
        
        if (element.title == aktivna_scena_all_data.title && element.source != aktivna_scena_all_data.source ) {
            console.log(element);
            pano.openNext('{' + element.id + '}');
        }
    };
  }

  function modal(link) {
    Fancybox.show([
      {
        src: link,
        type: "iframe",
        preload: false,
        width: 1000,
        height: 1000,
      },
    ], {
        });
  }

   
</script>
<div id="slider-icon" class="bottom-icon" on:click={() => sliderActive = !sliderActive}>
    <i class="fa-solid fa-panorama"></i>
</div>

<div id="info-icon" class="small-icon" on:click={() => changeSeason()}>
    {#if aktivna_scena_all_data.source != ""}
        <i class="{aktivna_scena_all_data.source.toLowerCase() == "sommer" ? "fa-solid fa-sun w-icon" : "fa-solid fa-snowflake w-icon"}"></i>
    {/if}
</div>

<div id="contact-icon" class="small-icon" on:click={() => modal("https://heiligenblut.at/heiligenblut-team/")}>
    <i class="fa-solid fa-envelope"></i>
</div>

<div id="slider" class:active={sliderActive}>
<Splide options={ splideOption } aria-label="Slider" bind:this={slider}>
    {#each Object.entries(scenes_object) as [index, value]}
    
        <SplideSlide>
                <div class='{value.id == aktivna_scena ? "active-slide" :  ""} {value.source != aktivna_scena_all_data.source ? "hidden" :  ""}'>
                    <img src="pano2vr/output/images/thumbnail_nodeimage_{value.id}.jpg" alt="{value.id}" on:click={e => { changeScene(value.id) }}/>
                    <span>{value.title}</span>    
                </div>
            </SplideSlide>
    
        
    {/each}
</Splide>
</div>


<style lang="scss">

    $blur : blur(10px);
    $bg-color : hsla(0,0%,100%,.55);
    $box-shadow : rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    #slider {
        position: absolute;
        bottom: 30px;
        width: 100%;
        height: 120px;
        transition: all 0.2s ease-in-out;
        opacity: 0;
        visibility: hidden;

        &.active {
            bottom: 50px;
            opacity: 1;
            visibility: visible;
        }
    }

    .bottom-icon {
        position: absolute;
        bottom: 6px;
        width: 48px;
        height: 48px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: $bg-color;
        backdrop-filter: $blur;
        -webkit-backdrop-filter: $blur;
        color: white;
        z-index: 12;
        cursor: pointer;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
        opacity: 0.8;
        transition: all 0.2s ease-in-out;

        i {
            box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
            background-color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            color: #111111;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s ease-in-out;

            &:hover {
                width: 36px;
                height: 36px;
            }
        }

        &:hover {
            opacity: 1;
        }
    }

    .small-icon {
        position: absolute;
        bottom: 6px;
        left: 50%;
        width: 34px;
        height: 34px;
        bottom: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: $bg-color;
        backdrop-filter: $blur;
        -webkit-backdrop-filter: $blur;
        color: white;
        z-index: 12;
        cursor: pointer;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
        opacity: 0.8;
        transition: all 0.2s ease-in-out;

        &:hover {
            opacity: 1;
        }

        i {
            box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);
            background-color: white;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            color: #111111;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s ease-in-out;
            font-size: 10px;

            &:hover {
                width: 26px;
                height: 26px;
            }
        }
    }

    #info-icon {
        transform: translateX(-200%);
    }

    #contact-icon {
        transform: translateX(100%);
    }
    img.acitve {
        border: 2px solid white;
    }
    
</style>