import type { BooksItem } from '$lib/sanity/types';
import { paginationMeta } from '$lib/pagination';
import { fetchContent, pageRequest, ensurePageExists } from '$lib/server/content';
import type { PageServerLoad } from './$types';
import { bookFilterOptions, bookFilterValues } from '$lib/books-filters';

export const load: PageServerLoad = async ({ url }) => {
	const { page, pageSize, start, end } = pageRequest(url, 9);
	const facets = await fetchContent<{
		authors: string[] | null;
		genres: string[] | null;
		totalBooks: number;
	}>(`{
		"authors": array::unique(*[_type == "books" && defined(author)].author),
		"genres": array::unique(*[_type == "books" && defined(genre)].genre),
		"totalBooks": count(*[_type == "books"])
	}`);
	const authors = bookFilterOptions(facets.authors ?? []);
	const genres = bookFilterOptions(facets.genres ?? []);
	const selectedAuthor = url.searchParams.get('author')?.trim() ?? '';
	const selectedGenre = url.searchParams.get('genre')?.trim() ?? '';
	const author =
		authors.find((value) => value.toLowerCase() === selectedAuthor.toLowerCase()) ?? selectedAuthor;
	const genre =
		genres.find((value) => value.toLowerCase() === selectedGenre.toLowerCase()) ?? selectedGenre;
	const filter = `_type == "books" && ($author == "" || author in $authorValues) && ($genre == "" || genre in $genreValues)`;
	const query = `{
		"books": *[${filter}] | order((status == "currently-reading") desc, _createdAt desc, _id desc) [$start...$end] {
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
		"totalItems": count(*[${filter}])
	}`;
	const result = await fetchContent<{
		books: BooksItem[];
		totalItems: number;
	}>(query, {
		start,
		end,
		author,
		genre,
		authorValues: bookFilterValues(facets.authors ?? [], author),
		genreValues: bookFilterValues(facets.genres ?? [], genre)
	});
	ensurePageExists(page, pageSize, result.totalItems);
	return {
		books: result.books || [],
		authors,
		genres,
		totalBooks: facets.totalBooks,
		filters: { author, genre },
		pagination: paginationMeta(page, pageSize, result.totalItems)
	};
};
