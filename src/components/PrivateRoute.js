import { useContext } from 'react'
import UserContext from '../context/UserContext'
import MiscContext from '../context/TestContext'
import useIsUserAuthenticated from '../hooks/useIsUserAuthenticted'
import { Redirect, Route } from 'react-router'
import Header from './Header'

export default function PrivateRoute({ component: Component, ...rest }) {
  /* const { setContextUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext) */
  const { budget } = useContext(MiscContext)
/*   const { isAuthenticated, user } = useIsUserAuthenticated(
    setContextUser,
    setIsLoggedIn
   */)

  // function to a route, get request ( 403 or 202)
  // await 
  if (isAuthenticated === null) {
    return <></>
  }
  console.log('hof', isAuthenticated, isLoggedIn)
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/" />
        ) : (
          <>
            <Header budget={budget} />
            <Component {...props} user={user} />
          </>
        )
      }
    />
  )
}
