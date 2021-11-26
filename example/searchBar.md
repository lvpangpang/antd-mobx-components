# SearchBar

```jsx
import React from "react";
import { Input, DatePicker, Button, Select } from "antd";
import { SearchBar, SearchBarStore } from "antd-mobx-components";

const { Item } = SearchBar;
const { Option } = Select;

const store = new SearchBarStore({
  onSearch: (params) => {
    console.log(params); // 获取到搜索条件对象
  },
});

export default function Index() {
  return (
    <SearchBar store={store}>
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
  );
}
```
