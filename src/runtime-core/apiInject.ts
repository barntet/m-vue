import { getCurrentInstance } from './component';

export function provide(key: any, value: any) {
  // save
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    let { provides } = currentInstance;

    const parentProvides = currentInstance.parent?.provides;

    // 用原型链的方式解决当前的问题，inject或取值时，是获取了离最近的父级的值
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }

    provides[key] = value;
  }
}

export function inject(key: any, defaultValue: any) {
  // get

  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    const { provides } = currentInstance.parent;

    if (key in provides) {
      return provides[key];
    } else if (defaultValue) {
      if (typeof defaultValue === 'function') {
        return defaultValue();
      }
      return defaultValue;
    }
  }
}
