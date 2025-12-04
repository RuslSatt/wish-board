import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals, request }) => {
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

		redirect(302, '/auth/confirm');
	}
} satisfies Actions;
