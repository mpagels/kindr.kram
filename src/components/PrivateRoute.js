import { useContext } from 'react'
import UserContext from '../context/UserContext'
import MiscContext from '../context/TestContext'

import { Redirect, Route } from 'react-router'
import Header from './Header'

export default function PrivateRoute({ component: Component, ...rest }) {
  /* const { setContextUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext) */
  const { budget } = useContext(MiscContext)
  const { user, isLoading } = useContext(UserContext)

  console.log(user)
  // function to a route, get request ( 403 or 202)
  // await
  if (isLoading) {
    return <></>
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
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
