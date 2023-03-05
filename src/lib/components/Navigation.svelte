<script lang="ts">
	import { type ComponentType, tick } from 'svelte';
	import { Home, Search, ListMusic, type Icon } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	import { page } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';

	export let desktop: boolean;

	let isMobileMenuOpen = false;
	$: isOpen = desktop || isMobileMenuOpen;

	let openMenuButton: HTMLButtonElement;
	let closeMenuButton: HTMLButtonElement;

	const menuItems: {
		path: string;
		label: string;
		icon: ComponentType<Icon>;
	}[] = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: '/search', label: 'Search', icon: Search },
		{ path: '/playlists', label: 'Playlists', icon: ListMusic }
	];

	const openMenu = async () => {
		isMobileMenuOpen = true;
		await tick();

		setTimeout(() => {
			closeMenuButton.focus();
		}, 210);
	};

	const closeMenu = async () => {
		isMobileMenuOpen = false;
		await tick();
		openMenuButton.focus();
	};

	beforeNavigate(() => {
		isMobileMenuOpen = false;
	});
</script>

<svelte:head>
	{#if !desktop && isMobileMenuOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

<div id="nav-content" class={desktop ? 'sticky top-0' : ''}>
	{#if !desktop && isMobileMenuOpen}
		<div
			on:click={closeMenu}
			transition:fade={{
				duration: 200
			}}
			class="fixed w-full h-full top-0 left-0 bg-sidebarColor opacity-75 z-50 md:hidden"
		/>
	{/if}
	<nav aria-label="Main">
		{#if !desktop}
			<button bind:this={openMenuButton} on:click={openMenu} aria-expanded={isOpen}>Open</button>
		{/if}
		<div
			id="nav-content-inner"
			style:visibility={isOpen ? 'visible' : 'hidden'}
			class="p-5 min-w-[250px] bg-sidebarColor h-screen overflow-auto transition-all duration-200 {desktop
				? 'hidden md:block'
				: 'block md:hidden fixed top-0 left-0 z-50'} {!isOpen
				? 'translate-x-[-100%] opacity-0'
				: ''}"
		>
			{#if !desktop}
				<button bind:this={closeMenuButton} on:click={closeMenu}>Close</button>
			{/if}
			<img src={logo} alt="Spotify Logo" id="logo" class="max-w-full w-[130px]" />
			<ul class="p-0 m-0 mt-5 list-none">
				{#each menuItems as item}
					{@const isActive = item.path === $page.url.pathname}
					<li class={isActive ? '' : ''}>
						<a
							href={item.path}
							class="flex items-center text-textColor text-sm font-medium p-1 my-2 opacity-70 transition-opacity duration-200 hover:opacity-100 focus:opacity-100 {isActive
								? 'opacity-100'
								: ''}"
						>
							<svelte:component
								this={item.icon}
								class="mr-3"
								focusable="false"
								aria-hidden="true"
								color="var(--text-color)"
								size={26}
								strokeWidth={2}
							/>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>
