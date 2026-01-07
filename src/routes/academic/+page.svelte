<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Academic | Janvi</title>
</svelte:head>

<section class="py-12 md:py-20">
  <h1 class="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Academic Writing</h1>
  
  <div class="space-y-2">
    {#each data.works as work (work._id)}
      <div class="group py-6 border-b border-gray-100 flex flex-col md:flex-row md:items-baseline justify-between gap-2 hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-lg">
         <div class="max-w-3xl">
            <h3 class="text-xl font-bold group-hover:text-gray-700 transition-colors">
                {#if work.link && work.link !== '#'}
                    <a href={work.link} target="_blank" rel="noopener noreferrer" class="hover:underline decoration-gray-300 underline-offset-4">
                        {work.title}
                    </a>
                {:else}
                    {work.title}
                {/if}
            </h3>
            {#if work.subtitle}
                <p class="text-gray-500 mt-1 font-serif italic">{work.subtitle}</p>
            {/if}
         </div>
         <span class="text-sm font-mono text-gray-400 shrink-0 pt-2 md:pt-0">
            {new Date(work.publicationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
         </span>
      </div>
    {/each}
  </div>
</section>
