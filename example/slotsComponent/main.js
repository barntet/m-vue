import { App } from './App.js';
import { createApp } from '../../lib/guide-m-vue.esm.js';

const container = document.querySelector('#app');
createApp(App).mount(container);
