import { h, renderSlots } from '../../lib/guide-m-vue.esm.js';

export const Foo = {
  setup() {},
  render() {
    console.log(this.$slots);
    // renderSlots
    // 具名插槽 通过指定对应的名字在指定渲染位置
    // 1. 获取到要渲染的元素
    // 2. 要获取到渲染的位置

    // 作用域插槽
    const age = 18;
    return h('div', {}, [
      renderSlots(this.$slots, 'header', { age }),
      h('span', {}, 'foo'),
      renderSlots(this.$slots, 'footer'),
    ]);
  },
};
