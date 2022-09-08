import { createRenderer } from '../runtime-core';
import { isOn } from '../shared';

function createElement(type) {
  return document.createElement(type);
}

function patchProp(el, key, val) {
  // 先写一个具体的再来优化
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, val);
  } else {
    el.setAttribute(key, val);
  }
}

function insert(el, parent) {
  parent.append(el);
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
});

export const createApp = (...args) => {
  return renderer.createApp(...args);
};

export * from '../runtime-core';
