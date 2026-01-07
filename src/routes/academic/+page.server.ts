import { client } from '$lib/sanity/client';
import type { AcademicWork } from '$lib/sanity/types';

export const load = async () => {
  const query = `*[_type == "academicWork"] | order(publicationDate desc)`;
  try {
      const works = await client.fetch(query);
      if (works && works.length > 0) return { works };
      throw new Error("No works");
  } catch (e) {
      const mockWorks: AcademicWork[] = [
          {
              _id: '1',
              title: 'The Impact of AI on Digital Marketing Strategy',
              subtitle: 'Journal of Marketing Trends',
              publicationDate: '2024-03-15',
              link: 'https://example.com/paper.pdf'
          },
          {
              _id: '2',
              title: 'Sustainable Branding in Fast Fashion',
              subtitle: 'Masters Thesis Abstract',
              publicationDate: '2023-11-20',
              link: '#'
          },
          {
              _id: '3',
              title: 'Consumer Psychology in the Metaverse',
              subtitle: 'University Research Paper',
              publicationDate: '2023-06-10',
              link: '#'
          }
      ];
      return { works: mockWorks };
  }
};
