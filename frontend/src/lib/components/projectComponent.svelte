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

	.projectDetails ul > li:nth-child(1n) {
		padding-bottom: 8px;
	}

	.projectDetails ul > li:nth-child(2n):not(:last-child) {
		padding-bottom: 16px;
	}

	@media screen and (max-width: 1600px) {
		.top::after {
			height: 400px;
		}
		.top {
			height: 400px;
		}
	}

	@media screen and (max-width: 1500px) {
		#grid_images,
		.gridControls {
			width: 80%;
			max-height: 80%;
		}
		.portfolioGrid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
		.projectGrid {
			grid-template-columns: repeat(2, 1fr);
		}

		.descriptionHolder {
			display: block;
		}
		.subGridClass .bar {
			max-width: 175px;
			left: 0;
			float: right;
			margin-top: -3.5rem;
			border-radius: 10px;
			height: 39px;
			overflow: hidden;
			padding: 0;
		}
		.subGridClass .textfield {
			height: 150px;
			margin-bottom: -1rem;
			display: block;
		}
	}

	@media screen and (max-width: 1400px) {
		.top::after {
			height: 300px;
			left: 1rem;
			width: calc(100% - 2rem);
			top: 3rem;
		}
		.top {
			width: 100%;
			height: 300px;
			align-items: start;
		}
		.container > article {
			max-width: calc(100% - 4rem);
			left: 2rem;
		}
		.subGridClass {
			grid-template-columns: 60% 40%;
		}
		.subGridClass .bar {
			float: left;
			margin-top: 1rem;
			border-radius: 0;
			background-color: #6075ff;
			border-bottom-right-radius: 15px;
			border: 1px solid white;
			z-index: 1;
			margin-top: 0;
			height: 39px;
		}
		.container article header {
			font-size: 1.8rem;
		}
	}

	@media screen and (max-width: 1300px) {
		.container article header {
			font-size: 1.6rem;
		}
		.subGridClass {
			grid-template-columns: 1fr 1fr;
		}
		.subGridClass .bar {
			max-width: 100%;
			border-radius: 0;
			border: 1px solid black;
		}
		.projectDetails {
			align-items: start;
		}
	}

	@media screen and (max-width: 1200px) {
		.container article header {
			font-size: 2rem;
		}
	}

	@media screen and (max-width: 1050px) {
		.container article header {
			font-size: 1.7rem;
		}
	}

	@media screen and (max-width: 950px) {
		.container article header {
			font-size: 1.4rem;
		}
	}

	@media screen and (max-width: 900px) {
		.subGridClass {
			display: flex;
			flex-flow: column-reverse;
		}
		.projectDetails {
			margin: -1rem;
		}
		.container.w4 .projectDetails {
			background-color: #ffdcc0;
		}
		.container.w3 .projectDetails {
			background-color: #e3e7ff;
		}
		.projectDetails ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
		.projectDetails p:not(.tag)::after {
			display: none;
		}
		.projectDetails p {
			float: right;
		}
		li.flexBox {
			justify-content: right;
		}
		.descriptionHolder {
			border-radius: 0;
		}
		.projectDetails strong {
			font-weight: 500;
		}
		.subGridClass .bar {
			max-width: 175px;
			float: right;
			border-radius: 10px;
			border: none;
		}
	}

	@media screen and (max-width: 850px) {
		.wrapper > header {
			height: 3rem;
		}
		.subGridClass .bar {
			float: none;
			margin-top: 1rem;
		}
		.container article header {
			font-size: 1.2rem;
		}
	}

	@media screen and (max-width: 768px) {
		#grid_images,
		.gridControls {
			max-width: 400px;
			height: 400px;
		}
		.gridControls {
			height: max-content;
		}
		.wrapper > header {
			height: 3rem;
			display: flex;
			justify-content: center;
		}

		.projectDetails ul {
			display: block;
		}
		.projectDetails p:not(.tag)::after {
			display: block;
		}
		.projectDetails p {
			float: none;
		}
		.top::after {
			width: 100%;
			left: 0;
		}
		.container > article {
			max-width: 100%;
			left: 0;
			margin-top: -1rem;
		}
		.subGridClass .bar {
			float: right;
			margin-top: -3.5rem;
		}
	}

	@media screen and (max-width: 700px) {
		.wrapper {
			border-radius: 0;
			border-top: 0;
			border-top: 1px solid var(--lightGrey);
		}

		aside > ul:not(.contactInformation):not(.projectDetails > ul) {
			position: absolute;
			top: -3rem;
			padding-left: 0;
			left: 0;
		}

		.contactInformation {
			padding: 5px;
			padding-top: 0;
			border-bottom: 0;
		}

		.contactInformation p {
			font-size: 15px;
			gap: 5px;
		}
		.headerAside {
			padding-right: 5px;
			border-bottom: 0;
			align-items: normal;
		}

		.subTitle {
			display: none;
		}
		.cartoonify {
			display: none;
		}
		.signin,
		.portfolio,
		aside > ul:not(.contactInformation) li:last-child {
			display: none;
		}

		.cv_item ul > li {
			max-width: 100%;
		}
		.top::after {
			height: 300px;
			left: 1rem;
			width: calc(100% - 2rem);
			top: 3rem;
		}
		.descriptionHolder {
			display: grid;
		}
		.subGridClass .bar {
			margin-top: 0;
		}
		.subGridClass .textfield {
			margin-top: 3rem;
			height: calc(100% - 3rem);
		}
		.projectDetails > ul {
			display: block;
			position: relative;
		}
		.container > article > section > .projectDetails > ul > li.flexBox {
			display: flex;
		}
	}

	@media screen and (max-width: 550px) {
		#grid_images {
			max-width: 500px;
			height: 500px;
		}
		.projectGrid {
			grid-template-columns: repeat(1, 1fr);
			max-width: 340px;
		}
		.descriptionHolder {
			display: block;
		}
		.subGridClass .textfield {
			height: 200px;
			margin-top: 1rem;
		}
		.subGridClass .bar {
			float: right;
			margin-top: -3.5rem;
		}
	}

	@media screen and (max-width: 450px) {
		#grid_images {
			max-width: 300px;
			height: 300px;
		}
		.subHeaderCV {
			max-width: 200px;
		}

		.subGridClass .bar {
			float: none;
			float: right;
			clear: both;
			margin-top: 2rem;
		}
		.subGridClass .textfield {
			float: left;
		}
		.container article header {
			font-size: 18px;
		}
	}

	@media screen and (max-width: 400px) {
		.contactInformation {
			clear: both;
		}
		.headerAside {
			float: left;
			clear: both;
		}
		.projectGrid {
			grid-template-columns: repeat(1, 1fr);
			max-width: 100%;
		}

		.keyboard-key {
			width: 20px;
			height: 20px;
		}
		aside > ul:not(.contactInformation) {
			top: 0;
			right: 1rem;
			left: auto;
		}

		.container > article > section > .projectDetails > ul {
			top: 0;
			padding-left: 1rem;
		}
		li.flexBox {
			justify-content: left;
		}

		.overview {
			gap: 10px;
		}
	}

	@media screen and (max-width: 370px) {
		section.WorldeGame {
			width: calc(100% - 2rem);
		}
		.keyboard-container {
			padding: 10px;
		}
		.keyboard-key {
			width: 20px;
			height: 20px;
			aspect-ratio: 1;
		}
	}

	@media screen and (max-width: 350px) {
		section.WorldeGame {
			width: calc(100% - 2rem);
		}
		.keyboard-container {
			padding: 10px;
		}
		.keyboard-key {
			width: 20px;
			height: 20px;
			aspect-ratio: 1;
		}
		.container article header {
			font-size: 14px;
		}
	}

	@media screen and (max-width: 320px) {
		#grid_images {
			max-width: 250px;
			height: 250px;
		}
		.gridControls {
			max-width: 250px;
		}
		.subHeaderCV {
			max-width: 150px;
		}
		aside > ul:not(.contactInformation) {
			top: -3rem;
			left: 0;
		}

		.container > article > section > .projectDetails > ul {
			top: 0;
			padding-left: 0;
		}
	}
</style>
