<script lang="ts">
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';

	type AlertErrorProps = {
		error: string;
		'data-testid'?: string;
	};

	let { error, 'data-testid': testId }: AlertErrorProps = $props();
</script>

<Alert.Root variant="destructive" class="mb-4" data-testid={testId}>
	<CircleAlertIcon class="size-4" />
	<Alert.Title>{error}</Alert.Title>
</Alert.Root>
