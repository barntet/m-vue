import { getCurrentInstance, h } from '../../lib/guide-m-vue.esm.js';

export const Foo = {
  name: 'Foo',
  setup() {
    console.log(Foo.name, getCurrentInstance());
  },
  render() {
    return h('div', {}, '123');
  },
};
