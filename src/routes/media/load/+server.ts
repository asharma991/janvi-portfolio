import { json } from '@sveltejs/kit';
import { getMediaPage } from '$lib/server/media';

export const GET = async ({ url }) => {
	const parsedPage = Number.parseInt(url.searchParams.get('page') ?? '2', 10);
	const page = Number.isFinite(parsedPage) && parsedPage > 1 ? parsedPage : 2;

	try {
		return json(await getMediaPage(page), {
			headers: { 'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400' }
		});
	} catch {
		return json({ message: 'Unable to load more photos.' }, { status: 500 });
	}
};
