import { h } from '../../lib/guide-m-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  setup() {},

  render() {
    return h('div', {}, [
      h('div', {}, 'App'),
      h(Foo, {
        onAdd: (a, b) => {
          console.log('onAdd', a, b);
        },
        onABC: (c, d, e) => {
          console.log('onABC', c, d, e);
        },
      }),
    ]);
  },
};
