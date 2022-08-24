import { h } from '../../lib/guide-m-vue.esm.js';

window.self = null;
export default {
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
        onMousedown:()=>{
          console.log('mousedown')
        }
      },
      [h('span', {}, `hi ${this.msg}`), h('p', {}, '1')]
    );
  },
};
