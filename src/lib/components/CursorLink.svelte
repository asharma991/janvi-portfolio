<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onDestroy } from 'svelte';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import CustomCursor from './CustomCursor.svelte';

	let {
		href,
		direction = 'previous',
		class: className = '',
		rel,
		children
	}: {
		href: string;
		direction?: 'previous' | 'next';
		class?: string;
		rel?: string;
		children: Snippet;
	} = $props();

	let cursorType = $state<string | null>(null);

	function showCursor() {
		cursorType = direction;
		document.body.classList.add('has-custom-cursor');
	}

	function hideCursor() {
		if (!cursorType) return;
		cursorType = null;
		document.body.classList.remove('has-custom-cursor');
	}

	onDestroy(hideCursor);
</script>

<CustomCursor {cursorType} />

<a
	{href}
	{rel}
	class={`inline-flex items-center justify-center gap-2 ${className}`}
	onmouseenter={showCursor}
	onmouseleave={hideCursor}
	onclick={hideCursor}
>
	{#if direction === 'previous'}
		<ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" class="shrink-0" />
	{/if}
	{@render children()}
	{#if direction === 'next'}
		<ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" class="shrink-0" />
	{/if}
</a>
