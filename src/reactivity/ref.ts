class RefImpl {
	// private _rawValue: any;
	private _value: any;

	constructor(value) {
		this._value = value;
	}

	get value() {
		// 收集依赖
		// trackRefValue(this);
		return this._value;
	}
}
export function ref(value) {
	const refImpl = new RefImpl(value);
	return refImpl;
}
