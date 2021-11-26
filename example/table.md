# Table

```jsx
import React from "react";
import { Input, Select,  DatePicker } from "antd";
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

const store = new TableStore({
  fetchList: async (params) => {
    params = {
      ...params,
      time: 987987987987
    }
    console.log(params)
    const { list, total } = await getList(params);
    return {
      list,
      total,
    };
  },
});

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
      <SearchBar store={store} initialValues={{
        name: '吕肥肥'
      }}>
        <Item name="name" label="姓名">
          <Input />
        </Item>
        <Item name="age" label="年龄">
          <Input />
        </Item>
        <Item name="fruit" label="喜欢的水果" span={12}>
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
