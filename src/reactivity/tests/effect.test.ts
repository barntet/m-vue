import { describe, expect, test, vi } from 'vitest';
import { reactive } from '../reactive';
import { effect, stop } from '../effect';
describe('effect', () => {
  test('should observe basic properties', () => {
    let dummy;
    let dummy1;
    const counter = reactive({ num: 0, num1: 1 });
    effect(() => {
      dummy = counter.num;
      dummy1 = counter.num1;
    });

    expect(dummy).toBe(0);
    // update
    counter.num = 7;
    counter.num1 = 2;
    expect(dummy1).toBe(2);
    expect(dummy).toBe(7);
  });

  test('should return runner when call effect', () => {
    let count = 10;
    const runner = effect(() => {
      count++;
      return 'foo';
    });

    expect(count).toBe(11);
    let run = runner();
    expect(count).toBe(12);
    expect(run).toBe('foo');
  });

  test('Scheduler', () => {
    let dummy;
    let run: any;
    const scheduler = vi.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);

    // should be called on first trigger
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);

    // should not run yet
    expect(dummy).toBe(1);
    // manually run
    run();
    expect(dummy).toBe(2);
  });

  test('stop', () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    // obj.prop = 3;
    obj.prop++;
    expect(dummy).toBe(2);
    runner();
    expect(dummy).toBe(3);
  });

  test('onStop', () => {
    const obj = reactive({ foo: 1 });
    const onStop = vi.fn();
    let dummy;
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { onStop }
    );

    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });
});
