import { useContext } from 'react'
import UserContext from '../context/UserContext'
import MiscContext from '../context/TestContext'

import { Redirect, Route } from 'react-router'
import Header from './Header'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { budget } = useContext(MiscContext)
  const { user, isLoading } = useContext(UserContext)

  if (isLoading) {
    return <></>
  }

  console.log('privateRoute', user)
  return (
    <Route
      {...rest}
      render={(props) =>
        user.message !== 'No authentification' ? (
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
