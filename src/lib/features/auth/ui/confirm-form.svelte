<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription
	} from '$lib/components/ui/field/index.js';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui';
	const id = $props.id();
</script>

<div class="flex flex-col gap-6">
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Подтвердите вход</Card.Title>
			<Card.Description>Введите 6-значный код, отправленный на ваш email</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance action="?/confirm">
				<FieldGroup>
					<Field>
						<FieldLabel for="code-{id}">Код</FieldLabel>
						<InputOTP.Root name="code" maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
							{#snippet children({ cells })}
								<InputOTP.Group>
									{#each cells as cell (cell)}
										<InputOTP.Slot {cell} />
									{/each}
								</InputOTP.Group>
							{/snippet}
						</InputOTP.Root>
					</Field>
					<Field>
						<Button type="submit">Подтвердить</Button>
					</Field>
				</FieldGroup>
			</form>
		</Card.Content>
	</Card.Root>
	<FieldDescription class="px-6 text-center">
		Если вы не получили код, <a href="##">попробуйте еще раз</a>.
	</FieldDescription>
</div>
