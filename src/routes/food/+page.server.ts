import { error, redirect } from '@sveltejs/kit';
import { fetchContent } from '$lib/server/content';
import type { PageServerLoad } from './$types';
import type { FoodGuide } from '$lib/sanity/types';

export const load: PageServerLoad = async ({ url }) => {
	const query = `*[_type == "foodGuide"][0]{
    title,
    intro,
    cities[]{
      name,
      country,
      description,
      sections[]{
        category,
        title,
        description,
        items[]{
          name,
          area,
          whatToOrder,
          notes,
          link
        }
      }
    }
  }`;

	const foodGuide = await fetchContent<FoodGuide | null>(query);
	const city = url.searchParams.get('city');
	const cities = foodGuide?.cities ?? [];
	if (city !== null && !cities.some((entry) => entry.name === city))
		error(404, 'City guide not found');
	if (city && cities[0]?.name === city) redirect(308, '/food');
	const selectedCity = cities.find((entry) => entry.name === city) ?? cities[0];
	return { foodGuide: foodGuide ?? { title: 'Food', cities: [] }, selectedCity };
};
