<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
	{#each Array(8) as _, i (i)}
		<div class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
			<div class="px-6">
				<Skeleton class="h-6 w-3/4 mb-2" />
				<Skeleton class="h-4 w-1/2" />
			</div>
			<div class="px-6">
				<Skeleton class="h-4 w-full" />
			</div>
		</div>
	{/each}
</div>
