import { makeAutoObservable } from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  topId = null;
  setTopId = (id) => {
    this.topId = id;
  };

  menuConfig = [];
  setMenuConfig = (list) => {
    this.menuConfig = list;
  };

  sideNavMenu = [];
  setSideNavMenu = (list) => {
    this.sideNavMenu = list;
  };

  openKeys = [];
  setOpenKeys = (list) => {
    this.openKeys = list;
  };

  selectedKeys;
  setSelectedKeys = (id) => {
    this.selectedKeys = id;
  };
  
  siderClick = (history, data) => {
    this.setSelectedKeys(data?.id);
    history.push(data?.path);
  };
}

export default new Store();
