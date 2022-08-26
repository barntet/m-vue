import { h, renderSlots } from '../../../lib/guide-m-vue.esm.js';

export const Foo = {
  setup() {},

  render() {
    console.log(this.$slots);
    const foo = h('div', {}, 'foo');
    const age = 18;
    return h('div', {}, [
      renderSlots(this.$slots, 'header', { age }),
      foo,
      renderSlots(this.$slots, 'footer'),
    ]);
  },
};
