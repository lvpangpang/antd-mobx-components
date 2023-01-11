import { isFun } from 'js-common-library'

// 重写store字段
export function overrideStore(instance, overrides) {
  Object.keys(overrides || {}).forEach((name) => {
    instance[name] = overrides[name];
  });
}

// 重置store变量
export function resetStore(self, Store) {
  if (self && Store) {
    const proto = Object.getPrototypeOf(Store);
    const ownPropsName = Object.getOwnPropertyNames(Store);
    const protoName = Object.getOwnPropertyNames(proto);
    const allProps = ownPropsName.concat(protoName);
    allProps.forEach((name) => {
      if (!isFun(Store[name]) && self[name] !== Store[name]) {
        if (self[name]?.$storeName) {
          self[name]?.resetStore();
        } else {
          self[name] = Store[name];
        }
      }
    });
  }
}
