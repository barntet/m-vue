import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import { Fragment, Text } from './vnode';

export function createRenderer(options: any) {
  console.log(options)

  const { createElement: hostCreateElement, patchProp: hostHatchProp, insert: hostInsert } = options

  function render(vnode: any, container: any) {
    patch(vnode, container, null);
  }

  function patch(vnode: any, container: any, parent: any) {
    // 处理组件，判断是什么类型

    switch (vnode.type) {
      case Fragment:
        processFragment(vnode, container, parent);
        break;
      case Text:
        processText(vnode, container);
        break;
      default:
        if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parent);
        } else if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENTS) {
          // 处理组件
          processComponent(vnode, container, parent);
        }
    }
  }

  function processFragment(vnode: any, container: any, parent: any) {
    mountChildren(vnode, container, parent)
  }

  function processText(vnode: any, container: any) {
    const el = (vnode.el = document.createTextNode(vnode.children))
    container.append(el)
  }

  function processElement(vnode: any, container: any, parent: any) {
    mountElement(vnode, container, parent);
  }

  function mountElement(vnode: any, container: any, parent: any) {
    // $el 需要存起来
    const el = (vnode.el = hostCreateElement(vnode.type));

    const { props, children } = vnode;

    // props
    for (const key in props) {
      const val = props[key];

      // 先写一个特定的，在进行优化
      // if (key === 'onClick') {

      // const isOn = (key: string) => /^on[A-Z]/.test(key);
      // if (isOn(key)) {
      //   const event = key.slice(2).toLowerCase();
      //   el.addEventListener(event, val);
      // } else {
      //   el.setAttribute(key, val);
      // }
      hostHatchProp(el, key, val)
    }

    // children
    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parent);
    }


    // container.append(el);
    hostInsert(el, container);
  }

  function mountChildren(vnode: any, container: any, parent: any) {
    vnode.children.forEach((v: any) => {
      patch(v, container, parent);
    });
  }

  function processComponent(vnode: any, container: any, parnet: any) {
    mountComponent(vnode, container, parnet)
  }

  function mountComponent(vnode: any, container: any, parnet: any) {
    const instance = createComponentInstance(vnode, parnet);

    setupComponent(instance);
    setupRenderEffect(instance, vnode, container);
  }

  function setupRenderEffect(instance: any, vnode: any, container: any) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    // subTree 就是一个虚拟节点树

    patch(subTree, container, instance);
    // 所有element都mount
    vnode.el = subTree.el;
  }

  return {
    createApp: createAppAPI(render)
  }
}