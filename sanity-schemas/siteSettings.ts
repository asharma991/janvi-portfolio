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
}
