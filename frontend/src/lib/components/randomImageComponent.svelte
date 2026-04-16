<script lang="ts">
	import { onMount } from 'svelte';

	type Layout = number[][];

	const GRID_ROWS = 5;
	const GRID_COLS = 5;
	const MIN_ITEMS = 4;

	let gridContainer: HTMLDivElement;
	let images: string[] = [];
	let fetchInProgress = false;

	let layout: Layout = [];

	async function fetchRandomImages(): Promise<string[]> {
		if (fetchInProgress) return [];
		fetchInProgress = true;

		try {
			const res = await fetch('/api/images', {
				method: 'GET',
				headers: {
					Accept: 'application/json'
				}
			});
			const data = await res.json();

			if (!Array.isArray(data)) {
				throw new Error('Invalid response');
			}

			return data;
		} catch (err) {
			console.error(err);
			return [];
		} finally {
			fetchInProgress = false;
		}
	}

	function generateRandomLayout(rows: number, cols: number): Layout {
		const layout: Layout = Array.from({ length: rows }, () => Array(cols).fill(0));

		let currentItem = 1;
		let attempts = 0;

		while (!isGridFilled(layout) && attempts < 1000) {
			const block = getRandomBlock();

			if (placeBlock(layout, block, currentItem)) {
				currentItem++;
			}

			attempts++;
		}

		return layout;
	}

	function getRandomBlock() {
		const shapes = [
			{ width: 1, height: 1 },
			{ width: 1, height: 2 },
			{ width: 2, height: 2 },
			{ width: 3, height: 2 },
			{ width: 3, height: 3 }
		];

		return shapes[Math.floor(Math.random() * shapes.length)];
	}

	function placeBlock(layout: Layout, block: any, item: number): boolean {
		for (let r = 0; r <= GRID_ROWS - block.height; r++) {
			for (let c = 0; c <= GRID_COLS - block.width; c++) {
				if (isBlockAvailable(layout, r, c, block)) {
					for (let i = 0; i < block.height; i++) {
						for (let j = 0; j < block.width; j++) {
							layout[r + i][c + j] = item;
						}
					}
					return true;
				}
			}
		}
		return false;
	}

	function isBlockAvailable(layout: Layout, row: number, col: number, block: any) {
		for (let r = row; r < row + block.height; r++) {
			for (let c = col; c < col + block.width; c++) {
				if (layout[r][c] !== 0) return false;
			}
		}
		return true;
	}

	function isGridFilled(layout: Layout) {
		return layout.flat().every((cell) => cell !== 0);
	}

	async function CreateGrid() {
		const imgs = await fetchRandomImages();
		if (imgs.length === 0) return;

		images = imgs;
		layout = generateRandomLayout(GRID_ROWS, GRID_COLS);
	}

	onMount(() => {
		CreateGrid();
	});

	function findPositions(layout: number[][], item: number) {
		let rowStart = Infinity;
		let colStart = Infinity;
		let rowEnd = 0;
		let colEnd = 0;

		for (let r = 0; r < layout.length; r++) {
			for (let c = 0; c < layout[r].length; c++) {
				if (layout[r][c] === item) {
					rowStart = Math.min(rowStart, r + 1);
					colStart = Math.min(colStart, c + 1);
					rowEnd = Math.max(rowEnd, r + 2);
					colEnd = Math.max(colEnd, c + 2);
				}
			}
		}

		return { rowStart, rowEnd, colStart, colEnd };
	}
</script>

<div
	bind:this={gridContainer}
	class="grid"
	style="grid-template-rows: repeat(5, 1fr); grid-template-columns: repeat(5, 1fr);"
>
	{#each Array.from(new Set(layout.flat())) as item}
		{#if item !== 0}
			{@const positions = findPositions(layout, item)}
			<div
				class="grid-item"
				style="
					grid-row: {positions.rowStart} / {positions.rowEnd};
					grid-column: {positions.colStart} / {positions.colEnd};
					background-image: url({images[item % images.length]});
					background-size: cover;
					background-position: center;
				"
				aria-label="random Image container"
			></div>
		{/if}
	{/each}
</div>

<div class="gridControls">
	<p>
		Gemaakt met de
		<a href="https://pexels.com" target="_blank">Pexels API</a>
	</p>

	<button on:click={CreateGrid} aria-label="Get new images">
		<svg width="30" height="30" viewBox="0 0 256 256" aria-label="Get new images">
			<path
				fill="currentColor"
				d="M28 128a68.07 68.07 0 0 1 68-68h118.34l-17.17-17.17a4 4 0 0 1 5.66-5.66l24 24a4 4 0 0 1 0 5.66l-24 24a4 4 0 0 1-5.66-5.66L214.34 68H96a60.07 60.07 0 0 0-60 60a4 4 0 0 1-8 0m196-4a4 4 0 0 0-4 4a60.07 60.07 0 0 1-60 60H41.66l17.17-17.17a4 4 0 0 0-5.66-5.66l-24 24a4 4 0 0 0 0 5.66l24 24a4 4 0 1 0 5.66-5.66L41.66 196H160a68.07 68.07 0 0 0 68-68a4 4 0 0 0-4-4"
			/>
		</svg>
	</button>
</div>

<style>
	.grid {
		padding: 5px;
		margin: 1em;
		height: 600px;
		width: 600px;
		display: grid;
		gap: 5px;
		border: 1px solid var(--lightGrey);
		border-radius: 5px 5px 0 0;
	}

	.gridControls {
		width: 600px;
		margin: 0 1rem;
		margin-top: -1rem;
		padding: 5px;
		border: 1px solid var(--lightGrey);
		border-top: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--fontAccent);
	}

	.gridControls button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		color: #0026ff;
	}

	.grid-item {
		border-radius: 4px;
	}

	@media screen and (max-width: 1500px) {
		.grid,
		.gridControls {
			width: 80%;
			max-height: 80%;
		}
	}

	@media screen and (max-width: 768px) {
		.grid,
		.gridControls {
			max-width: 400px;
			height: 400px;
		}
		.gridControls {
			height: max-content;
		}
	}

	@media screen and (max-width: 320px) {
		.grid {
			max-width: 250px;
			height: 250px;
		}
		.gridControls {
			max-width: 250px;
		}
	}
</style>
