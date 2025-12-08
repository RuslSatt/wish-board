import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ConfirmForm from '../ui/confirm-form.svelte';

type MockSubmit = (args: unknown) => unknown;

let lastSubmit: MockSubmit | undefined;

vi.mock('$app/forms', () => {
	return {
		enhance(form: HTMLFormElement, submit?: MockSubmit) {
			lastSubmit = submit;

			return {
				destroy() {}
			};
		}
	};
});

describe('ConfirmForm', () => {
	it('should disable submit button when loading', async () => {
		render(ConfirmForm);

		const submitButton = page.getByRole('button', { name: 'Подтвердить' });

		await expect.element(submitButton).not.toBeDisabled();

		expect(lastSubmit).toBeTypeOf('function');
		lastSubmit?.({});

		await expect.element(submitButton).toBeDisabled();
	});

	it('should show incorrect error', async () => {
		render(ConfirmForm, { form: { incorrect: true, error: 'Incorrect OTP' } });

		const incorrectError = page.getByTestId('otp-error');
		await expect.element(incorrectError).toBeVisible();
		expect(incorrectError).toHaveTextContent('Incorrect OTP');
	});

	it('should show missing error', async () => {
		render(ConfirmForm, { form: { missing: true, error: 'Missing OTP' } });

		const missingError = page.getByTestId('otp-error');
		await expect.element(missingError).toBeVisible();
		expect(missingError).toHaveTextContent('Missing OTP');
	});
});
