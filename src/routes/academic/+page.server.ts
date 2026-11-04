import { client } from '$lib/sanity/client';
import type { AcademicWork } from '$lib/sanity/types';
import { getPagination, paginationMeta } from '$lib/pagination';

export const load = async ({ url }) => {
  const { page, pageSize, start, end } = getPagination(url.searchParams.get('page'), 10);
  const query = `{
    "works": *[_type == "academicWork"] | order(publicationDate desc) [$start...$end] {
      _id,
      title,
      subtitle,
      publicationDate,
      link
    },
    "totalItems": count(*[_type == "academicWork"])
  }`;
  try {
      const result = await client.fetch(query, { start, end });
      if (result.works && result.works.length > 0) {
        return { works: result.works, pagination: paginationMeta(page, pageSize, result.totalItems) };
      }
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
      return {
        works: mockWorks.slice(start, end),
        pagination: paginationMeta(page, pageSize, mockWorks.length)
      };
  }
};
