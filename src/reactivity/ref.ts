import { hasChange, isObject } from './../shared/index';
import { trackEffects, triggerEffects, isTracking } from './effect';
import { reactive } from './reactive';

class RefImpl {
  // 核心点，一个key对应一个dep,
  // ref和reactive的区别，ref传入的都是单值，reactive是一个对象
  // 怎么知道被get set， 所以通过一个class包裹

  private _value: any;
  public dep;
  private _rawValue: any;

  constructor(value) {
    // 存储传入的原始值，因为_value如果是对象会经过reactive包裹
    this._rawValue = value;
    // 看看value是不是一个对象，如果是对象用reactive包裹一下
    this._value = convert(value);

    // 实例化dep
    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(neWValue) {
    // hasChange
    if (hasChange(neWValue, this._value)) {
      // 更新值 ,这里顺序和get相反
      this._value = convert(neWValue);
      this._rawValue = neWValue;
      // 一定是先去修改了value的值，再去触发依赖
      triggerEffects(this.dep);
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  // activeEffect不等于undefined，才调用收集
  if (isTracking()) {
    // 收集依赖
    trackEffects(ref.dep);
  }
}

export function ref(value) {
  const refImpl = new RefImpl(value);
  return refImpl;
}
