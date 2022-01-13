# Table

## 实例

```jsx
import React from "react";
import { Input, Select, DatePicker } from "antd";
import { getRandomStr } from "js-common-library";
import { SearchBar, TableStore, Table } from "antd-mobx-components";

function getList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: new Array(20).fill("").map((item, index) => ({
          id: index,
          name: getRandomStr(),
          age: getRandomStr(),
          height: getRandomStr(),
          date: getRandomStr(),
        })),
        total: 20,
      });
    }, 1000);
  });
}

class Store {
  $table = new TableStore({
    fetchList: async (params) => {
      params = {
        ...params,
        time: 987987987987,
      };
      console.log(params);
      const { list, total } = await getList(params);
      return {
        list,
        total,
      };
    },
  });
}

const store = new Store()

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => {
      return "删除";
    },
  },
];
const { Item } = SearchBar;
const { Option } = Select;

export default function Index() {
  return (
    <>
      <SearchBar
        store={store}
        itemCol={{span: 6}}
        initialValues={{
          name: "吕肥肥",
        }}
      >
        <Item name="name" label="姓名">
          <Input />
        </Item>
        <Item name="age" label="年龄">
          <Input />
        </Item>
        <Item name="fruit" label="喜欢的水果" col={{span: 12}}>
          <Select>
            <Option key="1">西瓜</Option>
            <Option key="2">橘子</Option>
            <Option key="3">苹果</Option>
          </Select>
        </Item>
        <Item name="idCard" label="身份证">
          <Input />
        </Item>
        <Item name="time" label="时间">
          <DatePicker />
        </Item>
      </SearchBar>
      <Table store={store} columns={columns} />
    </>
  );
}
```

## API

| 属性  | 说明                        | 类型   | 默认值 |
| ----- | --------------------------- | ------ | ------ |
| store | TableStore 实例对象（必须） | object | null   |

其他 API 参考 antd-Table 组件文档

## 接口

通过重写 store.fetchList 方法来发搜索请求， 必须返回 list 以及 total 属性
