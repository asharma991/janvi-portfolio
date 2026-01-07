<script lang="ts">
  import { urlFor } from '$lib/sanity/client';
  let { data } = $props();
</script>

<svelte:head>
  <title>Media | Janvi</title>
</svelte:head>

<div class="py-12">
  <div class="flex justify-between items-center mb-12">
    <h1 class="text-4xl font-bold tracking-tight">Media</h1>
    <a href="/" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
        ← Back Home
    </a>
  </div>
  
  <div class="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
    {#each data.media as item (item._id)}
      <div class="break-inside-avoid group relative overflow-hidden rounded-xl">
         {#if item.image}
           <img 
             src={urlFor(item.image).width(800).url()} 
             alt={item.caption || "Media"} 
             class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
           />
           {#if item.caption}
             <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                <p class="text-white text-center font-medium tracking-wide">{item.caption}</p>
             </div>
           {/if}
         {:else}
            <div class="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
            </div>
         {/if}
      </div>
    {/each}
  </div>
  
  {#if data.media.length === 0}
    <div class="text-center py-20 text-gray-400">
        No media uploaded yet.
    </div>
  {/if}
</div>
