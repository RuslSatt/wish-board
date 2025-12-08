<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { HeaderIcon } from '..';

	type HeaderProps = {
		children?: Snippet;
		className?: string;
		title?: string;
		ariaLabel?: string;
		isBackButton?: boolean;
	};

	let {
		children,
		className = '',
		title = '',
		ariaLabel = '',
		isBackButton = false
	}: HeaderProps = $props();
</script>

<div
	class={cn('flex items-center justify-between px-3 py-2 w-full', className)}
	aria-label={ariaLabel}
	{title}
>
	{#if isBackButton}
		<Button variant="link" size="icon" href="/">
			<HeaderIcon icon={ArrowLeftIcon} />
		</Button>
	{/if}
	<h1 class="text-2xl font-bold">{title}</h1>
	{@render children?.()}
</div>
