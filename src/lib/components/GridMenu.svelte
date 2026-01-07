<script lang="ts">
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import { onDestroy } from 'svelte';

	let cursorType = $state<string | null>(null);

	const menuItems = [
		{ id: 'about', label: 'About', href: '/about' },
		{ id: 'work', label: 'Work', href: '/work' },
		{ id: 'blog', label: 'Blog', href: '/blog' },
		{ id: 'resume', label: 'Resume', href: '/resume' },
		{ id: 'media', label: 'Media', href: '/media' },
		{ id: 'music', label: 'Music', href: '/music' }
	];

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
		class="grid h-full w-full max-w-7xl grid-cols-1 grid-rows-6 border border-black/10 bg-white/50 shadow-sm backdrop-blur-sm md:grid-cols-3 md:grid-rows-2"
	>
		{#each menuItems as item}
			<a
				href={item.href}
				class="group relative -mt-[1px] -ml-[1px] flex items-center justify-center overflow-hidden border border-black/10 transition-all duration-300 hover:bg-[#FEC5E5]"
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
