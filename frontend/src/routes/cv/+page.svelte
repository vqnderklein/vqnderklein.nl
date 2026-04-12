<svelte:head>
	<title>CV • vqnderklein.nl</title>
</svelte:head>

<h1>CV</h1>
<p>Sommige onderdelen zijn weggelaten om privacy overwegingen</p>
<section class="cv_item">
	<header>Persoonlijk</header>
	<p class="personal">
		Ik heb een passie voor techniek, natuur, tekenen en ontwerpen en het ontwikkelen van online
		omgevingen. Verder ben ik een fanatiek volleyballer, ondanks dat ik er niet heel goed in ben. Ik
		heb geleerd dat samenwerken meer is dan alleen het verdelen van taken. Het betekent ook dat je
		je eigen verantwoordelijkheid neemt en inspringt wanneer de ander daarom vraagt. Ook als er niet
		direct om word gevraagd.
	</p>
</section>
<section class="cv_item">
	<header>Competenties</header>
	<article>
		<span>Precies</span>
		<span>Nauwkeurig</span>
		<span>Accuraat</span>
		<span>Gedreven</span>
		<span>Flexibel</span>
		<span>Creatief</span>
		<span>Oplossend</span>
		<span>Secuur</span>
		<span>Anticiperend</span>
		<span>Betrokken</span>
		<span>Integer</span>
	</article>
</section>
<section class="cv_item">
	<header>Opleiding</header>
	<ul>
		<li>
			<img src="/img/InhollandLogo.jpg" alt="Inholland Logo" title="Inholland HBO" />
			<div>
				<header>Hogeschool Inholland</header>
				<p class="subDescr">Sep. 2024 - Heden</p>
			</div>
		</li>
		<li>
			<img
				src="/img/MontessoriLogo.webp"
				alt="Montessori Campus"
				title="Montesorri Lyceum Flevoland"
			/>
			<div>
				<header>Montessori Lyceum Flevoland</header>
				<p class="subDescr">Sep. 2018 - Jun. 2024</p>
			</div>
		</li>
		<li>
			<img src="/img/DeBuitenburchtLogo.png" alt="Buitenburcht Logo" title="De Buitenburcht" />
			<div>
				<header>De Buitenburcht</header>
				<p class="subDescr">Aug. 2008 - Jun. 2018</p>
			</div>
		</li>
	</ul>
</section>
<section class="cv_item">
	<header>Werkervaring</header>
	<ul>
		<li class="NoFlexAutoAligning">
			<img src="/img/OudValkeveen.png" alt="OudValkeveen Logo" title="OudValkeveen" />
			<div>
				<header>Parkmedewerker</header>
				<p class="subHeaderCV">Speelpark Oud Valkeveen &bull; Parttime</p>
				<p class="subDescr">Seizoen 2025 &bull; 7 mnd</p>
				<p class="subDescr">Naarden, Noord-Holland Nederland</p>
			</div>
		</li>
		<li class="NoFlexAutoAligning">
			<img src="/img/Almeerplant.png" alt="Almeerplant Logo" title="Tuinwinkel Almeerplant" />
			<div>
				<header>Algemeen medewerker</header>
				<p class="subHeaderCV">Tuinwinkel Almeerplant &bull; Parttime</p>
				<p class="subDescr">Nov. 2024 - Nov. 2025</p>
				<p class="subDescr">Almere, Flevoland Nederland</p>
			</div>
		</li>
		<li class="NoFlexAutoAligning">
			<img src="/img/OudValkeveen.png" alt="OudValkeveen" title="OudValkeveen" />
			<div>
				<header>Parkmedewerker</header>
				<p class="subHeaderCV">Speelpark Oud Valkeveen &bull; Parttime</p>
				<p class="subDescr">Seizoen 2024 &bull; 6 mnd</p>
				<p class="subDescr">Naarden, Noord-Holland Nederland</p>
			</div>
		</li>
	</ul>
