<script lang="ts">
	import { resolve } from '$app/paths';
	import { urlFor } from '$lib/sanity/client';
	import type { BookItem } from '$lib/sanity/types';

	let { data }: { data: { books: BookItem[] } } = $props();

	function formatStatus(status?: BookItem['status']) {
		if (!status) return 'Added';
		return status
			.split('-')
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join(' ');
	}
</script>

<svelte:head>
	<title>Book | Janvi</title>
</svelte:head>

<div class="py-12">
	<div class="mb-12 flex items-center justify-between gap-4">
		<div>
			<h1 class="text-4xl font-bold tracking-tight">Book</h1>
			<p class="mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-[#FBCFE8]">
				A growing shelf of reads, re-reads, and current favorites.
			</p>
		</div>

		<a
			href={resolve('/')}
			class="shrink-0 text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-black dark:hover:text-white"
		>
			← Back Home
		</a>
	</div>

	{#if data.books.length > 0}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
			{#each data.books as book (book._id)}
				<article
					class="rounded-3xl border border-black/10 bg-white/60 p-5 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-white/10 dark:bg-[#500724]/30"
				>
					<div class="flex gap-4">
						<div class="w-24 shrink-0 overflow-hidden rounded-2xl bg-[#FFF8FB] dark:bg-[#2B0A19]">
							{#if book.coverImage}
								<img
									src={urlFor(book.coverImage).width(240).height(360).url()}
									alt={book.title}
									class="h-full w-full object-cover"
								/>
							{:else}
								<div
									class="flex h-32 items-center justify-center text-xs tracking-[0.2em] text-gray-400 uppercase dark:text-[#F9A8D4]"
								>
									No Cover
								</div>
							{/if}
						</div>

						<div class="min-w-0 flex-1">
							<div class="flex flex-wrap items-start justify-between gap-3">
								<div>
									<h2 class="text-xl font-bold tracking-tight">{book.title}</h2>
									{#if book.author}
										<p class="mt-1 text-sm text-gray-600 dark:text-[#FBCFE8]">
											{book.author}
										</p>
									{/if}
								</div>

								<span
									class="rounded-full border border-[#FEC5E5] bg-[#FFF0F7] px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-[#831843] uppercase dark:border-[#F472B6] dark:bg-[#831843] dark:text-white"
								>
									{formatStatus(book.status)}
								</span>
							</div>

							{#if book.genre}
								<p
									class="mt-3 text-xs tracking-[0.18em] text-gray-500 uppercase dark:text-[#F9A8D4]"
								>
									{book.genre}
								</p>
							{/if}

							{#if book.favoriteQuote}
								<p class="mt-4 text-sm leading-6 text-[#831843] italic dark:text-[#F9A8D4]">
									"{book.favoriteQuote}"
								</p>
							{/if}

							{#if book.notes}
								<p class="mt-4 text-sm leading-6 text-gray-700 dark:text-[#FCE7F3]">
									{book.notes}
								</p>
							{/if}

							{#if book.link}
								<a
									href={book.link}
									target="_blank"
									rel="noopener noreferrer"
									class="mt-4 inline-block text-xs font-bold tracking-[0.18em] text-[#BE185D] uppercase transition-opacity hover:opacity-70 dark:text-[#F9A8D4]"
								>
									Open Link
								</a>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div
			class="rounded-3xl border border-dashed border-black/10 px-6 py-16 text-center text-gray-500 dark:border-white/10 dark:text-[#F9A8D4]"
		>
			Add `Book` documents in Sanity to populate this page.
		</div>
	{/if}
</div>
