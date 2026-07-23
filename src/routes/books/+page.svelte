<script lang="ts">
	import { resolve } from '$app/paths';
	import { urlFor } from '$lib/sanity/client';
	import type { BooksItem } from '$lib/sanity/types';

	let { data }: { data: { books: BooksItem[] } } = $props();
	let selectedAuthor = $state('all');
	let selectedGenre = $state('all');

	const books = $derived((data.books ?? []) as BooksItem[]);
	const authorOptions = $derived(
		[
			...new Set(
				books
					.map((entry) => entry.author?.trim())
					.filter((value): value is string => Boolean(value))
			)
		].sort((a, b) => a.localeCompare(b))
	);
	const genreOptions = $derived(
		[
			...new Set(
				books.map((entry) => entry.genre?.trim()).filter((value): value is string => Boolean(value))
			)
		].sort((a, b) => a.localeCompare(b))
	);
	const visibleBooks = $derived(
		books
			.filter((entry) => selectedAuthor === 'all' || entry.author?.trim() === selectedAuthor)
			.filter((entry) => selectedGenre === 'all' || entry.genre?.trim() === selectedGenre)
			.toSorted((a, b) => {
				if (a.status === 'currently-reading' && b.status !== 'currently-reading') return -1;
				if (a.status !== 'currently-reading' && b.status === 'currently-reading') return 1;
				return 0;
			})
	);

	function formatStatus(status?: BooksItem['status']) {
		if (!status) return 'Added';
		return status
			.split('-')
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join(' ');
	}
</script>

<svelte:head>
	<title>Books | Janvi</title>
</svelte:head>

<div class="py-12">
	<div class="mb-12 flex items-center justify-between gap-4">
		<div>
			<h1 class="text-4xl font-bold tracking-tight">Books</h1>
			<p class="mt-4 max-w-2xl text-sm leading-7 text-gray-600">
				A growing shelf of reads, re-reads, and current favorites.
			</p>
		</div>

		<a
			href={resolve('/')}
			class="shrink-0 text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-black"
		>
			← Back Home
		</a>
	</div>

	{#if books.length > 0}
		<div
			class="mb-8 flex flex-col gap-4 rounded-3xl border border-black/10 bg-white/50 p-4 backdrop-blur-sm md:flex-row md:items-end md:justify-between"
		>
			<div>
				<p class="text-xs font-bold tracking-[0.2em] text-[#BE185D] uppercase">
					Filters
				</p>
				<p class="mt-2 text-sm text-gray-600">
					Showing {visibleBooks.length} of {books.length} books.
				</p>
			</div>

			<div class="flex flex-col gap-3 sm:flex-row">
				<label
					class="flex flex-col gap-2 text-xs font-bold tracking-[0.18em] text-gray-500 uppercase"
				>
					Author
					<select
						bind:value={selectedAuthor}
						class="min-w-44 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium tracking-normal text-gray-700 focus:border-[#F9A8D4] focus:ring-[#F9A8D4]"
					>
						<option value="all">All Authors</option>
						{#each authorOptions as author (author)}
							<option value={author}>{author}</option>
						{/each}
					</select>
				</label>

				<label
					class="flex flex-col gap-2 text-xs font-bold tracking-[0.18em] text-gray-500 uppercase"
				>
					Genre
					<select
						bind:value={selectedGenre}
						class="min-w-44 rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-medium tracking-normal text-gray-700 focus:border-[#F9A8D4] focus:ring-[#F9A8D4]"
					>
						<option value="all">All Genres</option>
						{#each genreOptions as genre (genre)}
							<option value={genre}>{genre}</option>
						{/each}
					</select>
				</label>
			</div>
		</div>

		{#if visibleBooks.length > 0}
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
				{#each visibleBooks as entry (entry._id)}
					<article
						class="rounded-3xl border border-black/10 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-colors duration-300"
					>
						<div class="flex items-start justify-between gap-4">
							<div class="w-24 shrink-0 overflow-hidden rounded-2xl bg-[#FFF8FB]">
								{#if entry.coverImage}
									<img
										src={urlFor(entry.coverImage).width(240).height(360).url()}
										alt={entry.title}
										class="h-full w-full object-cover"
									/>
								{:else}
									<div
										class="flex h-32 items-center justify-center text-xs tracking-[0.2em] text-gray-400 uppercase"
									>
										No Cover
									</div>
								{/if}
							</div>

							<span
								class="shrink-0 rounded-full border border-[#FEC5E5] bg-[#FFF0F7] px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-[#831843] uppercase"
							>
								{formatStatus(entry.status)}
							</span>
						</div>

						<div class="mt-5 min-w-0">
							<div>
								<h2 class="text-xl font-bold tracking-tight">{entry.title}</h2>
								{#if entry.author}
									<p class="mt-1 text-sm text-gray-600">
										{entry.author}
									</p>
								{/if}
							</div>

							{#if entry.genre}
								<p
									class="mt-3 text-xs tracking-[0.18em] text-gray-500 uppercase"
								>
									{entry.genre}
								</p>
							{/if}

							{#if entry.favoriteQuote}
								<p class="mt-4 text-sm leading-6 text-[#831843] italic">
									"{entry.favoriteQuote}"
								</p>
							{/if}

							{#if entry.notes}
								<p class="mt-4 text-sm leading-6 text-gray-700">
									{entry.notes}
								</p>
							{/if}

							{#if entry.link}
								<button
									type="button"
									class="mt-4 inline-block text-xs font-bold tracking-[0.18em] text-[#BE185D] uppercase transition-opacity hover:opacity-70"
									onclick={() => window.open(entry.link, '_blank', 'noopener,noreferrer')}
								>
									Open Link
								</button>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		{:else}
			<div
				class="rounded-3xl border border-dashed border-black/10 px-6 py-16 text-center text-gray-500"
			>
				No books match the current author and genre filters.
			</div>
		{/if}
	{:else}
		<div
			class="rounded-3xl border border-dashed border-black/10 px-6 py-16 text-center text-gray-500"
		>
			Add `Books` documents in Sanity to populate this page.
		</div>
	{/if}
</div>
