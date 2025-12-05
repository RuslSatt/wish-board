<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Tables } from '../../../../database.types.js';

	type WishList = Tables<'wish_lists'>;

	let { wishList }: { wishList: WishList } = $props();
</script>

<Card.Root class="cursor-pointer hover:shadow-md transition-shadow">
	<Card.Header>
		<Card.Title>{wishList.name}</Card.Title>
	</Card.Header>
	<Card.Content>
		<p class="text-sm text-muted-foreground">
			Создано: {new Date(wishList.created_at).toLocaleDateString('ru-RU')}
		</p>
	</Card.Content>
</Card.Root>
