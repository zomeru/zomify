<script lang="ts">
	import { Button } from '$components';
	import logo from '$assets/Spotify_Logo_RGB_White.png';
	import cover from '$assets/cover.png';
</script>

<svelte:head>
	<style>
		body {
			background-image: linear-gradient(230deg, var(--sidebar-color), var(--bg-color));
		}
	</style>
</svelte:head>

<div
	id="wrapper"
	class="flex flex-col md:flex-row w-full max-w-[1200px] mx-auto mb-0 justify-center items-center min-h-[calc(100vh-60px)]"
>
	<div id="content" class="flex-0 md:flex-[1.8]">
		<img id="logo" src={logo} alt="" class="w-[170px] max-w-full mb-[30px]" />
		<h1 class="text-[40px]">Go Premium. Be happy.</h1>
		<p class="text-[20px]">Premium sounds amazing. Enjoy ad-free music listening offline.</p>
		<div id="buttons" class="mt-[40px] space-x-3 uppercase">
			<Button
				className="py-3 px-5"
				element="a"
				variant="outline"
				href="https://www.spotify.com/"
				target="_blank"
				rel="noreferrer noopener">Sign up</Button
			>
			<Button element="a" href="/api/auth/login" className="py-3 px-5">Log in</Button>
		</div>
	</div>
	<div id="cover" class="flex-1 ml-0 mt-10 md:mt-0 md:ml-5">
		<img src={cover} alt="Svelte album cover" class="max-w-full" />
	</div>
</div>
