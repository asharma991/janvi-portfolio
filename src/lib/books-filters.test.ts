import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bookFilterOptions, bookFilterValues, booksFilterHref } from './books-filters.ts';
import { paginationHref } from './pagination.ts';

test('duplicate options collapse while all original whitespace and case variants still match', () => {
	const authors = ['Amit Chaudhuri', ' Amit Chaudhuri ', 'AMIT CHAUDHURI', '', '   ', 'Other'];
	assert.deepEqual(bookFilterOptions(authors), ['Amit Chaudhuri', 'Other']);
	assert.deepEqual(bookFilterValues(authors, 'Amit Chaudhuri'), authors.slice(0, 3));
	const genres = ['Slice of Life', 'Slice Of Life', ' Slice of Life ', 'Drama'];
	assert.deepEqual(bookFilterOptions(genres), ['Slice of Life', 'Drama']);
	assert.deepEqual(bookFilterValues(genres, 'Slice Of Life'), genres.slice(0, 3));
	assert.deepEqual(bookFilterValues(genres, 'No matches'), []);
});

test('changing filters resets the page and preserves both selections', () => {
	const original = new URLSearchParams('page=8&author=Old&genre=Old&source=shelf');
	const query = new URLSearchParams(
		booksFilterHref(original, 'Amit Chaudhuri', 'Fiction').slice(1)
	);
	assert.equal(query.has('page'), false);
	assert.equal(query.get('author'), 'Amit Chaudhuri');
	assert.equal(query.get('genre'), 'Fiction');
	assert.equal(query.get('source'), 'shelf');
	assert.equal(original.get('page'), '8');
});

test('clearing one or both filters removes only the cleared selections', () => {
	const original = new URLSearchParams('page=3&author=Amit&genre=Fiction');
	assert.equal(booksFilterHref(original, '', 'Fiction'), '?genre=Fiction');
	assert.equal(booksFilterHref(original, 'Amit', ''), '?author=Amit');
	assert.equal(booksFilterHref(original, '', ''), '?');
});

test('author and genre punctuation survives navigation and subsequent pagination', () => {
	const author = "O'Connor & Co.";
	const genre = 'History + Politics';
	const filters = new URLSearchParams(
		booksFilterHref(new URLSearchParams(), author, genre).slice(1)
	);
	const nextPage = new URLSearchParams(paginationHref(filters, 2).slice(1));
	assert.equal(nextPage.get('author'), author);
	assert.equal(nextPage.get('genre'), genre);
	assert.equal(nextPage.get('page'), '2');
});
