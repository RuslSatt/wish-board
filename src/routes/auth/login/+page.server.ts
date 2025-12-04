import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
	if (cookies.get('pending_verification')) {
		throw redirect(303, '/auth/confirm');
	}
};
