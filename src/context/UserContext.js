import { createContext } from 'react'
import useFindUser from '../hooks/useFindUser'

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
  const { user, setUser, isLoading, setLoading } = useFindUser()

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setLoading }}>
      {children}
    </UserContext.Provider>
  )
}
