<script lang="ts">
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
        <p class="mt-4 max-w-3xl text-sm leading-7 text-gray-600 dark:text-[#FBCFE8]">
          {data.foodGuide.intro}
        </p>
      {/if}
    </div>

    <a
      href="/"
      class="shrink-0 text-sm font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-black dark:hover:text-white"
    >
      ← Back Home
    </a>
  </div>

  {#if cities.length > 0}
    <div class="mb-10 flex flex-wrap gap-3">
      {#each cities as city, index (city.name)}
        <button
          class={`rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
            selectedCityIndex === index
              ? 'border-[#BE185D] bg-[#FEC5E5] text-[#831843] dark:border-[#F472B6] dark:bg-[#831843] dark:text-white'
              : 'border-black/10 bg-white/70 text-gray-700 hover:border-[#BE185D] hover:text-[#831843] dark:border-white/10 dark:bg-[#500724]/40 dark:text-[#FCE7F3] dark:hover:border-[#F472B6]'
          }`}
          onclick={() => selectCity(index)}
          type="button"
        >
          {city.name}
        </button>
      {/each}
    </div>

    {#if selectedCity}
      <section class="rounded-3xl border border-black/10 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#500724]/30 md:p-8">
        <div class="mb-10 flex flex-col gap-3">
          <div class="flex flex-wrap items-baseline gap-3">
            <h2 class="text-3xl font-bold tracking-tight">{selectedCity.name}</h2>
            {#if selectedCity.country}
              <span class="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-[#F9A8D4]">
                {selectedCity.country}
              </span>
            {/if}
          </div>

          {#if selectedCity.description}
            <p class="max-w-3xl text-sm leading-7 text-gray-600 dark:text-[#FBCFE8]">
              {selectedCity.description}
            </p>
          {/if}
        </div>

        {#if selectedCity.sections && selectedCity.sections.length > 0}
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {#each selectedCity.sections as section (`${selectedCity.name}-${section.category}-${section.title ?? ''}`)}
              <article class="rounded-2xl border border-black/10 bg-[#FFF8FB] p-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#2B0A19]">
                <div class="mb-4">
                  <h3 class="text-xl font-bold tracking-tight text-[#831843] dark:text-[#F9A8D4]">
                    {formatCategory(section.title, section.category)}
                  </h3>

                  {#if section.description}
                    <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-[#FBCFE8]">
                      {section.description}
                    </p>
                  {/if}
                </div>

                {#if section.items && section.items.length > 0}
                  <div class="space-y-4">
                    {#each section.items as item (`${item.name}-${item.area ?? ''}`)}
                      <div class="rounded-xl border border-black/10 bg-white/70 p-4 dark:border-white/10 dark:bg-[#500724]/35">
                        <div class="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h4 class="text-lg font-bold">{item.name}</h4>
                            {#if item.area}
                              <p class="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-[#F9A8D4]">
                                {item.area}
                              </p>
                            {/if}
                          </div>

                          {#if item.link}
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              class="text-xs font-bold uppercase tracking-[0.18em] text-[#BE185D] transition-opacity hover:opacity-70 dark:text-[#F9A8D4]"
                            >
                              Open
                            </a>
                          {/if}
                        </div>

                        {#if item.whatToOrder}
                          <p class="mt-3 text-sm leading-6 text-gray-700 dark:text-[#FCE7F3]">
                            <span class="font-bold text-[#831843] dark:text-[#F9A8D4]">Order:</span>
                            {item.whatToOrder}
                          </p>
                        {/if}

                        {#if item.notes}
                          <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-[#FBCFE8]">
                            {item.notes}
                          </p>
                        {/if}
                      </div>
                    {/each}
                  </div>
                {:else}
                  <p class="text-sm text-gray-500 dark:text-[#F9A8D4]">
                    Add places to this section in Sanity.
                  </p>
                {/if}
              </article>
            {/each}
          </div>
        {:else}
          <div class="rounded-2xl border border-dashed border-black/10 px-6 py-10 text-sm text-gray-500 dark:border-white/10 dark:text-[#F9A8D4]">
            Add sections like breakfast, brunch, lunch, dinner, coffee, or drinks for this city in Sanity.
          </div>
        {/if}
      </section>
    {/if}
  {:else}
    <div class="rounded-3xl border border-dashed border-black/10 px-6 py-16 text-center text-gray-500 dark:border-white/10 dark:text-[#F9A8D4]">
      Add a `Food Guide` document in Sanity, then create cities and category sections to populate this page.
    </div>
  {/if}
</div>
