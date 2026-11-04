<script lang="ts">
	import CursorLink from '$lib/components/CursorLink.svelte';
	import { urlFor } from '$lib/sanity/client';
	import Pagination from '$lib/components/Pagination.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>Music | Janvi</title>
</svelte:head>

<div class="py-12">
	<div class="mb-12 flex items-center justify-between">
		<h1 class="text-4xl font-bold tracking-tight">Music</h1>
		<CursorLink
			href="/"
			class="text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-black"
			>Back Home</CursorLink
		>
	</div>

	<div class="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
		<!-- Playlists stack independently alongside the favorites grid. -->
		<section id="playlists" class="min-w-0 scroll-mt-32 space-y-6" aria-label="Spotify playlists">
			{#each data.playlists as playlist (playlist._key)}
				<div class="h-[400px] overflow-hidden rounded-xl bg-gray-50">
					<iframe
						class="block h-full w-full rounded-xl border-0"
						src={playlist.embedUrl}
						width="100%"
						height="400"
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						allowfullscreen
						loading="lazy"
						title={playlist.title}
					></iframe>
				</div>
			{:else}
				<div
					class="flex h-[400px] items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-8 text-center text-gray-400"
				>
					<p>No playlists added yet.</p>
				</div>
			{/each}
		</section>

		<!-- Song/Album Grid -->
		<div class="grid grid-cols-2 gap-4">
			{#each data.music as item (item._id)}
				<a
					href={item.link || '#'}
					target="_blank"
					rel="noopener noreferrer"
					class="group relative block aspect-square overflow-hidden rounded-lg bg-gray-100"
				>
					{#if item.coverImage}
						<img
							src={urlFor(item.coverImage).width(300).height(300).url()}
							alt={item.title}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					{:else}
						<div class="flex h-full w-full items-center justify-center text-2xl">🎵</div>
					{/if}

					<div
						class="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-2 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					>
						<p class="text-sm font-bold text-white">{item.title}</p>
						{#if item.artist}
							<p class="mt-1 text-xs text-gray-200">{item.artist}</p>
						{/if}
					</div>
				</a>
			{/each}

			{#if data.music.length === 0}
				<div
					class="col-span-2 rounded-lg border border-dashed border-gray-200 py-10 text-center text-gray-400"
				>
					No favorites added yet.
				</div>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-1 items-start gap-x-12 md:grid-cols-2">
		<div class="min-w-0">
			<Pagination
				{...data.playlistPagination}
				label="playlists"
				pageParam="playlistPage"
				anchor="playlists"
			/>
		</div>
		<div class="min-w-0">
			<Pagination {...data.pagination} label="music" />
		</div>
	</div>
</div>
