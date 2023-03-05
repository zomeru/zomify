<script lang="ts">
	import { LogoutButton, Navigation, Header } from '$components';
	import type { LayoutData } from './$types';
	import '../app.css';

	export let data: LayoutData;
	$: user = data.user;

	let topBar: HTMLElement;
	let scrollY: number;

	let headerOpacity = 0;

	$: if (topBar) {
		headerOpacity = scrollY / topBar.offsetHeight < 1 ? scrollY / topBar.offsetHeight : 1;
	}
</script>

<svelte:window bind:scrollY />

<div id="main" class="flex">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content" class="flex-1">
		{#if user}
			<div
				bind:this={topBar}
				class="fixed h-[60px] px-[15px] flex items-center w-full  md:px-[30px] md:w-[cacl(100%-250px)] z-[100]"
			>
				<div
					style:background-color="var(--header-color)"
					style:opacity={`${headerOpacity}`}
					class="absolute w-full h-full top-0 left-0 z-[-1]"
				/>
				<Header />
			</div>
		{/if}
		<main
			id="main-content"
			class="py-[30px] px-[15px] md:px-[30px] {user ? 'pt-[calc(30px+60px)]' : ''}"
		>
			<slot />
		</main>
	</div>
</div>
