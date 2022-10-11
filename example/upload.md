## Upload

## 1 实例

```jsx
import React, { useState, useRef } from "react"
import { Upload } from "antd-mobx-components"
import { http } from "js-common-library"
import { Button, Card, Form } from "antd"

const { Item } = Form

http.setConfig({
  headers: {
    contextId: "dss",
    "skio-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3NzX2F1dGhfaXNzdWVyIiwiY29udGV4dElkIjoiZHNzIiwiZXhwIjoxNjY1NDk3NzA0LCJ1c2VySWQiOjcxMn0.TWn5rCjhIXGUir1eowqIUf-tKHoyQvVW_H_j9_1yvZM",
  },
})

function Index() {
  const ref0 = useRef()
  const [form] = Form.useForm()

  // 获取sts
  const getConfig = async () => {
    const { data } = await http.get(
      "https://qa01web-gateway.lingxichuxing.com/owlc/v1/aliyun/oss/sts/token"
    )
    return data
  }

  const submit = async () => {
    const res = await form.validateFields()
    console.log(res)
  }
  return (
    <>
      <Card title="上传图片" style={{ marginBottom: 30 }}>
        <Upload
          ref={ref0}
          dirname="driver"
          accept="image/png, image/jpeg"
          value={[
            {
              name:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              url:
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            },
          ]}
          getOSSConfig={getConfig}
          maxCount={3}
        ></Upload>
        <br />
        <Button
          type="primary"
          onClick={() => {
            console.log(ref0.current.fileList)
          }}
        >
          获取上传文件对象
        </Button>
      </Card>

      <Card title="Form上传图片">
        <Form form={form}>
          <Item
            name="uploadImg"
            label="备注图片"
            extra={"图片最多可添加2张，大小不得大于4M，支持jpg、png、jpeg格式"}
            rules={[
              {
                required: true,
                message: "请上传图片",
              },
            ]}
            initialValue={[
              {
                name:
                  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                url:
                  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              },
            ]}
          >
            <Upload
              getOSSConfig={getConfig}
              maxCount={2}
              maxSize={4 * 1024 * 1024}
              dirname="driver"
              accept="image/jpg, image/png, image/jpeg"
            />
          </Item>
        </Form>
        <Button type="primary" onClick={submit}>
          提交处理
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
| ref          | Upload 实例，通过和这个对象可以直接获取上传后的 fileList 对象 |          |        |      |
| maxSize      | 单个文件最大（2 * 1024*1024）                                 | number   |        |
| maxCount     | 文件总数                                                      | number   | 1      |          |
| dirname      | 上传文件所在的文件夹                                          | string   |        |          |
| getOSSConfig | 获取阿里云 sts 配置 ，需要返回 Promise                        | function |        | 必须     |
| imgLimit     | 图片限制，目前支持 width, height, maxWidth, maxHeight         | object   |        |          |

其他 API 参考 antd-Upload 组件文档
