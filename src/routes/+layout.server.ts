import { client } from '$lib/sanity/client';
import type { SiteSettings } from '$lib/sanity/types';

export const load = async () => {
  const query = `*[_type == "siteSettings"][0].socials[] {
    platform,
    url
  }`;
  try {
      const socials = await client.fetch<SiteSettings['socials']>(query);
      return { socials };
  } catch (e) {
      console.log("Failed to fetch socials");
      return { socials: null };
  }
};
