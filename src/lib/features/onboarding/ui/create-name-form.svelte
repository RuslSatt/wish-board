<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card/index.js';
	import { FieldGroup, Field, FieldLabel } from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button';
	import type { ActionData } from '../../../../routes/onboarding/$types';

	type CreateNameFormProps = {
		form: ActionData;
	};

	let { form }: CreateNameFormProps = $props();

	let isLoading = $state(false);
	let name = $state('');

	const handleEnhance: Parameters<typeof enhance>[1] = () => {
		isLoading = true;

		return async ({ update }) => {
			await update?.();
			isLoading = false;
		};
	};
</script>

<Card.Root>
	<Card.Header class="text-center">
		<Card.Title class="text-xl">Добро пожаловать!</Card.Title>
		<Card.Description>Давайте начнем с вашего имени</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance={handleEnhance} action="?/createName">
			<FieldGroup>
				<Field>
					<FieldLabel for="name">Ваше имя</FieldLabel>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Введите ваше имя"
						bind:value={name}
						required
						disabled={isLoading}
					/>
					{#if form?.error}
						<p class="text-sm text-destructive">{form.error}</p>
					{/if}
				</Field>
				<Field>
					<Button type="submit" loading={isLoading} disabled={isLoading || name.trim() === ''}>
						Продолжить
					</Button>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
