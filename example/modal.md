## Modal

## 实例

```jsx
import React, { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Modal, Button, ModalStore } from "antd-mobx-components";

const getDetail = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const submitData = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const store = new ModalStore({
  onOpen: async (values) => {
    await getDetail();
    return {
      name: "1111",
    };
  },
  onOk: async (values) => {
    console.log(values);
    await submitData(values);
    store.close();
  },
});

function Index() {
  return (
    <>
      <Modal store={store}>
        {JSON.stringify(store.openValues)}
      </Modal>
      <Button
        type="primary"
        onClick={() => {
          store.open({ id: 1 });
        }}
      >
        打开Modal
      </Button>
    </>
  );
}
export default observer(Index);
```

## API

| 属性  | 说明              | 类型 | 默认值 | 是否必须 |
| ----- | ----------------- | ---- | ------ | -------- |
| store | ModalStore实例 |      |        | 是       |

其他 API 参考 antd-Modal 组件文档
