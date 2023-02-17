<script>
    import {get, writable} from 'svelte/store';
	import {active_menu_item} from "../store.js";
    
    let _active_menu_item = null;

    active_menu_item.subscribe((value) => {
		_active_menu_item = value;
	});

    function select_active_menu($value) {
        console.log($value);
        active_menu_item.update(n => $value);
    }

</script>

<div id="header">
    <ul>
        <li class:active="{_active_menu_item === 'home'}" on:click={() => select_active_menu("home")}>Home</li>
        <li class:active="{_active_menu_item === 'foods'}" on:click={() => select_active_menu("foods")}>Jedlá</li>
        <li class:active="{_active_menu_item === 'drinks'}" on:click={() => select_active_menu("drinks")}>Nápoje</li>
    </ul>
</div>

<style lang="scss">
    #header {
        position: static;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 40px;
        background : rgba(0,0,0,0.9);

        ul {
            height: inherit;
            display: flex;
            flex-direction : row;
            color: white;
            gap : 8px;
            padding:0px;
            margin: 0px;
            justify-content: center;
            align-items: center;

            li {
                list-style: none;

                &.active {
                    color: blue;
                }
            }
        }
    }
</style>

