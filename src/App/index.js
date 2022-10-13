import Loading from "./Loading"
import AppProvider, { useAppInfo } from "./context"

function App(props) {
  const { id, provider = {}, children } = props

  return (
    <AppProvider value={provider}>
      {id ? children : <Loading></Loading>}
    </AppProvider>
  )
}

export { useAppInfo }
export default App
