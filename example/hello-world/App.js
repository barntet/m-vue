import { h } from '../../lib/guide-m-vue.esm.js';
import { Foo } from './Foo.js'

window.self = null;
export const App = {
  name: 'App',
  setup() {
    return {
      msg: 'hi v-11u22',
    };
  },

  render() {
    window.self = this;
    return h(
      'div',
      {
        class: ['a', 'b'],
        onClick: () => {
          console.log('click');
        },
        onMousedown: () => {
          console.log(this);
        },
      },
      [h(Foo, { count: 1 })]
    );
  },
};
