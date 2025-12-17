<script lang="ts">
	import type { PageProps } from './$types';
	import CreateNameForm from '$lib/features/onboarding/ui/create-name-form.svelte';

	let { form }: PageProps = $props();
</script>

<CreateNameForm {form} />
