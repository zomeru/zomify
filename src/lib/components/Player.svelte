<script lang="ts" context="module">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	import { Pause, Play } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;

	export let track: Track;
	export let className = '';

	const dispatch = createEventDispatcher<{
		play: { track: Track };
		pause: { track: Track };
	}>();

	let audio: HTMLAudioElement;
	let paused = true;

	function onPlay() {
		if (current && current !== audio) {
			current.currentTime = 0;
			current.pause();
		}
		current = audio;
		current.volume = 0.1;
		dispatch('play', { track });
	}

	function onPause() {
		dispatch('pause', { track });
	}
</script>

<div class="player {className}">
	<audio
		class="hidden"
		bind:this={audio}
		bind:paused
		on:play={onPlay}
		on:pause={onPause}
		controls
		preload="none"
		volume={0.1}
	>
		<source src={track.preview_url} type="audio/mpeg" />
	</audio>
	<button
		class="w-3 h-3 p-0 bg-none border-none cursor-pointer"
		aria-label={paused ? `Play ${track.name}` : `Pause ${track.name}`}
		on:click={() => {
			if (paused) audio.play();
			else audio.pause();
		}}
	>
		{#if paused}
			<Play class="text-textColor fill-textColor" focusable="hidden" aria-hidden />
		{:else}
			<Pause class="text-textColor fill-textColor" focusable="hidden" aria-hidden />
		{/if}
	</button>
</div>

<style lang="scss">
	.player {
		audio {
			:global(html.no-js) & {
				display: block !important;
				width: 100%;
			}
		}
		button {
			:global(html.no-js) & {
				display: none;
			}
		}
	}
</style>
