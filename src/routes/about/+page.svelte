<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import { urlFor } from '$lib/sanity/client';
  
  let { data } = $props();
</script>

<svelte:head>
  <title>About | Janvi</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center">
  {#if data.about.image}
    <img 
      src={urlFor(data.about.image).width(300).height(300).url()} 
      alt="Janvi" 
      class="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover mb-8 grayscale hover:grayscale-0 transition-all duration-500"
    />
  {/if}
  
  <div class="prose prose-lg prose-gray">
     <PortableText value={data.about.bio} />
  </div>
  
  <div class="mt-12">
    <a href="/" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
        ← Back Home
    </a>
  </div>
</div>
