import { h, provide, inject } from '../../lib/guide-m-vue.esm.js';

const ProviderOne = {
  name: 'providerOne',
  setup() {
    provide('foo', 'fooVal');
    provide('baz', 'bazVal');
  },

  render() {
    return h(ProviderTwo);
  },
};

const ProviderTwo = {
  name: 'providerTwo',
  setup() {
    provide('foo', 'fooValTwo');
    provide('baz', 'bazValTwo');
    const foo = inject('foo');

    return { foo };
  },

  render() {
    return h('div', {}, [h('div', {}, `footow-${this.foo}`), h(Consumer)]);
  },
};

const Consumer = {
  name: 'consumer',
  setup() {
    const foo = inject('foo');
    const baz = inject('baz');
    const bar = inject('bar', () => 'barDefault');

    return {
      foo,
      baz,
      bar,
    };
  },

  render() {
    return h('div', {}, `foo-${this.foo}, baz-${this.baz}, bar-${this.bar}`);
  },
};

export default {
  name: 'App',
  setup() {},
  render() {
    return h('div', {}, [h('p', {}, 'apiInject'), h(ProviderOne)]);
  },
};
