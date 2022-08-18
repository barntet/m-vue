export function createComponentInstance(vnode: any) {
  const instance = {
    vnode,
    type: vnode.type,
  };

  return instance;
}

export function setupComponent(instance: any) {
  // initProps
  // initSlots

  // 处理不同类型的component
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  // 获取到传入的组件
  const Component = instance.type;

  // 获取setup
  const { setup } = Component;
  if (setup) {
    const setupResult = setup();
    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // setup()返回的结果可能是fn也有可能是obj

  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;

  if (Component.render) {
    instance.render = Component.render;
  }
}
