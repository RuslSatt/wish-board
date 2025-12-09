<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import { toast } from 'svelte-sonner';
	import { invalidate } from '$app/navigation';
	import type { SupabaseClient, User } from '@supabase/supabase-js';

	let { supabase, user }: { supabase: SupabaseClient; user: User | null } = $props();

	const userAvatarUrl = user?.user_metadata?.avatar_url;

	const getAvatarUrl = (path: string | null | undefined) => {
		if (!path) return '';

		const { data } = supabase.storage.from('avatars').getPublicUrl(path);

		return data.publicUrl;
	};

	const avatarUrl = userAvatarUrl ? getAvatarUrl(userAvatarUrl) : '';

	let isSubmitting = $state(false);
	let avatarPreview = $state(avatarUrl);
	let fileInput: HTMLInputElement | null = null;

	const handleAvatarChange = async (event: Event) => {
		const target = event.currentTarget as HTMLInputElement;
		const file = target.files?.[0];

		if (!file) return;

		avatarPreview = URL.createObjectURL(file);

		const unique = crypto.randomUUID();
		const ext = file.name.split('.').pop();
		const filePath = `${unique}.${ext}`;

		const { data, error } = await supabase.storage.from('avatars').upload(filePath, file);

		if (error) {
			console.error('Error uploading avatar:', error);
			toast.error('Не удалось загрузить аватар');
			return;
		}

		if (data) {
			const { error } = await supabase.auth.updateUser({
				data: {
					avatar_url: data.path
				}
			});

			if (error) {
				console.error('Error updating user:', error);
				toast.error('Не удалось обновить профиль с новым аватаром');
				return;
			}

			avatarPreview = getAvatarUrl(data.path);

			await invalidate('supabase:auth');

			toast.success('Аватар успешно обновлен');
		}
	};

	const openFileDialog = () => {
		fileInput?.click();
	};
</script>

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
					<input
						type="file"
						accept="image/*"
						class="hidden"
						bind:this={fileInput}
						onchange={handleAvatarChange}
					/>
					<Button type="button" variant="outline" size="sm" onclick={openFileDialog}>
						Выбрать фото
					</Button>
				</label>
			</div>
		</div>
	</div>
</section>
