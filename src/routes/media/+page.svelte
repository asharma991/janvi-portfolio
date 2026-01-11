<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import { onDestroy } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { X } from 'lucide-svelte';

	let { data } = $props();

	let cursorType = $state<string | null>(null);
	let selectedImage = $state<any>(null);

	function handleMouseEnter() {
		cursorType = 'view';
		document.body.classList.add('has-custom-cursor');
	}

	function handleMouseLeave() {
		cursorType = null;
		document.body.classList.remove('has-custom-cursor');
	}

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.classList.remove('has-custom-cursor');
		}
	});

	function handleImageClick(item: any) {
		selectedImage = item;
		// Reset cursor when modal opens so the user can see the default pointer (or custom one if z-index is high enough)
		// but since we want to be able to click the close button easily, let's remove the custom cursor class
		handleMouseLeave();
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') selectedImage = null;
	}}
/>

<svelte:head>
	<title>Media | Janvi</title>
</svelte:head>

<CustomCursor {cursorType} />

<div class="py-12">
	<div class="mb-12 flex items-center justify-between">
		<h1 class="text-4xl font-bold tracking-tight">Media</h1>
		<a
			href="/"
			class="text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-black"
		>
			← Back Home
		</a>
	</div>

	<div class="columns-1 gap-8 space-y-8 md:columns-2 lg:columns-3">
		{#each data.media as item (item._id)}
			<button
				class="group relative block w-full break-inside-avoid overflow-hidden rounded-xl text-left focus:outline-none"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
				onclick={() => handleImageClick(item)}
				aria-label="View full image"
			>
				{#if item.image}
					<img
						src={urlFor(item.image).width(800).url()}
						alt={item.caption || 'Media'}
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

	{#if data.media.length === 0}
		<div class="py-20 text-center text-gray-400">No media uploaded yet.</div>
	{/if}
</div>

<!-- Lightbox Modal -->
{#if selectedImage}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 cursor-default"
		transition:fade={{ duration: 300 }}
		onclick={(e) => {
            if (e.target === e.currentTarget) selectedImage = null;
        }}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && (selectedImage = null)}
	>
		<div
			class="relative flex max-h-screen w-auto max-w-7xl flex-col items-center justify-center"
			role="presentation"
		>
			<button
				class="fixed top-6 right-6 text-white/70 transition-colors hover:text-white z-[210] p-2 bg-black/20 rounded-full hover:bg-black/50"
				onclick={() => (selectedImage = null)}
				aria-label="Close"
			>
				<X size={32} />
			</button>

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
