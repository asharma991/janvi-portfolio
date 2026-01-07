<script lang="ts">
  import { urlFor } from '$lib/sanity/client';
  let { data } = $props();
</script>

<svelte:head>
  <title>Music | Janvi</title>
</svelte:head>

<div class="py-12">
  <div class="flex justify-between items-center mb-12">
    <h1 class="text-4xl font-bold tracking-tight">Music</h1>
    <a href="/" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
        ← Back Home
    </a>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
    <!-- Spotify Embed -->
    <div class="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 aspect-video md:aspect-auto md:h-[400px]">
        {#if data.embedUrl}
            <iframe 
                style="border-radius:12px" 
                src={data.embedUrl} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Embed"
            ></iframe>
        {:else}
            <div class="w-full h-full flex items-center justify-center text-gray-400 p-8 text-center">
                <p>Add a Spotify Embed URL in Sanity Settings to see the player here.</p>
            </div>
        {/if}
    </div>
    
    <!-- Song/Album Grid -->
    <div class="grid grid-cols-2 gap-4">
        {#each data.music as item (item._id)}
            <a 
              href={item.link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              class="group block relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
                {#if item.coverImage}
                    <img 
                        src={urlFor(item.coverImage).width(300).height(300).url()} 
                        alt={item.title}
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                {:else}
                    <div class="w-full h-full flex items-center justify-center text-2xl">🎵</div>
                {/if}
                
                <div class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-center">
                    <p class="text-white font-bold text-sm">{item.title}</p>
                    {#if item.artist}
                        <p class="text-gray-200 text-xs mt-1">{item.artist}</p>
                    {/if}
                </div>
            </a>
        {/each}
        
        {#if data.music.length === 0}
            <div class="col-span-2 text-center py-10 text-gray-400 border border-dashed border-gray-200 rounded-lg">
                No favorites added yet.
            </div>
        {/if}
    </div>
  </div>
</div>
