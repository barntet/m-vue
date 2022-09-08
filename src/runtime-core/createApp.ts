import { createVNode } from './vnode';

// render
export function createAppAPI(render) {
  return function createApp(rootComponent: any) {
    return {
      mount(rootContainer: any) {
        // vnode
        const vnode = createVNode(rootComponent);

        render(vnode, rootContainer);
      },
    };
  };
}
