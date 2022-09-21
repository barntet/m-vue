export const extend = Object.assign;

export const isObject = (val: any) => typeof val === 'object';

export const hasChange = (value, newValue) => !Object.is(value, newValue);

export const hasOwn = (val: any, key: any) =>
  Object.prototype.hasOwnProperty.call(val, key);

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_: any, c: string) => {
    return c ? c.toUpperCase() : '';
  });
};

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toHandleKey = (str: string) => {
  return str ? 'on' + capitalize(str) : '';
};

export const isOn = (key: string) => /^on[A-Z]/.test(key);