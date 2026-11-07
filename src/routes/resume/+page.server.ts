import { fetchContent } from '$lib/server/content';
import type { Resume } from '$lib/sanity/types';

export const load = async () => {
	const query = `*[_type == "resume"][0] {
    file {
      asset-> {
        url
      }
    }
  }`;

	const resume = await fetchContent<Resume | null>(query);
	return { resume };
};
