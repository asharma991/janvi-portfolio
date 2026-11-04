export interface SocialLink {
	platform: string;
	url: string;
}

/** Sanity can return incomplete array entries while content is being edited. */
export function normalizeSocialLinks(value: unknown): SocialLink[] {
	if (!Array.isArray(value)) return [];

	return value.flatMap((social) => {
		if (!social || typeof social.platform !== 'string' || typeof social.url !== 'string') return [];

		const platform = social.platform.trim();
		const url = social.url.trim();
		return platform && url ? [{ platform, url }] : [];
	});
}
