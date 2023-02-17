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

<div id="footer">
    created by MAROŠ
</div>

<style lang="scss">
    #header {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 40px;
        background : rgba(0,0,0,0.5);

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

