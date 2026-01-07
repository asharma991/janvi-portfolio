export default {
  name: 'academicWork',
  title: 'Academic Work',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle / Journal',
      type: 'string',
    },
    {
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
    },
    {
      name: 'link',
      title: 'Link to Paper (URL)',
      type: 'url',
    },
  ],
}
