<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';

	function toggleTheme() {
		$theme = $theme === 'dark' ? 'light' : 'dark';
	}
</script>

<button
	onclick={toggleTheme}
	class="flex items-center justify-center rounded-full border border-black/10 bg-white/50 p-2 text-gray-800 backdrop-blur-sm transition-all hover:bg-[#FEC5E5] hover:text-[#831843] dark:border-white/10 dark:bg-black/50 dark:text-white dark:hover:bg-[#831843] dark:hover:text-white"
	aria-label="Toggle theme"
>
	{#if $theme === 'dark'}
		<Sun size={20} />
	{:else}
		<Moon size={20} />
	{/if}
</button>
