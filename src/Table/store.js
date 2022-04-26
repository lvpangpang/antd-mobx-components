import { makeAutoObservable } from "mobx";
import { omitValues } from "js-common-library";
import SearchStore from "../SearchBar/store";
import { overrideStore } from "../utils";
class TableStore {
  $storeName = "TABLE_STORE";

  constructor(overrides) {
    overrideStore(this, overrides);
    makeAutoObservable(this);
  }

  /* searchBar开始 */
  $searchBarStore = new SearchStore({
    onSearch: () => {
      this.search({ pageNum: 1 }); // 点击搜索页数永远被置为1
    },
  });
  // 此方法是暴露给SearchBar组件使用的，为了获取SearchBar自己的store
  getSearchBarStore = () => {
    return this.$searchBarStore;
  };
  // 获取请求参数
  getParams = () => {
    return this.$searchBarStore.getSearchParams();
  };
  /* searchBar结束 */

  list = [];
  loading = false;

  // 分页相关
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
    serverPagination: true,
    showTotal: (total) => `共 ${total} 条`,
    showQuickJumper: true,
    showSizeChanger: true,
  };
  setPagination = (data) => {
    this.pagination = {
      ...this.pagination,
      ...data,
    };
  };
  getPagination = () => {
    return this.pagination;
  };
  paging = ({ current, pageSize }) => {
    const { serverPagination } = this.getPagination();
    this.setPagination({
      current,
      pageSize,
    });
    // 判断是否需要服务端分页
    if (serverPagination) this.search();
  };

  // 获取最终请求的参数（查询参数+分页参数）
  getFinalParams = () => {
    const searchParams = this.getParams();
    const { current, pageSize } = this.pagination;
    const finalParams = {
      ...searchParams,
      pageNum: current,
      pageSize,
    };
    return omitValues(finalParams);
  };

  // 搜索请求
  search = async (params = {}) => {
    const finalParams = this.getFinalParams();
    const { pageNum } = params;
    if (pageNum) {
      finalParams.pageNum = pageNum;
    }
    try {
      this.loading = true;
      const data = await this.fetchList(finalParams);
      this.afterSearch(data, finalParams);
    } catch (e) {
      this.afterSearch(
        {
          list: [],
          total: 0,
        },
        finalParams
      );
    }
  };

  // 请求结果处理
  afterSearch = (data, finalParams) => {
    const { list, total } = data;
    const { pageNum, pageSize } = finalParams;
    this.setPagination({
      serverPagination: !!total,
      current: pageNum,
      pageSize,
      total: total || list.length,
    });
    this.list = list || [];
    this.loading = false;
  };

  // 业务代码中通过重置该方法发送请求
  fetchList = (params) => {
    return {
      list: [],
      total: 0,
    };
  };
}

export default TableStore;
