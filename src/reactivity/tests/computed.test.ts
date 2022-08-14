import { describe, expect, test, vi } from 'vitest';
import { reactive } from '../reactive';
import { computed } from '../computed';

describe('computed', () => {
	test('happy path', () => {
		const user = reactive({
			age: 1,
		});
		const age = computed(() => {
			return user.age;
		});
		expect(age.value).toBe(1);
	});

	test('should compute lazily', () => {
		const value = reactive({
			foo: 1,
		});
		const getter = vi.fn(() => {
			return value.foo;
		});
		const cValue = computed(getter);

		// lazily 没有调用cValeu.value的话这个断言通过
		expect(getter).not.toHaveBeenCalled();

		expect(cValue.value).toBe(1);
		// 验证getter是不是被调用了一次
		expect(getter).toHaveBeenCalledTimes(1);

		// should not compute again
		cValue.value; // 触发get操作
		// 断言compute被调用次数应该还是1次
		expect(getter).toHaveBeenCalledTimes(1);

		// should not compute until needed
		value.foo = 2;
		expect(getter).toHaveBeenCalledTimes(1);
	});
});
