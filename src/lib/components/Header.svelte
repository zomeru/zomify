<script lang="ts">
	import { browser } from '$app/environment';
	import { Navigation, LogoutButton } from '$components';
	import { page } from '$app/stores';
	import { ChevronDown, ExternalLink } from 'lucide-svelte';
	import { tippy } from '$actions';

	$: user = $page.data.user;
</script>

<div id="content" class="w-full md:w-[calc(100%-250px)] h-full flex justify-between items-center">
	<div id="left" class="">
		{#if browser}
			<Navigation desktop={false} />
		{/if}
	</div>
	<div id="right" class="">
		<div id="profile-button">
			<button
				use:tippy={{
					content: document.getElementById('profile-menu') || undefined,
					onMount: () => {
						const template = document.getElementById('profile-menu');
						if (template) {
							template.classList.remove('hidden');
							template.classList.add('block');
						}
					},
					trigger: 'click',
					placement: 'bottom-end',
					interactive: true,
					theme: 'menu'
				}}
				class="border border-borderColor flex p-1 rounded-full items-center text-textColor cursor-pointer hover:bg-accentColor"
			>
				{#if user?.images && user.images.length > 0}
					<img src={user.images[0].url} alt="" class="w-[28px] h-[28px] rounded-full mr-2" />
				{/if}
				{user?.display_name} <span class="visually-hidden">Profile menu</span>
				<ChevronDown class="ml-1" size={22} />
			</button>
		</div>
		<div id="profile-menu" class="hidden absolute w-full left-0 bg-menuBackgroundColor">
			<div class="py-1">
				<ul class="p-0 m-0">
					<li class="btn-outline-hover">
						<a
							class="py-3 px-4 border-none bg-none cursor-pointer text-menuText inline-block"
							href={user?.external_urls.spotify}
							target="_blank"
							rel="noopener noreferrer"
							>View on Spotify <ExternalLink
								class="inline-block mb-[2px] ml-1"
								focusable="false"
							/></a
						>
					</li>
					<li class="btn-outline-hover">
						<a
							class="py-3 px-4 border-none bg-none cursor-pointer text-menuText w-full inline-block"
							href="/profile">View Profile</a
						>
					</li>
					<li class="btn-outline-hover">
						<div class="border-none bg-none cursor-pointer text-menuText">
							<LogoutButton className="px-4 py-3  w-full text-left" />
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
