import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Table } from 'antd'

function myTable(props) {
  const { columns, store, ...restProps } = props
  const tableStore = store.$table // 注意这里的$table
  if (tableStore && tableStore.$storeName !== 'TABLE_STORE') {
    console.error('store属性必须为TableStore的实例')
    return null
  }
  const { rowKey, list, loading, pagination, paging } = tableStore
  useEffect(() => {
    tableStore.search()
  }, [tableStore])

  return (
    <Table
      bordered
      rowKey={rowKey || 'id'}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      onChange={paging}
      {...restProps}
    ></Table>
  )
}

export default observer(myTable)
