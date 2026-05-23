import { describe, it, expect, vi } from 'vitest';

const sendMailMock = vi.hoisted(() => vi.fn());

vi.mock('nodemailer', () => ({
	default: {
		createTransport: () => ({
			use: vi.fn(),
			sendMail: sendMailMock
		})
	}
}));

import { sendContactFormEmail } from '../src/services/mailerService.js';

describe('sendContactFormEmail', () => {
	it('sends email', async () => {
		sendMailMock.mockResolvedValue({});

		await sendContactFormEmail({
			firstName: 'John',
			lastName: 'Doe',
			email: 'john@example.com',
			subject: 'Test',
			message: 'Hello'
		});

		expect(sendMailMock).toHaveBeenCalled();
	});
});