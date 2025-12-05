<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { navItems } from '../model/nav-item';
</script>

<nav class="flex items-center justify-between px-4 py-3 w-full border-t rounded-t-lg shadow-sm">
	<ul class="flex items-center justify-between w-full">
		{#each navItems as item}
			<li>
				<Button variant={item.variant ?? 'ghost'} size={item.size ?? 'icon'} href={item.href}>
					<item.icon />
				</Button>
			</li>
		{/each}
	</ul>
</nav>
