<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import { HeaderIcon } from '$lib/widgets/header';
	import { Header } from '$lib/widgets/header';
	import { ProfileInfo } from '$lib/widgets/profile';
</script>

<div class="flex flex-col items-center justify-center">
	<Header title="Profile" ariaLabel="Profile">
		<Button variant="link" size="icon" href="/settings"><HeaderIcon icon={SettingsIcon} /></Button>
	</Header>

	<ProfileInfo />
</div>
