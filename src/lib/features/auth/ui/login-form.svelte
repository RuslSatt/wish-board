<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription
	} from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../../../routes/auth/$types';
	import Loader2Icon from '@lucide/svelte/icons/loader-2';

	const id = $props.id();

	type LoginFormProps = {
		form: ActionData;
	};

	const { form }: LoginFormProps = $props();

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
			<form method="POST" use:enhance={handleEnhance} action="/auth?/login">
				<FieldGroup>
					<Field>
						<FieldLabel for="email-{id}">Email</FieldLabel>
						<Input id="email-{id}" type="email" name="email" placeholder="m@example.com" required />
					</Field>
					<Field>
						<Button type="submit" disabled={isLoading}>
							Войти
							{#if isLoading}
								<Loader2Icon class="animate-spin" />
							{/if}
						</Button>
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
