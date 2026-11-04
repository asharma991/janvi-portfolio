import { client } from '$lib/sanity/client';
import type { MediaItem } from '$lib/sanity/types';

export const MEDIA_PAGE_SIZE = 9;

type MediaPage = {
	media: MediaItem[];
	hasMore: boolean;
	nextPage: number | null;
};

export async function getMediaPage(page: number): Promise<MediaPage> {
	const safePage = Number.isInteger(page) && page > 0 ? page : 1;
	const start = (safePage - 1) * MEDIA_PAGE_SIZE;
	// Fetch one extra item so we can determine whether another request is needed
	// without running a separate count query on every scroll.
	const end = start + MEDIA_PAGE_SIZE + 1;
	const query = `*[_type == "media"] | order(_createdAt desc) [$start...$end] {
		_id,
		caption,
		image {
			asset,
			crop,
			hotspot
		}
	}`;

	const result = await client.fetch<MediaItem[]>(query, { start, end });
	const media = result.slice(0, MEDIA_PAGE_SIZE);
	const hasMore = result.length > MEDIA_PAGE_SIZE;

	return {
		media,
		hasMore,
		nextPage: hasMore ? safePage + 1 : null
	};
}
