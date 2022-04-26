import { isFun } from 'js-common-library'

// 重写store方法
export function overrideStore(instance, overrides) {
  Object.keys(overrides || {}).forEach((name) => {
    instance[name] = overrides[name];
  });
}

// 重置store变量
export function resetStore(self, Instance) {
  if (self && Instance) {
    const store = Instance;
    const proto = Object.getPrototypeOf(store);
    const ownPropsName = Object.getOwnPropertyNames(store);
    const protoName = Object.getOwnPropertyNames(proto);
    const allProps = ownPropsName.concat(protoName);
    allProps.forEach((name) => {
      if (!isFun(store[name]) && self[name] !== store[name]) {
        if (self[name]?.$storeName) {
          self[name]?.resetStore();
        } else {
          self[name] = store[name];
        }
      }
    });
  }
}
