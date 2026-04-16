<script>
	import icon from '$lib/assets/favicon-dark.svg';
    import AlertComponent from "$lib/components/alertComponent.svelte";
</script>

<svelte:head>
	<title>Projects • vqnderklein.nl</title>
</svelte:head>

<h1>Projects</h1>
<p>
	Bekijk de projecten waar ik mee bezig ben, wat op de planning staat, welke updates in de maak zijn
	en welke buggs in behandeling zijn.
</p>

<AlertComponent message="Pagina wacht op integratie om goed te functioneren"></AlertComponent>

<section class="projectGrid">
	<div class="projectItem">
		<header>
			<div class="flexBox bckGr">
				<p class="date">2 Nov, 2024</p>
				<p class="bookMark">
					<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
						<path
							fill="currentColor"
							d="M6 19.5V5.616q0-.691.463-1.153T7.616 4h8.769q.69 0 1.153.463T18 5.616V19.5l-6-2.577zm1-1.55l5-2.15l5 2.15V5.616q0-.231-.192-.424T16.384 5H7.616q-.231 0-.424.192T7 5.616zM7 5h10z"
						/>
					</svg>
				</p>
			</div>

			<div class="flexBox">
				<div>
					<p class="smallHeader">website</p>
					<p class="bigHeader">vqnderklein.nl</p>
				</div>
				<span class="favicon">
					<img
						src="{icon}"
						alt="favicon vqnderklein.nl"
						title="vqnderklein.nl"
					/>
				</span>
			</div>

			<div class="tags">
				<span class="tag">Website</span>
				<span class="tag">Portfolio</span>
				<span class="tag">Dynamic</span>
				<span class="tag">Active</span>
			</div>
		</header>

		<footer>
			<div>
				<strong>v3.0</strong>
				<p class="updateDescr">Completly new design</p>
			</div>
			<a>Bekijk project</a>
		</footer>
	</div>
</section>

<style>
	

	.projectGrid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
		padding: 1rem;
	}

	.projectGrid .projectItem {
		padding: 5px;
		border: 1px solid #cfcfcf;
		border-radius: 20px;
	}

	.projectGrid .projectItem header {
		padding: 1rem;
		background-color: #00cccc;
		border-radius: 15px;
	}

	.projectGrid .projectItem header .flexBox {
		display: flex;
		justify-content: space-between;
		padding-bottom: 1.5rem;
		align-items: center;
	}

	.projectGrid .projectItem header .flexBox.bckGr p {
		padding: 6px 12px;
		width: max-content;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 300;
		font-size: 14px;
		border-radius: 20px;
		background-color: var(--mainBackgroundColor);
	}

	.projectGrid .projectItem header .smallHeader {
		font-size: 15px;
	}

	.projectGrid .projectItem header .bigHeader {
		font-size: 22px;
		letter-spacing: 1px;
		font-weight: 800;
	}

	.projectGrid .projectItem header .favicon img {
		width: 30px;
	}

	.projectGrid .projectItem header .tags {
		margin-top: 0.5rem;
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
	}

	.projectGrid .projectItem header .tags .tag {
		padding: 6px 12px;
		border: 1px solid var(--font);
		border-radius: 15px;
		font-size: 12px;
		color: #040403;
	}

	.projectGrid .projectItem header .bookMark {
		cursor: pointer;
	}

	.projectGrid .projectItem footer {
		margin-top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0;
        padding: 1rem;
	}

	.projectGrid .projectItem footer strong {
		font-weight: 800;
		color: var(--font);
	}

	.projectGrid .projectItem footer p.updateDescr {
		font-weight: 300;
		padding-top: 2px;
		font-size: 13px;
		max-width: 70%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.projectGrid .projectItem footer a {
		padding: 8px 15px;
		background-color: #040403;
		color: #fafafa;
		text-decoration: none;
		border-radius: 15px;
		cursor: not-allowed;
	}

	
</style>
