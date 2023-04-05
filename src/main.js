import App from './App.svelte';
import Vivapark from './components/Vivapark.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	},
	headers: {
        'Access-Control-Allow-Origin': '*' // or, e.g. replacing * by http://localhost:8000
    }
});

const vivapark = new Vivapark({
	target: document.body
	
});

export default app;