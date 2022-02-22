import { createContext } from "react";
const AppProviderCtx = createContext({
  selectTypes: [],
});

export default function AppProvider({ value, children }) {
  return <AppProviderCtx.Provider value={value}>{children}</AppProviderCtx.Provider>;
}
