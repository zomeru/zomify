import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends, route }) => {
	depends(`app:${route.id}`);
	const albumResponse = await fetchRefresh(fetch, `/api/spotify/albums/${params.id}`);

	if (!albumResponse.ok) {
		throw error(albumResponse.status, 'Failed to load album!');
	}

	const albumJSON: SpotifyApi.SingleAlbumResponse = await albumResponse.json();

	let color = null;

	if (albumJSON.images.length > 0) {
		const colorResponse = await fetch(
			`/api/average-color?${new URLSearchParams({
				image: albumJSON.images[0].url
			}).toString()}`
		);

		if (colorResponse.ok) {
			const colorJSON = await colorResponse.json();
			color = colorJSON.color;
		}
	}

	return {
		album: albumJSON,
		title: albumJSON.name,
		color
	};
};
