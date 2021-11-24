import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Form, Button, Row, Col } from 'antd'
import { SearchOutlined, EditOutlined } from '@ant-design/icons'

import SearchStore from './store'

const Item = Form.Item

const Style = {
  button: {
    marginLeft: '8px',
  },
}

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
}

function SearchItem({ col = 6, children, ...rest }) {
  return (
    <Col span={col}>
      <Item {...rest}>{children}</Item>
    </Col>
  )
}

function SearchBar({ children, cache = true, store, extra = [], ...rest }) {
  const [form] = Form.useForm()

  const handleSearch = () => {
    const params = form.getFieldsValue()
    SearchStore.setParams(params)
    store.fetchList(params)
  }

  const handleRest = () => {
    SearchStore.setParams({})
    form.resetFields()
  }

  useEffect(() => {
    form.setFieldsValue(SearchStore.params)
    return () => {
      if(!cache) {
        SearchStore.setParams({})
      }
    }
  }, [])

  return (
    <Form form={form} {...layout} {...rest}>
      <Row>{children}</Row>
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          icon={<SearchOutlined />}
          onClick={handleSearch}
          style={Style.button}
        >
          搜索
        </Button>
        <Button icon={<EditOutlined />} style={Style.button} onClick={handleRest}>
          清空
        </Button>
        {extra.map((item, index) => {
          return (
            <span style={Style.button} key={index}>
              {item}
            </span>
          )
        })}
      </div>
    </Form>
  )
}

SearchBar.Item = SearchItem
export default observer(SearchBar)
