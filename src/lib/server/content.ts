import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { getPagination } from '$lib/pagination';

export async function fetchContent<T>(
	query: string,
	params: Record<string, number> = {}
): Promise<T> {
	try {
		return await client.fetch<T>(query, params);
	} catch {
		error(503, 'Content is temporarily unavailable. Please try again shortly.');
	}
}

export function pageRequest(url: URL, pageSize: number, param = 'page') {
	const value = url.searchParams.get(param);
	if (
		url.searchParams.getAll(param).length > 1 ||
		(value !== null &&
			(!/^[1-9]\d*$/.test(value) ||
				!Number.isSafeInteger(Number(value)) ||
				Number(value) > Math.floor(Number.MAX_SAFE_INTEGER / pageSize)))
	) {
		error(404, 'Page not found');
	}
	return getPagination(value, pageSize);
}

export function ensurePageExists(page: number, pageSize: number, totalItems: number) {
	if (page > Math.max(1, Math.ceil(totalItems / pageSize))) error(404, 'Page not found');
}
