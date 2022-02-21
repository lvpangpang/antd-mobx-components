## Upload

## 实例

```jsx
import React, { useState, useRef } from "react";
import { Upload } from "antd-mobx-components";
import { http } from "js-common-library";
import { Button, Card } from "antd";

http.setConfig({
  headers: {
    contextId: "dss",
    "skio-token":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3NzX2F1dGhfaXNzdWVyIiwiY29udGV4dElkIjoiZHNzIiwiZXhwIjoxNjQ1NDU3NTkzLCJ1c2VySWQiOjcxMn0.baSf5nsT-Wskik3wXYUFVn_4PFnCSGY1oYbK5QzjNbM",
  },
});

function Index() {
  const ref = useRef();
  const [value, setValue] = useState([
    {
      name:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChange = (fileList) => {
    setValue(fileList);
  };

  const ref1 = useRef();
  const [value1, setValue1] = useState([]);
  const onChange1 = (fileList) => {
    setValue1(fileList);
  };

  const ref2 = useRef();
  const [value2, setValue2] = useState([]);
  const onChange2 = (fileList) => {
    setValue2(fileList);
  };

  // 获取sts
  const getConfig = async () => {
    const { data } = await http.get(
      "https://qa01web-gateway.lingxichuxing.com/owlc/v1/aliyun/oss/sts/token"
    );
    return data;
  };
  return (
    <>
      <Card title="上传单张图片">
        <Upload
          ref={ref}
          dirname="driver"
          accept="image/png, image/jpeg"
          value={value}
          onChange={onChange}
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
            console.log(ref.current);
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
          value={value1}
          onChange={onChange1}
          getOSSConfig={getConfig}
          maxCount={5}
        ></Upload>
        <br />
        <Button
          type="primary"
          onClick={() => {
            console.log(ref1.current);
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
          value={value2}
          onChange={onChange2}
          getOSSConfig={getConfig}
          maxCount={2}
          maxSize={1 * 1024 * 1024}
        ></Upload>
        <br />
        <Button
          type="primary"
          onClick={() => {
            console.log(ref2.current);
          }}
        >
          获取上传文件对象
        </Button>
      </Card>
    </>
  );
}
export default Index;
```

## API

| 属性         | 说明                                                  | 类型     | 默认值 | 是否必须 |
| ------------ | ----------------------------------------------------- | -------- | ------ | -------- |
| value        | fileList 值（数组）                                   | Array    | []     | 是       |
| onChange     | 设置 fileList 的值                                    | function |        | 是       |
| maxSize      | 单个文件最大（2 * 1024*1024）                         | number   |        |
| maxCount     | 文件总数                                              | number   | 1      |          |
| diename      | 上传文件所在的文件夹                                  | string   |        |          |
| getOSSConfig | 获取阿里云 sts 配置 ，需要返回 Promise                | function |        |          |
| imgLimit     | 图片限制，目前支持 width, height, maxWidth, maxHeight | object   |        |          |

其他 API 参考 antd-Select 组件文档
