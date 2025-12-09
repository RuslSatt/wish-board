import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.safeGetSession();

	if (!user) {
		throw redirect(302, '/auth/login');
	}

	return {};
};

export const actions: Actions = {
	update: async ({ locals, request }) => {
		const { user } = await locals.safeGetSession();

		if (!user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await request.formData();
		const firstName = formData.get('firstName')?.toString().trim() ?? '';
		const username = formData.get('username')?.toString().trim() ?? '';
		const birthdate = formData.get('birthdate')?.toString() ?? '';

		if (!firstName || !username) {
			return fail(400, {
				success: false,
				error: 'Пожалуйста, заполните обязательные поля',
				missing: {
					firstName: !firstName,
					username: !username
				}
			});
		}

		const { error } = await locals.supabase.auth.updateUser({
			data: {
				first_name: firstName,
				username,
				birthdate
			}
		});

		if (error) {
			console.error('Error updating profile:', error);
			return fail(400, {
				success: false,
				error: 'Не удалось сохранить изменения профиля'
			});
		}

		return {
			success: true
		};
	}
};
