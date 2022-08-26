import { h } from '../../lib/guide-m-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  setup() {},

  render() {
    return h('div', {}, [
      h('div', {}, '111'),
      h('div', {}, '123'),
      h(
        Foo,
        {},
        {
          header: ({ age }) => h('div', {}, 'i am slot2' + age),
          footer: () => h('div', {}, 'i am slots'),
        }
      ),
    ]);
  },
};
