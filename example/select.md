## Select

### 默认配置

```jsx
import React, { useState } from 'react'
import { Select } from '../src'

const { Option } = Select

const data = [
  {
    key: 1,
    label: 'A'
  },
  {
    key: 2,
    label: 'B'
  },
  {
    key: 3,
    label: 'C'
  }
]
export default function Index() {
  return (
    <Select
      style={{ width: 180 }}
      placeholder="请选择"
      onChange={(data) => {
        console.log(data)
      }}
      onSearch={(data) => {
        console.log(data)
      }}
      data={data}
    >
    </Select>
  )
}
```

### 全选

```jsx
import React, { useState } from 'react'
import { Select } from '../src'

const { Option } = Select

const data = [
  {
    key: 1,
    label: 'A'
  },
  {
    key: 2,
    label: 'B'
  },
  {
    key: 3,
    label: 'C'
  }
]
export default function Index() {

  const [selectList, setSelectList] = useState([])
  return (
    <Select
      style={{ width: 180 }}
      placeholder="请选择"
      allowClear
      onChange={(data) => {
        setSelectList(data)
        console.log(data)
      }}
      mode="multiple"
      data={data}
      showAll
      allChange={(data) => {
        setSelectList(data)
      }}
      value={selectList}
    >
    </Select>
  )
}
```
