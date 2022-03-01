import { createContext, useContext } from 'react'

export const AppCtx = createContext(undefined)

export const useAppInfo = () => {
  return useContext(AppCtx)
}

export default function AppProvider({ value, children }) {
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}
