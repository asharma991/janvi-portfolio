<script lang="ts">
	import { resolve } from '$app/paths';
	import CursorLink from '$lib/components/CursorLink.svelte';
	import { urlFor } from '$lib/sanity/client';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import type { MediaItem } from '$lib/sanity/types';
	import { createThrottledTask } from '$lib/throttled-task';
	import { onDestroy, onMount, tick } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { ChevronLeft, ChevronRight, X } from 'lucide-svelte';

	let { data } = $props();

	function initialMediaState() {
		return {
			media: [...data.media] as MediaItem[],
			hasMore: data.hasMore,
			nextPage: data.nextPage as number | null
		};
	}

	const initial = initialMediaState();
	let media = $state<MediaItem[]>(initial.media);
	let hasMore = $state(initial.hasMore);
	let nextPage = $state<number | null>(initial.nextPage);
	let isLoading = $state(false);
	let loadError = $state(false);
	let loadMoreElement = $state<HTMLDivElement>();
	let destroyed = false;
	let cursorType = $state<string | null>(null);
	let selectedIndex = $state<number | null>(null);
	let selectedImage = $derived(selectedIndex === null ? null : media[selectedIndex]);

	function handleMouseEnter() {
		cursorType = 'view';
		document.body.classList.add('has-custom-cursor');
	}

	function handleMouseLeave() {
		cursorType = null;
		document.body.classList.remove('has-custom-cursor');
	}

	function showControlCursor(type: 'previous' | 'next' | 'close') {
		cursorType = type;
		document.body.classList.add('has-custom-cursor');
	}

	function hideControlCursor() {
		cursorType = null;
		document.body.classList.remove('has-custom-cursor');
	}

	function isGalleryEndVisible() {
		if (!loadMoreElement) return false;
		const bounds = loadMoreElement.getBoundingClientRect();
		return bounds.top < window.innerHeight && bounds.bottom > 0;
	}

	// Reserve image space before downloads finish so the end marker cannot rush
	// through every page while unloaded images still have zero height.
	function photoAspectRatio(image: MediaItem['image']) {
		const dimensions = image.asset._ref.match(/-(\d+)x(\d+)-[^-]+$/);
		return dimensions ? `auto ${dimensions[1]} / ${dimensions[2]}` : undefined;
	}

	const throttledLoad = createThrottledTask(async (signal) => {
		// The user may have scrolled away during the throttle delay.
		if (destroyed || !hasMore || nextPage === null || !isGalleryEndVisible()) return;
		const response = await fetch(`${resolve('/media/load')}?page=${nextPage}`, { signal });
		if (!response.ok) throw new Error('Unable to load more photos');

		const result: { media: MediaItem[]; hasMore: boolean; nextPage: number | null } =
			await response.json();
		signal.throwIfAborted();
		const existingIds = new Set(media.map((item) => item._id));
		media = [...media, ...result.media.filter((item) => !existingIds.has(item._id))];
		hasMore = result.hasMore;
		nextPage = result.nextPage;
	});

	async function loadMore(retry = false) {
		if (
			destroyed ||
			isLoading ||
			!hasMore ||
			nextPage === null ||
			(loadError && !retry) ||
			!isGalleryEndVisible()
		)
			return;

		isLoading = true;
		loadError = false;
		try {
			await throttledLoad.run();
		} catch (error) {
			if (!destroyed) loadError = true;
		} finally {
			if (!destroyed) isLoading = false;
		}

		if (destroyed) return;
		await tick();
		if (hasMore && !loadError && isGalleryEndVisible()) {
			void loadMore();
		}
	}

	onMount(() => {
		if (!loadMoreElement || !('IntersectionObserver' in window)) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) void loadMore();
			},
			{ rootMargin: '0px' }
		);
		observer.observe(loadMoreElement);

		return () => observer.disconnect();
	});

	onDestroy(() => {
		destroyed = true;
		throttledLoad.cancel();
		if (typeof document !== 'undefined') {
			document.body.classList.remove('has-custom-cursor');
		}
	});

	function handleImageClick(index: number) {
		selectedIndex = index;
		hideControlCursor();
	}

	function closeLightbox() {
		selectedIndex = null;
		hideControlCursor();
	}

	function navigateLightbox(direction: -1 | 1) {
		if (selectedIndex === null || media.length < 2) return;
		selectedIndex = (selectedIndex + direction + media.length) % media.length;
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') navigateLightbox(-1);
		if (e.key === 'ArrowRight') navigateLightbox(1);
	}}
/>

<CustomCursor {cursorType} />

