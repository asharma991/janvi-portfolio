import { error, redirect } from '@sveltejs/kit';
import { fetchContent } from '$lib/server/content';

export const load = async () => {
	const substackUrl = await fetchContent<string | null>(
		`*[_type == "siteSettings"][0].substackUrl`
	);
	if (!substackUrl) error(503, 'The blog is temporarily unavailable.');
	redirect(307, substackUrl);
};
