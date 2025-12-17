import type { Component } from 'svelte';
import HomeIcon from '@lucide/svelte/icons/home';
import UsersIcon from '@lucide/svelte/icons/users';
import PlusIcon from '@lucide/svelte/icons/plus';
import BookmarkIcon from '@lucide/svelte/icons/bookmark';
import UserIcon from '@lucide/svelte/icons/user';

export type NavItem = {
	icon: Component;
	href: string;
	variant?: 'ghost' | 'outline' | 'default';
	size?: 'icon' | 'icon-sm' | 'icon-lg';
};

export const navItems: NavItem[] = [
	{
		icon: HomeIcon,
		href: '/'
	},
	{
		icon: UsersIcon,
		href: '/friends'
	},
	{
		icon: PlusIcon,
		href: '/create',
		variant: 'outline'
	},
	{
		icon: BookmarkIcon,
		href: '/bookmarks'
	},
	{
		icon: UserIcon,
		href: '/profile'
	}
];
