<script lang="ts">
	import { resolve } from '$app/paths';
	import type { FoodGuide, FoodGuideCity } from '$lib/sanity/types';

	let { data }: { data: { foodGuide?: FoodGuide } } = $props();

	let selectedCityIndex = $state(0);
	const cities = $derived((data.foodGuide?.cities ?? []) as FoodGuideCity[]);
	const selectedCity = $derived(cities[selectedCityIndex]);

	function formatCategory(title?: string, category?: string) {
		if (title) return title;
		if (!category) return 'Recommendations';
		return category
			.split('-')
			.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
			.join(' ');
	}

	function selectCity(index: number) {
		selectedCityIndex = index;
	}
</script>

<svelte:head>
	<title>Food | Janvi</title>
</svelte:head>

<div class="py-12">
	<div class="mb-12 flex items-center justify-between gap-4">
		<div>
			<h1 class="text-4xl font-bold tracking-tight">{data.foodGuide?.title || 'Food'}</h1>
			{#if data.foodGuide?.intro}
				<p class="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
					{data.foodGuide.intro}
				</p>
			{/if}
		</div>

		<a
			href={resolve('/')}
			class="shrink-0 text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-black"
		>
			← Back Home
		</a>
	</div>

	{#if cities.length > 0}
		<div class="mb-10 flex flex-wrap gap-3">
			{#each cities as city, index (city.name)}
				<button
					class={`rounded-full border px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
						selectedCityIndex === index
							? 'border-[#BE185D] bg-[#FEC5E5] text-[#831843]'
							: 'border-black/10 bg-white/70 text-gray-700 hover:border-[#BE185D] hover:text-[#831843]'
					}`}
					onclick={() => selectCity(index)}
					type="button"
				>
					{city.name}
				</button>
			{/each}
		</div>

		{#if selectedCity}
			<section
				class="rounded-3xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur-sm md:p-8"
			>
				<div class="mb-10 flex flex-col gap-3">
					<div class="flex flex-wrap items-baseline gap-3">
						<h2 class="text-3xl font-bold tracking-tight">{selectedCity.name}</h2>
						{#if selectedCity.country}
							<span class="text-sm tracking-[0.2em] text-gray-500 uppercase">
								{selectedCity.country}
							</span>
						{/if}
					</div>

					{#if selectedCity.description}
						<p class="max-w-3xl text-sm leading-7 text-gray-600">
							{selectedCity.description}
						</p>
					{/if}
				</div>

				{#if selectedCity.sections && selectedCity.sections.length > 0}
					<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{#each selectedCity.sections as section (`${selectedCity.name}-${section.category}-${section.title ?? ''}`)}
							<article
								class="rounded-2xl border border-black/10 bg-[#FFF8FB] p-5 transition-colors duration-300"
							>
								<div class="mb-4">
									<h3 class="text-xl font-bold tracking-tight text-[#831843]">
										{formatCategory(section.title, section.category)}
									</h3>

									{#if section.description}
										<p class="mt-2 text-sm leading-6 text-gray-600">
											{section.description}
										</p>
									{/if}
								</div>

								{#if section.items && section.items.length > 0}
									<div class="space-y-4">
										{#each section.items as item (`${item.name}-${item.area ?? ''}`)}
											<div class="rounded-xl border border-black/10 bg-white/70 p-4">
												<div class="flex flex-wrap items-start justify-between gap-3">
													<div>
														<h4 class="text-lg font-bold">{item.name}</h4>
														{#if item.area}
															<p class="mt-1 text-xs tracking-[0.18em] text-gray-500 uppercase">
																{item.area}
															</p>
														{/if}
													</div>

													{#if item.link}
														<button
															type="button"
															class="text-xs font-bold tracking-[0.18em] text-[#BE185D] uppercase transition-opacity hover:opacity-70"
															onclick={() =>
																window.open(item.link, '_blank', 'noopener,noreferrer')}
														>
															Open
														</button>
													{/if}
												</div>

												{#if item.whatToOrder}
													<p class="mt-3 text-sm leading-6 text-gray-700">
														<span class="font-bold text-[#831843]">Order:</span>
														{item.whatToOrder}
													</p>
												{/if}

												{#if item.notes}
													<p class="mt-2 text-sm leading-6 text-gray-600">
														{item.notes}
													</p>
												{/if}
											</div>
										{/each}
									</div>
								{:else}
									<p class="text-sm text-gray-500">Add places to this section in Sanity.</p>
								{/if}
							</article>
						{/each}
					</div>
				{:else}
					<div
						class="rounded-2xl border border-dashed border-black/10 px-6 py-10 text-sm text-gray-500"
					>
						Add sections like breakfast, brunch, lunch, dinner, coffee, or drinks for this city in
						Sanity.
					</div>
				{/if}
			</section>
		{/if}
	{:else}
		<div
			class="rounded-3xl border border-dashed border-black/10 px-6 py-16 text-center text-gray-500"
		>
			Add a `Food Guide` document in Sanity, then create cities and category sections to populate
			this page.
		</div>
	{/if}
</div>
