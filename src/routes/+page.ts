import type { PageLoad } from './$types';
import { fetchRefresh } from '$helpers';

export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
	const { user } = await parent();

	const fetch = (path: string) => fetchRefresh(_fetch, path);

	const dataUrls = {
		newReleases: '/browse/new-releases?limit=6',
		featuredPlaylists: '/browse/featured-playlists?limit=6',
		userPlaylists: `/users/${user?.id}/playlists?limit=6`
	};

	const categoriesResponse = await fetch('/api/spotify/browse/categories');
	const categoriesResponseJSON: SpotifyApi.MultipleCategoriesResponse | undefined =
		categoriesResponse.ok ? await categoriesResponse.json() : undefined;

	const randomCategories = categoriesResponseJSON
		? [...categoriesResponseJSON.categories.items].sort(() => 0.5 - Math.random()).slice(0, 3)
		: [];

	const randomCategoriesPromises = randomCategories.map((category) =>
		fetch(`/api/spotify/browse/categories/${category.id}/playlists?limit=6`)
	);

	const [newReleases, featuredPlaylists, userPlaylists, ...randomCategoriesResponse] =
		await Promise.all([
			...Object.values(dataUrls).map((url) => fetch(`/api/spotify${url}`)),
			...randomCategoriesPromises
		]);

	return {
		newReleases: newReleases.ok
			? (newReleases.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>)
			: undefined,
		featuredPlaylists: featuredPlaylists.ok
			? (featuredPlaylists.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>)
			: undefined,
		userPlaylists: userPlaylists.ok
			? (userPlaylists.json() as Promise<SpotifyApi.ListOfUsersPlaylistsResponse>)
			: undefined,
		homeCategories: randomCategories,
		categoriesPlaylists: Promise.all(
			randomCategoriesResponse.map((response) =>
				response.ok ? (response.json() as Promise<SpotifyApi.CategoryPlaylistsResponse>) : undefined
			)
		)
	};
};