</section>
<section class="cv_item">
	<header>Vrijwilliger</header>
	<ul>
		<li>
			<img src="/img/VVABLogo.jpg" alt="VVAB Logo" title="Volleybal Vereniging Almere Buiten" />
			<div>
				<header>VVAB</header>
				<p class="subHeaderCV">Scheidsrechter Commissie &bull; Aug. 2024 - Aug. 2025</p>
			</div>
		</li>
	</ul>
</section>
<section class="cv_item">
	<header>Certificaten</header>
	<ul>
		<li>
			<img src="/img/EF-icon.ico" alt="EF Certificaat" title="Engels Certificaat" />
			<div>
				<header>
					<a href="/files/EF SET Certificate.pdf" target="_blank">Engels</a>
				</header>
				<p class="subHeaderCV">EF set &bull; niveau C2</p>
			</div>
		</li>
	</ul>
</section>
<section class="cv_item">
	<header>Diploma's</header>
	<ul>
		<li>
			<div>
				<header>VWO</header>
				<p class="subDescr">Behaald in 2024</p>
			</div>
		</li>
		<li>
			<div>
				<header>Propedeuse Informatica</header>
				<p class="subDescr">Behaald in 2025</p>
			</div>
		</li>
	</ul>
</section>
<section class="cv_item">
	<header>Stages & Cursussen</header>
	<ul>
		<li>
			<div>
				<header>Gemeente Almere</header>
				<p class="subDescr">Stage &bull; Jun. 2023</p>
			</div>
		</li>
		<li>
			<div>
				<header>ICT in de Wolken</header>
				<p class="subDescr">Webdevelopment &bull; Sep. 2021 - Mei 2022</p>
			</div>
		</li>
		<li>
			<div>
				<header>Hubrecht Instituut</header>
				<p class="subDescr">Stage &bull; Feb. 2021</p>
			</div>
		</li>
	</ul>
</section>

<style>
	.cv_item {
		border: 1px solid var(--fontAccent);
		border-left: 0;
		border-bottom: 0;
		border-right: 0;
		padding: 1rem;
	}

	.cv_item header {
		font-weight: bold;
		font-size: 1.2rem;
	}

	.cv_item .personal {
		max-width: 600px;
		padding-top: 5px;
		line-height: 1.5;
	}

	.cv_item ul {
		padding: 1rem 0;
	}

	.cv_item article {
		margin: 1rem 0;
		display: flex;
		gap: 0.4rem 0.6rem;
		flex-wrap: wrap;
		max-width: 700px;
	}

	.cv_item article span {
		padding: 6px 12px;
		text-transform: lowercase;
		color: black;
		background-color: #cfcfcf;
		border-radius: 8px;
	}

	.cv_item ul > li {
		list-style-type: none;
		display: flex;
		padding: 0.8rem 0em;
		width: 400px;
		border-bottom: 1px solid var(--lightGrey);
		gap: 1rem;
		align-items: center;
	}

	.cv_item ul > li img {
		max-width: 50px;
	}

	.cv_item ul > li header {
		font-size: 1rem;
		padding-bottom: 3px;
	}

	.cv_item ul > li:last-child {
		border: none;
		padding-bottom: 0;
	}

	.cv_item ul > li.NoFlexAutoAligning {
		align-items: start;
	}

	.cv_item ul > li.NoFlexAutoAligning p {
		padding-bottom: 1px;
	}

	.subHeaderCV {
		font-size: 0.9rem;
		margin-bottom: 3px;
	}

	.cv_item > ul > li > div > header > a {
		text-decoration: none;
		color: #040403;
	}

	.NoFlexAutoAligning {
		align-items: start;
	}
	.subDescr {
		font-weight: 400;
		font-size: 0.9rem;
		color: var(--fontAccent);
		word-spacing: 1px;
	}

	@media screen and (max-width: 700px) {
		.cv_item ul > li {
			max-width: 100%;
		}
	}
</style>
