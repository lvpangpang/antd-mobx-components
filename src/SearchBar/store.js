import { makeAutoObservable } from "mobx";
import { omitValues } from "js-common-library";
import { overrideStore } from "../utils";
class SearchStore {
  
  $storeName = "SEARCHBAR_STORE";
  constructor(overrides) {
    overrideStore(this, overrides);
    makeAutoObservable(this);
  }

  /* 
    from
  */
  form = null;
  setFormInstance = (form) => {
    this.form = form;
  };
  getFormInstance = () => {
    return this.form;
  };

  /* 
    搜索条件 
  */
  searchParams = {};
  setSearchParams = (params) => {
    this.searchParams = omitValues(params);
  };
  getSearchParams = () => {
    this.setSearchParams(this.getFormInstance().getFieldsValue());
    return this.searchParams;
  };

  /* 
    操作
  */
  reset = () => {
    this.setSearchParams({});
    this.getFormInstance().resetFields();
  };
  search = () => {
    this.getSearchParams();
    this.onSearch(this.searchParams);
  };

  /* 
    实例请求 
  */
  onSearch = () => {};
}

export default SearchStore;
