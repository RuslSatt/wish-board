import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './auth/$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user } = await locals.safeGetSession();
	if (user) {
		throw redirect(303, '/');
	}
};
