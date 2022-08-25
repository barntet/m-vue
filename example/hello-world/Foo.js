import { h } from '../../lib/guide-m-vue.esm.js'

export const Foo = {
  name: 'foo',
  setup(props) {
    console.log('top', props)

    props.count++
    console.log(props.count)
  },

  render() {
    return h('div', {}, 'foo: ' + this.count)
  }
}