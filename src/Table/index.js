import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Table } from "antd";

function myTable(props) {
  const { columns, store } = props;
  const tableStore = store;
  if (tableStore && tableStore.$storeName !== "TABLE_STORE") {
    console.error("store属性必须为TableStore的实例");
    return null;
  }

  const { list, loading, pagination, paging } = tableStore;

  useEffect(() => {
    tableStore.search();
  }, [tableStore]);

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      onChange={paging}
    ></Table>
  );
}

export default observer(myTable);
