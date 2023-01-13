# Select

## 1 实例

自带全选功能的下拉选择组件

```jsx
import React, { useState } from "react"
import { Select } from "antd-mobx-components"

const { Option } = Select

export default function Index() {
  const [value, setValue] = useState()
  return (
    <Select
      showAll
      style={{ width: 200 }}
      value={value}
      mode="multiple"
      checkAllAction
      placeholder="请选择"
      options={[
        {
          key: "1",
          label: "吕肥肥",
        },
        {
          key: "2",
          label: "王大熊",
        },
      ]}
      onChange={(e) => {
        console.log(e)
        setValue(e)
      }}
    ></Select>
  )
}
```

## 2 API

| 属性           | 说明                                                          | 类型    | 默认值    |
| -------------- | ------------------------------------------------------------- | ------- | --------- |
| options        | 数据源数组                                                        | 数组    | []        |
| type           | 下拉数据源的 key，比如城市- type="city"（实际开发中推荐用这种最简洁） | 字符串  | undefined |
| showAll        | 是否显示全部                                                  | blooean | false     |
| checkAllAction | 是否开启全选（mode 必须为 multiple 或 tags）                  | blooean |       fasle    |

其他 API 参考 antd-Select 组件文档
