import { redirect, type Handle } from '@sveltejs/kit';
import { SITE_ORIGIN } from '$lib/seo';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.hostname === 'janvi-porfolio.vercel.app') {
		redirect(308, `${SITE_ORIGIN}${event.url.pathname}${event.url.search}`);
	}
	return resolve(event);
};
