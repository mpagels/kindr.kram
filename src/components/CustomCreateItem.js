import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import LoginPage from '../pages/LoginPage'
import NewItemForm from './NewItemForm'

export default function CustomCreateItem() {
  const { user } = useContext(UserContext)
  return user?.role === 'admin' ? <NewItemForm /> : <LoginPage />
}
