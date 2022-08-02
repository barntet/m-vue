import { describe, test, expect } from 'vitest';
import { effect } from '../effect';
import { ref } from '../ref';

describe('ref', () => {
	test('should be reactive', () => {
		const a = ref(1);
		let dummy;
		let calls = 0;
		effect(() => {
			calls++;
			dummy = a.value;
		});
		expect(calls).toBe(1);
		expect(dummy).toBe(1);
	});
});
