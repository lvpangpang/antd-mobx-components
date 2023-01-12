import { makeAutoObservable } from "mobx"
import { omitValues } from "js-common-library"
import SearchStore from "../SearchBar/store"
import { overrideStore } from "../utils"
class TableStore {
  $storeName = "TABLE_STORE"
  constructor(overrides) {
    overrideStore(this, overrides)
    makeAutoObservable(this)
  }

  /* 
    searchBar 实例
  */
  $searchBarStore = new SearchStore({
    onSearch: () => {
      this.search({ pageNum: 1 }) // 点击搜索调用TableStore的search方法，点击搜索页数永远被置为1
    },
  })
  getSearchBarStore = () => {
    return this.$searchBarStore
  }
  getParams = () => {
    return this.$searchBarStore.getSearchParams()
  }

  /* 
    列表分页 
  */
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
    serverPagination: true,
    showTotal: (total) => `共 ${total} 条`,
    showQuickJumper: true,
    showSizeChanger: true,
  }
  setPagination = (data) => {
    this.pagination = {
      ...this.pagination,
      ...data,
    }
  }
  getPagination = () => {
    return this.pagination
  }
  paging = ({ current, pageSize }) => {
    const { serverPagination } = this.getPagination()
    this.setPagination({
      current,
      pageSize,
    })
    // 判断是否需要服务端分页
    if (serverPagination) this.search()
  }

  /*  
    请求 
  */
  list = []
  loading = false
  getFinalParams = () => {
    const searchParams = this.getParams()
    const { current, pageSize } = this.pagination
    const finalParams = {
      ...searchParams,
      pageNum: current,
      pageSize,
    }
    return omitValues(finalParams)
  }
  search = async (params = {}) => {
    const { pageNum } = params
    const finalParams = this.getFinalParams()
    if (pageNum) {
      finalParams.pageNum = pageNum
    }
    try {
      this.loading = true
      const data = await this.fetchList(finalParams)
      this.afterSearch(data, finalParams)
    } catch (e) {
      this.afterSearch(
        {
          list: [],
          total: 0,
        },
        finalParams
      )
    }
  }
  afterSearch = (data, finalParams) => {
    const { list, total } = data
    const { pageNum, pageSize } = finalParams
    this.setPagination({
      serverPagination: !!total,
      current: pageNum,
      pageSize,
      total: total || list.length,
    })
    this.list = list || []
    this.loading = false
  }
  fetchList = () => {
    return {
      list: [],
      total: 0,
    }
  }

  /* 
    列表选择 
  */
  selectedRowKeys = []
  selectedRows = []
  setSelected = (keys, selectedRows) => {
    this.selectedRowKeys = keys
    this.selectedRows = selectedRows
  }
  getSelected = () => {
    return {
      rows: this.selectedRows,
      keys: this.selectedRowKeys,
    }
  }
  clearSelected = () => {
    this.selectedRowKeys = []
    this.selectedRows = []
  }
}

export default TableStore
