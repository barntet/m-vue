import { createVNode } from './vnode';
import { render } from './render';

export function createApp(rootComponent) {
	return {
		mount(rootContainer) {
			// 先创建VNode
			// component => VNode
			// 所有的逻辑操作都会基于VNode, 做处理
			const vnode = createVNode(rootComponent);
			render(vnode, rootContainer);
		},
	};
}
