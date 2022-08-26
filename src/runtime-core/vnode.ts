import { ShapeFlags } from '../shared/shapeFlags';

export function createVNode(type: any, props?: any, children?: any) {
  const vnode = {
    type,
    props,
    children,
    el: null,
    shapeFlag: getShapeFlag(type),
  };

  // 判断children的类型，给shapeFlag再次赋值
  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }

  //必须是组件且有children
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENTS) {
    if (typeof vnode.children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
    }
  }

  return vnode;
}

function getShapeFlag(type: any) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENTS;
}
