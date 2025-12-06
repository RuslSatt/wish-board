<script lang="ts">
	import { LoginForm } from '$lib/features/auth';
	import type { PageProps } from '../$types';

	const { form }: PageProps = $props();
</script>

<LoginForm {form} />
