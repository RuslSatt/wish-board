import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const PENDING_EMAIL_COOKIE = 'pending_email';
const PENDING_VERIFICATION_COOKIE = 'pending_verification';

export const actions = {
	login: async ({ locals, request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';

		if (!email) {
			return fail(400, { error: 'Email is required', email });
		}

		const { error } = await locals.supabase.auth.signInWithOtp({
			email: email
		});

		if (error) {
			return fail(400, { error: error.message, email });
		}

		cookies.set(PENDING_EMAIL_COOKIE, email, {
			path: '/',
			maxAge: 60 * 10,
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production'
		});

		cookies.set(PENDING_VERIFICATION_COOKIE, 'true', {
			path: '/',
			maxAge: 60 * 10,
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production'
		});

		redirect(302, '/auth/confirm');
	},
	confirm: async ({ locals, request, cookies }) => {
		const formData = await request.formData();
		const code = formData.get('code')?.toString() ?? '';

		if (!code) {
			return fail(400, { error: 'Code is required', code });
		}

		const email = cookies.get(PENDING_EMAIL_COOKIE);

		if (!email) {
			return fail(400, { error: 'Email not found. Please try logging in again.', code });
		}

		const { error } = await locals.supabase.auth.verifyOtp({
			email: email,
			token: code,
			type: 'email'
		});

		if (error) {
			return fail(400, { error: error.message, code });
		}

		cookies.delete(PENDING_EMAIL_COOKIE, { path: '/' });
		cookies.delete(PENDING_VERIFICATION_COOKIE, { path: '/' });

		redirect(302, '/');
	}
} satisfies Actions;
