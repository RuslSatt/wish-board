import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const PENDING_EMAIL_COOKIE = 'pending_email';
const PENDING_VERIFICATION_COOKIE = 'pending_verification';

export const load = ({ cookies }) => {
	if (cookies.get(PENDING_VERIFICATION_COOKIE)) {
		throw redirect(303, '/auth/confirm');
	}
};

export const actions: Actions = {
	login: async ({ locals, request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';

		if (!email) {
			return fail(400, { error: 'Email is required', missing: true });
		}

		const { error } = await locals.supabase.auth.signInWithOtp({
			email
		});

		if (error) {
			return fail(400, { error: error.message, incorrect: true });
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
	}
};
