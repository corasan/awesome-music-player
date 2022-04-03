import { createContext, ReactElement, useContext } from 'react'
import RootStore from './RootStore'

const rootStore = new RootStore()
const AppContext = createContext(rootStore)

export const useStore = () => useContext(AppContext)

export default function StoreProvider({ children }: { children?: ReactElement }) {
  const store = useStore()

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}
