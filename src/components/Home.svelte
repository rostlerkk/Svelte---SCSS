<script>
    import { onMount } from 'svelte';
    import {get, writable} from 'svelte/store';
	import {active_menu_item} from "../store.js";
    
    let _active_menu_item = null;

    active_menu_item.subscribe((value) => {
		_active_menu_item = value;
        console.log(value);
	});

    let Header, Footer = null;


    onMount(async () => {
		Header = (await import('../components/Header.svelte')).default;
        Footer = (await import('../components/Footer.svelte')).default;
	});

</script>

{#if _active_menu_item == "home"}
    {#if Header != null}
    <svelte:component this={Header} />
    {/if}

    {#if Footer != null}
    <svelte:component this={Footer} />
    {/if}
{/if}




<style lang="scss">

</style>

