import { makeObservable } from "mobx";
import { omitValues } from "js-common-library";

// Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符。
// （自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
function overrideStore(instance, overrides) {
  Object.keys(overrides || {}).forEach((name) => {
    const desc = Object.getOwnPropertyDescriptor(overrides, name);
    if (desc.get) {
      Object.defineProperty(instance, name, desc);
    } else {
      instance[name] = overrides[name];
    }
  });
}
class SearchStore {
  $storeName = "SEARCHBAR_STORE";
  constructor(overrides) {
    overrideStore(this, overrides);
    makeObservable(this, {});
  }

  // form相关
  form = null;
  setFormInstance = (form) => {
    this.form = form;
  };
  getFormInstance = () => {
    return this.form;
  };
  
  // 搜索条件
  searchParams = {};
  setSearchParams = (params) => {
    this.searchParams = omitValues(params);
  };
  getSearchParams = () => {
    this.setSearchParams(this.getFormInstance().getFieldsValue());
    return this.searchParams;
  };

  // 动作
  reset = () => {
    this.setSearchParams({});
    this.form.resetFields(); // 这样才能视图同步清除
  };
  search = () => {
    this.getSearchParams();
    this.onSearch(this.searchParams);
  };

  onSearch = () => {};
}

export default SearchStore;
