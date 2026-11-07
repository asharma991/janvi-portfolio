import type { BooksItem } from '$lib/sanity/types';
import { paginationMeta } from '$lib/pagination';
import { fetchContent, pageRequest, ensurePageExists } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const { page, pageSize, start, end } = pageRequest(url, 9);
	const query = `{
		"books": *[_type == "books"] | order(_createdAt desc) [$start...$end] {
			_id,
			title,
			author,
			status,
			genre,
			favoriteQuote,
			notes,
			link,
			coverImage {
				asset,
				crop,
				hotspot
			}
		},
		"totalItems": count(*[_type == "books"]),
		"authors": array::unique(*[_type == "books" && defined(author)].author),
		"genres": array::unique(*[_type == "books" && defined(genre)].genre)
	}`;
	const result = await fetchContent<{
		books: BooksItem[];
		totalItems: number;
		authors: string[];
		genres: string[];
	}>(query, { start, end });
	ensurePageExists(page, pageSize, result.totalItems);
	return {
		books: result.books || [],
		authors: result.authors || [],
		genres: result.genres || [],
		pagination: paginationMeta(page, pageSize, result.totalItems)
	};
};
