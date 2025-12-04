<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();
</script>

<Button variant="outline">Button</Button>

<h1>Welcome to SvelteKit {data.user?.email ?? 'Guest'}</h1>
