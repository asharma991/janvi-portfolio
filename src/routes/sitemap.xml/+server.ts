import { fetchContent } from '$lib/server/content';
import { MEDIA_PAGE_SIZE } from '$lib/server/media';
import { seoPages, SITE_ORIGIN } from '$lib/seo';
import { spotifyEmbedUrl } from '$lib/spotify';
import type { SiteSettings } from '$lib/sanity/types';
import type { RequestHandler } from './$types';

function escapeXml(value: string) {
	return value.replace(
		/[<>&"']/g,
		(character) =>
			({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character]!
	);
}

export const GET: RequestHandler = async () => {
	const data = await fetchContent<{
		projects: number;
		academic: number;
		books: number;
		music: number;
		media: number;
		cities: { name: string }[] | null;
		settings: SiteSettings | null;
	}>(`{
		"projects": count(*[_type == "project"]),
		"academic": count(*[_type == "academicWork"]),
		"books": count(*[_type == "books"]),
		"music": count(*[_type == "music"]),
		"media": count(*[_type == "media"]),
		"cities": *[_type == "foodGuide"][0].cities[]{name},
		"settings": *[_type == "siteSettings"][0]{spotifyEmbedUrl, spotifyPlaylists}
	}`);
	const urls = Object.keys(seoPages).map((path) => new URL(path, SITE_ORIGIN).href);
	const collections: [string, number, number, string?][] = [
		['/work', data.projects, 9],
		['/academic', data.academic, 10],
		['/books', data.books, 9],
		['/music', data.music, 8],
		['/media', data.media, MEDIA_PAGE_SIZE]
	];
	const playlists = new Set(
		[
			data.settings?.spotifyEmbedUrl,
			...(data.settings?.spotifyPlaylists ?? []).map((entry) => entry.url)
		]
			.map(spotifyEmbedUrl)
			.filter(Boolean)
	);
	collections.push(['/music', playlists.size, 3, 'playlistPage']);
	for (const [path, total, size, param = 'page'] of collections) {
		for (let page = 2; page <= Math.ceil(total / size); page++) {
			urls.push(`${SITE_ORIGIN}${path}?${param}=${page}`);
		}
	}
	for (const city of (data.cities ?? []).slice(1)) {
		const url = new URL('/food', SITE_ORIGIN);
		url.searchParams.set('city', city.name);
		urls.push(url.href);
	}
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `<url><loc>${escapeXml(url)}</loc></url>`).join('\n')}\n</urlset>`,
		{
			headers: {
				'content-type': 'application/xml; charset=utf-8',
				'cache-control': 'public, max-age=0, s-maxage=300'
			}
		}
	);
};
