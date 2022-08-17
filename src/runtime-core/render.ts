import { createComponentInstance, setupComponent } from './component';

export function render(vnode: any, container: any) {
	patch(vnode, container);
}

function patch(vnode: any, container: any) {
	// 处理组件，判断是什么类型

	// 处理组件
	processComponent(vnode, container);
}

function processComponent(vnode: any, container: any) {
	mouuntComponent(vnode, container);
}

function mouuntComponent(vnode: any, container: any) {
	const instance = createComponentInstance(vnode);

	setupComponent(instance);
    setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container){
    const subTree = instance.render();
    // subTree 就是一个虚拟节点树

    patch(subTree, container);
}
