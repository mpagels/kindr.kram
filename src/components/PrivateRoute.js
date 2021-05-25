import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import MiscContext from '../context/TestContext'

import { Redirect, Route } from 'react-router'
import Header from './Header'
import useAuth from '../hooks/useAuth'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { budget } = useContext(MiscContext)
  const { user, isLoading } = useContext(UserContext)
  const { checkAuth } = useAuth()

  if (isLoading) {
    return <></>
  }

  console.log('privateRoute', user.user === null)
  checkAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        !(user.message === 'No authentification' || user.user === null) ? (
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
