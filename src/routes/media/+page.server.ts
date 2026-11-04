import { client } from '$lib/sanity/client';
import type { MediaItem } from '$lib/sanity/types';
import { getPagination, paginationMeta } from '$lib/pagination';

export const load = async ({ url }) => {
  const { page, pageSize, start, end } = getPagination(url.searchParams.get('page'), 9);
  const query = `{
    "media": *[_type == "media"] | order(_createdAt desc) [$start...$end] {
      _id,
      caption,
      image {
        asset,
        crop,
        hotspot
      }
    },
    "totalItems": count(*[_type == "media"])
  }`;
  try {
      const result = await client.fetch(query, { start, end });
      if (result.media && result.media.length > 0) {
        return { media: result.media, pagination: paginationMeta(page, pageSize, result.totalItems) };
      }
      throw new Error("No media found");
  } catch (e) {
      console.log("Using mock media");
      const mockMedia: MediaItem[] = [
        // Mock data logic can be added if needed, or just return empty
      ];
      return { media: mockMedia, pagination: paginationMeta(page, pageSize, mockMedia.length) };
  }
};
