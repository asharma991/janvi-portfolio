<script lang="ts">
	import {
		Cat,
		HelpCircle,
		Laptop,
		NotebookPen,
		GraduationCap,
		Camera,
		Headphones
	} from 'lucide-svelte';

	let { cursorType } = $props<{ cursorType: string | null }>();

	let mouseX = $state(0);
	let mouseY = $state(0);

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}
</script>

<svelte:window onmousemove={handleMouseMove} />

{#if cursorType}
	<div
		class="pointer-events-none fixed z-[100] flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-1 text-[#831843]"
		style="left: {mouseX}px; top: {mouseY}px;"
	>
		<!-- The Cat is always there -->
		<Cat size={32} strokeWidth={2.5} />

		<!-- The Secondary Icon -->
		<div
			class="absolute -top-4 -right-4 rounded-full border border-[#831843] bg-white p-1 text-[#831843] shadow-sm"
		>
			{#if cursorType === 'about'}
				<HelpCircle size={16} strokeWidth={2.5} />
			{/if}
			{#if cursorType === 'work'}
				<Laptop size={16} strokeWidth={2.5} />
			{/if}
			{#if cursorType === 'blog'}
				<NotebookPen size={16} strokeWidth={2.5} />
			{/if}
			{#if cursorType === 'resume'}
				<GraduationCap size={16} strokeWidth={2.5} />
			{/if}
			{#if cursorType === 'media'}
				<Camera size={16} strokeWidth={2.5} />
			{/if}
			{#if cursorType === 'music'}
				<Headphones size={16} strokeWidth={2.5} />
			{/if}
		</div>
	</div>
{/if}

<style>
	/* Force hide cursor everywhere when class is active */
	:global(body.has-custom-cursor),
	:global(body.has-custom-cursor *) {
		cursor: none !important;
	}
</style>
