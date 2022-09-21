
import { createRenderer } from '../runtime-core/renderer'
import { isOn } from '../shared';

function createElement(type: any) {
  console.log(type, 'createElement--------')
  return document.createElement(type)
}

function patchProp(el: any, key: any, val: any) {
  console.log(el, 'patchProp-------------------')
  
  if (isOn(key)) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, val);
  } else {
    el.setAttribute(key, val);
  }
}

function insert(el: any, parent: any) {
  console.log(el, 'insert----------------')
  parent.append(el)

}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert
})

export function createApp(...argus) {
  return renderer.createApp(...argus)
}

export * from "../runtime-core"