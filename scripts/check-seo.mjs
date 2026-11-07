import assert from 'node:assert/strict';

// Run the app first, then: node scripts/check-seo.mjs http://127.0.0.1:5174
const origin = process.argv[2] || 'http://127.0.0.1:5174';
const primary = 'https://janvij-portfolio.vercel.app';
const decode = (text) =>
	text.replaceAll('&amp;', '&').replaceAll('&apos;', "'").replaceAll('&quot;', '"');
async function fetchPage(path) {
	const response = await fetch(new URL(path, origin), {
		redirect: 'manual',
		signal: AbortSignal.timeout(30000)
	});
	return { response, html: await response.text() };
}

const { response: sitemap, html: xml } = await fetchPage('/sitemap.xml');
assert.equal(sitemap.status, 200, 'Sitemap must be available');
assert.match(sitemap.headers.get('content-type'), /xml/);
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
assert.ok(urls.length >= 9, 'Sitemap must include the main pages');
assert.equal(new Set(urls).size, urls.length, 'Sitemap must not duplicate URLs');
for (let offset = 0; offset < urls.length; offset += 4) {
	await Promise.all(
		urls.slice(offset, offset + 4).map(async (canonical) => {
			const url = new URL(canonical);
			assert.equal(url.origin, primary);
			const { response, html } = await fetchPage(url.pathname + url.search);
			assert.equal(response.status, 200, canonical);
			assert.equal([...html.matchAll(/<title>/g)].length, 1, `${canonical}: one title`);
			assert.equal(
				[...html.matchAll(/name="description"/g)].length,
				1,
				`${canonical}: one description`
			);
			assert.equal(decode(html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? ''), canonical);
			assert.doesNotMatch(html, /name="robots" content="noindex/);
		})
	);
}
console.log(
	`PASS: ${urls.length} sitemap URLs return 200 with one title, one description and the correct canonical.`
);

for (const path of [
	'/work?page=9999',
	'/work?page=2junk',
	'/books?page=0',
	'/music?playlistPage=9999',
	'/media?page=9999',
	'/food?city=Unknown',
	'/not-a-real-page'
]) {
	const { response, html } = await fetchPage(path);
	assert.equal(response.status, 404, path);
	assert.match(html, /name="robots" content="noindex, follow"/);
	assert.doesNotMatch(html, /rel="canonical"/);
}
console.log('PASS: invalid pages return 404 and noindex instead of indexable empty content.');
const { html: robots } = await fetchPage('/robots.txt');
assert.ok(robots.includes(`Sitemap: ${primary}/sitemap.xml`));
const image = await fetch(new URL('/social-preview.png', origin));
assert.equal(image.status, 200);
assert.equal(image.headers.get('content-type'), 'image/png');
const bytes = Buffer.from(await image.arrayBuffer());
assert.equal(bytes.readUInt32BE(16), 1200);
assert.equal(bytes.readUInt32BE(20), 630);
console.log('PASS: robots.txt advertises the sitemap and the sharing PNG is 1200×630.');

const { html: media } = await fetchPage('/media');
if (urls.includes(`${primary}/media?page=2`)) {
	assert.match(media, /href="[^" ]*media\?page=2"/);
}
console.log('PASS: later gallery content is linked in the server-rendered HTML.');
