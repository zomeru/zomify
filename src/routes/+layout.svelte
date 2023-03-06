<script lang="ts">
	import { Navigation, Header } from '$components';
	import { page } from '$app/stores';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import NProgress from 'nprogress';
	import { hideAll } from 'tippy.js';
	import type { LayoutData } from './$types';
	import 'nprogress/nprogress.css';
	import '../app.css';

	NProgress.configure({ showSpinner: false });

	export let data: LayoutData;
	$: user = data.user;

	let topBar: HTMLElement;
	let scrollY: number;

	let headerOpacity = 0;

	$: if (topBar) {
		headerOpacity = scrollY / topBar.offsetHeight < 1 ? scrollY / topBar.offsetHeight : 1;
	}

	beforeNavigate(() => {
		NProgress.start();
		hideAll();
	});

	afterNavigate(() => {
		NProgress.done();
	});
</script>

<svelte:window bind:scrollY />
<svelte:head>
	<title>Zomify{$page.data.title ? ` - ${$page.data.title}` : ' - A spotify clone'}</title>
</svelte:head>

{#if user}
	<a href="#main-content" class="skip-link"> Skip to content </a>
{/if}

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
					style:opacity={`${headerOpacity}`}
					class="absolute w-full h-full top-0 left-0 z-[-1] bg-headerColor"
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
