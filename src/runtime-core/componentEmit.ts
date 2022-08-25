import { camelize, toHandleKey } from '../shared/index';

export function emit(instance: any, event: any, ...argus: any) {
  const { props } = instance;

  const handler = props[toHandleKey(camelize(event))];

  if (handler) {
    handler(...argus);
  }
}
