<script lang="ts">
	import { type ComponentType, tick } from 'svelte';
	import { Home, Search, ListMusic, Menu, X, type Icon } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	import { page } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';
	import { IconButton } from '$components';

	export let desktop: boolean;

	let isMobileMenuOpen = false;
	$: isOpen = desktop || isMobileMenuOpen;

	let openMenuButton: IconButton;
	let closeMenuButton: IconButton;
	let lastFocusableElement: HTMLAnchorElement;

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
			closeMenuButton.getButton().focus();
		}, 210);
	};

	const closeMenu = async () => {
		isMobileMenuOpen = false;
		await tick();
		openMenuButton.getButton().focus();
	};

	const moveFocusToBottom = (e: KeyboardEvent) => {
		if (desktop) return;

		if (e.key === 'Tab' && e.shiftKey) {
			e.preventDefault();
			lastFocusableElement.focus();
		}
	};

	const moveFocusToTop = (e: KeyboardEvent) => {
		if (desktop) return;

		if (e.key === 'Tab' && !e.shiftKey) {
			e.preventDefault();
			closeMenuButton.getButton().focus();
		}
	};

	const handleEscape = (e: KeyboardEvent) => {
		if (desktop) return;

		if (e.key === 'Escape') {
			closeMenu();
		}
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
			on:keyup={handleEscape}
			transition:fade={{
				duration: 200
			}}
			class="fixed w-full h-full top-0 left-0 bg-sidebarColor opacity-75 z-50 md:hidden"
		/>
	{/if}
	<nav aria-label="Main">
		{#if !desktop}
			<IconButton
				label="Menu"
				icon={Menu}
				bind:this={openMenuButton}
				on:click={openMenu}
				aria-expanded={isOpen}
				className="block md:hidden"
			/>
		{/if}
		<div
			id="nav-content-inner"
			on:keyup={handleEscape}
			style:visibility={isOpen ? 'visible' : 'hidden'}
			class="p-5 min-w-[250px] bg-sidebarColor h-screen overflow-auto transition-all duration-200 {desktop
				? 'hidden md:block'
				: 'block md:hidden fixed top-0 left-0 z-50'} {!isOpen
				? 'translate-x-[-100%] opacity-0'
				: ''}"
		>
			{#if !desktop}
				<IconButton
					label="Close Menu"
					icon={X}
					bind:this={closeMenuButton}
					on:click={closeMenu}
					on:keydown={moveFocusToBottom}
					className="absolute top-5 right-5"
				/>
			{/if}
			<img src={logo} alt="Spotify Logo" id="logo" class="max-w-full w-[130px]" />
			<ul class="p-0 m-0 mt-5 list-none">
				{#each menuItems as item, index}
					{@const isActive = item.path === $page.url.pathname}
					{@const iconProps = {
						class: 'mr-3',
						focusable: 'false',
						'aria-hidden': true,
						size: 26,
						strokeWidth: 2
					}}
					{@const anchorClass = `flex items-center text-textColor text-sm font-medium p-1 my-2 opacity-70 transition-opacity duration-200 hover:opacity-100 focus:opacity-100 text-textColor ${
						isActive ? 'opacity-100' : ''
					}`}
					<li class={isActive ? '' : ''}>
						{#if menuItems.length === index + 1}
							<a
								bind:this={lastFocusableElement}
								href={item.path}
								class={anchorClass}
								on:keydown={moveFocusToTop}
							>
								<svelte:component this={item.icon} {...iconProps} />
								{item.label}
							</a>
						{:else}
							<a href={item.path} class={anchorClass}>
								<svelte:component this={item.icon} {...iconProps} />
								{item.label}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>
