import { describe, test, expect } from 'vitest';
import { effect } from '../effect';
import { reactive } from '../reactive';
import { ref, isRef, unRef, proxyRefs } from '../ref';

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
		a.value = 2;
		expect(calls).toBe(2);
		expect(dummy).toBe(2);
		// same value should not trigger
		a.value = 2;
		expect(calls).toBe(2);
		expect(dummy).toBe(2);
	});

	test('should make nested properties reactive', () => {
		const a = ref({
			count: 1,
		});
		let dummy;
		effect(() => {
			dummy = a.value.count;
		});
		expect(dummy).toBe(1);
		a.value.count = 2;
		expect(dummy).toBe(2);
	});

	test('isRef', () => {
		const a = ref(1);
		const b = reactive({ foo: 2 });
		expect(isRef(a)).toBe(true);
		expect(isRef(true)).toBe(false);
		expect(isRef(b)).toBe(false);
	});

	test('unRef', () => {
		const a = ref(1);
		expect(unRef(a)).toBe(1);
		expect(unRef(1)).toBe(1);
	});

	test('proxyRefs', () => {
		const user = {
			age: ref(10),
			name: 'jack',
		};
		const proxyRef = proxyRefs(user);
		expect(user.age.value).toBe(10);
		expect(proxyRef.age).toBe(10);
		expect(proxyRef.name).toBe('jack');

		proxyRef.age = 11;
		expect(proxyRef.age).toBe(11);
		expect(user.age.value).toBe(11);

		proxyRef.name = ref('xiaohong');
		expect(proxyRef.name).toBe('xiaohong');
		expect(user.name.value).toBe('xiaohong');
		
	});
});
