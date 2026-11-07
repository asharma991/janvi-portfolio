import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

export const client = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
	dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
	apiVersion: '2024-01-01',
	useCdn: true
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
