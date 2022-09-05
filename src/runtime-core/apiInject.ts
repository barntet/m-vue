import { getCurrentInstance } from "./component";

export function provide(key: any, value: any) {

  // 获取组件实例
  const currentInstance = getCurrentInstance();
  if (currentInstance) {
    let { provides } = currentInstance;

    const parentProvides = currentInstance.parent?.provides;
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }
    provides[key] = value;
  }

}

export function inject(key: any, defaultValue: any) {
  console.log(key)
  // 获取组件实例
  const currentInstance = getCurrentInstance();
  if (currentInstance) {
    // 获取上一级的provides
    const { provides } = currentInstance.parent;
    if (key in provides) {
      return provides[key]
    } else if (defaultValue) {
        if (typeof defaultValue === 'function') {
          return defaultValue()
        }
      return defaultValue
    }
  }

}