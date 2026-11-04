export function getPagination(pageParam: string | null, pageSize: number) {
	const parsedPage = Number.parseInt(pageParam ?? '1', 10);
	const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

	return {
		page,
		pageSize,
		start: (page - 1) * pageSize,
		end: page * pageSize
	};
}

export function paginationMeta(page: number, pageSize: number, totalItems: number) {
	return {
		page,
		pageSize,
		totalItems,
		totalPages: Math.max(1, Math.ceil(totalItems / pageSize))
	};
}

export function paginateItems<T>(items: T[], pageParam: string | null, pageSize: number) {
	const requested = getPagination(pageParam, pageSize);
	const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
	const page = Math.min(requested.page, totalPages);
	const start = (page - 1) * pageSize;
	return {
		items: items.slice(start, start + pageSize),
		pagination: paginationMeta(page, pageSize, items.length)
	};
}

export function paginationHref(
	searchParams: URLSearchParams,
	targetPage: number,
	pageParam = 'page',
	anchor = ''
) {
	const params = new URLSearchParams(searchParams);
	if (targetPage === 1) params.delete(pageParam);
	else params.set(pageParam, String(targetPage));
	return `?${params.toString()}${anchor ? `#${encodeURIComponent(anchor)}` : ''}`;
}
