export const enum ShapeFlags {
  // 最底层元素
  ELEMENT = 1,
  // 组件
  STATEFUL_COMPONENTS = 1 << 2,
  // children是text
  TEXT_CHILDREN = 1 << 3,
  // children是array
  ARRAY_CHILDREN = 1 << 4,
  // children是slot
  SLOT_CHILDREN = 1 << 5,
}
