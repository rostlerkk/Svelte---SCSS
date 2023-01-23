<script>
    let fetchDataResult = [];
    let current_scene = null;

    const jq = window.$;

    

    let close_menu_on_menu_click = true;

    let data_loaded = false;
	
	fetch("assets/json/menu.json")
		.then(response => { 
		   console.log(' response', response)
		   console.log(' r.json() >', response.clone().json()) //
		   response.json()
			   .then(json => {
						
				        fetchDataResult.push(json);			   
                        data_loaded = true;
                        fetchDataResult = fetchDataResult[0];
                        console.log(fetchDataResult);
		     })

		     .catch(error => console.log(error))
	})

    let pano_loaded = false;
    let logo, logo_link = null;
    
     pano.on("configloaded", function() {
        logo = pano.getVariableValue("menu_logo");
        logo_link = pano.getVariableValue("menu_logo_link");
        close_menu_on_menu_click = pano.getVariableValue("close_menu_on_menu_click");
        console.log(pano.getVariableValue("close_menu_on_menu_click"));

        pano.on("changenode", function () {
            current_scene = pano.getNodeUserdata(pano.getCurrentNode()).title;
        });

        pano_loaded = true;
     });

     function open_scene(target) {
        pano.openNext('{' + target + '}');
     }

     function handle_menu() {
        if (close_menu_on_menu_click == true || jq(window).width() < 500) {
            jq('.hamburger.animated').trigger('click');
        }

        
     }
</script>
<div id="wrapper">
    <div class="overlay"></div>
    <!-- Sidebar -->
    <nav class="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
        <ul class="nav sidebar-nav">
            <div class="sidebar-header">
                <div class="sidebar-brand">
                    <p>{current_scene}</p>
                    <a href="{logo_link}" target="_blank"><img src="{logo}" alt="logo"/></a>
                </div>
            </div>
            {#if data_loaded}
                {#each fetchDataResult as item}

                    {#if item.type == "next-node"}
                        <li on:click={() => pano.openNext('{' + item.target + '}') } on:click={() => handle_menu()}><a href="#">{item.name}</a></li>
                    {:else}
                        <li on:click={() => pano.setVariableValue("gallery_"+item.type, item.target) } on:click={() => handle_menu()}><a>{item.name}</a></li>
                    {/if}

                    
                    
                {/each}
            {/if}
            
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#team">Team</a></li>
            <li class="dropdown">
                <a href="#works" class="dropdown-toggle"  data-toggle="dropdown">Works <span class="caret"></span></a>
                <ul class="dropdown-menu animated fadeInLeft" role="menu">
                    <div class="dropdown-header">Dropdown heading</div>
                    <li><a href="#pictures">Pictures</a></li>
                    <li><a href="#videos">Videeos</a></li>
                    <li><a href="#books">Books</a></li>
                    <li><a href="#art">Art</a></li>
                    <li><a href="#awards">Awards</a></li>
                </ul>
            </li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#followme">Follow me</a></li>
        </ul>
    </nav>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
        <button type="button" class="hamburger animated fadeInLeft is-closed" data-toggle="offcanvas">
            <span class="hamb-top"></span>
            <span class="hamb-middle"></span>
            <span class="hamb-bottom"></span>
        </button>    
     </div>
 
</div>


<style lang="scss">
    .sidebar-brand {
        img {
            position: relative;
            max-height: 100%;
            width: 300px;
            height: 150px;
        }
    }

    #wrapper {
            &.toggled {  
                #side-wrapper {
                    width: 300px;
                }
            } 
        }

    
    
</style>