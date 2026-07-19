import { client } from '$lib/sanity/client';
import type { BooksItem } from '$lib/sanity/types';

export const load = async () => {
	const query = `*[_type == "books"] | order(_createdAt desc)`;

	try {
		const books = await client.fetch<BooksItem[]>(query);
		return { books: books || [] };
	} catch {
		return { books: [] as BooksItem[] };
	}
};
