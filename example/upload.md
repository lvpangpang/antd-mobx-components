## Upload

## 1 实例

```jsx
import React, { useState, useRef } from "react"
import { Upload } from "antd-mobx-components"
import { http } from "js-common-library"
import { Button, Card } from "antd"

http.setConfig({
  headers: {
    contextId: "dss",
    "skio-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3NzX2F1dGhfaXNzdWVyIiwiY29udGV4dElkIjoiZHNzIiwiZXhwIjoxNjY1NDI4MjE1LCJ1c2VySWQiOjcxMn0.M0YzhHFIx68WnBmdWyt3x6taTjLB78wC_qd70GbEg8c",
  },
})

function Index() {
  const ref0 = useRef()
  const ref1 = useRef()
  const ref2 = useRef()

  // 获取sts
  const getConfig = async () => {
    const { data } = await http.get(
      "https://qa01web-gateway.lingxichuxing.com/owlc/v1/aliyun/oss/sts/token"
    )
    return data
  }
  return (
    <>
      <Card title="上传单张图片">
        <Upload
          ref={ref0}
          dirname="driver"
          accept="image/png, image/jpeg"
          fileList={[
            {
              name:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              url:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            },
          ]}
          getOSSConfig={getConfig}
          maxCount={1}
          imgLimit={{
            maxWidth: 1000,
          }}
        ></Upload>
        <br />
        <Button
          type="primary"
          onClick={() => {
            console.log(ref0.current)
          }}
        >
          获取上传文件对象
        </Button>
      </Card>

      <br />

      <Card title="最多上传5张图片">
        <Upload
          ref={ref1}
          dirname="driver"
          accept="image/png, image/jpeg"
          getOSSConfig={getConfig}
          maxCount={5}
        ></Upload>
        <br />
        <Button
          type="primary"
          onClick={() => {
            console.log(ref1.current)
          }}
        >
          获取上传文件对象
        </Button>
      </Card>

      <br />
      <Card title="最多上传2個文件，单个文件最大1M">
        <Upload
          ref={ref2}
          listType="text"
          dirname="driver"
          getOSSConfig={getConfig}
          maxCount={2}
          maxSize={1 * 1024 * 1024}
        ></Upload>
        <br />
        <Button
          type="primary"
          onClick={() => {
            console.log(ref2.current)
          }}
        >
          获取上传文件对象
        </Button>
      </Card>
    </>
  )
}
export default Index
```

## 2 API

| 属性         | 说明                                                          | 类型     | 默认值 | 是否必须 |
| ------------ | ------------------------------------------------------------- | -------- | ------ | -------- |
| ref          | Upload 实例，通过和这个对象可以直接获取上传后的 fileList 对象 |          |        | 必须     |
| maxSize      | 单个文件最大（2 * 1024*1024）                                 | number   |        |
| maxCount     | 文件总数                                                      | number   | 1      |          |
| dirname      | 上传文件所在的文件夹                                          | string   |        |          |
| getOSSConfig | 获取阿里云 sts 配置 ，需要返回 Promise                        | function |        |    必须      |
| imgLimit     | 图片限制，目前支持 width, height, maxWidth, maxHeight         | object   |        |          |

其他 API 参考 antd-Upload 组件文档
