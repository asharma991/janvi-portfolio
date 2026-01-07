export default {
  name: 'music',
  title: 'Music',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Song/Album Title',
      type: 'string',
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'string',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'link',
      title: 'Spotify/Apple Music Link',
      type: 'url',
    },
  ],
}
