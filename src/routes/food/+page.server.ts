import { client } from '$lib/sanity/client';
import type { FoodGuide } from '$lib/sanity/types';

export const load = async () => {
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

  try {
    const foodGuide = await client.fetch<FoodGuide | null>(query);
    if (foodGuide) return { foodGuide };
    throw new Error('No food guide found');
  } catch {
    const fallback: FoodGuide = {
      title: 'Food',
      intro: 'Build city-by-city food and drink guides in Sanity.',
      cities: []
    };

    return { foodGuide: fallback };
  }
};
