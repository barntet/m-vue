import { h, provide, inject, createTextVNode } from '../../lib/guide-m-vue.esm.js';

const provideOne = {
  setup() {
    provide('foo', 'foo-one')
    const bar = inject('bar');

    return {
      bar
    }
  },
  render() {
    return h('div', {}, [createTextVNode(`one, 'bar'-${this.bar}`), h(provideTwo)])
  }
}

const provideTwo = {
  setup() {
    const foo = inject('foo');
    const bar = inject('bar');
    const baz = inject('baz', ()=>'defaultBaz')
    return {
      foo, bar, baz
    }
  },
  render() {
    return h('div', {}, [createTextVNode(`foo-${this.foo}, bar-${this.bar}, baz-${this.baz}`),])
  }
}



export default {
  name: 'app',
  setup() {
    provide('foo', 'app-foo');
    provide('bar', 'app-bar')
  },
  render() {
    return h('div', {}, [createTextVNode('app-root'), h(provideOne)])
  }
}