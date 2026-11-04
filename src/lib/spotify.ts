/** Accept Spotify share or embed URLs and return a consistent player URL. */
export function spotifyEmbedUrl(value?: string | null): string | null {
	if (!value) return null;

	try {
		const url = new URL(value.trim());
		if (url.protocol !== 'https:' || url.hostname !== 'open.spotify.com') return null;
		const match = url.pathname.match(
			/^\/(?:intl-[a-z-]+\/)?(?:embed\/)?(playlist|album|track|artist|show|episode)\/([a-zA-Z0-9]+)\/?$/i
		);
		return match ? `https://open.spotify.com/embed/${match[1]}/${match[2]}` : null;
	} catch {
		return null;
	}
}
