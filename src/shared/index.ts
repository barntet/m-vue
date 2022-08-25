export const extend = Object.assign;

export const isObject = (val: any) => typeof val === 'object';

export const hasChange = (value, newValue) => !Object.is(value, newValue);

export const hasOwn = (val: any, key: any) =>
  Object.prototype.hasOwnProperty.call(val, key);
