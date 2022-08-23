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
    return h('div', {}, [h('p', {}, this.msg), h('span', {}, 'hello')]);
  },
};
