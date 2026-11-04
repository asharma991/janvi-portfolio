import assert from 'node:assert/strict';
import { test } from 'node:test';
import { paginateItems, paginationHref } from './pagination.ts';

test('playlists paginate in groups of three without losing or repeating entries', () => {
	const playlists = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
	const pages = ['1', '2', '3'].map((page) => paginateItems(playlists, page, 3));
	assert.deepEqual(
		pages.map((page) => page.items),
		[['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
	);
	assert.deepEqual(
		pages.flatMap((page) => page.items),
		playlists
	);
	assert.equal(pages[0].pagination.totalPages, 3);
});

test('three playlists fit one page; a fourth starts a second page', () => {
	assert.equal(paginateItems(['a', 'b', 'c'], null, 3).pagination.totalPages, 1);
	const second = paginateItems(['a', 'b', 'c', 'd'], '2', 3);
	assert.deepEqual(second.items, ['d']);
	assert.equal(second.pagination.totalPages, 2);
});

test('empty, invalid and stale page requests stay within available pages', () => {
	assert.deepEqual(paginateItems([], '5', 3), {
		items: [],
		pagination: { page: 1, pageSize: 3, totalItems: 0, totalPages: 1 }
	});
	for (const page of [null, '-1', 'invalid']) {
		assert.equal(paginateItems(['a', 'b', 'c', 'd'], page, 3).pagination.page, 1);
	}
	assert.deepEqual(paginateItems(['a', 'b', 'c', 'd'], '99', 3).items, ['d']);
});

test('playlist and music controls preserve each other’s page and other query parameters', () => {
	const params = new URLSearchParams('page=2&playlistPage=2&filter=favorites');
	assert.equal(
		paginationHref(params, 3, 'playlistPage', 'playlists'),
		'?page=2&playlistPage=3&filter=favorites#playlists'
	);
	assert.equal(
		paginationHref(params, 1, 'playlistPage', 'playlists'),
		'?page=2&filter=favorites#playlists'
	);
	assert.equal(paginationHref(params, 3), '?page=3&playlistPage=2&filter=favorites');
	assert.equal(paginationHref(params, 1), '?playlistPage=2&filter=favorites');
	assert.equal(params.get('playlistPage'), '2');
});
