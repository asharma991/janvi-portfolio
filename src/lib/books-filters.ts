export function bookFilterOptions(values: string[]) {
	const options = new Map<string, string>();
	for (const value of values) {
		if (typeof value !== 'string' || !value.trim()) continue;
		const label = value.trim();
		if (!options.has(label.toLowerCase())) options.set(label.toLowerCase(), label);
	}
	return [...options.values()];
}

export function bookFilterValues(values: string[], selected: string) {
	return values.filter(
		(value) =>
			typeof value === 'string' && value.trim().toLowerCase() === selected.trim().toLowerCase()
	);
}

export function booksFilterHref(
	searchParams: URLSearchParams,
	author: string,
	genre: string,
	status = ''
) {
	const params = new URLSearchParams(searchParams);
	params.delete('page');
	for (const [key, value] of [
		['author', author],
		['genre', genre],
		['status', status]
	]) {
		if (value) params.set(key, value);
		else params.delete(key);
	}
	return `?${params.toString()}`;
}
