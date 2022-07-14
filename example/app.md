## App

## 实例

```jsx
import React, { useState, useRef } from "react";
import { App, AppLayout } from "antd-mobx-components";
import { Route, useLocation } from "react-router-dom";
import { http, getStorage } from "js-common-library";

function Index() {
  const [data, setData] = useState({});
  const [base, setBase] = useState({});
  const { pathname } = useLocation();

  // 获取用户信息
  const getUserInfo = async () => {
    setTimeout(() => {
      setData({
        id: 130,
        username: "吕肥肥",
        roleNameDisplays: ["超级管理员"],
        phone: "182571",
        userType: 1,
        userTypeShow: "用户",
        menus: [
          {
            id: 132,
            title: "订单中心",
            path: "/#",
            children: [
              {
                id: 133,
                title: "订单管理",
                path: "/#",
                children: [
                  {
                    id: 134,
                    title: "订单列表",
                    path: "/order-center/manage/order-list",
                    children: null,
                  },
                ],
              },
            ],
          },
          {
            id: 135,
            title: "运力中心",
            path: "/#",
            children: [
              {
                id: 136,
                title: "车辆管理",
                path: "/#",
                children: [
                  {
                    id: 137,
                    title: "车辆列表",
                    path: "/capacity/car-manage/cars",
                    children: null,
                  },
                  {
                    id: 138,
                    title: "车型列表",
                    path: "/capacity/car-manage/type",
                    children: null,
                  },
                ],
              },
              {
                id: 139,
                title: "司机管理",
                path: "/#",
                children: [
                  {
                    id: 140,
                    title: "司机列表",
                    path: "/capacity/driver-manage/drivers",
                    children: null,
                  },
                  {
                    id: 141,
                    title: "审核入驻",
                    path: "/capacity/driver-manage/enter",
                    children: null,
                  },
                ],
              },
              {
                id: 144,
                title: "渠道管理",
                path: "/#",
                children: [
                  {
                    id: 145,
                    title: "运力公司",
                    path: "/capacity/channel/company",
                    children: null,
                  },
                ],
              },
            ],
          },
        ],
      });
    }, 1000);
  };

  // 获取下拉框数据
  const getSelectTypes = async () => {};

  const init = () => {
    getUserInfo();
    getSelectTypes();
  };

  return (
    <App
      id={data.id}
      provider={{
        selectTypes: base,
        userInfo: data,
      }}
      init={init}
    >
      <AppLayout
        menuConfig={data?.menus}
        extra={<div>吕肥肥</div>}
        logo={"管理系统"}
      ></AppLayout>
    </App>
  );
}

export default Index;
```

App 组件和 AppLayout 组件一起构成了系统的主要骨架  
App 组件-全局数据存放， 登录判断拦截  
AppLayout 组件-整个项目的总体布局，主要还是对菜单数据的处理渲染

## API

### App

| 属性     | 说明                                             | 类型     | 默认值 | 是否必须 |
| -------- | ------------------------------------------------ | -------- | ------ | -------- |
| id       | 项目 id, 没有这个值页面会一直显示 loading 状态   | number   | 无     | 是       |
| init     | 项目初始化做的事情，比如请求用户信息，请求菜单栏 | function | 无     | 否       |
| isLogin  | 判断是否登录                                     | blooean  | 无     | 否       |
| provider | 全局状态数据，比如全局下拉框数据等               | object   | 无     | 否       |

### AppLayout

| 属性 | 说明 | 类型 | 默认值 | 是否必须 |
| ---- | -------- | ------ | ------ | -------- |
| logo | 项目 logo | react 原始 | 无 | 否 |
| menuConfig| 项目菜单栏 | array | 无 | 是 |
| extra | 个人信息 | react元素 | 无 | 否 |
