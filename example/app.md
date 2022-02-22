## App

## 实例

```jsx
import React, { useState, useEffect } from "react";
import { App } from "antd-mobx-components";
import { http } from "js-common-library";
import { Button, Card } from "antd";

http.setConfig({
  headers: {
    contextId: "dss",
    "skio-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3NzX2F1dGhfaXNzdWVyIiwiY29udGV4dElkIjoiZHNzIiwiZXhwIjoxNjQ1NTM5MDUyLCJ1c2VySWQiOjcxMn0.g43wn0-yQBBuyGad9CHmQt1L8r5I32j8mHCOff577FA",
  },
});

function Index() {
  const [id, setId] = useState(null)
  useEffect(() => {
    setTimeout(() => {
      setId(1)
    }, 1000)
  }, [])
  return (
    <>
      <App id={id}>吕肥肥</App>
    </>
  );
}
export default Index;
```

## API

| 属性   | 说明         | 类型   | 默认值    | 是否必须 |
| ------ | ------------ | ------ | --------- | -------- |
| url    | 导出接口 url | string |           | 是       |

