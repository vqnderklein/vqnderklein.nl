<script>
	let { children } = $props();

    import { page } from '$app/state';

	import FooterComponent from './footerComponent.svelte';
</script>

<section class="wrapper">
	<header>
		<ul>
			<li><a class:active={page.url.pathname === '/'} href="/">
                Home</a></li>
			<li><a class:active={page.url.pathname.startsWith("/portfolio")} href="/portfolio">Portfolio</a></li>
			<li><a class:active={page.url.pathname.startsWith("/about")} href="/about">Over mij</a></li>
			<li><a class:active={page.url.pathname.startsWith("/project-board")} href="/project-board">Projects</a></li>
			<li><a class:active={page.url.pathname.startsWith("/contact")} href="/contact">Contact</a></li>
		</ul>
	</header>

    <div class="page-content">
	    {@render children()}
    </div>

	<FooterComponent></FooterComponent>
</section>

<style>
	.wrapper {
		background-color: var(--mainBackgroundColor);
		width: 100%;
		border-radius: 5px 5px 0 0;
		padding: 1em 0em;
		max-width: 100%;
		overflow: hidden;
	}

	.wrapper > header {
		border-bottom: 1px solid var(--lightGrey);
		height: 4rem;
		overflow: hidden;
	}

	.wrapper > header ul > li {
		display: inline-flex;
		padding: 1rem 1rem 2rem 1rem;
	}

	.wrapper > header ul > li a {
		color: var(--fontAccent);
		text-decoration: none;
		position: relative;
		transition: 800ms ease;
	}

	.wrapper > header ul > li a.active::after {
		content: '';
		width: 100%;
		height: 3px;
		bottom: -28px;
		left: 0;
		position: absolute;
		background-color: #0026ff;
	}

	.wrapper > header ul > li a.active {
		color: var(--font);
	}

	.wrapper > header ul > li :hover {
		color: #040403;
	}

	.wrapper {
		border: 1px solid var(--lightGrey);
	}

    .page-content {
        padding-top: 1rem
    }
</style>
