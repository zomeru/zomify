<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button, LogoutButton } from '$components';

	let isRetrying = false;
	const retryRoutes = ['/album/[id'];
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="content text-center">
	<h1 class="text-5xl">{$page.error?.message}</h1>

	{#if $page.status === 404}
		<p class="text-2xl">The page you are trying to access cannot be found.</p>

		<div class="button mt-10 space-x-3">
			<Button element="a" href="/">Home</Button>
			<Button element="a" href="/search">Search</Button>
		</div>
	{/if}

	{#if $page.status === 401}
		<p>Your current session has expired, please logout and login again.</p>
		<LogoutButton />
	{/if}

	{#if ![404, 401].includes($page.status) && $page.route.id && retryRoutes.includes($page.route.id)}
		<div class="buttons">
			<Button
				element="button"
				on:click={async () => {
					isRetrying = true;
					await invalidate(`app:${$page.route.id}`);
					isRetrying = false;
				}}
				disabled={isRetrying}>Retry</Button
			>
		</div>
	{/if}
</div>
