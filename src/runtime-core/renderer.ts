import { ShapeFlags } from '../shared/ShapeFlags';
import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import { Fragment, Text } from './vnode';

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render(vnode: any, container: any) {
    // patch

    patch(vnode, container, null);
  }

  function patch(vnode: any, container: any, parent: any = null) {
    switch (vnode.type) {
      case Fragment:
        processFragment(vnode, container, parent);
        break;
      case Text:
        processText(vnode, container);
        break;
      default:
        // 判断vnode是element还是component
        if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parent);
        } else if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parent);
        }
    }
  }

  function processFragment(vnode, container, parent) {
    mountChildren(vnode, container, parent);
  }

  function processText(vnode, container) {
    const el = (vnode.el = document.createTextNode(vnode.children));
    container.append(el);
  }

  function processElement(vnode: any, container: any, parent) {
    mountElement(vnode, container, parent);
  }

  function mountElement(vnode: any, container: any, parent) {
    // if canvas
    // new Element()

    // 将el存起来
    const el = (vnode.el = hostCreateElement(vnode.type)); // customRender后改的

    const { children, props } = vnode;

    // children
    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parent);
    }

    // props
    for (const key in props) {
      const val = props[key];

      // 先写一个具体的再来优化
      // if (key === 'onClick') {
      // if (isOn(key)) {
      //   const event = key.slice(2).toLowerCase();
      //   el.addEventListener(event, val);
      // } else {
      //   el.setAttribute(key, val);
      // }

      hostPatchProp(el, key, val);
    }

    // if canvas
    // el.x = ''
    // container.append(el);
    hostInsert(el, container);
  }

  function mountChildren(vnode: any, container: any, parent) {
    vnode.children.forEach((v: any) => {
      patch(v, container, parent);
    });
  }

  function processComponent(vnode: any, container: any, parent: any) {
    mountComponent(vnode, container, parent);
  }

  function mountComponent(initialVNode: any, container: any, parent: any) {
    const instance = createComponentInstance(initialVNode, parent);

    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }

  function setupRenderEffect(instance: any, vnode: any, container: any) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);

    patch(subTree, container, instance);

    vnode.el = subTree.el;
  }

  return {
    createApp: createAppAPI(render),
  };
}
