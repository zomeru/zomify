<script lang="ts">
	import { LogoutButton, Navigation, Header } from '$lib/components';
	import type { LayoutData } from './$types';
	import '../app.css';

	export let data: LayoutData;
	$: user = data.user;

	let topbar: HTMLElement;
	let scrollY: number;

	let headerOpacity = 0;

	$: if (topbar) {
		headerOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
	}

	const asd = undefined;
</script>

<svelte:window bind:scrollY />

<div id="main" class="flex">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} />
		</div>
	{/if}
	<div id="content" class="flex-1">
		<div
			bind:this={topbar}
			class="fixed h-[60px] px-[15px] flex items-center w-full z-50 md:px-[30px] md:w-[cacl(100%-250px)]"
		>
			<div
				style:background-color="var(--header-color)"
				style:opacity={headerOpacity}
				class="absolute w-full h-full top-0 left-0 z-[-1]"
			>
				<Header />
			</div>
		</div>
		<main
			id="main-content"
			class="py-[30px] px-[15px] md:px-[30px] {user ? 'pt-[calc(30px+60px)]' : ''}"
		>
			<slot />
		</main>
	</div>
</div>
