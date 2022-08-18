export const App = {
  setup() {
    return {
      msg: 'hi v',
    };
  },

  render() {
    return h('div', `hi ${this.msg}`);
  },
};
