import { h } from '../../lib/guide-m-vue.esm';

export default {
	setup() {
		return {
			msg: 'm-vue',
		};
	},

	render() {
		return h('div', `hi ${this.msg}`);
	},
};
