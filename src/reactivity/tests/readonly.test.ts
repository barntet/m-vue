import { describe, test, expect, vi } from 'vitest';
import { readonly, isReadonly } from '../reactive';

describe('readonly', () => {
	test('happy path', () => {
		// not set
		const original = { foo: 1, bar: { baz: 2 } };
		const wrapped = readonly(original);
		expect(wrapped).not.toBe(original);
		expect(wrapped.foo).toBe(1);
		expect(isReadonly(wrapped)).toBe(true);
		expect(isReadonly(original)).toBe(false);
	});

	test('warn then call set', () => {
		// console.warn()
		console.warn = vi.fn();

		const user = readonly({ age: 10 });
		user.age = 11;

		expect(console.warn).toBeCalled();
	});

	test('nested reavtives', () => {
		const original = {
			nested: { foo: 1 },
			array: [{ bar: 2 }],
		};
		const wrapped = readonly(original);
		expect(isReadonly(wrapped)).toBe(true);
		expect(isReadonly(wrapped.nested)).toBe(true);
		expect(isReadonly(wrapped.array)).toBe(true);
		expect(isReadonly(wrapped.array[0])).toBe(true);
		expect(isReadonly(original)).toBe(false);
		expect(isReadonly(original.nested)).toBe(false);
		expect(isReadonly(original.array)).toBe(false);
		expect(isReadonly(original.array[0])).toBe(false);
	});
});
