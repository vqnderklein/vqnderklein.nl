<script>
	import { page } from '$app/stores';

	console.log($page);
</script>

<div class="error-container">
	<div class="error-wrapper">
		<img src="/img/favicon-light.svg" alt="Favicon" width="50" />
		<h1>{$page?.error?.message}</h1>
		<p>
			Woeps, daar ging iets niet goed. Geef ons een momentje om te kijken wat er mis is. We zijn zo
			terug ¯\_(ツ)_/¯
		</p>
		<div class="buttonGroup">
			<a href="/">Breng me terug</a>
			<a target="_blank" href="https://service.vqndr.nl/contact/bug-report">Rapporteer deze fout</a>
			<a target="_blank" href="https://status.vqnderklein.nl">Bekijk netwerk status</a>
		</div>
	</div>
</div>

<style>
	.buttonGroup {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}

	.buttonGroup a:hover {
		background-color: var(--mainBackgroundColor);
		color: var(--font);
		border-color: var(--mainBackgroundColor);
	}

	.buttonGroup a {
		transition: all 0.3s ease;
		color: var(--mainBackgroundColor);
		text-decoration: none;
		display: block;
		padding: 0.5rem 1rem;
		border: 1px solid var(--mainBackgroundColor);
		border-left: 5px solid var(--mainBackgroundColor);
	}

	.error-container {
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--font);
	}

	.error-container h1 {
		font-size: 6rem;
		width: max-content;
		color: var(--mainBackgroundColor);
	}

	.error-container p {
		max-width: 400px;
		line-height: 1.5;
		font-size: 15px;
		color: var(--mainBackgroundColor);
	}

	@media screen and (max-width: 676px) {
		.buttonGroup {
			flex-wrap: wrap;
			max-width: 80%;
		}
	}

	@media screen and (max-width: 600px) {
		.error-container {
			padding: 2rem;
		}
	}

	@media screen and (max-width: 500px) {
		.error-container h1 {
			font-size: 5rem;
		}
		.error-container p {
			font-size: 15px;
		}
		.buttonGroup a {
			padding: 0.5rem;
			font-size: 14px;
		}

		.error-container img {
			max-width: 40px;
		}
	}

	@media screen and (max-width: 400px) {
		.error-container h1 {
			font-size: 3rem;
		}
		.error-container p {
			font-size: 15px;
		}
		.buttonGroup a {
			padding: 0.5rem;
			font-size: 15px;
		}

		.error-container img {
			max-width: 40px;
		}
	}
</style>
