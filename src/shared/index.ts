export const extend = Object.assign;

export const isObject = (val: any) => typeof val === 'object';

export const hasChange = (value: any, newValue: any) =>
  !Object.is(value, newValue);

export const isOn = (key: string) => /^on[A-Z]/.test(key);

export const hasOwn = (val: any, key: any) =>
  Object.prototype.hasOwnProperty.call(val, key);

// 匹配字符串中的-转换驼峰
export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_: any, c: string) => {
    return c ? c.toUpperCase() : '';
  });
};

// 首字母大写
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : '';
};
