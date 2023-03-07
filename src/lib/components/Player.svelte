<script lang="ts" context="module">
	let current: HTMLAudioElement;
</script>

<script lang="ts">
	import { Pause, Play } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;

	export let track: Track;

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
		dispatch('play', { track });
	}

	function onPause() {}
</script>

<div class="player">
	<audio
		class="hidden"
		bind:this={audio}
		bind:paused
		on:play={onPlay}
		on:pause={onPause}
		controls
		src={track.preview_url}
		preload="none"
		volume={0.1}
	/>
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
