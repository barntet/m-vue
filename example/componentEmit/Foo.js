import { h } from '../../lib/guide-m-vue.esm.js';

export const Foo = {
  setup(props, { emit }) {
    const addEmit = () => {
      console.log('addEmit');
      emit('addEmit', 1, 2);
      emit('add-emit-edit', 3, 4);
    };
    return {
      addEmit,
    };
  },

  render() {
    const button = h('button', { onClick: this.addEmit }, 'emitbtn');
    const foo = h('p', {}, 'foo');

    return h('div', {}, [foo, button]);
  },
};
