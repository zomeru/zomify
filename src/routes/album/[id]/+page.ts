import { fetchRefresh } from '$helpers';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const albumResponse = await fetchRefresh(fetch, `/api/spotify/albums/${params.id}`);

	if (!albumResponse.ok) {
		throw error(albumResponse.status, 'Failed to load album!');
	}

	const albumJSON: SpotifyApi.SingleAlbumResponse = await albumResponse.json();

	return {
		album: albumJSON,
		title: albumJSON.name
	};
};
