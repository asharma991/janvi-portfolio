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
