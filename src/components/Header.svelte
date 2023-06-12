<script>
    import { sceneSlider } from '../store.js';

    // your script goes here
    let autoPlay = false;
    let hotspotEnabled = true;
    let backgroundSound = true;
    let autoRotate = false;
    let sceneNavigation = true;
    const interval_time = 3000;
    let interval, animation_interval, toggleAutoRotate;
    let width = 0;
    let progress = 0;

    let gallery_images = "https://lipsum.app/id/1/1024x768,https://lipsum.app/id/2/1024x768";
    let gallery_video = "https://www.youtube.com/embed/B9VRvOKKwfs";
    let gallery_iframe = "https://www.bern.com/de/detail/stadt";
    let gallery_map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387201.09584316844!2d-74.60351946883848!3d40.69580909544796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York!5e0!3m2!1ssk!2sus!4v1686421709408!5m2!1ssk!2sus";

    sceneSlider.subscribe(value => {
        console.log(value);
		sceneNavigation = value;
	});
    
    function setModal(variable, parameter) {
        pano.setVariableValue(variable, parameter);
    }

    pano.on('configloaded', function () {
        hotspotEnabled = pano.getVariableValue("hotspots");

        toggleAutoRotate = function () {
            pano.toggleAutorotate(0.07);
            autoRotate = !autoRotate;
        }
    });

    function setAutoTour() {
        width = 0;
        progress = 0;

        interval = setInterval(() => {

            if (progress != interval_time) {
                progress = progress + ( interval_time / 1000);
                width = 100 * (progress / interval_time);   
            } else {
                pano.openNext('{' +  pano.getNextNode() + '}');
                stopAutoTour();
                setAutoTour();
            }
 
        }, interval_time / 1000);
    }

    function stopAutoTour() {
        clearInterval(animation_interval);
        clearInterval(interval);
        width = 0;
        progress = 0;
    }

    function nextScene() {
        pano.openNext('{' +  pano.getNextNode() + '}');
    }

    function prevScene() {
        pano.openNext('{' +  pano.getPrevNode() + '}');
    }

    $: {
        autoPlay;

        switch (autoPlay) {
            case true:
                setAutoTour();
                break;
                
            default:
                stopAutoTour();
                break;
        }
    }

    $: {
        hotspotEnabled;

        pano.setVariableValue('hotspots', hotspotEnabled);
    }
</script>

<header>
    <div id="left-menu">
        <i class="fa-regular fa-image" on:click={() => setModal("gallery_images", gallery_images)}></i>
        <i class="fa-brands fa-youtube" on:click={() => setModal("gallery_video", gallery_video)}></i>
        <i class="fa-solid fa-code" on:click={() => setModal("gallery_iframe", gallery_iframe)}></i>
        <i class="fa-solid fa-street-view" on:click={() => setModal("gallery_iframe", gallery_map)}></i>
        <i class="fa-regular fa-envelope"></i>
        <i class="fa-solid fa-vr-cardboard"></i>
        
        
    </div>
    <div id="right-menu">
        <i class="fa-solid fa-angles-left" on:click={() => prevScene()}></i>
        <i class="{autoPlay ? 'fa-solid fa-pause active' : 'fa-solid fa-play'}" on:click={() => autoPlay = !autoPlay}></i>
        <i class="fa-solid fa-angles-right" on:click={() => nextScene()}></i>
        <i class="{sceneNavigation ? 'fa-solid fa-panorama active' : 'fa-solid fa-panorama'}" on:click={() => sceneSlider.update(n => !sceneNavigation)}></i>
        <i class="{hotspotEnabled ? 'fa-solid fa-lightbulb active' : 'fa-solid fa-lightbulb'}" on:click={() => hotspotEnabled = !hotspotEnabled}></i>
        <i class="{autoRotate ? 'fa-solid fa-rotate active' : 'fa-solid fa-rotate'}" on:click={() => toggleAutoRotate()}></i>
        
        <i class="{backgroundSound ? 'fa-solid fa-volume-high active' : 'fa-solid fa-volume-xmark'}" on:click={() => backgroundSound = !backgroundSound}></i>
    </div>

    {#if autoPlay}
         <div class="progress-bar" style="width: {width}%;"></div>
    {/if}

</header>

<style lang="scss">
    header {
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: calc(100% - 16px);
        max-width: 800px;
        height: auto;
        min-height: 40px;
        background-color: rgba(46, 50, 71, 0.9);
        border-radius: 8px;
        z-index: 10;
        box-shadow: 0 2px 6px rgba(47,43,61,.14),0 0 transparent,0 0 transparent;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px 8px;
        overflow: hidden;

        #left-menu, #right-menu {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 8px;
            min-width: 50px;
            padding: 0px;

            i {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: rgba(208,212,241, 0.05);
                cursor: pointer;
                transition: all 0.2s ease-in-out;

                &:hover {
                    background-color: rgba(208,212,241, 0.3);
                }

                &.active {
                    background-color: rgba(208,212,241, 0.3);
                }
                
            }
        }

        .progress-bar {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 4px;
            background-color: rgba(115, 103, 240, 1);
        }
        
    }
</style>