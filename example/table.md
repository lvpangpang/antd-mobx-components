# Table

## 实例

```jsx
import React from "react";
import { Input, Select, DatePicker, Card, Button } from "antd";
import { getRandomStr } from "js-common-library";
import { SearchBar, TableStore, Table } from "antd-mobx-components";

function getList1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: new Array(50).fill("").map((item, index) => ({
          id: index,
          name: getRandomStr(),
          age: getRandomStr(),
          height: getRandomStr(),
          date: getRandomStr(),
        })),
        total: 50,
      });
    }, 1000);
  });
}

function getList2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: new Array(30).fill("").map((item, index) => ({
          id: index,
          name: getRandomStr(),
          age: getRandomStr(),
          height: getRandomStr(),
          date: getRandomStr(),
        })),
      });
    }, 1000);
  });
}

class Store1 {
  $table = new TableStore({
    fetchList: async (params) => {
      params = {
        ...params,
        num: 123,
      };
      console.log("请求参数：", params);
      console.log("选择项：", this.$table.getSelected().keys);
      const { list, total } = await getList1(params);
      return {
        list,
        total,
      };
    },
  });
}

class Store2 {
  $table = new TableStore({
    fetchList: async (params) => {
      params = {
        ...params,
        num: 456,
      };
      console.log("请求参数：", params);
      const { list, total } = await getList2(params);
      return {
        list,
        total,
      };
    },
  });
}

const store1 = new Store1();
const store2 = new Store2();

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
      <Card title="服务端分页">
        <SearchBar
          store={store1}
          itemCol={{ span: 6 }}
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
          <Item
            name="fruit"
            label="喜欢的水果"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
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
        <Table store={store1} columns={columns} selectTable />
      </Card>

      <Card title="前端分页" style={{ marginTop: 30 }}>
        <SearchBar
          store={store2}
          itemCol={{ span: 6 }}
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
          <Item
            name="fruit"
            label="喜欢的水果"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
          >
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
        <Table store={store2} columns={columns} />
      </Card>
    </>
  );
}
```

## API

| 属性  | 说明                        | 类型   | 默认值 |
| ----- | --------------------------- | ------ | ------ |
| store | TableStore 实例对象（必须） | object | null   |
| selectTable | 选择配置项 | object | null   |


其他 API 参考 antd-Table 组件文档

## 接口

通过重写 store.fetchList 方法来发搜索请求， 必须返回 list 以及 total 属性
