export default {
  name: 'media',
  title: 'Media (Gallery)',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
  ],
}
