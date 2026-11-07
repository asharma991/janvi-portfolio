<script lang="ts">
	import { resolve } from '$app/paths';
	import GridMenu from '$lib/components/GridMenu.svelte';
</script>

<section class="mx-auto w-full max-w-7xl px-4 pt-6 text-center">
	<h1 class="text-3xl font-bold tracking-tight text-[#831843] md:text-4xl">Hello, I’m Janvi.</h1>
	<p class="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
		I’m interested in strategy, marketing and operations. This is my little corner of the internet:
		professional projects, academic research, personal essays, and the books, music and places I
		love.
	</p>
	<a
		href={resolve('/academic')}
		class="mt-4 inline-block text-sm font-bold text-[#BE185D] underline underline-offset-4"
		>Explore my academic writing</a
	>
</section>
<GridMenu />
