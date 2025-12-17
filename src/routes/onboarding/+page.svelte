<script lang="ts">
	import type { PageProps } from './$types';
	import CreateNameForm from '$lib/features/onboarding/ui/create-name-form.svelte';

	let { form }: PageProps = $props();
</script>

<div class="flex flex-col items-center justify-center w-full p-6 h-full">
	<div class="w-full max-w-md">
		<CreateNameForm {form} />
	</div>
</div>
