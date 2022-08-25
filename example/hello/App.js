import { h } from '../../lib/guide-m-vue.esm.js';
import { foo } from './foo.js';

window.self = null;
export default {
  name: 'App',
  setup() {
    return {
      msg: 'm-vue12',
    };
  },

  render() {
    window.self = this;
    return h(
      'div',
      {
        class: 'a',
        onClick: () => {
          console.log('click');
        },
        onMousedown: () => {
          console.log('mousedown');
        },
      },
      [h('span', {}, `hi ${this.msg}`), h('p', {}, '1'), h(foo, { count: 2 })]
    );
  },
};
