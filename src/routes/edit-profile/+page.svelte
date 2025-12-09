<script lang="ts">
	import type { PageProps } from './$types';
	import { EditProfileForm } from '$lib/features/edit-profile';
	import { EditProfileAvatar } from '$lib/features/edit-profile';
	import { Header } from '$lib/widgets/header';

	let { data, form }: PageProps = $props();
</script>

<div class="flex flex-col items-center justify-start w-full bg-background">
	<Header title="Редактирование профиля" ariaLabel="Редактирование профиля" isBackButton></Header>

	<div class="w-full max-w-md px-4 pb-8 flex flex-col gap-6">
		<EditProfileAvatar user={data?.user} supabase={data?.supabase} />
		<EditProfileForm user={data?.user} {form} />
	</div>
</div>
