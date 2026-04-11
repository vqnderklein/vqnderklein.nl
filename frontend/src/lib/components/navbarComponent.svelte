<nav>
	<a href="/">
		<picture>
			<source srcset="/img/favicon-dark.svg" media="(max-width:450px)" />
			<img
				src="/img/inloggen_003.png"
				alt="vqnderklein logo"
				title="vqnderklein.nl"
			/>
		</picture>
	</a>
	<ul>
		<li>
			<a href="https://status.vqnderklein.nl" target="_blank" aria-label="Status pagina">
				<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 48 48">
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M24.018 2.503c-16.335.018-26.69 17.52-18.842 31.846L2.527 45.484l11.135-2.649c12.301 6.748 27.663.092 31.152-13.497S38.047 2.516 24.018 2.503m0 9.474v20.761"
					></path>
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m34.398 22.357l-10.38 10.381l-10.381-10.381M34.398 36.02H13.637"
					></path>
				</svg>
			</a>
		</li>

		<li>
			<a
				href="https://inloggen.vqnderklein.nl"
				target="_blank"
				aria-label="Inloggen op onze services"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 256 256">
					<path
						fill="currentColor"
						d="M227.46 214c-16.52-28.56-43-48.06-73.68-55.09a68 68 0 1 0-51.56 0c-30.64 7-57.16 26.53-73.68 55.09a4 4 0 0 0 6.92 4C55 184.19 89.62 164 128 164s73 20.19 92.54 54a4 4 0 0 0 3.46 2a3.93 3.93 0 0 0 2-.54a4 4 0 0 0 1.46-5.46M68 96a60 60 0 1 1 60 60a60.07 60.07 0 0 1-60-60"
					></path>
				</svg>
			</a>
		</li>
	</ul>
</nav>

<style>
	nav > a > picture > img {
		max-width: 300px;
	}

	nav {
		display: flex;
		justify-content: space-between;
		padding: 1rem 2rem;
		align-items: center;
	}

	nav > ul {
		display: inline-flex;
		gap: 1.5rem;
		list-style-type: none;
	}
	nav > ul > li > a {
		color: var(--font);
	}

	nav > ul > li > a > svg {
		transition: 500ms;
	}

	nav > ul > li:hover a > svg {
		color: var(--secundaryDark);
	}
</style>
