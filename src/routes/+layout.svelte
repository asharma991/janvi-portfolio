<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Cat from '$lib/components/Cat.svelte';
	import { page } from '$app/stores';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { theme } from '$lib/stores/theme';
	import { browser } from '$app/environment';

	let { children, data } = $props();
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<div
	class="flex min-h-screen flex-col bg-[#FFF5F9] font-sans text-gray-900 transition-colors duration-300 selection:bg-[#FEC5E5] selection:text-black dark:bg-[#1F0510] dark:text-[#FCE7F3] dark:selection:bg-[#BE185D] dark:selection:text-white"
>
	<!-- Header is fixed and visible on all pages, including home -->
	<Header />

	<main
		class="mx-auto w-full max-w-7xl flex-grow px-4 py-8 md:px-8 {$page.url.pathname === '/'
			? 'flex min-h-[calc(100vh-100px)] w-full max-w-none items-center justify-center pt-28 pb-8'
			: 'pt-32'}"
	>
		{@render children()}
	</main>

	<!-- Footer visible on all pages now, as requested -->
	<Footer socials={data.socials ?? undefined} />

	<Cat />
</div>
