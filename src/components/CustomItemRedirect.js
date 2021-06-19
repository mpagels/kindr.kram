import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import AdminPage from '../pages/AdminPage'
import UserPage from '../pages/UserPage'

export default function CustomCreateItem() {
  const { user } = useContext(UserContext)
  return user?.role === 'admin' ? <AdminPage /> : <UserPage />
}
