<script lang="ts">
	import { Linkedin, Twitter, Mail, Newspaper, Link } from 'lucide-svelte';

	let { socials } = $props<{ socials?: { platform: string; url: string }[] }>();

	function getIcon(platform: string) {
		const p = platform.toLowerCase();
		if (p.includes('linkedin')) return Linkedin;
		if (p.includes('twitter') || p.includes('x')) return Twitter;
		if (p.includes('substack')) return Newspaper;
		if (p.includes('mail') || p.includes('email')) return Mail;
		return Link;
	}
</script>

<footer
	class="mt-auto w-full bg-[#BE185D] px-4 py-12 text-white transition-colors duration-300 md:px-8 dark:border-t dark:border-white/10 dark:bg-[#500724]"
>
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
		<!-- Connect Section -->
		<div>
			<h3 class="mb-4 text-sm font-bold tracking-wider text-white uppercase">Connect</h3>
			<div class="flex gap-4">
				{#if socials && socials.length > 0}
					{#each socials as social}
						{@const Icon = getIcon(social.platform)}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-full border border-white/20 p-2 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#831843] dark:hover:bg-[#831843] dark:hover:text-[#FCE7F3]"
							aria-label={social.platform}
						>
							<Icon size={20} />
						</a>
					{/each}
				{:else}
					<!-- Fallback if no socials configured -->
					<p class="text-sm text-white/60 italic">Add social links in Sanity Site Settings.</p>
				{/if}
			</div>
		</div>

		<!-- Copyright / Extra -->
		<div class="flex flex-col justify-end md:text-right">
			<!-- <p class="text-sm text-white/90">Based in [City, Country]</p> -->
			<p class="mt-4 text-xs text-white/70">
				&copy; {new Date().getFullYear()} Janvi. All rights reserved.
			</p>
			<p class="mt-2 text-xs text-white/70">
				made with ❤️ by
				<a
					href="https://github.com/asharma991"
					target="_blank"
					rel="noopener noreferrer"
					class="underline hover:text-white"
				>
					asharma991
				</a>
			</p>
		</div>
	</div>
</footer>
