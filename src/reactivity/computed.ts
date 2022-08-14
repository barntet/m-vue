import { ReactiveEffect } from './effect';

class ComputedRefIpml {
	private _getter;
	private _dirty: boolean = true;
	private _value: any;
	private effect: any;

	constructor(getter) {
		this._getter = getter;
		this.effect = new ReactiveEffect(getter, () => {
			if (!this._dirty) {
				this._dirty = true;
			}
		});
	}

	get value() {
		// 调用完一次get就给他锁上
		if (this._dirty) {
			this._dirty = false;
			this._value = this.effect.run();
		}
		return this._value;
	}
}

export function computed(getter) {
	return new ComputedRefIpml(getter);
}
