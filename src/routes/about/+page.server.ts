import { error } from '@sveltejs/kit';
import { fetchContent } from '$lib/server/content';
import type { About } from '$lib/sanity/types';

export const load = async () => {
	const query = `*[_type == "about"][0] {
    bio,
    image {
      asset,
      crop,
      hotspot
    }
  }`;
	const about = await fetchContent<About | null>(query);
	if (!about) error(503, 'Biography is temporarily unavailable.');
	return { about };
};
