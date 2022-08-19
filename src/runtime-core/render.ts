import { isObject } from './../shared/index';
import { createComponentInstance, setupComponent } from './component';

export function render(vnode: any, container: any) {
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  // 处理组件，判断是什么类型

  if (typeof vnode.type === 'string') {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    // 处理组件
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  // $el 需要存起来
  const el = (vnode.el = document.createElement(vnode.type));

  const { props, children } = vnode;

  // props
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }

  // children
  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }

  container.append(el);
}

function mountChildren(vnode: any, container: any) {
  vnode.children.forEach((v: any) => {
    patch(v, container);
  });
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, vnode, container);
}

function setupRenderEffect(instance: any, vnode: any, container: any) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  // subTree 就是一个虚拟节点树

  patch(subTree, container);
  // 所有element都mount
  vnode.el = subTree.el;
}
