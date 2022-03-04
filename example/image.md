## Image

## 实例

```jsx
import React, { useState, useRef } from "react";
import { Card } from "antd";
import { Image } from "antd-mobx-components";

const { PreviewGroup } = Image;
function Index() {
  return (
    <>
      <Card title="一张图片">
        <Image
          src="https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg"
          width={200}
        ></Image>
      </Card>
      <Card title="多张图片" style={{ marginTop: 30 }}>
        <PreviewGroup>
          <Image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            width={200}
          ></Image>
          <Image
            src="http://static.runoob.com/images/demo/demo2.jpg"
            width={200}
          ></Image>
          <Image
            src="https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg"
            width={200}
          ></Image>
        </PreviewGroup>
      </Card>
    </>
  );
}
export default Index;
```

## API

参考rc-image文档
