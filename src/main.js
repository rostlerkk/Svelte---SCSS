import App from './App.svelte';
import Vivapark from './components/Vivapark.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

const vivapark = new Vivapark({
	target: document.body
	
});

export default app;