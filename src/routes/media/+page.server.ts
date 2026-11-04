import type { MediaItem } from '$lib/sanity/types';
import { getMediaPage } from '$lib/server/media';

export const load = async () => {
  try {
      return await getMediaPage(1);
  } catch {
      console.log("Using mock media");
      const mockMedia: MediaItem[] = [
        // Mock data logic can be added if needed, or just return empty
      ];
      return { media: mockMedia, hasMore: false, nextPage: null };
  }
};
