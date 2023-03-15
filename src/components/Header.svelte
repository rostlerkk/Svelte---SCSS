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

<!-- <div id="header">
    <ul>
        <li class:active="{_active_menu_item === 'home'}" on:click={() => select_active_menu("home")}>Home</li>
        <li class:active="{_active_menu_item === 'foods'}" on:click={() => select_active_menu("foods")}>Jedlá</li>
        <li class:active="{_active_menu_item === 'drinks'}" on:click={() => select_active_menu("drinks")}>Nápoje</li>
    </ul>
</div> -->

        <!-- navigation -->
        <nav class="navbar no-margin-bottom alt-font">
            <div class="container navigation-menu">
                <div class="row">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="col-lg-2 col-md-3 navbar-header menu-logo">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand inner-link" href="#home"><img src="images/pr-logo.png" alt=""/></a>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-9 collapse navbar-collapse menu-items" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li><a href="#about" class="inner-link">Denné Menu</a></li>
                            <li><a href="#menu" class="inner-link">jedálny lístok</a></li>
                            <li><a href="#chef" class="inner-link">donáška</a></li>
                            <li><a href="#gallery" class="inner-link">Galéria</a></li>
                            <li><a href="#blog" class="inner-link">Akcie</a></li>
                            <li><a href="#contact" class="inner-link">kontakt</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-4 col-md-2 pull-right header-right text-right sm-display-none menu-buttons">
                        <a class="btn-small-white btn btn-very-small no-margin inner-link header-button header-order" href="#contact">objednať online</a>
                        <a class="btn-small-white btn btn-very-small no-margin inner-link header-button" href="#contact">0907 077 009 | 0904 006 003</a>
                    </div>
                </div>
            </div>
        </nav>
        <!-- end navigation -->

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

    .header-right {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .row {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1400px;
        height: 140px;
    }

    .header-button {
        width: max-content;

        &.header-order {
            background-color: #d8b75f;
            color: black;

            &:hover {
                background-color: white;

            }
        }
    }

    .menu-items {
        display: flex !important;
        align-items: center !important;
    }

    .menu-buttons {
        display: flex;
        justify-content: center;
        width: max-content;
    }
    .menu-logo {
        display: flex;
        justify-content: center;
    }
</style>

