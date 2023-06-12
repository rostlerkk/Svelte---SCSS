import App from './App.svelte';
import Fancygallery from './components/Fancygallery.svelte';
import Slider from './components/Slider.svelte';
import SceneName from './components/SceneName.svelte';
import Header from './components/Header.svelte';

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

const slider = new Slider({
	target: document.body
});

const sceneName = new SceneName({
	target: document.body
});

const header = new Header({
	target: document.body
});

export default app;