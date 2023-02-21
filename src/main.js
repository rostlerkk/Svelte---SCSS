import App from './App.svelte';
import Home from './components/Home.svelte';
import Menu from './components/Menu.svelte';
// import Header from './components/Header.svelte';
// import Footer from './components/Footer.svelte';
import Foods from './components/Foods.svelte';

// const header = new Header({
// 	target: document.body
// });

const home = new Home({
	target: document.body
});

const app = new App({
	target: document.body
});

const menu = new Menu({
	target: document.body
});

const foods = new Foods({
	target: document.body
});

// const footer = new Footer({
// 	target: document.body
// });


export default app;