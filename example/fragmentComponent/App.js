import { createTextVNode, h, renderSlots } from '../../lib/guide-m-vue.esm.js'

const Foo = {
  setup() { },
  render() {
    return h('div', {}, [renderSlots(this.$slots, 'header'), createTextVNode('foo'), renderSlots(this.$slots, 'footer',)])
  }
}

export default {
  setup() {

  },
  render() {
    return h('div', {}, [h('div', {}, 'App'), h(Foo, {}, { header: () => h('div', {}, 'header'), footer: () => h('div', {}, 'footer') })])
  }
}