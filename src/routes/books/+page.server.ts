import { client } from '$lib/sanity/client';
import type { BooksItem } from '$lib/sanity/types';
import { getPagination, paginationMeta } from '$lib/pagination';

export const load = async ({ url }) => {
	const { page, pageSize, start, end } = getPagination(url.searchParams.get('page'), 9);
	const query = `{
		"books": *[_type == "books"] | order(_createdAt desc) [$start...$end],
		"totalItems": count(*[_type == "books"]),
		"authors": array::unique(*[_type == "books" && defined(author)].author),
		"genres": array::unique(*[_type == "books" && defined(genre)].genre)
	}`;

	try {
		const result = await client.fetch(query, { start, end });
		return {
			books: (result.books || []) as BooksItem[],
			authors: result.authors || [],
			genres: result.genres || [],
			pagination: paginationMeta(page, pageSize, result.totalItems)
		};
	} catch {
		return {
			books: [] as BooksItem[],
			authors: [] as string[],
			genres: [] as string[],
			pagination: paginationMeta(page, pageSize, 0)
		};
	}
};
