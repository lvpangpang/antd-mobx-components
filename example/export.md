## Export

## 实例

```jsx
import React, { useState, useRef } from "react";
import { Export } from "antd-mobx-components";
import { http } from "js-common-library";
import { Button, Card } from "antd";

http.setConfig({
  headers: {
    "skio-token": 'eJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3NzX2F1dGhfaXNzdWVyIiwiY29udGV4dElkIjoiZHNzIiwiZXhwIjoxNjQ5OTQ2NDI3LCJ1c2VySWQiOjcxMn0.ubrM2zQG-GYwu076b8D-mXhyWguBaaeXE3lxQfe0ezs',
    contextid: 'dss'
  },
});

function Index() {
  return (
    <>
      <Export
        url="https://qa01web-gateway.lingxichuxing.com/capacity-backstage/v1/car_type/page/export"
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
