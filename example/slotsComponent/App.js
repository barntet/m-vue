import { h } from '../../lib/guide-m-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  setup() {},
  render() {
    return h('div', {}, [
      h('div', {}, 'hello'),
      h(
        Foo,
        { msg: 'your name is child' },
        {
          header: ({ age }) => h('div', {}, 'i am slots header' + age),
          footer: () => h('div', {}, 'i am slots footer'),
        }
      ),
    ]);
  },
};
