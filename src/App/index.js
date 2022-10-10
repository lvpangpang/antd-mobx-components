import { useEffect } from "react"
import { isFun } from "js-common-library"
import Loading from "./Loading"
import AppProvider, { useAppInfo } from "./context"

function App(props) {
  const {
    id,
    init,
    isLogin = () => true,
    provider = {},
    loginUrl = "/login",
    children,
  } = props
  useEffect(() => {
    if (isFun(isLogin) && !isLogin()) {
      return (window.location.href = loginUrl)
    }
    if (isFun(init)) {
      init()
    }
  }, [])
  return (
    <AppProvider value={provider}>
      {id ? children : <Loading></Loading>}
    </AppProvider>
  )
}

export { useAppInfo }
export default App
