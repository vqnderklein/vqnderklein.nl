<script>
	const year = new Date().getFullYear();
</script>

<footer>
	<p><b>{year}</b> • All rights reserved</p>
	<b>vqnderklein.nl</b>
</footer>

<style>
	footer {
		padding: 1em;
		margin-top: 1rem;
		margin-bottom: -1em;
		color: var(--fontAccent);
	}

	footer > p {
		font-weight: 300;
		padding-bottom: 5px;
	}

	footer > p > b {
		font-weight: normal;
	}
</style>
