<script lang="ts">
	import WishListCard from './wish-list-card.svelte';
	import ProfileBoardsSkeleton from './profile-boards-skeleton.svelte';
	import type { Tables } from '../../../../database.types';

	type WishList = Tables<'wish_lists'>;

	type Props = {
		wishLists: WishList[];
		isLoading: boolean;
		error: string | null;
	};

	let { wishLists, isLoading, error }: Props = $props();
</script>

<div class="w-full max-w-6xl px-4 mt-8">
	<h2 class="text-2xl font-bold mb-6">Мои доски желаний</h2>

	{#if isLoading}
		<ProfileBoardsSkeleton />
	{:else if wishLists}
		{#if wishLists.length > 0}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{#each wishLists as wishList (wishList.id)}
					<WishListCard {wishList} />
				{/each}
			</div>
		{:else}
			<div class="text-center py-12">
				<p class="text-muted-foreground">У вас пока нет досок желаний</p>
			</div>
		{/if}
	{:else if error}
		<div class="text-center py-12">
			<p class="text-muted-foreground">{error}</p>
		</div>
	{/if}
</div>
