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
});
