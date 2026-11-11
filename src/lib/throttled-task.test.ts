import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createThrottledTask } from './throttled-task.ts';

test('concurrent triggers share one in-flight request', async () => {
	let calls = 0;
	let finish!: () => void;
	const loader = createThrottledTask(async () => {
		calls++;
		await new Promise<void>((resolve) => {
			finish = resolve;
		});
	});
	const first = loader.run();
	assert.equal(loader.run(), first);
	assert.equal(loader.run(), first);
	assert.equal(calls, 1);
	finish();
	await first;
	loader.cancel();
});

test('subsequent request starts are separated by at least one second', async (t) => {
	t.mock.timers.enable({ apis: ['Date', 'setTimeout'], now: 10000 });
	const starts: number[] = [];
	const loader = createThrottledTask(async () => {
		starts.push(Date.now());
	});
	await loader.run();
	const second = loader.run();
	assert.equal(loader.run(), second);
	t.mock.timers.tick(999);
	await Promise.resolve();
	assert.deepEqual(starts, [10000]);
	t.mock.timers.tick(1);
	await second;
	assert.deepEqual(starts, [10000, 11000]);
	loader.cancel();
});

test('navigation cancels a delayed request before it can start', async (t) => {
	t.mock.timers.enable({ apis: ['Date', 'setTimeout'], now: 10000 });
	let calls = 0;
	const loader = createThrottledTask(async () => {
		calls++;
	});
	await loader.run();
	const queued = loader.run();
	loader.cancel();
	await queued;
	t.mock.timers.tick(5000);
	await loader.run();
	assert.equal(calls, 1);
});

test('navigation aborts an in-flight request', async () => {
	let requestSignal!: AbortSignal;
	let finish!: () => void;
	const loader = createThrottledTask(async (signal) => {
		requestSignal = signal;
		await new Promise<void>((resolve) => {
			finish = resolve;
		});
	});
	const pending = loader.run();
	loader.cancel();
	assert.equal(requestSignal.aborted, true);
	finish();
	await pending;
});

test('failed requests release the lock so an explicit retry can succeed', async () => {
	let calls = 0;
	const loader = createThrottledTask(async () => {
		if (++calls === 1) throw new Error('Connection lost');
	}, 0);
	await assert.rejects(loader.run(), /Connection lost/);
	await loader.run();
	assert.equal(calls, 2);
	loader.cancel();
});
