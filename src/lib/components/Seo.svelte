<script lang="ts">
	import { page } from '$app/state';
	import { canonicalUrl, pageSeo, SITE_ORIGIN, SITE_NAME } from '$lib/seo';
	const seo = $derived(pageSeo(page.url, page.status));
	const canonical = $derived(canonicalUrl(page.url));
	const image = `${SITE_ORIGIN}/social-preview.png`;
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="author" content={SITE_NAME} />
	{#if seo.noindex}<meta name="robots" content="noindex, follow" />{:else}<link
			rel="canonical"
			href={canonical}
		/>{/if}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Janvi — strategy, marketing and writing" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content="Janvi — strategy, marketing and writing" />
</svelte:head>
