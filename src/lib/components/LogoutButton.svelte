<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	export let className = '';
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
	<button type="submit" class={className}>Logout</button>
</form>
