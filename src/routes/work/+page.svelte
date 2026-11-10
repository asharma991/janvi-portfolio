<script lang="ts">
	import { resolve } from '$app/paths';
	import CursorLink from '$lib/components/CursorLink.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	let { data } = $props();
	const filterClass =
		'rounded-full border px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors';
	const activeClass = 'border-[#BE185D] bg-[#FEC5E5] text-[#831843]';
	const inactiveClass =
		'border-black/10 bg-white/70 text-gray-600 hover:border-[#BE185D] hover:text-[#831843]';
</script>

<div class="py-12">
	<div class="mb-12 flex items-center justify-between">
		<h1 class="text-4xl font-bold tracking-tight">Work</h1>
		<CursorLink
			href="/"
			class="text-sm font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-black"
			>Back Home</CursorLink
		>
	</div>

	{#if data.workTypes.length || data.selectedType}
		<nav aria-label="Filter by work type" class="mb-8 flex flex-wrap gap-2">
			<a
				href={resolve('/work')}
				aria-current={data.selectedType === null ? 'page' : undefined}
				class={[filterClass, data.selectedType === null ? activeClass : inactiveClass]}>All work</a
			>
			{#each data.workTypes as workType (workType.value)}
				<a
					href="{resolve('/work')}?type={encodeURIComponent(workType.value)}"
					aria-current={data.selectedType === workType.value ? 'page' : undefined}
					class={[filterClass, data.selectedType === workType.value ? activeClass : inactiveClass]}
					>{workType.label}</a
				>
			{/each}
		</nav>
	{/if}

	{#if data.projects.length}
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.projects as project (project._id)}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<p class="py-8 text-sm text-gray-600">
			{data.selectedType ? 'No work matches this type.' : 'No work has been published yet.'}
		</p>
	{/if}

	<Pagination {...data.pagination} label="projects" />
</div>
