<script lang="ts">
	import type { PageData } from './$types';
	import { Header } from '$lib/widgets/header';
	import { FieldGroup, Field, FieldLabel, FieldDescription } from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Label } from '$lib/components/ui/label';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import { onMount } from 'svelte';

	type EditProfileForm = {
		firstName: string;
		username: string;
		avatarUrl: string;
		birthdate: string;
	};

	type ValidationErrors = Partial<Record<keyof EditProfileForm, string>>;

	let { data }: { data: PageData } = $props();

	let form: EditProfileForm = $state({
		firstName: '',
		username: '',
		avatarUrl: '',
		birthdate: ''
	});

	onMount(() => {
		form.firstName = data.user?.user_metadata?.first_name ?? '';
		form.username = data.user?.user_metadata?.username ?? '';
		form.avatarUrl = data.user?.user_metadata?.avatar_url ?? '';
		form.birthdate = data.user?.user_metadata?.birthdate ?? '';
	});

	let isSubmitting = $state(false);
	let avatarPreview = $state(form.avatarUrl);

	const handleAvatarChange = (event: Event) => {
		const target = event.currentTarget as HTMLInputElement;
		const file = target.files?.[0];

		if (!file) return;

		const url = URL.createObjectURL(file);
		avatarPreview = url;
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
	};
</script>

<div class="flex flex-col items-center justify-start w-full bg-background">
	<Header title="Редактирование профиля" ariaLabel="Редактирование профиля" isBackButton></Header>

	<div class="w-full max-w-md px-4 pb-8 flex flex-col gap-6">
		<section aria-labelledby="profile-photo-title">
			<div class="flex items-center flex-col gap-4 p-2">
				<Avatar.Root class="size-28 rounded-full border border-border overflow-hidden">
					{#if avatarPreview}
						<Avatar.Image src={avatarPreview} alt="Фото профиля" />
					{:else}
						<Avatar.Fallback>U</Avatar.Fallback>
					{/if}
				</Avatar.Root>

				<div class="flex flex-col gap-2 flex-1">
					<div class="flex gap-2">
						<label class="inline-flex">
							<input type="file" class="hidden" onchange={handleAvatarChange} />
							<Button type="button" variant="outline" size="sm">Выбрать фото</Button>
						</label>
					</div>
				</div>
			</div>
		</section>

		<section aria-labelledby="profile-info-title">
			<div class="py-4 px-4">
				<form class="flex flex-col gap-4" onsubmit={handleSubmit} novalidate>
					<FieldGroup>
						<Field>
							<Label for="firstName">Имя</Label>
							<Input
								id="firstName"
								name="firstName"
								placeholder="Иван"
								bind:value={form.firstName}
								class="h-12"
							/>
						</Field>

						<Field>
							<Label for="username">Имя пользователя</Label>
							<Input
								id="username"
								name="username"
								placeholder="ivan.ivanov"
								class="h-12"
								bind:value={form.username}
							/>
						</Field>

						<Field>
							<Label for="birthdate">Дата рождения</Label>
							<Input
								id="birthdate"
								name="birthdate"
								type="date"
								bind:value={form.birthdate}
								class="h-12"
							/>
						</Field>
					</FieldGroup>

					<div class="flex gap-3 pt-2">
						<Button type="submit" class="flex-1" disabled={isSubmitting}>
							Сохранить изменения
							{#if isSubmitting}
								<Loader2Icon class="animate-spin" />
							{/if}
						</Button>
					</div>
				</form>
			</div>
		</section>
	</div>
</div>
