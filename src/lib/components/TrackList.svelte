<script lang="ts">
	import { msToTime } from '$helpers';
	import { Clock8, ListPlus } from 'lucide-svelte';

	export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];
</script>

<div class="tracks">
	<div
		class="row header flex items-center py-3 px-2 rounded-md border-b border-borderColor rounded-b-none p-2 mb-3"
	>
		<div class="number-column w-[30px] flex justify-end mr-[15px]">
			<span class="number text-lightGray text-sm">#</span>
		</div>
		<div class="info-column flex-1">
			<span class="track-title text-lightGray text-sm">Title</span>
		</div>
		<div class="duration-column">
			<Clock8 aria-hidden focusable="false" class="text-lightGray w-4 h-4" />
		</div>
		<div class="actions-column w-[30px] ml-3" />
	</div>
	{#each tracks as track, index}
		<div
			class="row flex items-center py-3 px-2 rounded-md p-2 mb-2 hover:bg-[rgba(255,255,255,0.05)]"
		>
			<div class="number-column w-[30px] flex justify-end mr-[15px]">
				<span class="number text-lightGray text-sm">{index + 1}</span>
			</div>
			<div class="info-column flex-1">
				<div class="track-title flex items-center">
					<h4 class="m-0 leading-none text-base font-normal">{track.name}</h4>
					{#if track.explicit}
						<span
							class="explicit uppercase text-xs ml-2 border py-[2px] px-1 rounded-sm leading-[10px] border-lightGray text-lightGray"
							>Explicit</span
						>
					{/if}
				</div>
				<div class="artists text-lightGray text-[13px] mt-2 leading-none">
					{#each track.artists as artist, artistIndex}
						<a class="text-inherit" href="/artist/{artist.id}">{artist.name}</a
						>{#if artistIndex < track.artists.length - 1}{', '}{/if}
					{/each}
				</div>
			</div>
			<div class="duration-column">
				<span class="duration text-lightGray text-base">{msToTime(track.duration_ms)}</span>
			</div>
			<div class="actions-column w-[30px] ml-3">
				<ListPlus />
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
</style>
