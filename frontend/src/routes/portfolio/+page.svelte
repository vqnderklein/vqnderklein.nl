<script>
	import ProjectComponent from '$lib/components/projectComponent.svelte';

	const projects = [
		{
			id: 4,
			title: 'Baboesjkakindercoaching',
			description:
				'Een website voor een kindercoach, waar ze hun diensten kunnen tonen en klanten kunnen aantrekken.',
			url: 'https://baboesjkakindercoaching.nl',
			client: 'Baboesjka van Amstel',
			year: 2025,
			type: ['Website'],
			tech: ['HTML', 'CSS', 'PHP']
		},
		{
			id: 3,
			title: 'Autorijschool Kelly',
			description:
				'Een website voor een autorijschool, waar ze hun diensten kunnen tonen en klanten kunnen aantrekken.',
			url: 'https://autorijschoolkelly.nl',
			client: 'Kelly de Groot',
			year: 2024,
			type: ['Website', 'Webapplicatie'],
			tech: ['HTML', 'JS', 'PHP', "CSS"]
		},
		{
			id: 2,
			title: 'Vanderploegzonwering',
			description:
				'Een website voor een zonwering bedrijf, waar ze hun diensten kunnen tonen en klanten kunnen aantrekken.',
			url: 'https://vanderploegzonwering.nl',
			client: 'Dave van der Ploeg',
			year: 2023,
			type: ['Website'],
			tech: ['HTML', 'CSS']
		},
		{
			id: 1,
			title: 'Music By Andy',
			description:
				'Een website voor een muziek producer, waar hij zijn muziek kan delen en verkopen.',
			url: 'https://musicbyandy.nl',
			client: 'Andy',
			year: 2022,
			type: ['Website'],
			tech: ['HTML', 'CSS']
		}
	];
</script>

<div class="overview">
	<a href="#4">
		<img
			src="https://baboesjkakindercoaching.nl/favicon.ico"
			alt="baboesjkakindercoaching logo"
			title="Baboesjkakindercoaching"
		/>
	</a>

	<a href="#3">
		<img
			src="https://autorijschoolkelly.nl/favicon.ico"
			alt="Autorijschoolkelly logo"
			title="Autorijschool Kelly"
		/>
	</a>

	<a href="#2">
		<img
			src="https://vanderploegzonwering.nl/static/img/logo_small.png"
			alt="vanderploegzonwering logo"
			title="Vanderploegzonwering"
		/>
	</a>

	<a href="#1">
		<img
			src="https://musicbyandy.nl/static/img/mba_main_website_logo.jpg"
			alt="musicbyandy Logo"
			title="Music By Andy"
		/>
	</a>
</div>

{#each projects as project}
	<ProjectComponent {project}></ProjectComponent>
{/each}

<style>
	.overview {
		background-color: var(--lightGrey);
		padding: 1rem;
        margin-top: -1rem;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.overview img {
		border-radius: 50%;
		width: 50px;
		aspect-ratio: 1;
		transition: 500ms;
	}

	.overview img:hover {
		transform: scale(1.1);
	}

	.overview a:nth-child(2) img {
		border: 1px solid white;
	}
</style>
