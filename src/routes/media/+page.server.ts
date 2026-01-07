import { client } from '$lib/sanity/client';
import type { MediaItem } from '$lib/sanity/types';

export const load = async () => {
  const query = `*[_type == "media"] | order(_createdAt desc)`;
  try {
      const media = await client.fetch(query);
      if (media && media.length > 0) return { media };
      throw new Error("No media found");
  } catch (e) {
      console.log("Using mock media");
      const mockMedia: MediaItem[] = [
        // Mock data logic can be added if needed, or just return empty
      ];
      return { media: mockMedia };
  }
};
