import { client } from '$lib/sanity/client';
import type { BookItem } from '$lib/sanity/types';

export const load = async () => {
	const query = `*[_type == "book"] | order(_createdAt desc)`;

	try {
		const books = await client.fetch<BookItem[]>(query);
		return { books: books || [] };
	} catch {
		return { books: [] as BookItem[] };
	}
};
