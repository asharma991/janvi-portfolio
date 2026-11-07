import { json, isHttpError } from '@sveltejs/kit';
import { getMediaPage } from '$lib/server/media';
import { pageRequest } from '$lib/server/content';

export const GET = async ({ url }) => {
	const { page } = pageRequest(url, 9);

	try {
		return json(await getMediaPage(page), {
			headers: { 'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400' }
		});
	} catch (cause) {
		if (isHttpError(cause)) throw cause;
		return json({ message: 'Unable to load more photos.' }, { status: 503 });
	}
};
