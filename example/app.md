# App

## 1 实例

```jsx
import React, { useState, useEffect } from "react"
import { App, AppLayout, View } from "antd-mobx-components"

function Index() {
  const [data, setData] = useState({})
  const [base, setBase] = useState({})

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
                    path: "#",
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
                    path: "#",
                    children: null,
                  },
                  {
                    id: 138,
                    title: "车型列表",
                    path: "#",
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
                    path: "#",
                    children: null,
                  },
                  {
                    id: 141,
                    title: "审核入驻",
                    path: "#",
                    children: null,
                  },
                ],
              },
            ],
          },
        ],
      })
    }, 1000)
  }

  // 获取下拉框数据
  const getSelectTypes = async () => {}

  useEffect(() => {
    getUserInfo()
    getSelectTypes()
  }, [])

  return (
    <App
      id={data.id}
      provider={{
        selectTypes: base,
        userInfo: data,
      }}
    >
      <AppLayout
        menuConfig={data?.menus}
        extra={<div>吕肥肥</div>}
        logo='管理系统'
      >
        <View current={["订单列表"]}></View>
      </AppLayout>
    </App>
  )
}

export default Index
```

## 2 API

### 2.1 App

| 属性     | 说明                                         | 类型   | 默认值 | 是否必须 |
| -------- | -------------------------------------------- | ------ | ------ | -------- |
| id       | 项目 id, 没有这个值页面会一直显示 骨架屏状态 | number | 无     | 是       |
| provider | 全局状态数据，比如全局下拉框数据，用户信息   | object | 无     | 否       |

### 2.2 AppLayout

| 属性       | 说明       | 类型       | 默认值 | 是否必须 |
| ---------- | ---------- | ---------- | ------ | -------- |
| logo       | 项目 logo  | react 元素 | 无     | 否       |
| menuConfig | 项目菜单栏 | array      | 无     | 是       |
| extra      | 个人信息   | react 元素 | 无     | 否       |
