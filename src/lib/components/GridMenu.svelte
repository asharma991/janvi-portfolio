<script lang="ts">
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import { resolve } from '$app/paths';
	import { onDestroy } from 'svelte';

	let cursorType = $state<string | null>(null);

	const menuItems = [
		{ id: 'about', label: 'About', route: '/about' },
		{ id: 'work', label: 'Work', route: '/work' },
		{ id: 'blog', label: 'Blog', route: '/blog' },
		{ id: 'resume', label: 'Resume', route: '/resume' },
		{ id: 'media', label: 'Media', route: '/media' },
		{ id: 'music', label: 'Music', route: '/music' },
		{ id: 'food', label: 'Food', route: '/food' },
		{ id: 'books', label: 'Books', route: '/books' }
	] as const;

	function handleMouseEnter(id: string) {
		cursorType = id;
		document.body.classList.add('has-custom-cursor');
	}

	function handleMouseLeave() {
		cursorType = null;
		document.body.classList.remove('has-custom-cursor');
	}

	// Ensure cursor is reset when component is destroyed (e.g., navigating away)
	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.body.classList.remove('has-custom-cursor');
		}
	});
</script>

<CustomCursor {cursorType} />

<div class="flex h-[75vh] w-full items-center justify-center p-4">
	<div
		class="grid h-full w-full max-w-7xl grid-cols-1 grid-rows-8 border border-black/10 bg-white/50 shadow-sm backdrop-blur-sm transition-colors duration-300 md:grid-cols-4 md:grid-rows-2"
	>
		{#each menuItems as item (item.id)}
			<a
				href={resolve(item.route)}
				class="group relative -mt-px -ml-px flex items-center justify-center overflow-hidden border border-black/10 transition-all duration-300 hover:bg-[#FEC5E5]"
				onmouseenter={() => handleMouseEnter(item.id)}
				onmouseleave={handleMouseLeave}
			>
				<span
					class="font-mono text-2xl tracking-widest lowercase transition-all duration-300 group-hover:scale-110 group-hover:font-bold group-hover:text-[#831843] md:text-3xl"
				>
					{item.label}
				</span>
			</a>
		{/each}
	</div>
</div>
