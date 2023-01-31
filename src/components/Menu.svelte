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

     let show_thumb_id = null;
     let top = 0;
     let show_thumb = false;

     function show_thumbnail($name) {
        show_thumb_id = $name;
        const anchor = document.getElementById($name);
        top = anchor.offsetTop - 90 + 20.5;
        show_thumb = true;
        console.log(top);
     }

     function remove_thumbnail($name) {
        show_thumb = false;
    }
</script> 

{#if show_thumb}
        <img id="thumbnail" src="pano2vr/output/images/thumbnail_nodeimage_{show_thumb_id}.jpg" style="top: {top}px;"/>
        <span class="thumbnail-arrow" style="top: {top}px;"/>
    {/if}
<div id="wrapper">
    <!-- <div class="overlay"></div> -->
    <!-- Sidebar -->
    
    
    
    <nav class="navbar navbar-inverse fixed-top" id="sidebar-wrapper" role="navigation">
        <p id="pano-name">{current_scene}</p>    
        <ul class="nav sidebar-nav">
            <div class="sidebar-header">
                <div class="sidebar-brand">
                    
                    <a href="{logo_link}" target="_blank"><img src="{logo}" alt="logo"/></a>
                </div>
            </div>
            {#if data_loaded}
                {#each fetchDataResult as item}

                    {#if item.type == "next-node"}
                        <li id="{item.target}" on:click={() => pano.openNext('{' + item.target + '}') } 
                            on:click={() => handle_menu()}
                            on:mouseenter={() => show_thumbnail(item.target)}
                            on:mouseleave={() => remove_thumbnail()}
                            ><a href="#">{item.name}</a></li>
                    {:else if  item.type == "link"}                        
                        <li on:click={() => handle_menu()}><a href="{item.target}" target="_blank">{item.name}</a></li>
                    {:else if  item.type == "dropdown"}  
                        <li class="dropdown">
                            <a href="#works" class="dropdown-toggle"  data-toggle="dropdown">{item.name}<span class="caret"></span></a>
                            <ul class="dropdown-menu animated fadeInLeft" role="menu">
                                <div id="submenu" class="dropdown-header">{item.heading}</div>
                                {#each item.data as element}
                                    {#if element.type == "next-node"}
                                        <li on:click={() => pano.openNext('{' + element.target + '}') } on:click={() => handle_menu()}><a href="#">{element.name}</a></li>
                                    {:else if  element.type == "link"}                        
                                        <li on:click={() => handle_menu()}><a href="{element.target}" target="_blank">{element.name}</a></li>
                                    {:else}
                                        <li on:click={() => pano.setVariableValue("gallery_"+element.type, element.target) } on:click={() => handle_menu()}><a>{element.name}</a></li>
                                    {/if}
                                {/each}
                            </ul>
                        </li>                      
                    {:else}
                        <li on:click={() => pano.setVariableValue("gallery_"+item.type, item.target) } on:click={() => handle_menu()}><a>{item.name}</a></li>
                    {/if}
                    
                {/each}
            {/if}
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

    span.thumbnail-arrow {
        position: absolute;
        left: 286px;
        width: 4px;
        height: 4px;
        z-index: 9999;
        content:"\A";
        border-style: solid;
        border-width: 10px 15px 10px 0;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        margin-top: 80px;
        transition: all 0.2s ease-in-out;
    }

    #thumbnail {
        position: absolute;
        left: 300px;
        width: 280px;
        height: 180px;
        border: 2px solid white;
        z-index: 5;
        transition: all 0.2s ease-in-out;
        
    }

    #pano-name {
        position: absolute;
        top: 0px;
        left: 0px;
        background: white;
        z-index: 5;
    }

    #submenu {
        height: 40px;
    }

    button {
        cursor: pointer;
    }
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

    li {
        cursor: pointer;
    }


    
    
</style>