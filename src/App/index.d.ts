import React from 'react'

export interface AppProps {
  // app唯一标识id
  id: number,
  // 全局基础数据
  provider?: object
}

export default class App extends React.Component<AppProps> {}