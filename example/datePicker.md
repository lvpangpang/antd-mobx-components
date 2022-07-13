## DatePicker

## 实例

```jsx
import React, { useState, useRef } from "react";
import { DatePicker, Select } from "antd-mobx-components";

const { RangePicker } = DatePicker;

function Index() {
  return (
    <>
      <p>时间范围选择</p>
      <RangePicker
        addonBefore={
          <Select style={{ width: 100 }} allowClear={false}>
            <Option value={0}>A日期</Option>
            <Option value={1}>B日期</Option>
          </Select>
        }
      ></RangePicker>
      <br />
      <p>时间选择</p>
      <DatePicker
        addonBefore={
          <Select style={{ width: 100 }} allowClear={false}>
            <Option value={0}>A日期</Option>
            <Option value={1}>B日期</Option>
          </Select>
        }
      ></DatePicker>
    </>
  );
}
export default Index;
```

## API

| 属性      | 说明     | 类型       | 默认值 | 是否必须 |
| --------- | -------- | ---------- | ------ | -------- |
| addonBefore | 类型集合 | React Node |        |          |

其他 API 参考 antd-DatePicker 组件文档
