<script lang="ts">
	// import 'modern-normalize/modern-normalize.css';
	import '../app.css';
	import { LogoutButton } from '$lib/components';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: user = data.user;
</script>

<div id="main" class="min-h-screen">
	<div id="content" class="min-h-screen">
		<main id="main-content" class="py-[30px] min-h-screen px-[15px] md:px-[30px]">
			<slot />
		</main>
	</div>
</div>
