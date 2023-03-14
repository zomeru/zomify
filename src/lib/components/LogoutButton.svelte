<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Button from './Button.svelte';

	export let className = '';
	export let noDesign = false;
</script>

<form
	method="POST"
	action="/api/auth/logout"
	on:submit|preventDefault={async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				accept: 'application/json'
			}
		});

		if (response.ok) invalidateAll();
	}}
	use:enhance
>
	<Button element="button" type="submit" {className} {noDesign}>Logout</Button>
</form>
