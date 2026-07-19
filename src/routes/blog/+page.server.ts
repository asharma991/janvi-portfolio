import { redirect } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';

function isRedirectError(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export const load = async () => {
  const query = `*[_type == "siteSettings"][0].substackUrl`;
  try {
    const substackUrl = await client.fetch(query);
    if (substackUrl) {
      throw redirect(307, substackUrl);
    }
  } catch (e) {
    if (isRedirectError(e) && e.status === 307) throw e;
    console.log("Substack URL fetch failed or not set");
  }

  // Fallback if no URL set
  throw redirect(307, 'https://substack.com');
};
