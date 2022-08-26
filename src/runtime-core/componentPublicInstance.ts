import { hasOwn } from "../shared/index";

const publicPropertiesMap = {
  $el: (ins: any) => ins.vnode.el,
};

export const PublicInstanceProxyHandles = {
  get({ _: instance }, key: any) {
    // setupState
    const { setupState, props } = instance;

    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
