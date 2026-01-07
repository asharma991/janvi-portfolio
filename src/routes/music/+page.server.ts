import { client } from '$lib/sanity/client';
import type { MusicItem } from '$lib/sanity/types';

export const load = async () => {
  const query = `{
    "music": *[_type == "music"] | order(_createdAt desc),
    "embedUrl": *[_type == "siteSettings"][0].spotifyEmbedUrl
  }`;
  
  try {
      const data = await client.fetch(query);
      return { 
        music: data.music || [],
        embedUrl: data.embedUrl
      };
  } catch (e) {
      console.log("Using mock music data");
      return { music: [], embedUrl: null };
  }
};
