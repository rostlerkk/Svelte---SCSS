<script>
	import {get, writable} from 'svelte/store';
	import {title} from "./store.js";

	let _title = null;

	title.subscribe((value) => {
		_title = value;
	});

	title.update( n => 4);

	let foods = ["Fazuľová", "Rizek"];

	let full_food = [
		{	
			
			polievka : "Fazuľová s párkom",
			hlavne_jedlo : "Rizek so šalatom"
		},
		{
			polievka : "Hrachová s porom",
			hlavne_jedlo : "dva rizky so šalatom"
		}
	];

	let komplet = true;
	let komplet2 = true;

	// $: {
	// 	komplet;
	// 	if (komplet == true) {
	// 		title.update( n => n + 1 );	
	// 	} else {
	// 		title.update( n => n - 1 );
	// 	}

		


	// }

	function update() {
		title.update( n => n + 1 )
	}

	

</script>

<main>
	<h1>Hello {_title}!</h1>
	
	{#each foods as food}
		 <p>{food}</p>
	{/each}
	<ul>
		{#each full_food as jedlo}
			<li>
				{jedlo.polievka}
				{#if komplet}
					{jedlo.hlavne_jedlo}
				{/if}
				
			</li>
		{/each}
	</ul>

	<input type="checkbox" bind:checked={komplet} on:change={() => update()	}/>
	
	
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}
	}


	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>