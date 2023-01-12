import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { Table } from "antd"

const titleStyle = {
  cursor: "pointer",
  color: "#1890ff",
  marginLeft: 10,
}

function MyTable(props) {
  const { columns, rowKey = "id", store, selectTable, ...restProps } = props

  const tableStore = store?.$table
  if (tableStore?.$storeName !== "TABLE_STORE") {
    console.error("store属性必须为TableStore的实例")
    return null
  }
  const {
    list,
    loading,
    pagination,
    paging,
    selectedRowKeys,
    setSelected,
    search,
  } = tableStore

  const title = () => {
    return (
      <div>
        <span>已选择{selectedRowKeys?.length || 0}项</span>
        <span
          style={titleStyle}
          onClick={() => {
            setSelected([], [])
          }}
        >
          清空
        </span>
      </div>
    )
  }

  useEffect(() => {
    search()
  }, [tableStore])

  return (
    <Table
      bordered
      loading={loading}
      rowKey={rowKey}
      columns={columns}
      dataSource={list}
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
  )
}

export default observer(MyTable)
