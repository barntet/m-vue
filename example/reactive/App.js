import { reactive, effect, h } from '../../lib/guide-m-vue.esm.js';

export default {
  setup() {
    const name = reactive({ a: 1, b: 2 });
    const runner = effect(() => {
      name.b++;
      name.a;
      console.log('cishu', name.b);
    });

    const click = () => {
      name.a++;
      name.b++;
    };

    return {
      name,
      click,
    };
  },

  render() {
    return h('div', { onClick: this.click }, `a: ${this.name.a}`);
  },
};
