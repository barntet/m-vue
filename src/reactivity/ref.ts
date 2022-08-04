import { hasChange } from './../shared/index';
import { trackEffects, triggerEffects, isTracting } from './effect';

class RefImpl {
	// private _rawValue: any;
	private _value: any;
	public dep;

	constructor(value) {
		this._value = value;
		// 实例化dep
		this.dep = new Set();
	}

	get value() {
		// activeEffect不等于undefined，才调用收集
		if (isTracting()) {
			// 收集依赖
			trackEffects(this.dep);
		}
		return this._value;
	}

	set value(neWValue) {
		// hasChange
		if (hasChange(neWValue, this._value)) {
			// 一定是先去修改了value的值，再去触发依赖
			this._value = neWValue;
			triggerEffects(this.dep);
		}
	}
}
export function ref(value) {
	const refImpl = new RefImpl(value);
	return refImpl;
}
