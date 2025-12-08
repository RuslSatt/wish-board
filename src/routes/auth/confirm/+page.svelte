<script lang="ts">
	import { ConfirmForm } from '$lib/features/auth';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<ConfirmForm {form} />
