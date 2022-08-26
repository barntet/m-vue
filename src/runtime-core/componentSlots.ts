import { ShapeFlags } from '../shared/shapeFlags';

export function initSlots(instance: any, children: any) {
  if (instance.vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
}

function normalizeSlotValue(value: any) {
  return Array.isArray(value) ? value : [value];
}

function normalizeObjectSlots(children: any, slots: any) {
  for (const key in children) {
    const value = children[key];
    slots[key] = (props: any) => normalizeSlotValue(value(props));
  }
}
