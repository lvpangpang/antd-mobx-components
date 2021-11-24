import { Table } from 'antd'

function myTable({ children, store, ...rest }) {
  return <Table {...rest} pagination={{ showQuickJumper: true, showSizeChanger: true }}></Table>
}

export default myTable
