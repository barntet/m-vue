import { createTextVNode, h, getCurrentInstance } from '../../lib/guide-m-vue.esm.js'

const Foo = {
  name: 'foo',
  setup() {
    const instance = getCurrentInstance();
    console.log(instance);
  },
  render() {
    return h('div', {}, 'foo')
  }
}

export default {
  name: 'App',
  setup() {
    const instance = getCurrentInstance();
    console.log(instance);
  },
  render() {
    return h('div', {}, [createTextVNode('app'), h(Foo)])
  }
}