<script>
    import {get, writable} from 'svelte/store';
    import {menu_items} from "../store.js";

    let _menu_items = [];

    menu_items.subscribe((value) => {
        console.log(value);
        _menu_items = value;
    });

    // VARIABLES
    const url_path = "https://int.baumit.com/api/buildings?api_token=AP7R6yAeBytyvc0OASz3RhLrAH2CsCGnNDWTeLBAbyW72sMPRCiw4JAKDTz0";
    let data, maros = null;

    let foods = [
        {
            polievka : "Krúpová",
            jedlo : "Rezeň"
        },
        {
            polievka : "Zeleninová",
            jedlo : "Halušky"
        },
        {
            polievka : "Zeleninová",
            jedlo : "Halušky"
        }

    ];

    // získanie dát z API Baumit
    async function fetchData($url, $parameter) {      
        const res = await fetch($url);
        const json = await res.json();
        console.log(json);

        if (res.ok) {
            switch ($parameter) {
                case "menu_items":
                    console.log("Agag");
                    menu_items.update(n => json);
                    break;
            
                default:
                    data = json;
                    break;
            }
            // vlož dáta do premennej data
            
        } else {
            throw new Error(json);
        }  
        
        
    }    

    // načítaj dáta z API
    fetchData(url_path, "data");
    fetchData("menu.json", "menu_items");
</script>


<div>
    {#if _menu_items != null}
        {#if _menu_items["cestoviny"] != null}
            {#each _menu_items["cestoviny"] as item}
                {item.id}
                {item.name}
                {item.description}
                {item.alergeny}
                {item.price} 
            {/each}
        {/if}
    {/if}   
</div>


<style lang="scss">
    span {
        text-transform: uppercase;
    }
</style>