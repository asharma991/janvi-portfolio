<script lang="ts">
	import CursorLink from '$lib/components/CursorLink.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import Pagination from '$lib/components/Pagination.svelte';
  
  let { data } = $props();
</script>


<div class="py-12">
  <div class="flex justify-between items-center mb-12">
    <h1 class="text-4xl font-bold tracking-tight">Work</h1>
    <CursorLink href="/" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">Back Home</CursorLink>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.projects as project (project._id)}
       <ProjectCard {project} />
    {/each}
  </div>

  <Pagination {...data.pagination} label="projects" />
</div>
