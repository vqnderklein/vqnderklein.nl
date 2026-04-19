<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	import '../global.css';

	import NavbarComponent from '$lib/components/navbarComponent.svelte';
	import BackgroundComponent from '$lib/components/backgroundComponent.svelte';
	import SidenavbarComponent from '$lib/components/sidenavbarComponent.svelte';
	import MainComponent from '$lib/components/mainComponent.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});


	let darkMode = false;

	onMount(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');

		const update = () => (darkMode = media.matches);

		update();
		media.addEventListener('change', update);

		return () => media.removeEventListener('change', update);
	});
</script>

<svelte:head>
	<title>Het begin van jouw online avontuur • vqnderklein.nl</title>
	<link
		rel="icon"
		href={darkMode
			? '/img/favicon-dark.svg'
			: '/img/favicon-light.svg'}
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="author" content="Mathijs van der Klein" />
	<meta name="keywords" content="Portfolio Persoonlijk Webdevelopment Projects Informatief" />
	<meta
		name="description"
		content="Een persoonlijke website van Mathijs van der Klein, gebruikt om zelfgemaakte projecten te hosten en zichtbaar te maken."
	/>

	<link rel="preconnect" href="https://api.pexels.com/" />

	<meta property="og:image" content="https://vqnderklein.nl/img/inloggen_002.png" />
	<meta property="og:title" content="Het begin van jouw online avontuur" />
	<meta
		property="og:description"
		content="Een persoonlijke website van Mathijs van der Klein, gebruikt om zelfgemaakte projecten te hosten en zichtbaar te maken."
	/>
	<meta property="og:url" content="https://vqnderklein.nl/" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Het begin van jouw online avontuur" />
	<meta
		name="twitter:description"
		content="Een persoonlijke website van Mathijs van der Klein
, gebruikt om zelfgemaakte projecten te hosten en zichtbaar te maken."
	/>
	<meta name="twitter:image" content="https://vqnderklein.nl/assets/img/inloggen_002.png" />
</svelte:head>

<NavbarComponent></NavbarComponent>
<BackgroundComponent></BackgroundComponent>
<div class="flex-box">
	<SidenavbarComponent></SidenavbarComponent>
	<MainComponent>{@render children()}</MainComponent>
</div>

<style>
	.flex-box {
		max-width: 70%;
		margin: auto;
		position: relative;
		gap: 5%;
		display: flex;
		z-index: 100;
		margin-top: -5rem;
		margin-bottom: 3rem;
	}

	@media screen and (max-width: 1200px) {
		.flex-box {
			max-width: 90%;
		}
	}
	@media screen and (max-width: 700px) {
		.flex-box {
			flex-flow: column;
			gap: 0;
		}
	}
</style>
