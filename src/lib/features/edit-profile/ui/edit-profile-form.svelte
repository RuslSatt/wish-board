<script lang="ts">
	import { FieldGroup, Field } from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import type { User } from '@supabase/supabase-js';
	import type { ActionData } from '../../../../routes/edit-profile/$types';

	type EditProfileFormProps = {
		user: User | null;
		form?: ActionData;
	};

	type EditProfileFormState = {
		firstName: string;
		username: string;
		birthdate: string;
	};

	let { user, form: actionForm }: EditProfileFormProps = $props();

	const metadata = user?.user_metadata;

	let formState: EditProfileFormState = $state({
		firstName: metadata?.first_name ?? '',
		username: metadata?.username ?? '',
		birthdate: metadata?.birthdate ?? ''
	});

	let isSubmitting = $state(false);

	const handleEnhance: Parameters<typeof enhance>[1] = () => {
		isSubmitting = true;

		return async ({ update }) => {
			await update?.();
			isSubmitting = false;
		};
	};

	$effect(() => {
		if (!actionForm) return;

		if (actionForm.success) {
			toast.success('Профиль успешно обновлен');
		} else if (actionForm.error) {
			toast.error(actionForm.error);
		}
	});
</script>

<section aria-labelledby="profile-info-title">
	<div class="py-4 px-4">
		<form
			method="POST"
			use:enhance={handleEnhance}
			action="?/update"
			class="flex flex-col gap-4"
			novalidate
		>
			<FieldGroup>
				<Field>
					<Label for="firstName">Имя</Label>
					<Input
						id="firstName"
						name="firstName"
						placeholder="Иван"
						bind:value={formState.firstName}
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
						bind:value={formState.username}
					/>
				</Field>

				<Field>
					<Label for="birthdate">Дата рождения</Label>
					<Input
						id="birthdate"
						name="birthdate"
						type="date"
						bind:value={formState.birthdate}
						class="h-12"
					/>
				</Field>
			</FieldGroup>

			<div class="flex gap-3 pt-2">
				<Button type="submit" class="flex-1" disabled={isSubmitting} loading={isSubmitting}>
					Сохранить изменения
				</Button>
			</div>
		</form>
	</div>
</section>
