import { describe, it, expect, vi } from 'vitest';
import { getRandomImages } from '../src/services/imageService.js';

describe('getRandomImages', () => {
	it('returns flattened image array', async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: true,
				json: () =>
					Promise.resolve({
						photos: [
							{
								src: {
									medium: 'image.jpg'
								}
							}
						]
					})
			})
		);

		const result = await getRandomImages();

		expect(result.length).toBeGreaterThan(0);
		expect(result[0]).toBe('image.jpg');
	});

	it('throws on pexels error', async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				ok: false,
				status: 500
			})
		);

		await expect(getRandomImages()).rejects.toThrow(
			'PEXELS_ERROR_500'
		);
	});
});