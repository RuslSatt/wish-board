<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Navbar } from '$lib/widgets/navbar';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />

<main class="flex flex-col h-svh overflow-hidden">
	<div class="flex-1 overflow-y-auto">
		{@render children()}
	</div>
	<Navbar />
</main>
