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
	const id = $props.id();
</script>

<div class="flex flex-col gap-6">
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Добро пожаловать обратно!</Card.Title>
			<Card.Description>Login with your email</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<FieldGroup>
					<Field>
						<FieldLabel for="email-{id}">Email</FieldLabel>
						<Input id="email-{id}" type="email" placeholder="m@example.com" required />
					</Field>
					<Field>
						<Button type="submit">Войти</Button>
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
