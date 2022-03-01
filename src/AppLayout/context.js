import { createContext, useContext } from 'react'

export const AppLayoutCtx = createContext()

export const useAppLayoutInfo = () => {
  return useContext(AppLayoutCtx)
}

export default function AppLayoutProvider({ value, children }) {
  return <AppLayoutCtx.Provider value={value}>{children}</AppLayoutCtx.Provider>
}
