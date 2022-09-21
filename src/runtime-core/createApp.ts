import { createVNode } from './vnode';

export function createAppAPI(render: any) {
	return function createApp(rootComponent: any) {
		return {
			mount(rootContainer: any) {
				// 先创建VNode
				// component => VNode
				// 所有的逻辑操作都会基于VNode, 做处理
				const vnode = createVNode(rootComponent);
				render(vnode, rootContainer);
			},
		};
	}
}
