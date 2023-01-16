## Modal

## 1 实例

```jsx
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Form, Input } from "antd";
import { Modal, Button, ModalStore } from "antd-mobx-components";

const { Item } = Form;
const [form] = Form.useForm();
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
    }, 2000);
  });
};

const store = new ModalStore({
  onOpen: async (values) => {
    await getDetail();
    form.setFieldsValue({
      name: Math.random(),
    });
    return {
      name: "",
    };
  },
  onOk: async (openValues) => {
    const values = await form.validateFields();
    await submitData(values, openValues);
    store.close();
  },
  onOk: (openValues) => {
    return form
      .validateFields()
      .then((values) => {
        return submitData(values, openValues);
      })
      .then(() => {
        store.close();
      });
  },
});

function Index() {
  return (
    <>
      <Modal store={store} title="编辑">
        <Form form={form}>
          <Item
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Item>
        </Form>
      </Modal>
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
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

## 2 API

| 属性  | 说明            | 类型 | 默认值 | 是否必须 |
| ----- | --------------- | ---- | ------ | -------- |
| store | ModalStore 实例 |      |        | 是       |

其他 API 参考 antd-Modal 组件文档
