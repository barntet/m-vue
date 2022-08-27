import { getCurrentInstance, h } from '../../lib/guide-m-vue.esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  setup() {
    console.log(App.name, getCurrentInstance());
  },
  render() {
    return h('div', {}, [h(Foo)]);
  },
};
