import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/spotify/browse/new-releases?limit=6');
	const response2 = await fetch('/api/spotify/browse/featured-playlists');

	console.log({
		1: await response.json(),
		2: await response2.json()
	});
};
