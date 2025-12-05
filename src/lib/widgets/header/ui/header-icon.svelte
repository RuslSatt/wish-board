<script lang="ts">
	import type { Component } from 'svelte';
	import { cn } from '$lib/utils';

	type Props = {
		icon: Component;
		class?: string;
		size?: 'sm' | 'md' | 'lg';
	};

	let { icon: Icon, class: className = '', size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'size-4',
		md: 'size-5',
		lg: 'size-6'
	};
</script>

<Icon class={cn(sizeClasses[size], className)} />
