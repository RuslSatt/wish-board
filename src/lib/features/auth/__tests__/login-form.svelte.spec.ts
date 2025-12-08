import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import LoginForm from '../ui/login-form.svelte';

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

describe('LoginForm', () => {
	it('should disable submit button when loading', async () => {
		render(LoginForm);

		const submitButton = page.getByRole('button', { name: 'Войти' });

		await expect.element(submitButton).not.toBeDisabled();

		expect(lastSubmit).toBeTypeOf('function');
		lastSubmit?.({});

		await expect.element(submitButton).toBeDisabled();
	});

	it('should show incorrect error', async () => {
		render(LoginForm, { form: { incorrect: true, error: 'Incorrect email' } });

		const incorrectError = page.getByTestId('incorrect-error');
		await expect.element(incorrectError).toBeVisible();
		expect(incorrectError).toHaveTextContent('Incorrect email');
	});

	it('should show missing error', async () => {
		render(LoginForm, { form: { missing: true, error: 'Missing email' } });

		const missingError = page.getByTestId('missing-error');
		await expect.element(missingError).toBeVisible();
		expect(missingError).toHaveTextContent('Missing email');
	});
});
