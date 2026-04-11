const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export async function getRandomImages() {
	const randomInt = Math.floor(Math.random() * 5) + 1;

	const pages = [
		randomInt,
		randomInt + 2,
		randomInt + 4,
		randomInt + 6
	];

	const results = await Promise.all(
		pages.map((page) => fetchImagesFromPexels(page))
	);

	return results.flat();
}

async function fetchImagesFromPexels(page) {
	const url = `https://api.pexels.com/v1/search?query=landscape&page=${page}`;

	const response = await fetch(url, {
		headers: {
			Authorization: PEXELS_API_KEY
		}
	});

	if (!response.ok) {
		throw new Error(`PEXELS_ERROR_${response.status}`);
	}

	const data = await response.json();

	return data.photos.map((p) => p.src.medium);
}
