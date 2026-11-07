import type { Project } from '$lib/sanity/types';
import { paginationMeta } from '$lib/pagination';
import { fetchContent, pageRequest, ensurePageExists } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const { page, pageSize, start, end } = pageRequest(url, 9);
	const query = `{
    "projects": *[_type == "project"] | order(_createdAt desc) [$start...$end] {
      _id,
      title,
      description,
      link,
      mainImage {
        asset,
        crop,
        hotspot
      }
    },
    "totalItems": count(*[_type == "project"])
  }`;
	const result = await fetchContent<{ projects: Project[]; totalItems: number }>(query, {
		start,
		end
	});
	ensurePageExists(page, pageSize, result.totalItems);
	return {
		projects: result.projects || [],
		pagination: paginationMeta(page, pageSize, result.totalItems)
	};
};
