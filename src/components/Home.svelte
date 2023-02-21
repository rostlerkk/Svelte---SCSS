<script>
    import { onMount } from 'svelte';
    import {get, writable} from 'svelte/store';
	import {active_menu_item} from "../store.js";
    
    let _active_menu_item = null;

    active_menu_item.subscribe((value) => {
		_active_menu_item = value;
        console.log(value);
	});

    let Header, Footer, Breakfest, Lunch = null;


    onMount(async () => {
		Header = (await import('../components/Header.svelte')).default;
        Footer = (await import('../components/Footer.svelte')).default;
        Breakfest = (await import('../components/Breakfest.svelte')).default;
        Lunch = (await import('../components/Lunch.svelte')).default;
	});

</script>

{#if _active_menu_item == "home"}
    {#if Header != null}
        <svelte:component this={Header} />
        <!-- fix background image -->
        <section id="home" class="no-padding fix-background" style="background-image:url('images/slider-img4.jpg');">
            <div class="opacity-medium bg-dark-gray"></div>
            <div class="container full-screen position-relative">
                <div class="slider-typography text-center">
                    <div class="slider-text-middle-main">
                        <div class="slider-text-middle slider-typography-option1 ">
                            <img src="images/hungry.png" class="xs-width-70" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="scroll-down"><a class="section-link" href="#breakfast"><img src="images/arrow-down.png" alt=""/></a></div>
        </section>
        
    {/if}

    {#if Breakfest != null}
        <svelte:component this={Breakfest} />
    {/if}

    {#if Lunch != null}
        <svelte:component this={Lunch} />
    {/if}

    {#if Header != null &&
        Breakfest != null   &&
        Lunch != null   
    }
         <!-- end fix background image -->
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/modernizr.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
        <script type="text/javascript" src="js/skrollr.min.js"></script>
        <script type="text/javascript" src="js/smooth-scroll.js"></script>
        <script type="text/javascript" src="js/jquery.appear.js"></script>
        <!-- menu navigation -->
        <script type="text/javascript" src="js/jquery.nav.js"></script>
        <!-- animation -->
        <script type="text/javascript" src="js/wow.min.js"></script>
        <!-- page scroll -->
        <script type="text/javascript" src="js/page-scroll.js"></script>
        <!-- owl carousel -->
        <script type="text/javascript" src="js/owl.carousel.min.js"></script>
        <!-- counter -->
        <script type="text/javascript" src="js/jquery.countTo.js"></script>
        <!-- parallax -->
        <script type="text/javascript" src="js/jquery.parallax-1.1.3.js"></script>
        <!-- magnific popup -->
        <script type="text/javascript" src="js/jquery.magnific-popup.min.js"></script>
        <!-- portfolio with shorting tab -->
        <script type="text/javascript" src="js/isotope.pkgd.min.js"></script>
        <!-- images loaded -->
        <script type="text/javascript" src="js/imagesloaded.pkgd.min.js"></script>
        <!-- pull menu -->
        <script type="text/javascript" src="js/classie.js"></script>
        <!-- counter  -->
        <script type="text/javascript" src="js/counter.js"></script>
        <!-- fit video  -->
        <script type="text/javascript" src="js/jquery.fitvids.js"></script>
        <!-- setting -->
        <script type="text/javascript" src="js/main.js"></script>
    {/if}

    {#if Footer != null}
    <svelte:component this={Footer} />
    {/if}
{/if}





<style lang="scss">

</style>

