import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Check if user has a preference or use system default
const defaultValue = browser
	? localStorage.getItem('theme') ||
		(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
	: 'light';

export const theme = writable<string>(defaultValue);

// Subscribe to changes and update localStorage/document class
if (browser) {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		if (value === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	});
}
