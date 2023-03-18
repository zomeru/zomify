<script lang="ts">
	import { page } from '$app/stores';
	import { Button, ItemPage, TrackList } from '$components';
	import type { PageData } from './$types';

	export let data: PageData;

	let isLoading = false;

	$: color = data.color;
	$: playlist = data.playlist;
	$: tracks = data.playlist.tracks;
	$: currentPage = $page.url.searchParams.get('page') || 1;

	let filteredTracks: SpotifyApi.TrackObjectFull[];

	$: {
		filteredTracks = [];
		tracks.items.forEach((item) => {
			if (item.track) filteredTracks = [...filteredTracks, item.track];
		});
	}

	const followersFormat = Intl.NumberFormat('en-US', {
		notation: 'compact'
	});

	const loadMoreTracks = async () => {
		if (!tracks.next) return;

		isLoading = true;

		const response = await fetch(
			tracks.next.replace('https://api.spotify.com/v1', '/api/spotify/')
		);
		const responseJSON = await response.json();

		if (response.ok) {
			tracks = { ...responseJSON, items: [...tracks.items, ...responseJSON.items] };
		} else {
			alert(responseJSON.error.message || 'Could not load data.');
		}

		isLoading = false;
	};
</script>

<ItemPage
	title={playlist.name}
	image={playlist.images.length > 0 ? playlist.images[0].url : undefined}
	{color}
	type={playlist.type}
>
	<div slot="meta">
		<p class="playlist-description text-lightGray mb-0 text-lg">{@html playlist.description}</p>
		<p class="meta text-sm mt-3">
			<span class="font-semibold">{playlist.owner.display_name}</span>
			<span>{followersFormat.format(playlist.followers.total)}</span>
			<span>{playlist.tracks.total} Tracks</span>
		</p>
	</div>

	{#if playlist.tracks.items.length > 0}
		<TrackList tracks={filteredTracks} />
		{#if tracks.next}
			<div class="load-more p-4 text-center">
				<Button element="button" variant="outline" disabled={isLoading} on:click={loadMoreTracks}
					>Load more<span class="visually-hidden">Tracks</span></Button
				>
			</div>
		{/if}
		<div class="pagination">
			<div class="previous">
				{#if tracks.previous}
					<Button
						element="a"
						variant="outline"
						href="{$page.url.pathname}?{new URLSearchParams({
							page: `${Number(currentPage) - 1}`
						}).toString()}">Previous Page</Button
					>
				{/if}
			</div>
			<div class="next">
				{#if tracks.next}
					<Button
						element="a"
						variant="outline"
						href="{$page.url.pathname}?{new URLSearchParams({
							page: `${Number(currentPage) + 1}`
						}).toString()}">Previous Page</Button
					>
				{/if}
			</div>
		</div>
	{:else}
		<div class="empty-playlist text-center mt-10">
			<p class="text-xl font-semibold">No items added to this playlist yet.</p>
			<div class="space-x-3">
				<Button element="a" href="/search">Search for content</Button>
				<Button element="a" href="/playlists">View all playlists</Button>
			</div>
		</div>
	{/if}
</ItemPage>

<style lang="scss">
	.load-more {
		:global(html.no-js) & {
			display: none;
		}
	}

	.pagination {
		display: none;
		margin-top: 40px;
		justify-content: space-between;

		:global(html.no-js) & {
			display: flex;
		}
	}
</style>