<div class="py-12">
	<div class="mb-12 flex items-center justify-between">
		<h1 class="text-4xl font-bold tracking-tight">Media</h1>
		<CursorLink
			href="/"
			class="text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-black"
			>Back Home</CursorLink
		>
	</div>

	<div class="columns-1 gap-8 space-y-8 md:columns-2 lg:columns-3">
		{#each media as item, index (item._id)}
			<button
				class="group relative block w-full break-inside-avoid overflow-hidden rounded-xl text-left focus:outline-none"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
				onclick={() => handleImageClick(index)}
				aria-label="View full image"
			>
				{#if item.image}
					<img
						src={urlFor(item.image).width(800).url()}
						alt={item.caption || 'Media'}
						style:aspect-ratio={photoAspectRatio(item.image)}
						loading="lazy"
						class="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
					{#if item.caption}
						<div
							class="absolute inset-0 flex items-center justify-center bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							<p class="text-center font-medium tracking-wide text-white">{item.caption}</p>
						</div>
					{/if}
				{:else}
					<div class="flex aspect-square items-center justify-center bg-gray-100 text-gray-400">
						No Image
					</div>
				{/if}
			</button>
		{/each}
	</div>

	{#if media.length === 0}
		<div class="py-20 text-center text-gray-400">No media uploaded yet.</div>
	{/if}

	<noscript>
		<nav
			aria-label="Photo pages"
			class="mt-8 flex justify-center gap-6 text-sm font-bold text-[#831843]"
		>
			{#if data.page > 1}
				<a
					href="{resolve('/media')}{data.page === 2 ? '' : `?page=${data.page - 1}`}"
					data-sveltekit-reload
					class="underline underline-offset-4">Previous photos</a
				>
			{/if}
			{#if data.hasMore}
				<a
					href="{resolve('/media')}?page={data.page + 1}"
					data-sveltekit-reload
					class="underline underline-offset-4">Next photos</a
				>
			{/if}
		</nav>
	</noscript>

	<div bind:this={loadMoreElement} class="flex min-h-24 items-center justify-center py-8">
		{#if isLoading}
			<p class="text-xs font-bold tracking-[0.18em] text-gray-400 uppercase" aria-live="polite">
				Loading more photos…
			</p>
		{:else if loadError}
			<button
				type="button"
				class="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition-colors hover:border-[#BE185D] hover:text-[#831843]"
				onclick={() => loadMore(true)}
			>
				Try again
			</button>
		{:else if hasMore}
			<button
				type="button"
				class="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition-colors hover:border-[#BE185D] hover:text-[#831843]"
				onclick={() => loadMore()}
			>
				Load more photos
			</button>
		{:else if !hasMore && media.length > 0}
			<p class="text-xs font-bold tracking-[0.18em] text-gray-300 uppercase">All photos loaded</p>
		{/if}
	</div>
</div>

<!-- Lightbox Modal -->
{#if selectedImage}
	<div
		class="fixed inset-0 z-[200] flex cursor-default items-center justify-center bg-black/95 p-4"
		transition:fade={{ duration: 300 }}
		onclick={(e) => {
			// Close if clicking the background wrapper directly
			if (e.target === e.currentTarget) closeLightbox();
		}}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && closeLightbox()}
	>
		<div
			class="relative flex max-h-screen w-auto max-w-7xl flex-col items-center justify-center"
			role="presentation"
		>
			<button
				class="fixed top-6 right-6 z-[210] rounded-full bg-black/20 p-2 text-white/70 transition-colors hover:bg-black/50 hover:text-white"
				onmouseenter={() => showControlCursor('close')}
				onmouseleave={hideControlCursor}
				onclick={closeLightbox}
				aria-label="Close"
			>
				<X size={32} />
			</button>

			{#if media.length > 1}
				<button
					class="fixed top-1/2 left-3 z-[210] -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2.5 text-white/75 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6 sm:p-3"
					onmouseenter={() => showControlCursor('previous')}
					onmouseleave={hideControlCursor}
					onclick={() => navigateLightbox(-1)}
					aria-label="Previous photo"
				>
					<ChevronLeft size={32} strokeWidth={1.75} />
				</button>

				<button
					class="fixed top-1/2 right-3 z-[210] -translate-y-1/2 rounded-full border border-white/20 bg-black/35 p-2.5 text-white/75 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6 sm:p-3"
					onmouseenter={() => showControlCursor('next')}
					onmouseleave={hideControlCursor}
					onclick={() => navigateLightbox(1)}
					aria-label="Next photo"
				>
					<ChevronRight size={32} strokeWidth={1.75} />
				</button>
			{/if}

			{#if selectedImage.image}
				<img
					src={urlFor(selectedImage.image).url()}
					alt={selectedImage.caption || 'Full screen media'}
					class="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
					transition:scale={{ duration: 300, start: 0.95 }}
				/>
			{/if}

			{#if selectedImage.caption}
				<p class="mt-6 text-center text-lg font-medium text-white/90">{selectedImage.caption}</p>
			{/if}
		</div>
	</div>
{/if}
