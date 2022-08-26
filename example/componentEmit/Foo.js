import { h } from '../../lib/guide-m-vue.esm.js';

export const Foo = {
  setup(props, { emit }) {
    const emitAdd = () => {
      console.log('emit');
      emit('add', 1, { a: 1 });
      emit('a-b-c', 2, 3, { b: 5 });
    };

    return {
      emitAdd,
    };
  },

  render() {
    const btn = h(
      'button',
      {
        onClick: this.emitAdd,
      },
      'emitAdd'
    );

    const foo = h('p', {}, 'foo');
    return h('div', {}, [foo, btn]);
  },
};
