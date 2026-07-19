<script lang="ts">
	import { page } from '$app/stores';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<header
	class="fixed top-0 left-0 z-50 w-full bg-[#BE185D] px-4 py-6 text-white shadow-md backdrop-blur-sm transition-colors duration-300 md:px-8 dark:border-b dark:border-white/10 dark:bg-[#500724]/90"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between">
		<a
			href="/"
			class="text-4xl font-bold tracking-tight text-white uppercase transition-opacity hover:opacity-80"
		>
			Janvi
		</a>
		<ThemeToggle />
	</div>
</header>
