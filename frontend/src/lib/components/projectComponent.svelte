<script lang="ts">
	export let project;
</script>

<section class={`container w${project.id}`} id={project.id.toString()}>
	<header class="top">
		{project.year}
	</header>

	<article>
		<header>
			{project.title}
		</header>

		<section class="subGridClass">
			<section class="descriptionHolder">
				<article>
					<div>
						<strong>{project.title}</strong>

						<p>{project.description}</p>

						<a href={project.url} target="_blank" class="visit"> Bezoek website </a>
					</div>
				</article>

				<aside>
					<div class="bar"></div>
					<div class="textfield"></div>
				</aside>
			</section>

			<aside class="projectDetails">
				<ul>
					<li><strong>In opdracht van</strong></li>
					<li><p>{project.client}</p></li>

					<li><strong>Oplevering</strong></li>
					<li><p>{project.year}</p></li>

					<li><strong>Type</strong></li>
					<li>
						{#each project.type as t}
							<p>{t}</p>
						{/each}
					</li>

					<li><strong>Technologie</strong></li>
					<li class="flexBox">
						{#each project.tech as tech}
							<p class="tag">{tech}</p>
						{/each}
					</li>
				</ul>
			</aside>
		</section>
	</article>
</section>

<style>
	.container {
		position: relative;
		margin: 1rem;
		margin-top: 2rem;
		padding-bottom: 2rem;
	}

	.container:not(:last-child) {
		border-bottom: 1px solid var(--fontAccent);
	}

	.top {
		width: 80%;
		height: 500px;
		background-color: #bdd2ff;
		overflow: visible;
		display: flex;
		align-items: end;
		padding: 10px;
		font-family: 'Roboto';
		font-weight: 300;
	}

	.top::after {
		content: '';
		border-radius: 15px;
		display: block;
		width: 85%;
		background-size: cover;
		background-position: left;
		height: 500px;
		position: absolute;
		top: 4rem;
		left: 4rem;
		z-index: 2;
	}

	.container.w4 .top::after {
		background-image: url('/img/baboesjka-home.png');
	}

	.container.w4 > article {
		background-color: #ffcfa8;
	}

	.container.w4 .top {
		background-color: #fff0e4;
	}

	.container.w4 .bar,
	.container.w4 .textfield {
		background-color: #ffc18e;
	}

	.container.w3 .top::after {
		background-image: url('/img/autorijschoolkelly.nl-homeHeader.png');
	}

	.container.w3 > article {
		background-color: #b0bcff;
	}

	.container.w3 .top {
		background-color: #e3e7ff;
	}

	.container.w3 .bar,
	.container.w3 .textfield {
		background-color: #8b9cff;
	}

	.container.w2 .top::after {
		background-image: url('/img/vanderploegzonwering.nl-homeHeader.jpg');
	}

	.container.w2 > article {
		background-color: rgb(166, 255, 149);
	}

	.container.w2 .top {
		background-color: rgb(226, 255, 221);
	}

    .container.w2 .bar,
	.container.w2 .textfield {
		background-color: #00ff15;
	}

	.container.w1 .bar,
	.container.w1 .textfield {
		background-color: rgb(255, 115, 110);
	}

	.container.w1 .top::after {
		background-image: url('/img/musicbyandy.nl-homeHeader.jpg');
	}

	.container.w1 > article {
		background-color: rgb(255, 194, 192);
	}

	.container.w1 .top {
		background-color: rgb(255, 221, 220);
	}

	.container > article {
		max-width: 90%;
		border-radius: 0 15px 15px 0;
		left: 9%;
		position: relative;
		z-index: 0;
		padding: 1rem;
		padding-top: 5rem;
	}

	.container article header {
		font-weight: 900;
		font-family: Poppins;
		text-transform: uppercase;
		max-width: 100%;
		overflow: hidden;
		letter-spacing: 0px;
		padding-bottom: 1rem;
		font-size: 2.5rem;
	}

	.subGridClass {
		display: grid;
		gap: 1rem;
		grid-template-columns: 2fr 1fr;
	}

	.descriptionHolder {
		margin: 0 -1rem -1rem -1rem;
		padding: 1rem 1rem 1rem 0;
		border-top-right-radius: 20px;
		background-color: var(--mainBackgroundColor);
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr 1fr;
	}

	.projectDetails {
		display: flex;
		padding: 1rem;
		align-items: center;
	}

	.subGridClass .bar {
		padding: 1.5rem;
		width: 100%;
		position: relative;
		background-color: #909fff;
		border-radius: 18px;
	}

	.subGridClass .textfield {
		height: calc(100% - 3rem);
		margin-top: 1rem;
		width: 100%;
		position: relative;
		background-color: #909fff;
		border-radius: 18px 18px 0 0;
		line-height: 1.5;
		padding: 1rem;
	}

	a.visit {
		background-color: #0026ff;
		padding: 8px 24px;
		display: block;
		width: max-content;
		color: white;
		text-decoration: none;
		font-weight: 300;
		border-radius: 8px;
		margin-top: 1rem;
		border: 2px solid #0026ff;
		transition: 500ms;
	}

	a.visit:hover {
		background-color: transparent;
		border: 2px solid #0026ff;
		color: #0026ff;
	}

	.projectDetails p {
		font-weight: 300;
		padding-left: 1rem;
		display: flex;
		align-items: center;
		position: relative;
	}

	.projectDetails p:not(:first-child) {
		padding-top: 8px;
	}

	.projectDetails p:not(.tag)::after {
		position: absolute;
		content: '';
		height: 7px;
		width: 7px;
		z-index: 100;
		background-color: #002b88;
		left: 0;
		right: 0;
	}

	.projectDetails strong {
		font-weight: 700;
		font-size: 17px;
		margin-bottom: 5px;
		font-family: Poppins;
	}

	.projectDetails ul > li:nth-child(1n) {
		padding-bottom: 8px;
	}

	.projectDetails ul > li:nth-child(2n):not(:last-child) {
		padding-bottom: 16px;
	}

	p.tag {
		padding: 6px 12px;
		width: max-content;
		font-size: 15px;
		border-radius: 8px;
		font-weight: 300;
		color: #002b88;
		border: 1px solid #002b88;
	}

	li.flexBox {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
	}

	.descriptionHolder > article {
		display: flex;
		padding-left: 0;
		align-items: center;
	}

	.descriptionHolder strong {
		font-size: 1rem;
		font-weight: 600;
		font-family: Poppins;
	}

	.descriptionHolder p {
		display: block;
		padding-top: 8px;
		font-weight: 300;
		line-height: 1.5;
	}

    .projectDetails ul li {
        list-style-type: none;
    }

    .projectDetails ul>li:nth-child(1n) {
    padding-bottom: 8px;
}

.projectDetails ul>li:nth-child(2n):not(:last-child) {
    padding-bottom: 16px;
}
</style>
