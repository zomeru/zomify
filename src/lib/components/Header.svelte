<script lang="ts">
	import { Navigation } from '$lib/components';
</script>

<div id="content" class="w-[calc(100%-250px)] h-full flex justify-between items-center">
	<div id="left" class="">
		left
		<Navigation desktop={false} />
	</div>
	<div id="right " class="">Right</div>
</div>
