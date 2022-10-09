# Button

## 1 实例

```jsx
import React, { useState, useRef } from "react"
import { Button } from "antd-mobx-components"

function Index() {
  return (
    <>
      <Button
        onClick={() => {
          console.log("吕肥肥")
        }}
      >
        点我
      </Button>
      <br />
      <br />
      <Button
        type="primary"
        onClick={() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("吕肥肥")
            }, 1000)
          })
        }}
      >
        点我(Promise)
      </Button>
      <br />
      <br />
      <Button to="/abc">跳转到/abc</Button>
    </>
  )
}
export default Index
```

## 2 API

| 属性 | 说明     | 类型   | 默认值 | 是否必须 |
| ---- | -------- | ------ | ------ | -------- |
| to   | 跳转 url | string |        | 是       |

**onClick 传入的如果是 Promise，那么 Button 组件会自动 loading，并且在 Promise 执行完成后自动关闭 loading**  
其他 API 参考 antd-Button 组件文档
