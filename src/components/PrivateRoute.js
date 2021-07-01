import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

import { Redirect, Route } from 'react-router'
import Header from './Header'
import useAuth from '../hooks/useAuth'
import { BudgetContext } from '../context/BudgetContext'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { budget } = useContext(BudgetContext)
  const { user, isLoading } = useContext(UserContext)
  const { checkAuth } = useAuth()

  if (isLoading) {
    return <></>
  }

  checkAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        !(
          user.message === 'No authentification' ||
          user.user === null ||
          user === ''
        ) ? (
          <>
            <Header budget={budget} />
            <Component {...props} user={user} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}
