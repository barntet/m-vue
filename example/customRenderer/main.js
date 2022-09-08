import { createApp } from './renderer.js';
import App from './App.js';
import { createRootRenderer } from './game.js';

createApp(App).mount(createRootRenderer());
