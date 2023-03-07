<script lang="ts">
	import { getCopyrightSymbol, removeSymbol } from '$helpers';
	import { ItemPage, TrackList } from '$components';
	import type { PageData } from './$types';

	export let data: PageData;

	$: album = data.album;
	$: color = data.color;
</script>

<ItemPage
	title={album.name}
	type={album.type}
	{color}
	image={album.images.length > 0 ? album.images[0].url : undefined}
>
	<p class="meta text-base font-semibold space-x-1" slot="meta">
		<span class="artists">
			{album.artists.map((artist) => artist.name).join(', ')}
		</span>
		<span class="date">{new Date(album.release_date).getFullYear()}</span>
		<span class="tracks-count font-normal ml-1 text-lightGray"
			>{`${album.total_tracks} Track${album.total_tracks > 1 ? 's' : ''}`}</span
		>
	</p>
	<TrackList tracks={album.tracks.items} />

	<div class="credits mt-10">
		<p class="date text-lightGray m-0 text-xs">
			{new Date(album.release_date).toLocaleDateString('en', {
				dateStyle: 'medium'
			})}
		</p>

		{#each album.copyrights as copyright}
			<p class="copyright text-lightGray m-0 text-sm">
				{getCopyrightSymbol(copyright.type)}
				{removeSymbol(copyright.text.replace(`${copyright.type} `, ``))}
			</p>
		{/each}
	</div>
</ItemPage>
