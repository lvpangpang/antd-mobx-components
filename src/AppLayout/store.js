import { makeAutoObservable } from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this);
  }
  topId = null;
  setTopId = (id) => {
    this.topId = id;
  };
  
  sideNavMenu = []
  setSideNavMenu = (list) => {
    console.log(list)
    this.sideNavMenu = list
  }
}

export default new Store()