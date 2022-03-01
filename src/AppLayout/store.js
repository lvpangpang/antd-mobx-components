import { makeAutoObservable } from "mobx";

class Store {
  constructor() {
    makeAutoObservable(this)
  }
  topId = null
  setTopId = (id) => {
    this.topId = id
  }

  menuConfig = []
  setMenuConfig = (list) => {
    this.menuConfig = list

  }

  sideNavMenu = []
  setSideNavMenu = (list) => {
    this.sideNavMenu = list
  }

  openIdList = []
  setOpenIdList = (list) => {
    this.openIdList = list
  }

  siderId
  setSiderId = (id) => {
    this.siderId = id
  }
  siderClick = (history, data) => {
    this.setSiderId(data.id)
    history.push(data?.path)
  }
}

export default new Store()