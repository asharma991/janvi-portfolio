<script lang="ts">
	import CursorLink from './CursorLink.svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { page as currentPage } from '$app/state';
	import { paginationHref } from '$lib/pagination';
	let {
		page,
		totalPages,
		label = 'items',
		pageParam = 'page',
		anchor = ''
	}: {
		page: number;
		totalPages: number;
		label?: string;
		pageParam?: string;
		anchor?: string;
	} = $props();

	function pageHref(targetPage: number) {
		return paginationHref(currentPage.url.searchParams, targetPage, pageParam, anchor);
	}
</script>

{#if totalPages > 1}
	<nav
		class="mt-12 flex flex-wrap items-center justify-center gap-3"
		aria-label={`${label} pagination`}
	>
		{#if page > 1}
			<CursorLink
				href={pageHref(page - 1)}
				class="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition-colors hover:border-[#BE185D] hover:text-[#831843]"
				rel="prev">Previous</CursorLink
			>
		{:else}
			<span
				class="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-black/5 bg-white/30 px-4 py-2 text-xs font-bold tracking-widest text-gray-300 uppercase"
			>
				<ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" class="shrink-0" /> Previous
			</span>
		{/if}

		<span class="text-xs font-bold tracking-[0.16em] text-gray-500 uppercase">
			Page {page} of {totalPages}
		</span>

		{#if page < totalPages}
			<CursorLink
				direction="next"
				href={pageHref(page + 1)}
				class="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition-colors hover:border-[#BE185D] hover:text-[#831843]"
				rel="next">Next</CursorLink
			>
		{:else}
			<span
				class="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-black/5 bg-white/30 px-4 py-2 text-xs font-bold tracking-widest text-gray-300 uppercase"
			>
				Next <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" class="shrink-0" />
			</span>
		{/if}
	</nav>
{/if}
