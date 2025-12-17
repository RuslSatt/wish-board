import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	createName: async ({ request }) => {
		const formData = await request.formData();
		const code = formData.get('code')?.toString() ?? '';

		if (!code) {
			return fail(400, { error: 'Code is required', code });
		}

		// const { error } = await locals.supabase.auth.verifyOtp({
		// 	email: email,
		// 	token: code,
		// 	type: 'email'
		// });

		// if (error) {
		// 	return fail(400, { error: error.message, incorrect: true });
		// }

		redirect(302, '/');
	}
};
