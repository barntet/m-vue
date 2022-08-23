// 组件类型
export const enum ShapeFlags {
  // 最后要渲染的element类型
  ELEMENT = 1, // 1 1 000001
  // 组件类型
  STATEFUL_COMPONENT = 1 << 2,  // 左移动2位 4 000100
  // VNode的children位string类型
  TEXT_CHILDREN = 1 << 3,       // 左移动3位 8 001000    
  // vnode的children为array类型
  ARRAY_CHILDREN = 1 << 4,      // 左移动4位 16 010000    
  // vnode的children为slot类型
  SLOTS_CHILDREN = 1 << 5,      // 左移动5位 32 100000    
}
