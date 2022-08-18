import { createVNode } from './vnode';
import { render } from './render';

export function createApp(rootComponent: any) {
  return {
    mount(rootContainer: any) {
      // vnode
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}
