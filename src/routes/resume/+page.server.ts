import { client } from '$lib/sanity/client';
import type { Resume } from '$lib/sanity/types';

export const load = async () => {
  const query = `*[_type == "resume"][0] {
    file {
      asset-> {
        url
      }
    }
  }`;
  
  try {
    const resume = await client.fetch(query);
    if (resume) return { resume };
    throw new Error("No resume found");
  } catch (e) {
    return { resume: null };
  }
};
