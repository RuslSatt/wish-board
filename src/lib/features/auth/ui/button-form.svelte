<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';

	type ButtonFormProps = {
		isLoading: boolean;
		label: string;
	};

	let { isLoading, label }: ButtonFormProps = $props();
</script>

<Button type="submit" disabled={isLoading}>
	{label}
	{#if isLoading}
		<Loader2Icon class="animate-spin" />
	{/if}
</Button>
