<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Navbar } from '$lib/widgets/navbar';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="flex flex-col min-h-svh">
	<div class="flex-1">
		{@render children()}
	</div>
	<Navbar />
</main>
