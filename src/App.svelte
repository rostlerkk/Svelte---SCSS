<script>
	import { onMount } from 'svelte';
	import { active_scene, all_scenes } from './store';
	import { all_scenes_object } from './store';
	import Splide from './components/Splide.svelte';
	import Menu from './components/Menu.svelte';
	
	let map_iframe = pano.getVariableValue("map_iframe");
    let settings_hotspots = pano.getVariableValue("settings_hotspots");
    let settings_autorotate = pano.getVariableValue("settings_autorotate");
    let settings_gyroscope = pano.getVariableValue("settings_gyroscope");
    let settings_sounds = pano.getVariableValue("settings_sounds");
    let all_hotspots = pano.getVariableValue("all_hotspots");
    let hts_luftansicht = pano.getVariableValue("hts_luftansicht");
    let scenes_count = 0;
    let scenes, startScene;
    let scenes_object = [];
    let scenes_categories = [];
    let scenes_categories_names = [];
	let aktivna_scena_all_data;

	var currentDate = new Date();

	var year = currentDate.getFullYear();
	var month = currentDate.getMonth() + 1; // Mesiacy sú číslované od 0 (január) do 11 (december)
	var day = currentDate.getDate();
	console.log("Year : " + year + " / " + " month : " + month + " / " + day);
	let startNode = "node4"; // Winter



	switch (month) {
		case 4:
			if (day > 16) {
				startNode = "node5";	
			}
			break;

			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
				startNode = "node5";	
			break;
	}

	onMount(() => {
		pano.on("configloaded", function () {
			//startScene = pano.getCurrentNode();
			startScene = startNode;
        	scenes = pano.getNodeIds();
        	scenes_count = pano.getNodeIds().length;
			scenes.forEach(scene => {
				let source = pano.getNodeUserdata(scene).source;
				scenes_object = [...scenes_object, {
					"id": scene,
					"title": pano.getNodeUserdata(scene).title,
					"description": pano.getNodeUserdata(scene).description,
					"author": pano.getNodeUserdata(scene).author,
					"copyright": pano.getNodeUserdata(scene).copyright,            
					"source": source,
					"information": pano.getNodeUserdata(scene).information,
					"comment": pano.getNodeUserdata(scene).comment,
				}]

				if (!scenes_categories_names.includes(source)) {
					scenes_categories = [...scenes_categories, {
						"name" : source,
						"count" : 1
					}];
					scenes_categories_names = [...scenes_categories_names, source];
				} else {
					scenes_categories.forEach(scene_category => {
						if (scene_category.name == source) {
							scene_category.count ++
						}
					});
				}
			});

			all_scenes.update(n => scenes);
			all_scenes_object.update(n => scenes_object);
			console.log(scenes_object);
			
		});
	
		pano.on("changenode", function () {
			active_scene.update(n => pano.getCurrentNode());
			scenes_object.forEach(element => {
				if (element.id == pano.getCurrentNode()) {
					aktivna_scena_all_data = element;
				}
			});
		});
	});
	
</script>
	{#if scenes != null}
		<Splide {scenes_object} {aktivna_scena_all_data}/>
		<Menu {scenes_object} {aktivna_scena_all_data} {startScene}/>
	{/if}

<style lang="scss">
	
</style>