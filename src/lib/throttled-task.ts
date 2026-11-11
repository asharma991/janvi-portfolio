/** Coalesce concurrent calls and space request starts at least `interval` ms apart. */
export function createThrottledTask(task: (signal: AbortSignal) => Promise<void>, interval = 1000) {
	let pending: Promise<void> | null = null;
	let lastStarted = -Infinity;
	let controller: AbortController | null = null;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let resume: (() => void) | undefined;
	let cancelled = false;

	function run(): Promise<void> {
		if (cancelled) return Promise.resolve();
		if (pending) return pending;

		pending = (async () => {
			const delay = Math.max(0, lastStarted + interval - Date.now());
			if (delay > 0) {
				await new Promise<void>((resolve) => {
					resume = resolve;
					timer = setTimeout(resolve, delay);
				});
				timer = undefined;
				resume = undefined;
			}
			if (cancelled) return;
			lastStarted = Date.now();
			controller = new AbortController();
			await task(controller.signal);
		})().finally(() => {
			pending = null;
			controller = null;
		});
		return pending;
	}

	function cancel() {
		cancelled = true;
		controller?.abort();
		if (timer !== undefined) clearTimeout(timer);
		resume?.();
	}

	return { run, cancel };
}
