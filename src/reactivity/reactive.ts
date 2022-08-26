import { isObject } from '../shared/index';
import {
	mutableHandlers,
	readonlyHandlers,
	shallowReadonlyHandlers,
} from './baseHandlers';

export const enum ReactiveFlags {
	IS_REACTIVE = '__v_isReactive',
	IS_READONLY = '__v_isReadonly',
	RAW = '__v_raw',
}

export function reactive(raw: any) {
	return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw: any) {
	return createActiveObject(raw, readonlyHandlers);
}

export function shallowReadonly(raw) {
	return createActiveObject(raw, shallowReadonlyHandlers);
}

export function isReactive(value) {
	return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
	return !!value[ReactiveFlags.IS_READONLY];
}

export function isProxy(value) {
	return isReactive(value) || isReadonly(value);
}

function createActiveObject(raw: any, baseHandlers) {

	if (!isObject(raw)) {
		console.warn(`raw ${raw} must a object`);
		return raw
	}
	return new Proxy(raw, baseHandlers);
}
