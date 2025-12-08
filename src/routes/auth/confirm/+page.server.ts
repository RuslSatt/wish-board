import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const PENDING_EMAIL_COOKIE = 'pending_email';
const PENDING_VERIFICATION_COOKIE = 'pending_verification';

export const actions: Actions = {
	confirm: async ({ locals, request, cookies }) => {
		const formData = await request.formData();
		const code = formData.get('code')?.toString() ?? '';

		if (!code) {
			return fail(400, { error: 'Code is required', code });
		}

		const email = cookies.get(PENDING_EMAIL_COOKIE);

		if (!email) {
			return fail(400, { error: 'Email not found. Please try logging in again.', missing: true });
		}

		const { error } = await locals.supabase.auth.verifyOtp({
			email: email,
			token: code,
			type: 'email'
		});

		if (error) {
			return fail(400, { error: error.message, incorrect: true });
		}

		cookies.delete(PENDING_EMAIL_COOKIE, { path: '/' });
		cookies.delete(PENDING_VERIFICATION_COOKIE, { path: '/' });

		redirect(302, '/');
	}
};
