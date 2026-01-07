import { client } from '$lib/sanity/client';
import type { About } from '$lib/sanity/types';

export const load = async () => {
  const query = `*[_type == "about"][0]`;
  try {
      const about = await client.fetch(query);
      if (about) return { about };
      throw new Error("No about data");
  } catch (e) {
      const mockAbout: About = {
          bio: [
              {
                  _type: 'block',
                  children: [{ _type: 'span', text: 'Janvi is a Marketing & Strategy specialist based in [City]. With a passion for data-driven storytelling and consumer psychology, she bridges the gap between creative vision and business goals.' }],
                  markDefs: [],
                  style: 'normal'
              },
              {
                _type: 'block',
                children: [{ _type: 'span', text: 'Currently pursuing her Masters in Business Management.' }],
                markDefs: [],
                style: 'normal'
            }
          ]
      };
      return { about: mockAbout };
  }
};
