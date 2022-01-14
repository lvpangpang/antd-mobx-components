import { makeObservable, runInAction, observable } from 'mobx'
import { omitValues } from 'js-common-library'
import SearchStore from '../SearchBar/store'

function overrideStore(instance, overrides) {
  Object.keys(overrides || {}).forEach((name) => {
    const desc = Object.getOwnPropertyDescriptor(overrides, name)
    if (desc.get) {
      Object.defineProperty(instance, name, desc)
    } else {
      instance[name] = overrides[name]
    }
  })
}

class TableStore {
  $storeName = 'TABLE_STORE'
  constructor(overrides) {
    overrideStore(this, overrides)
    makeObservable(this, {
      list: observable,
      loading: observable,
      pagination: observable,
    })
  }

  /* searchBar开始 */
  $searchBarStore = new SearchStore({
    onSearch: () => {
      this.search() // 点击搜索调用的就是TableStore里面的search方法
    },
  })
  // 此方法是暴露给SearchBar组件使用的，为了获取SearchBar自己的store
  getSearchBarStore = () => {
    return this.$searchBarStore
  }
  // 请求参数，暴露给其他操作使用，比如导出
  getParams = () => {
    const searchParams = this.$searchBarStore.getSearchParams()
    return searchParams
  }
  /* searchBar结束 */

  list = []
  loading = false

  // 分页相关
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total) => `共 ${total} 条`,
    showQuickJumper: true,
    showSizeChanger: true,
  }
  setPagination = (info) => {
    this.pagination = {
      ...this.pagination,
      ...info,
    }
  }
  paging = ({ current, pageSize }) => {
    this.setPagination({
      current,
      pageSize,
    })
    this.search()
  }

  // 获取最终请求的参数（查询参数加分页相关的参数）
  getFinalParams = () => {
    const searchParams = this.$searchBarStore.getSearchParams()
    let finalParams
    const { current, pageSize } = this.pagination
    finalParams = {
      ...searchParams,
      pageNum: current,
      pageSize,
    }
    return omitValues(finalParams)
  }

  // 搜索请求
  search = async () => {
    const finalParams = this.getFinalParams()
    const defaultData = {
      list: [],
      total: 0,
    }
    try {
      this.loading = true
      const data = await this.fetchList(finalParams)
      runInAction(() => {
        this.afterSearch(data || defaultData, finalParams)
      })
    } catch (e) {
      runInAction(() => {
        this.afterSearch(defaultData, finalParams)
      })
    }
  }

  // 请求结果处理
  afterSearch = (data) => {
    let { list, total } = data
    this.setPagination({
      total,
    })
    this.list = list || []
    this.loading = false
  }

  // 重新该方法发请求
  fetchList = () => {
    return {
      list: [],
      total: 0,
    }
  }
}

export default TableStore
