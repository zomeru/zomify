<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Element = $$Generic<'button' | 'a'>;

	interface ButtonComponentElements {
		a: HTMLAnchorAttributes;
		button: HTMLButtonAttributes;
	}

	type $$Props = ButtonComponentElements[Element] & {
		element: Element;
		variant?: 'solid' | 'outline' | 'danger';
		className?: string;
		noDesign?: boolean;
	};

	export let element: Element;
	export let variant: 'solid' | 'outline' | 'danger' = 'solid';
	export let className: string = '';
	export let noDesign: boolean = false;
</script>

<svelte:element
	this={element}
	class={!noDesign
		? `border-2 font-semibold default-transition inline-block text-[14px] rounded-full cursor-pointer py-2 px-4 decoration-none ${
				variant === 'solid'
					? 'bg-accentColor text-black border-accentColor btn-gradient-dark'
					: variant === 'outline'
					? 'text-white border-white bg-none btn-gradient-light'
					: variant === 'danger'
					? 'bg-error text-white border-error btn-gradient-dark'
					: ''
		  } disabled:opacity-80 disabled:cursor-not-allowed ${className}`
		: 'default-transition inline-block text-[14px] cursor-pointer py-2 px-4 decoration-none disabled:opacity-80 disabled:cursor-not-allowed'}
	on:click
	{...$$restProps}
>
	<slot />
</svelte:element>
