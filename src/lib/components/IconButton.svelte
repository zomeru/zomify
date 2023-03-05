<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		icon: ComponentType<Icon>;
		label: string;
		className?: string;
	}

	export let icon: ComponentType<Icon>;
	export let label: string;
	export let className: string = '';

	let button: HTMLButtonElement;

	export function getButton() {
		return button;
	}
</script>

<button
	on:click
	on:mouseover
	on:focus
	on:keydown
	{...$$restProps}
	bind:this={button}
	class="border-none bg-none cursor-pointer p-0 w-[38px] h-[38px] disabled:opacity-60 disabled:cursor-not-allowed active:bg-menuBackgroundColor {className}"
>
	<svelte:component
		this={icon}
		class="align-middle text-textColor mx-auto"
		aria-hidden="true"
		focusable="false"
	/>
	<span class="visually-hidden">{label}</span>
</button>
