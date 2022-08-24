import { h } from '../../lib/guide-m-vue.esm.js';

window.self = null;
export const App = {
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
      [h('p', {}, this.msg), h('span', {}, 'hello')]
    );
  },
};
