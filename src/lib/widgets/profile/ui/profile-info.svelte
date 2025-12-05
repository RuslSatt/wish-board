<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import avatar from '$lib/assets/images/avatar.jpg';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-center justify-center gap-2 w-full">
	<Avatar.Root class="size-24 rounded-full border border-transparent">
		<Avatar.Image src={avatar} alt="Avatar" />
		<Avatar.Fallback>CN</Avatar.Fallback>
	</Avatar.Root>
	<h1 class="text-2xl font-bold">Ruslan Sattarov</h1>

	<div class="flex items-center justify-center gap-2">
		<p class="text-sm text-gray-500">0 подписчиков</p>
		<p class="text-sm text-gray-500">0 подписок</p>
	</div>

	<div class="flex items-center justify-center gap-2 w-full px-4 mt-2">
		<Button href="/profile/edit" variant="outline" size="sm" class="flex-1 flex justify-center"
			>Редактировать профиль</Button
		>
		<Button variant="outline" size="sm" class="flex-1 flex justify-center">Поделиться</Button>
	</div>
</div>
