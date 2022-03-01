## Export

## 实例

```jsx
import React, { useState, useRef } from "react";
import { Export } from "antd-mobx-components";
import { http } from "js-common-library";
import { Button, Card } from "antd";

http.setConfig({
  headers: {
    "token": 123
  },
});

function Index() {
  return (
    <>
      <Export
        url=""
        name="ABC.xlsx"
        params={{ cityCode: "0512" }}
      ></Export>
    </>
  );
}
export default Index;
```

## API

| 属性   | 说明         | 类型   | 默认值    | 是否必须 |
| ------ | ------------ | ------ | --------- | -------- |
| url    | 导出接口 url | string |           | 是       |
| name   | 导出文件名   | string | 文件.xlsx |          |
| params | 导出条件     | object |           |          |

其他 API 参考 antd-Button 组件文档
