import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import UserPage from '../pages/UserPage'

export default function CustomCreateItem() {
  const { user } = useContext(UserContext)
  return user?.role === 'admin' && <UserPage />
}
