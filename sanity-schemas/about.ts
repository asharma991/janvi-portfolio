export default {
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Janvi'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image'
    }
  ]
}
