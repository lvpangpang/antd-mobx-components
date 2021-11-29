# SearchBar

## 实例

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
  down: () => {
    console.log(store.getSearchParams()); // 实例获取到搜索条件
  },
});

export default function Index() {
  return (
    <SearchBar
      store={store}
      extra={
        <>
          <Button type="primary" onClick={store.down}>
            导出
          </Button>
          <Button>新增</Button>
        </>
      }
    >
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

## API

| 属性    | 说明                           | 类型        | 默认值      |
| ------- | ------------------------------ | ----------- | ----------- |
| store   | SearchStore 实例对象（必须）   | object      | null        |
| itemCol | 每个搜索 Item 的大小           | object      | { span: 6 } |
| cache   | 跳转页面后是否需要保存搜索条件 | boolean     | true        |
| extra   | 添加更多的按钮，比如导出按钮   | reactObject |             |

其他 API 参考 antd-Form 组件文档

## 接口

```js
const store = new SearchBarStore();
```

store.onSearch() 每次点击搜索都会调用这个方法

store.getSearchParams() 获取SearchBar组件当前的搜索条件对象
