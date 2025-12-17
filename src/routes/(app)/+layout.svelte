<script lang="ts">
	import { Navbar } from '$lib/widgets/navbar';

	let { children } = $props();
</script>

<main class="flex flex-col h-svh overflow-hidden">
	<div class="flex-1 overflow-y-auto">
		{@render children()}
	</div>
	<Navbar />
</main>
