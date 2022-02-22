import React from 'react'

export interface AppProps {
  // app唯一标识id
  id: number,
  // 登录后获取基础数据方法
  init?: Function,
  // 判断是否登录
  isLogin?: Function,
  // 全局基础数据
  provider?: object
}

export default class App extends React.Component<AppProps> {}