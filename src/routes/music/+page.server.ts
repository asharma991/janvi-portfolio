import { client } from '$lib/sanity/client';
import type { MusicItem, SiteSettings } from '$lib/sanity/types';
import { spotifyEmbedUrl } from '$lib/spotify';
import { getPagination, paginationMeta } from '$lib/pagination';

export const load = async ({ url }) => {
	const { page, pageSize, start, end } = getPagination(url.searchParams.get('page'), 8);
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

	try {
		const data = await client.fetch<{
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
		return {
			music: data.music || [],
			playlists,
			pagination: paginationMeta(page, pageSize, data.totalItems)
		};
	} catch (e) {
		console.log('Using mock music data');
		return { music: [], playlists: [], pagination: paginationMeta(page, pageSize, 0) };
	}
};
