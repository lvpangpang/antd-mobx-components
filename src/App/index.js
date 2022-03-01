import { useEffect } from 'react'
import { isFun } from 'js-common-library'
import Loading from './Loading'
import AppProvider, { useAppInfo } from './context'

function App(props) {
  const { id, children, init, isLogin = () => true, provider = {} } = props
  useEffect(() => {
    if (isFun(isLogin) && !isLogin()) {
      return (window.location.href = '/login')
    }
    if (isFun(init)) {
      init()
    }
  }, [])
  return (
    // 存放一些全局的信息，比如所有下拉框的数据源
    <AppProvider value={provider}>{id ? children : <Loading></Loading>}</AppProvider>
  )
}

export { useAppInfo }
export default App
