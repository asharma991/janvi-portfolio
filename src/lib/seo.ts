export const SITE_ORIGIN = 'https://janvij-portfolio.vercel.app';
export const SITE_NAME = 'Janvi';

export const seoPages: Record<string, { title: string; description: string }> = {
	'/': {
		title: 'Janvi | Strategy, Marketing & Writing',
		description:
			'Explore Janvi’s work in strategy, marketing and operations, personal essays, photography, and favorite books, music and food.'
	},
	'/about': {
		title: 'About Janvi | Interests & Background',
		description:
			'Meet Janvi: a curious researcher and writer interested in strategy, marketing, operations, literature, photography and the world around her.'
	},
	'/work': {
		title: 'Projects & Professional Work | Janvi',
		description:
			'Explore Janvi’s projects and professional work, with an interest in strategy, marketing, operations and research.'
	},
	'/resume': {
		title: 'Resume | Janvi',
		description: 'Download Janvi’s latest resume and explore her professional work.'
	},
	'/media': {
		title: 'Photography & Media | Janvi',
		description:
			'Browse Janvi’s photography and visual moments, with captions and a growing collection of images.'
	},
	'/music': {
		title: 'Music & Spotify Playlists | Janvi',
		description:
			'Discover the music Janvi is listening to, favorite artists, and curated Spotify playlists.'
	},
	'/food': {
		title: 'Food & City Guides | Janvi',
		description:
			'Explore Janvi’s city food guides, favorite places to eat and drink, and recommendations on what to order.'
	},
	'/books': {
		title: 'Books & Reading Notes | Janvi',
		description:
			'Browse Janvi’s reading shelf: current reads, favorite books, authors, quotes and personal reading notes.'
	}
};

// Keep only parameters that change the rendered content. Later pages must not
// canonicalize to page one; tracking parameters must not create new canonicals.
export function canonicalUrl(url: URL) {
	const canonical = new URL(url.pathname, SITE_ORIGIN);
	const params =
		url.pathname === '/music'
			? ['page', 'playlistPage']
			: ['/work', '/books', '/media'].includes(url.pathname)
				? ['page']
				: [];
	for (const key of params) {
		const value = url.searchParams.get(key);
		if (
			value &&
			/^[1-9]\d*$/.test(value) &&
			Number.isSafeInteger(Number(value)) &&
			Number(value) > 1
		) {
			canonical.searchParams.set(key, String(Number(value)));
		}
	}
	if (url.pathname === '/food' && url.searchParams.get('city')) {
		canonical.searchParams.set('city', url.searchParams.get('city')!);
	}
	return canonical.href;
}

export function pageSeo(url: URL, status = 200) {
	const base = seoPages[url.pathname];
	if (status >= 400 || !base)
		return {
			title: status === 404 ? 'Page Not Found | Janvi' : 'Page Unavailable | Janvi',
			description:
				'This page is currently unavailable. Explore Janvi’s portfolio from the homepage.',
			noindex: true
		};
	const suffix = ['page', ...(url.pathname === '/music' ? ['playlistPage'] : [])].flatMap((key) => {
		const value = url.searchParams.get(key);
		return value && /^[1-9]\d*$/.test(value) && Number(value) > 1
			? [key === 'playlistPage' ? `Playlists page ${value}` : `Page ${value}`]
			: [];
	});
	const city = url.pathname === '/food' ? url.searchParams.get('city') : null;
	return {
		title: city
			? `${city} Food Guide | Janvi`
			: suffix.length
				? `${base.title} — ${suffix.join(', ')}`
				: base.title,
		description: city
			? `Explore Janvi’s ${city} food guide, with favorite places to eat and drink and recommendations on what to order.`
			: base.description,
		noindex: false
	};
}
