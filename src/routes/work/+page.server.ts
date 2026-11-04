import { client } from '$lib/sanity/client';
import type { Project } from '$lib/sanity/types';
import { getPagination, paginationMeta } from '$lib/pagination';

export const load = async ({ url }) => {
  const { page, pageSize, start, end } = getPagination(url.searchParams.get('page'), 9);
  const query = `{
    "projects": *[_type == "project"] | order(_createdAt desc) [$start...$end],
    "totalItems": count(*[_type == "project"])
  }`;
  
  try {
      const result = await client.fetch(query, { start, end });
      if (result.projects && result.projects.length > 0) {
        return { projects: result.projects, pagination: paginationMeta(page, pageSize, result.totalItems) };
      }
      throw new Error("No projects found");
  } catch (e) {
      console.log("Using mock data for work");
      const mockProjects: Project[] = [
          {
              _id: '1',
              title: 'Marketing Strategy 2025',
              slug: { current: 'marketing-strategy' },
              description: 'Rebranding strategy for a Fortune 500 client.',
              link: 'https://example.com',
              category: 'project'
          },
          {
              _id: '2',
              title: 'Consumer Behavior Analysis',
              slug: { current: 'consumer-behavior' },
              description: 'Deep dive into Gen-Z purchasing habits.',
              link: 'https://example.com',
              category: 'academic'
          },
          {
              _id: '3',
              title: 'Social Media Growth',
              slug: { current: 'social-growth' },
              description: '300% increase in engagement over 6 months.',
              link: 'https://example.com',
              category: 'project'
          },
           {
              _id: '4',
              title: 'Sustainable Branding',
              slug: { current: 'sustainable-branding' },
              description: 'Masters Thesis on sustainability in fashion.',
              link: 'https://example.com',
              category: 'academic'
          }
      ];
      const projects = mockProjects.slice(start, end);
      return { projects, pagination: paginationMeta(page, pageSize, mockProjects.length) };
  }
};
