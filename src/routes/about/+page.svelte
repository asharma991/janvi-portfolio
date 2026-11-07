<script lang="ts">
	import CursorLink from '$lib/components/CursorLink.svelte';
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity/client';

	let { data } = $props();
</script>

<div class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
	<h1 class="mb-8 text-4xl font-bold tracking-tight">About Janvi</h1>
	{#if data.about.image}
		<img
			src={urlFor(data.about.image).width(300).height(300).url()}
			alt="Janvi"
			class="mb-8 h-32 w-32 rounded-full object-cover grayscale transition-all duration-500 hover:grayscale-0 md:h-48 md:w-48"
		/>
	{/if}

	<div class="prose prose-lg prose-gray">
		<PortableText value={data.about.bio} />
	</div>

	<div class="mt-12">
		<CursorLink
			href="/"
			class="text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-black"
			>Back Home</CursorLink
		>
	</div>
</div>
