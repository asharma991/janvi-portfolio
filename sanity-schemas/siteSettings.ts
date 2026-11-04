export default {
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		{
			name: 'substackUrl',
			title: 'Substack URL',
			type: 'url'
		},
		{
			name: 'spotifyEmbedUrl',
			title: 'Spotify Embed URL',
			description: 'The "src" attribute from the Spotify embed iframe',
			type: 'string' // Using string because embed URL might be specific format
		},
		{
			name: 'spotifyPlaylists',
			title: 'Additional Spotify Playlists',
			description:
				'Add as many playlists as you like. Drag to reorder; these appear below the existing player on the Music page.',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'spotifyPlaylist',
					title: 'Playlist',
					fields: [
						{
							name: 'title',
							title: 'Playlist Title',
							type: 'string',
							validation: (Rule: any) => Rule.required()
						},
						{
							name: 'url',
							title: 'Spotify Playlist URL',
							description: 'Paste the Spotify share link or embed URL (not the iframe code).',
							type: 'url',
							validation: (Rule: any) =>
								Rule.required().custom((value: string | undefined) => {
									if (!value) return true;
									try {
										const url = new URL(value);
										return (
											(url.protocol === 'https:' &&
												url.hostname === 'open.spotify.com' &&
												/^\/(?:intl-[a-z-]+\/)?(?:embed\/)?playlist\/[a-zA-Z0-9]+\/?$/i.test(
													url.pathname
												)) ||
											'Use a Spotify playlist link, such as https://open.spotify.com/playlist/…'
										);
									} catch {
										return 'Enter a valid Spotify playlist URL';
									}
								})
						}
					],
					preview: { select: { title: 'title', subtitle: 'url' } }
				}
			]
		},
		{
			name: 'socials',
			title: 'Social Links',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'platform', type: 'string', title: 'Platform (Linkedin, Twitter, Email)' },
						{ name: 'url', type: 'url', title: 'URL' }
					]
				}
			]
		}
	]
};
