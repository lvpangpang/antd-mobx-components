## AppLayout

## 实例

```jsx
import React, { useState, useEffect } from "react";
import { AppLayout } from "antd-mobx-components";
import { http } from "js-common-library";
import { Button, Card } from "antd";

http.setConfig({
  headers: {
    contextId: "dss",
    "skio-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3NzX2F1dGhfaXNzdWVyIiwiY29udGV4dElkIjoiZHNzIiwiZXhwIjoxNjQ1NTUzODI3LCJ1c2VySWQiOjcxMn0.qkkteSO3ULRK5SGfNfPsVrUimuPsdG8hGw9YVoq9JTg",
  },
});

function Index() {
  const [data, setData] = useState({})
  useEffect(async () => {
    const data = await http.get('https://qa01web-gateway.lingxichuxing.com/saas/v1/user/current_user_permission')
    setData(data.data)
    console.log(data.data)
  }, [])
  return (
    <>
      <AppLayout menuConfig={data.menus}></AppLayout>
    </>
  );
}
export default Index;
```

## API

| 属性   | 说明         | 类型   | 默认值    | 是否必须 |
| ------ | ------------ | ------ | --------- | -------- |


