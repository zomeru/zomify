<script lang="ts">
	import { Button, ItemPage, TrackList } from '$components';
	import type { PageData } from './$types';

	export let data: PageData;

	$: color = data.color;
	$: playlist = data.playlist;
	$: tracks = data.playlist.tracks;

	$: console.log(data);

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
