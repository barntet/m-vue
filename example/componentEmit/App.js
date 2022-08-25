import { h } from '../../lib/guide-m-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  setup() {},

  render() {
    return h('div', {}, [
      h(Foo, {
        onAddEmit: (a, b) => {
          console.log('addEmit', a, b);
        },
        onAddEmitEdit: (c, d) => {
          console.log('addEmitEdit', c, d);
        },
      }),
    ]);
  },
};
