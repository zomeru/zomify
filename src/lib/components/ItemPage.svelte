<script lang="ts">
	import { Music } from 'lucide-svelte';

	export let color: string | null;
	export let image: string | undefined;
	export let title: string;
	export let type: string | undefined;
</script>

<div
	class="banner-wrapper flex flex-col sm:flex-row sm:items-end relative mt-[calc(-1*(30px+60px))] -mx-[30px] mb-0 pt-[calc(30px+60px)] px-[30px] pb-5"
>
	<div
		class="banner banner-gradient absolute top-0 left-0 w-full h-[150%] z-1"
		style:background-image="linear-gradient(0deg, transparent, {color || 'var(--light-gray)'})"
	/>
	<div class="sm:mr-10 z-10 mr-0 mb-[30px] sm:mb-0">
		{#if image}
			<img
				src={image}
				alt={title}
				class="w-full aspect-square object-cover sm:w-[230px] md:w-[200px] lg:w-[230px]"
			/>
		{:else}
			<div
				class="cover-placeholder w-full aspect-square object-cover sm:w-[230px] md:w-[200px] lg:w-[230px] flex justify-center items-center bg-mediumGray"
			>
				<Music focusable="false" aria-hidden class="w-[40%] h-[40%] text-lightGray" />
			</div>
		{/if}
	</div>
	<div class="info z-10">
		{#if type}
			<p class="uppercase font-semibold text-sm m0">{type}</p>
		{/if}
		<h1 class="text-2xl mt-2 md:text-4xl lg:text-[54px]">{title}</h1>
		<slot name="meta" />
	</div>
</div>
<div
	class="content relative z-10 min-h-[300px] my-0 -mx-[30px] p-[30px]"
	style:background-image="linear-gradient(0deg, var(--bg-color), rgba(0,0,0,0.1))"
>
	<slot />
</div>

<style lang="scss">
	img,
	.cover-placeholder {
		box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
	}

	.banner-wrapper {
		@media only screen and (max-width: 764px) {
			:global(html.no-js) & {
				margin-top: 0;
				padding-top: 70px;
			}
		}

		.banner {
			:global(html.no-js) & {
				height: auto !important;
			}
		}
	}
</style>
