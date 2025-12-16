<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription
	} from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../../../routes/auth/login/$types';
	import AlertError from './alert-error.svelte';
	import { Button } from '$lib/components/ui/button';

	type LoginFormProps = {
		form?: ActionData;
		id?: string;
	};

	let { form }: LoginFormProps = $props();

	const id = $props.id();

	let isLoading = $state(false);

	const handleEnhance: Parameters<typeof enhance>[1] = () => {
		isLoading = true;

		return async ({ update }) => {
			await update?.();
			isLoading = false;
		};
	};
</script>

<div class="flex flex-col gap-6">
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Добро пожаловать!</Card.Title>
			<Card.Description>Введите ваш email для входа</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance={handleEnhance} action="?/login">
				{#if form?.incorrect}
					<AlertError error={form.error} data-testid="incorrect-error" />
				{/if}
				<FieldGroup>
					<Field>
						<FieldLabel for="email-{id}">Email</FieldLabel>
						<Input id="email-{id}" type="email" name="email" placeholder="m@example.com" required />
						{#if form?.missing}
							<AlertError error={form.error} data-testid="missing-error" />
						{/if}
					</Field>
					<Field>
						<Button type="submit" loading={isLoading} disabled={isLoading}>Войти</Button>
					</Field>
				</FieldGroup>
			</form>
		</Card.Content>
	</Card.Root>
	<FieldDescription class="px-6 text-center">
		Войдя в систему, вы соглашаетесь с нашими <a href="##">Условиями использования</a>
		и <a href="##">Политикой конфиденциальности</a>.
	</FieldDescription>
</div>
