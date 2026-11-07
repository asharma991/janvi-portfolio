import { fetchContent, pageRequest, ensurePageExists } from '$lib/server/content';
import type { PageServerLoad } from './$types';
import type { MusicItem, SiteSettings } from '$lib/sanity/types';
import { spotifyEmbedUrl } from '$lib/spotify';
import { paginateItems, paginationMeta } from '$lib/pagination';

export const load: PageServerLoad = async ({ url }) => {
	const { page, pageSize, start, end } = pageRequest(url, 8);
	const query = `{
    "music": *[_type == "music"] | order(_createdAt desc) [$start...$end] {
      _id,
      title,
      artist,
      link,
      coverImage {
        asset,
        crop,
        hotspot
      }
    },
    "totalItems": count(*[_type == "music"]),
    "settings": *[_type == "siteSettings"][0] { spotifyEmbedUrl, spotifyPlaylists }
  }`;

	const data = await fetchContent<{
		music: MusicItem[];
		totalItems: number;
		settings: SiteSettings | null;
	}>(query, { start, end });
	const candidates = [
		{ _key: 'featured', title: 'Featured playlist', url: data.settings?.spotifyEmbedUrl },
		...(data.settings?.spotifyPlaylists ?? [])
	];
	const seen = new Set<string>();
	const playlists = candidates.flatMap((playlist) => {
		const embedUrl = spotifyEmbedUrl(playlist.url);
		if (!embedUrl || seen.has(embedUrl)) return [];
		seen.add(embedUrl);
		return [{ _key: playlist._key, title: playlist.title || 'Spotify playlist', embedUrl }];
	});
	ensurePageExists(page, pageSize, data.totalItems);
	const requestedPlaylist = pageRequest(url, 3, 'playlistPage');
	ensurePageExists(requestedPlaylist.page, 3, playlists.length);
	const playlistPage = paginateItems(playlists, url.searchParams.get('playlistPage'), 3);
	return {
		music: data.music || [],
		playlists: playlistPage.items,
		playlistPagination: playlistPage.pagination,
		pagination: paginationMeta(page, pageSize, data.totalItems)
	};
};
