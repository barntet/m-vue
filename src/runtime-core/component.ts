import { PublicInstanceProxyHandles } from './componentPubilcInstance';
import { initProps } from './componentProps';
import { shallowReadonly } from '../reactivity/reactive';
import { emit } from './componentEmit';

export function createComponentInstance(vnode: any) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    emit: () => {},
  };

  component.emit = emit.bind(null, component) as any;

  return component;
}

export function setupComponent(instance: any) {
  initProps(instance, instance.vnode.props);
  // initslots

  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  //调用setup拿到返回值就行，

  const component = instance.type;

  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandles);

  const { setup } = component;

  if (setup) {
    const setupResule = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });
    // setup 可以返回fn也可以返回obj， fn就认为是rende函数，ojb就注入到当前组件上下文中
    handleSetupResult(instance, setupResule);
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // fn or obj
  // TODO 后续需要的fn

  // 先处理obj, 注入到当组件的上下问中
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

// 到这一步，组件的setup就完成了
function finishComponentSetup(instance: any) {
  const Component = instance.type;

  if (Component.render) {
    instance.render = Component.render;
  }
}
