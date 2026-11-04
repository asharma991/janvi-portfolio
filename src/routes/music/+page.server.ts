import { client } from '$lib/sanity/client';
import type { MusicItem } from '$lib/sanity/types';
import { getPagination, paginationMeta } from '$lib/pagination';

export const load = async ({ url }) => {
  const { page, pageSize, start, end } = getPagination(url.searchParams.get('page'), 8);
  const query = `{
    "music": *[_type == "music"] | order(_createdAt desc) [$start...$end],
    "totalItems": count(*[_type == "music"]),
    "embedUrl": *[_type == "siteSettings"][0].spotifyEmbedUrl
  }`;
  
  try {
      const data = await client.fetch(query, { start, end });
      return { 
        music: data.music || [],
        embedUrl: data.embedUrl,
        pagination: paginationMeta(page, pageSize, data.totalItems)
      };
  } catch (e) {
      console.log("Using mock music data");
      return { music: [], embedUrl: null, pagination: paginationMeta(page, pageSize, 0) };
  }
};
