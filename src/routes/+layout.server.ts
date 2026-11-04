import { client } from '$lib/sanity/client';
import { normalizeSocialLinks } from '$lib/socials';

export const load = async () => {
	const query = `*[_type == "siteSettings"][0].socials[] {
    platform,
    url
  }`;
	try {
		const socials = await client.fetch<unknown>(query);
		return { socials: normalizeSocialLinks(socials) };
	} catch (e) {
		console.log('Failed to fetch socials');
		return { socials: [] };
	}
};
