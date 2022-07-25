import { describe, test, expect, vi } from 'vitest';
import { readonly } from '../reactive';

describe('readonly', () => {
	test('happy path', () => {
		// not set
		const original = { foo: 1, bar: { baz: 2 } };
		const wrapped = readonly(original);
		expect(wrapped).not.toBe(original);
		expect(wrapped.foo).toBe(1);
	});

	test('warn then call set', () => {
		// console.warn()
		console.warn = vi.fn();

		const user = readonly({ age: 10 });
		user.age = 11;

		expect(console.warn).toBeCalled();
	});
});
