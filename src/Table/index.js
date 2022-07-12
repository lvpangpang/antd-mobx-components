import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Table } from "antd";

const style = {
  cursor: "pointer",
  color: "#1890ff",
  marginLeft: 10,
};
function MyTable(props) {
  const { columns, rowKey = "id", store, selectTable, ...restProps } = props;
  const tableStore = store?.$table;
  if (tableStore?.$storeName !== "TABLE_STORE") {
    console.error("store属性必须为TableStore的实例");
    return null;
  }
  const title = () => {
    return (
      <div className="">
        <span>已选择{selectedRowKeys?.length || 0}项</span>
        <span
          style={style}
          onClick={() => {
            setSelected([], []);
          }}
        >
          清空
        </span>
      </div>
    );
  };

  const {
    list,
    loading,
    pagination,
    paging,
    selectedRowKeys,
    setSelected,
  } = tableStore;

  useEffect(() => {
    tableStore.search();
  }, [tableStore]);

  return (
    <Table
      bordered
      rowKey={rowKey}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      onChange={paging}
      title={selectTable ? title : undefined}
      rowSelection={
        selectTable
          ? {
              selectedRowKeys,
              onChange: setSelected,
              ...selectTable,
            }
          : undefined
      }
      {...restProps}
    ></Table>
  );
}

export default observer(MyTable);
