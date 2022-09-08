import { createRenderer } from '../../lib/guide-m-vue.esm.js';

console.log(PIXI);

const renderer = createRenderer({
  createElement(type) {
    if (type === 'rect') {
      const rect = new PIXI.Graphics();
      rect.beginFill(0xff0000);
      rect.drawRect(0, 0, 100, 100);
      rect.endFill();

      return rect;
    }
  },

  patchProp(el, key, val) {
    el[key] = val;
  },

  insert(el, parent) {
    parent.addChild(el);
  },
});

export function createApp(...args) {
  return renderer.createApp(...args);
}
