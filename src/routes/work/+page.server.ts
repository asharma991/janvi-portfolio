import type { Project } from '$lib/sanity/types';
import { paginationMeta } from '$lib/pagination';
import { fetchContent, pageRequest, ensurePageExists } from '$lib/server/content';
import type { PageServerLoad } from './$types';

// Match the old dropdown value and its readable spelling as one type.
const categoryKey = `select(lower(category) == "case-competition" => "case competition", lower(category))`;

function typeLabel(category: string) {
	const label = category.trim();
	if (['case-competition', 'case competition'].includes(label.toLowerCase()))
		return 'Case Competition';
	return label.charAt(0).toUpperCase() + label.slice(1);
}

export const load: PageServerLoad = async ({ url }) => {
	const { page, pageSize, start, end } = pageRequest(url, 9);
	const selectedType = url.searchParams.get('type')?.toLowerCase() || null;
	const matchingProjects = `*[_type == "project" && ($workType == null || ${categoryKey} == $workType)]`;
	const query = `{
    "projects": ${matchingProjects} | order(_createdAt desc, _id desc) [$start...$end] {
      _id,
      title,
      description,
      link,
      category,
      mainImage {
        asset,
        crop,
        hotspot
      }
    },
    "totalItems": count(${matchingProjects}),
    "workTypes": *[_type == "project" && defined(category) && category != ""] | order(_createdAt desc, _id desc) {
      "value": ${categoryKey},
      "label": category
    }
  }`;
	const result = await fetchContent<{
		projects: Project[];
		totalItems: number;
		workTypes: { value: string; label: string }[];
	}>(query, {
		start,
		end,
		workType: selectedType
	});
	ensurePageExists(page, pageSize, result.totalItems);
	const workTypes = new Map<string, string>();
	for (const { value, label } of result.workTypes) {
		if (label.trim() && !workTypes.has(value)) workTypes.set(value, typeLabel(label));
	}
	return {
		projects: result.projects.map((project) => ({
			...project,
			category: project.category ? typeLabel(project.category) : null
		})),
		workTypes: Array.from(workTypes, ([value, label]) => ({ value, label })).sort((a, b) =>
			a.label.localeCompare(b.label)
		),
		selectedType,
		pagination: paginationMeta(page, pageSize, result.totalItems)
	};
};
