import assert from 'node:assert/strict';
import { test } from 'node:test';
import { canonicalUrl, pageSeo, SITE_ORIGIN } from './seo.ts';

test('canonicals use the primary host and remove tracking without losing content pages', () => {
	assert.equal(
		canonicalUrl(new URL('https://preview.example/work?page=2&utm_source=email')),
		`${SITE_ORIGIN}/work?page=2`
	);
	assert.equal(
		canonicalUrl(new URL('https://preview.example/music?playlistPage=3&page=2&ref=foo')),
		`${SITE_ORIGIN}/music?page=2&playlistPage=3`
	);
	assert.equal(
		canonicalUrl(new URL('https://preview.example/books?page=1')),
		`${SITE_ORIGIN}/books`
	);
	assert.equal(
		canonicalUrl(new URL('https://preview.example/about?page=2')),
		`${SITE_ORIGIN}/about`
	);
});

test('food cities have distinct, encoded canonical URLs and descriptions', () => {
	const url = new URL('https://preview.example/food?city=New%20Delhi&utm_campaign=food');
	assert.equal(canonicalUrl(url), `${SITE_ORIGIN}/food?city=New+Delhi`);
	assert.equal(pageSeo(url).title, 'New Delhi Food Guide | Janvi');
	assert.match(pageSeo(url).description, /New Delhi/);
});

test('error pages cannot advertise an indexable canonical or successful page title', () => {
	for (const status of [404, 503]) {
		const seo = pageSeo(new URL(`${SITE_ORIGIN}/work?page=9999`), status);
		assert.equal(seo.noindex, true);
		assert.doesNotMatch(seo.title, /Projects/);
	}
});

test('later listing pages are distinguishable in search results', () => {
	assert.match(pageSeo(new URL(`${SITE_ORIGIN}/work?page=2`)).title, /Page 2/);
	assert.match(pageSeo(new URL(`${SITE_ORIGIN}/music?playlistPage=2`)).title, /Playlists page 2/);
});
