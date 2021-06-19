import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Redirect } from 'react-router'

export default function CustomRedirect() {
  const { user, isLoading } = useContext(UserContext)

  if (isLoading) {
    return <div></div>
  }
  return user ? <Redirect to="/items" /> : <Redirect to="/login" />
}
