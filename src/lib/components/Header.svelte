<script lang="ts">
	import { browser } from '$app/environment';
	import { Navigation } from '$lib/components';
</script>

<div id="content" class="w-full md:w-[calc(100%-250px)] h-full flex justify-between items-center">
	<div id="left" class="">
		{#if browser}
			<Navigation desktop={false} />
		{/if}
	</div>
	<div id="right " class="">Right</div>
</div>
