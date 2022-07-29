import { describe, expect, test } from 'vitest';
import { isReactive, shallowReadonly, readonly, isReadonly } from '../reactive';
describe('shallowReadonly', () => {
	test('should not make non-reactive properties reactive', () => {
		const props = shallowReadonly({ n: { foo: 2 }, a: 1 });
		expect(isReactive(props.n)).toBe(false);
		expect(isReadonly(props)).toBe(true);
		expect(isReadonly(props.n)).toBe(false);
	});

	test('should differentiate from normal readonly calls', () => {
		const original = { foo: { bar: 2 } };
		const shallowProxy = shallowReadonly(original);
		const reactiveProxy = readonly(original);
		expect(shallowProxy).not.toBe(reactiveProxy);
		expect(isReadonly(shallowProxy.foo)).toBe(false);
		expect(isReadonly(reactiveProxy.foo)).toBe(true);
	});
});
