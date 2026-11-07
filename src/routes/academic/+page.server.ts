import type { AcademicWork } from '$lib/sanity/types';
import { paginationMeta } from '$lib/pagination';
import { fetchContent, pageRequest, ensurePageExists } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const { page, pageSize, start, end } = pageRequest(url, 10);
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
	const result = await fetchContent<{ works: AcademicWork[]; totalItems: number }>(query, {
		start,
		end
	});
	ensurePageExists(page, pageSize, result.totalItems);
	return {
		works: result.works || [],
		pagination: paginationMeta(page, pageSize, result.totalItems)
	};
};
