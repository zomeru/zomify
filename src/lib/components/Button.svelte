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
	};

	export let element: Element;
	export let variant: 'solid' | 'outline' | 'danger' = 'solid';
	export let className: string = '';
</script>

<svelte:element
	this={element}
	class={`default-transition inline-block font-semibold text-[14px] rounded-full cursor-pointer py-2 px-4 decoration-none border-2 ${
		variant === 'solid'
			? 'bg-accentColor text-black border-accentColor btn-gradient-dark'
			: variant === 'outline'
			? 'text-white border-white bg-none btn-gradient-light'
			: variant === 'danger'
			? 'bg-error text-white border-error btn-gradient-dark'
			: ''
	} disabled:opacity-80 disabled:cursor-not-allowed ${className}`}
	on:click
	{...$$restProps}
>
	<slot />
</svelte:element>
