import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import LoginPage from '../pages/LoginPage'
import EditItemForm from './EditItemForm'

export default function CustomEditItem() {
  const { user } = useContext(UserContext)
  return user?.role === 'admin' ? <EditItemForm /> : <LoginPage />
}
