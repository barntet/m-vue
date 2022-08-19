import { h } from '../../lib/guide-m-vue.esm.js';

export const App = {
  setup() {
    return {
      msg: 'hi v',
    };
  },

  render() {
    return h('div', {}, [h('p', {}, 'hello'), h('span', {}, 'hello')]);
  },
};
