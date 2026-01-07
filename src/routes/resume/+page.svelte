<script lang="ts">
  import { FileText } from 'lucide-svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>Resume | Janvi</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-8">
  <h1 class="text-4xl font-bold tracking-tight">Resume</h1>
  
  {#if data.resume?.file?.asset?.url}
    <div class="p-8 border border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center gap-6">
        <FileText size={64} class="text-gray-400" />
        <p class="text-gray-600 max-w-sm">
            Download the latest version of my resume.
        </p>
        <a 
          href={data.resume.file.asset.url} 
          target="_blank" 
          rel="noopener noreferrer"
          class="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
        >
          Download PDF
        </a>
    </div>
  {:else}
    <div class="p-8 border border-gray-200 rounded-xl bg-gray-50">
        <p class="text-gray-500">Resume not uploaded yet.</p>
    </div>
  {/if}
  
  <div class="mt-8">
    <a href="/" class="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
        ← Back Home
    </a>
  </div>
</div>
