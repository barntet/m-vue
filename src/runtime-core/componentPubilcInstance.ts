const publicPropertiesMap = {
  $el: (ins: any) => ins.vnode.el,
};

export const PublicInstanceProxyHandles = {
  get({ _: instance }, key: any) {
    // steupState
    const { setupState } = instance;
    if (key in setupState) {
      return setupState[key];
    }

    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
