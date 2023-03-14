<script lang="ts">
	import { browser } from '$app/environment';
	import { Navigation, LogoutButton } from '$components';
	import { page } from '$app/stores';
	import { ChevronDown, ExternalLink } from 'lucide-svelte';
	import { tippy } from '$actions';

	$: user = $page.data.user;
</script>

<div id="content" class="w-full h-full flex justify-between items-center">
	<div id="left" class="">
		{#if browser}
			<Navigation desktop={false} />
		{/if}
	</div>
	<div id="right" class="">
		<div id="profile-buttons">
			<button
				id="profile-button"
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
					theme: 'menu',
					hideOnPopperBlur: true
				}}
				class="border border-borderColor flex p-1 rounded-full items-center text-textColor cursor-pointer hover:bg-accentColor default-transition"
			>
				{#if user?.images && user.images.length > 0}
					<img src={user.images[0].url} alt="" class="w-[28px] h-[28px] rounded-full mr-2" />
				{/if}
				{user?.display_name} <span class="visually-hidden">Profile menu</span>
				<ChevronDown class="ml-1" size={22} />
			</button>
		</div>
		<div id="profile-menu" class="hidden absolute w-full left-0 bg-menuBackgroundColor">
			<div id="profile-menu-content" class="py-1">
				<ul class="p-0 m-0">
					<li class="btn-gradient-light">
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
					<li class="btn-gradient-light">
						<a
							class="py-3 px-4 border-none bg-none cursor-pointer text-menuText w-full inline-block"
							href="/profile">View Profile</a
						>
					</li>
					<li class="btn-gradient-light">
						<div class="border-none bg-none cursor-pointer text-menuText py-1">
							<LogoutButton className="w-full text-left" noDesign />
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	#profile-button {
		:global(html.no-js) & {
			display: none;
		}
	}

	:global(html.no-js) #profile-menu {
		display: block !important;
		background-color: var(--header-color) !important;

		#profile-menu-content {
			ul {
				padding: 0;
				margin: 0;
				display: flex;
				justify-content: flex-end;
				flex-wrap: wrap;

				@media only screen and (max-width: 450px) {
					justify-content: flex-start;
				}
			}
		}
	}
</style>
