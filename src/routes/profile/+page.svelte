<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import { HeaderIcon } from '$lib/widgets/header';
	import { Header } from '$lib/widgets/header';
	import { ProfileInfo } from '$lib/widgets/profile';
	import { ProfileBoards } from '$lib/widgets/profile';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { Database } from '../../database.types';

	let { data }: { data: PageData } = $props();

	let wishLists: Database['public']['Tables']['wish_lists']['Row'][] = $state([]);
	let isLoading = $state(false);
	let error: string | null = $state(null);

	onMount(async () => {
		if (!data.supabase) return;

		isLoading = true;
		const { data: wishListsData, error: err } = await data.supabase
			.from('wish_lists')
			.select()
			.order('created_at', { ascending: false });

		if (err) {
			error = err.message;
		} else {
			wishLists = wishListsData || [];
		}

		isLoading = false;
	});
</script>

<div class="flex flex-col items-center justify-center w-full">
	<Header title="Profile" ariaLabel="Profile">
		<Button variant="link" size="icon" href="/settings"><HeaderIcon icon={SettingsIcon} /></Button>
	</Header>

	<ProfileInfo />
	<ProfileBoards {wishLists} {isLoading} {error} />
</div>
