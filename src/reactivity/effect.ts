import { extend } from '../shared';

let activeEffect = void 0;
let shouldTrack;
const targetMap = new Map();

class ReactiveEffect {
	active = true;
	deps = [];
	public onStop?: () => void;

	constructor(public _fn, public scheduler?) {
		this._fn = _fn;
	}

	run() {
		// 执行fn但不收集依赖
		if (!this.active) {
			return this._fn();
		}

		// 执行fn 收集依赖
		// 可以开始收集依赖了
		shouldTrack = true;

		// 利用全局属性来获取当前的effect
		activeEffect = this as any;
		//执行传入的fn
		const result = this._fn();

		// 重置
		shouldTrack = false;
		activeEffect = undefined;

		return result;
	}

	stop() {
		if (this.active) {
			cleanupEffect(this);
			if (this.onStop) {
				this.onStop();
			}
			this.active = false;
		}
	}
}

function cleanupEffect(effect: any) {
	effect.deps.forEach((dep: any) => {
		dep.delete(effect);
	});

	effect.deps.length = 0;
}

export function track(target, key) {
	if (!isTracting()) return;

	// target -> key -> dep
	let depsMap = targetMap.get(target);
	if (!depsMap) {
		depsMap = new Map();
		targetMap.set(target, depsMap);
	}

	let dep = depsMap.get(key);
	if (!dep) {
		dep = new Set();
		depsMap.set(key, dep);
	}

	// 如果已经在dep中了
	if (dep.has(activeEffect)) return;
	dep.add(activeEffect);
	activeEffect.deps.push(dep);
}

function isTracting() {
	return shouldTrack && activeEffect !== undefined;
}

export function trigger(target, key) {
	let depsMap = targetMap.get(target);
	let dep = depsMap.get(key);
	for (const effect of dep) {
		if (effect.scheduler) {
			effect.scheduler();
		} else {
			effect.run();
		}
	}
}

export function effect(fn, options: any = {}) {
	const _effect = new ReactiveEffect(fn, options.scheduler);

	extend(_effect, options);

	_effect.run();

	const runner: any = _effect.run.bind(_effect);
	runner.effect = _effect;
	return runner;
}

export function stop(runner) {
	runner.effect.stop();
}
