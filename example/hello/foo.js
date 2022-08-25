import { h } from "../../lib/guide-m-vue.esm.js";

export const foo = {
  setup(props) {
    console.log(props);

    props.count++;
    console.log(props)
  },

  render() { 
    return h('div', {}, 'hi' + ' ' +   this.count);
  },
};
