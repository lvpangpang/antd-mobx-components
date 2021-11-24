## SearchBar

### 默认配置

```jsx
import React from 'react'
import { Input, DatePicker, Button } from 'antd'
import { SearchBar, Select } from '../src'

const { Item } = SearchBar

class Store {
  fetchList = async (params) => {
    console.log(params)
  }
}
const store = new Store()

export default function Index() {
  return (
    <SearchBar store={store}>
      <Item label="发票抬头" name="invoiceTitle">
        <Input />
      </Item>
      <Item label="发票税号" name="customerIdentifier">
        <Input />
      </Item>
      <Item label="审核状态" name="auditStatus">
        <Select></Select>
      </Item>
      <Item label="执行状态" name="executeStatus">
        <Select></Select>
      </Item>
    </SearchBar>
  )
}
```
### 个性化配置

```jsx
import React from 'react'
import { Input, DatePicker, Button } from 'antd'
import { SearchBar, Select } from '../src'

const { Item } = SearchBar

class Store {
  fetchList = async (params) => {
    console.log(params)
  }
}
const store = new Store()

export default function Index() {
  return (
    <SearchBar
      store={store}
      extra={[<Button>导出</Button>]}
      initialValues={{
        name: '吕肥肥',
      }}
    >
      <Item label="名字" name="name">
        <Input />
      </Item>
      <Item label="城市" name="city">
        <Input />
      </Item>
    </SearchBar>
  )
}
```
