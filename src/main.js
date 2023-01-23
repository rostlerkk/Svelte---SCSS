import App from './App.svelte';

import Fancygallery from './components/Fancygallery.svelte';
import Menu from './components/Menu.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

const fancygallery = new Fancygallery({
	target: document.body,
	props: {
		name: 'world'
	}
});

const menu = new Menu({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;