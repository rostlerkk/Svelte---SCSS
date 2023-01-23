import App from './App.svelte';

import Fancygallery from './components/Fancygallery.svelte';

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

export default app;