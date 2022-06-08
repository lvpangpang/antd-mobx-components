import { makeAutoObservable } from "mobx";
import { omitValues } from "js-common-library";
import { overrideStore } from '../utils'
class SearchStore {
  $storeName = "SEARCHBAR_STORE";
  
  constructor(overrides) {
    overrideStore(this, overrides);
    makeAutoObservable(this);
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
    this.getFormInstance().resetFields(); // 这样才能视图同步清除
  };
  search = () => {
    this.getSearchParams();
    this.onSearch(this.searchParams);
  };

  // 实例覆盖这个方法来发生请求
  onSearch = () => {};
}

export default SearchStore;
