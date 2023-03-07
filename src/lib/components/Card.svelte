<script lang="ts">
	import { Music } from 'lucide-svelte';

	type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified;
	type PlaylistType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified;
	type ArtistType = SpotifyApi.ArtistObjectFull;

	export let item: AlbumType | PlaylistType | ArtistType;
</script>

<div class="card bg-darkGray p-3 rounded-md default-transition {item.type} hover:bg-mediumGray">
	{#if item.images.length > 0}
		<!-- {#if 0 > 0} -->
		<img
			loading="lazy"
			src={item.images[0].url}
			alt="{item.type} cover for {item.name}"
			class="w-full aspect-square object-cover mb-5"
		/>
	{:else}
		<div
			class="cover-placeholder w-full aspect-square flex items-center justify-center bg-mediumGray mb-5 default-transition hover:bg-darkGray"
		>
			<Music aria-hidden="true" focusable="false" class="w-[40%] h-[40%] text-lightGray" />
		</div>
	{/if}
</div>

<style lang="scss">
	.card {
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
	}
</style>
