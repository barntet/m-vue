import { camelize, toHandlerKey } from '../shared/index';

export function emit(instance: any, event: any, ...argus: any) {
  const { props } = instance;

  // TPP 先写一个具体的 再来优化通用的

  const handler = props[toHandlerKey(camelize(event))];

  if (handler) {
    handler(...argus);
  }
}
