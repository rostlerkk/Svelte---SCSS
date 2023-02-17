<script>
    import {blur, fade, fly, scale, slide} from 'svelte/transition';
    import { backInOut, linear } from 'svelte/easing';


    import {get, writable} from 'svelte/store';
	import {active_menu_item} from "../store.js";

    let options = {duration: 250, easing: linear};
    
    let _active_menu_item = null;

    active_menu_item.subscribe((value) => {
		_active_menu_item = value;
	});
</script>
{#if _active_menu_item == "foods"}
    <div id="foods" transition:fade={options}>
        <h2>Jedlá</h2>
    </div>
{/if}


<style lang="scss">
    
</style>

