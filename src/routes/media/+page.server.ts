import { getMediaPage, MEDIA_PAGE_SIZE } from '$lib/server/media';
import { pageRequest } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const { page } = pageRequest(url, MEDIA_PAGE_SIZE);
	return getMediaPage(page);
};
