<script lang="ts">

	let grid = Array(6)
		.fill(0)
		.map(() => Array(5).fill(''));

	let currentRow = 0;
	let currentCol = 0;

	const id = Math.floor(Math.random() * 100000000);

	async function submitWord() {
		const word = grid[currentRow].join('');

		const res = await fetch('/api/wordle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
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

				grid[currentRow][index].letter = letter;
				grid[currentRow][index].color = color;
			});
		}

		if (data.guessedCorrectly === 'Y') {
			alert('You win!');
		} else {
			currentRow++;
			currentCol = 0;
		}
	}

	// function handleKey(key: string) {
	// 	if (/^[a-z]$/.test(key) && currentCol < 5) {
	// 		grid[currentRow][currentCol] = key;
	// 		currentCol++;
	// 	}

	// 	if (key === 'Backspace' && currentCol > 0) {
	// 		currentCol--;
	// 		grid[currentRow][currentCol] = '';
	// 	}

	// 	if (currentCol === 5) {
	// 		submitWord();
	// 	}
	// }
</script>

<!-- <svelte:window on:keydown={(e) => handleKey(e.key)} /> -->

<section class="WorldeGame">
	<header class="wordleHeader">
		<h3>Raad het woord</h3>
		<!-- <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 15 15">
            <path fill="currentColor" fill-rule="evenodd" d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5" clip-rule="evenodd" />
        </svg> -->
	</header>
	<div class="gridBody">
		{#each grid as row, rowIndex}
			{#each row as cell, colIndex}
				<input
					class="cell"
					bind:value={grid[rowIndex][colIndex].letter}
					style="background-color: {cell.color}"
					maxlength="1"
					readonly
				/>
			{/each}
		{/each}
	</div>
	<div class="keyboard"></div>
	<div class="endingSection"></div>
	<div class="controls">
		<p>Gemaakt met <a href="https://woorden.org" target="_blank">woorden.org</a></p>
	</div>
</section>

<style>
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

	.wordleHeader svg {
		cursor: pointer;
	}

	.WorldeGame .gridBody {
		display: grid;
		margin-top: 1rem;
		position: relative;
		padding: 1em;
		gap: 10px;
		grid-template-columns: repeat(5, 1fr);
	}

	.resultBody {
		padding: 1rem;
		animation: fadeIn ease-in-out 2000ms forwards;
		text-align: center;
		padding-bottom: 8rem;
		position: relative;
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

	.resultBody header {
		font-weight: bold;
		font-size: 1.4rem;
	}

	.specialWorlde {
		margin: 1rem;
		padding: 1rem;
		background-color: rgb(231, 231, 231, 40%);
		text-align: center;
		font-family: monospace;
		font-weight: 200;
		font-size: 20px;
	}

	.controls {
		padding: 0.5rem;
		border-top: 1px solid var(--fontAccent);
		color: var(--fontAccent);
		z-index: 100;
		position: relative;
	}

	.fadeOut {
		animation-delay: 5000ms;
		animation: fadeOut ease-in-out 2000ms forwards;
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
</style>
