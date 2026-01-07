<script lang="ts">
  import type { Project } from '$lib/sanity/types';
  import { urlFor } from '$lib/sanity/client';
  import { ArrowUpRight } from 'lucide-svelte';
  
  let { project } = $props<{ project: Project }>();
</script>

<div class="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
  <!-- Image -->
  <div class="aspect-[4/3] bg-gray-100 overflow-hidden relative border-b border-gray-100">
     {#if project.mainImage}
       <img 
          src={urlFor(project.mainImage).width(600).height(450).url()} 
          alt={project.title}
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
       />
     {:else}
       <img 
          src="https://placecats.com/600/450" 
          alt="Placeholder Cat"
          class="w-full h-full object-cover grayscale opacity-50 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
       />
     {/if}
     
     <!-- Floating Link Button (visible on hover) -->
     {#if project.link}
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          class="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-50"
          aria-label="View Project"
        >
           <ArrowUpRight size={20} />
        </a>
     {/if}
  </div>
  
  <div class="p-6 flex flex-col flex-grow">
     <h3 class="text-lg font-bold mb-2 tracking-tight group-hover:text-gray-700 transition-colors">{project.title}</h3>
     <p class="text-gray-600 text-sm line-clamp-3 leading-relaxed flex-grow">
        {project.description}
     </p>
  </div>
</div>
