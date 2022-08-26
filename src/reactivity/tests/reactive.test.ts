import { describe, test, expect } from 'vitest';
import { reactive, isReactive, isProxy } from '../reactive';

describe('reactive', () => {
	test('happy path', () => {
		const original = { foo: 1 };
		const observed = reactive(original);
		expect(observed).not.toBe(original);
		expect(observed.foo).toBe(1);
		expect(isReactive(observed)).toBe(true);
		expect(isReactive(original)).toBe(false);
		// isProxy
		expect(isProxy(observed)).toBe(true);
	});

	test('nested reactive', () => {
		const original = {
			nested: { foo: 1 },
			array: [{ bar: 2 }],
		};
		const observed = reactive(original);
		expect(isReactive(observed)).toBe(true);
		expect(isReactive(observed.nested)).toBe(true);
		expect(isReactive(observed.array)).toBe(true);
		expect(isReactive(observed.array[0])).toBe(true);
		expect(isReactive(original)).toBe(false);
		expect(isReactive(original.nested)).toBe(false);
		expect(isReactive(original.array)).toBe(false);
		expect(isReactive(original.array[0])).toBe(false);
	});
});
