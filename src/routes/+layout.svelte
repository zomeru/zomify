<script lang="ts">
	// import 'modern-normalize/modern-normalize.css';
	import '../app.css';
	import { LogoutButton } from '$lib/components';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user = data.user;
</script>

{#if user}
	<p>Hello {user.display_name}</p>
	<LogoutButton />
{/if}
<slot />
