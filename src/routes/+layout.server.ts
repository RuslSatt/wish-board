import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
	const { user } = await safeGetSession();
	return {
		user,
		cookies: cookies.getAll()
	};
};
