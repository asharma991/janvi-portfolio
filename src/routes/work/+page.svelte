<script lang="ts">
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  
  let { data } = $props();
</script>

<svelte:head>
  <title>Work | Janvi</title>
</svelte:head>

<div class="py-12">
  <div class="flex justify-between items-center mb-12">
    <h1 class="text-4xl font-bold tracking-tight">Work</h1>
    <a href="/" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
        ← Back Home
    </a>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each data.projects as project (project._id)}
       <ProjectCard {project} />
    {/each}
  </div>
</div>
