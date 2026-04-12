<script lang="ts">
	type Cell = {
		letter: string;
		color: string;
	};

	let grid: Cell[][] = Array(6)
		.fill(null)
		.map(() =>
			Array(5)
				.fill(null)
				.map(() => ({ letter: '', color: '' }))
		);

	let currentRow = 0;
	let currentCol = 0;
	let loading = false;
	let gameOver = false;
	let correctWord = '';

	const id = Math.floor(Math.random() * 100000000);

	async function submitWord() {
		if (loading || gameOver) return;

		const word = grid[currentRow].map((c) => c.letter).join('');
		if (word.length < 5) return;

		loading = true;

		try {
			const res = await fetch('/api/wordle', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					word,
					row: currentRow + 1,
					modus: 5,
					id
				})
			});

			const data = await res.json();

			if (data.information) {
				data.information.forEach((entry: string, index: number) => {
					const [letter, , color] = entry.split(' ');

					grid[currentRow][index] = {
						letter,
						color
					};
				});
			}

			if (data.guessedCorrectly === 'Y') {
				gameOver = true;
				correctWord = word;
				return;
			}

			if (data.correctWord) {
				gameOver = true;
				correctWord = data.correctWord;
				return;
			}

			currentRow++;
			currentCol = 0;
		} finally {
			loading = false;
		}
	}

	function resetGame() {
		grid = Array(6)
			.fill(null)
			.map(() =>
				Array(5)
					.fill(null)
					.map(() => ({ letter: '', color: '' }))
			);

		currentRow = 0;
		currentCol = 0;
		gameOver = false;
		correctWord = '';
	}

	function handleKey(key: string) {
		if (loading) return;

		if (/^[a-z]$/.test(key) && currentCol < 5) {
			grid[currentRow][currentCol].letter = key;
			currentCol++;
		}

		if (key === 'Backspace' && currentCol > 0) {
			currentCol--;
			grid[currentRow][currentCol].letter = '';
		}

		if (key === 'Enter') {
			submitWord();
		}
	}
</script>

<svelte:window on:keydown={(e) => handleKey(e.key)} />

<section class="WorldeGame">
	<header class="wordleHeader">
		<h3>Raad het woord</h3>

		{#if loading}
			<div class="loader"></div>
		{/if}
	</header>
	<div class="gameWrapper">
		<!-- GRID -->
		<div class="gridContainer {gameOver ? 'hide' : ''}">
			<div class="gridBody">
				{#each grid as row, rowIndex}
					{#each row as cell}
						<input
							class="cell"
							value={cell.letter}
							style="background-color: {cell.color}"
							maxlength="1"
							readonly
						/>
					{/each}
				{/each}
			</div>
		</div>

		<!-- RESULT SCREEN -->
		{#if gameOver}
			<div class="resultScreen">
				<h2>Game Over</h2>
				<p>Het juiste woord was:</p>
				<h1>{correctWord}</h1>

				<button on:click={resetGame}>Speel opnieuw</button>
			</div>
		{/if}
	</div>
	<div class="keyboard"></div>
	<div class="endingSection"></div>
	<div class="controls">
		<p>Gemaakt met <a href="https://woorden.org" target="_blank">woorden.org</a></p>
	</div>
</section>

<style>
	.loader {
		width: 20px;
		height: 20px;
		border: 3px solid transparent;
		border-top: 3px solid var(--fontAccent);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.WorldeGame input {
		height: 50px;
		width: 50px;
		display: flex;
		font-size: 22px;
		align-items: center;
		border: 1px solid var(--fontAccent);
		outline: transparent;
		justify-items: center;
		text-transform: uppercase;
		font-weight: bold;
		text-align: center;
	}

	.gridBody::after {
		content: '';
		width: 100%;
		position: absolute;
		z-index: 100;
		height: 100%;
		top: 0;
		left: 0;
	}

	.WorldeGame input:focus {
		outline: transparent;
	}

	section.WorldeGame {
		margin: 1em 1rem 0 1rem;
		border: 1px solid var(--fontAccent);
		border-radius: 5px 5px 0 0;
		position: relative;
		width: min-content;
	}

	.wordleHeader {
		display: flex;
		z-index: 1000;
		padding: 1rem 1rem 0rem 1rem;
		align-items: center;
		position: relative;
		justify-content: space-between;
	}

	.WorldeGame .gridBody {
		display: grid;
		margin-top: 1rem;
		position: relative;
		padding: 1em;
		gap: 10px;
		grid-template-columns: repeat(5, 1fr);
	}

	@keyframes fadeIn {
		0% {
			top: -40px;
			opacity: 0;
		}
		100% {
			top: 0;
			opacity: 1;
		}
	}

	.controls {
		padding: 0.5rem;
		border-top: 1px solid var(--fontAccent);
		color: var(--fontAccent);
		z-index: 100;
		position: relative;
	}

	.gameWrapper {
		position: relative;
		overflow: hidden;
	}

	/* Grid disappears */
	.gridContainer {
		transition:
			transform 0.4s ease,
			opacity 0.4s ease;
	}

	.gridContainer.hide {
		transform: translateY(-40px);
		opacity: 0;
		pointer-events: none;
	}

	/* Result screen */
	.resultScreen {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -40px);
		opacity: 0;
		animation: fadeInResult 0.5s forwards;
		text-align: center;
	}

	@keyframes fadeInResult {
		to {
			transform: translate(-50%, -50%);
			opacity: 1;
		}
	}

	.resultScreen h1 {
		font-size: 2rem;
		margin: 0.5rem 0;
		text-transform: uppercase;
	}

	.resultScreen button {
		margin-top: 1rem;
		padding: 0.6rem 1rem;
		border: none;
		border-radius: 5px;
		background: var(--secundaryDark);
		color: white;
		cursor: pointer;
		transition: 100ms ease;
	}

	.resultScreen button:hover {
		scale: 1.05;
	}

	@keyframes fadeOut {
		0% {
			transform: translateY(0);
			opacity: 1;
		}
		100% {
			transform: translateY(40px);
			opacity: 0;
		}
	}

	@media screen and (max-width: 400px) {
		section.WorldeGame {
			width: calc(100% - 2rem);
		}

		.WorldeGame input {
			height: 100%;
			width: 100%;
			aspect-ratio: 1;
		}
	}

	@media screen and (max-width: 370px) {
		section.WorldeGame {
			width: calc(100% - 2rem);
		}
	}

	@media screen and (max-width: 350px) {
		section.WorldeGame {
			width: calc(100% - 2rem);
		}
	}
</style>
