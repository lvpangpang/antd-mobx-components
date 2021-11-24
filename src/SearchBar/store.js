import { makeAutoObservable } from 'mobx'

class SearchStore {
  constructor() {
    makeAutoObservable(this)
  }

  params = {}
  setParams = (data) => {
    this.params = data
  }
  
}

export default new SearchStore()
