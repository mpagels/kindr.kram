import { useEffect, useState } from 'react'

export default function useIsUserAuthenticated(setContextUser, setIsLoggedIn) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log('Drin in /auth & im useEffect')
    //const token = JSON.parse(localStorage.getItem("token"));
    //console.log("token", token);
    fetch('/auth', {
      method: 'GET',
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      //   headers: {
      //     Authorization: "Bearer " + token.accessToken,
      //   },
    })
      .then((res) => {
        console.log(res.status)
        if (res.status > 400) {
          return null
        } else {
          return res.json()
        }
      })
      .then((data) => {
        if (data?.username) {
          setIsAuthenticated(true)
          setUser(data)
          setContextUser(data)
          setIsLoggedIn(true)
          localStorage.setItem('isLoggedIn', JSON.stringify(true))
        } else {
          setIsAuthenticated(false)
          setUser({})
          setContextUser({})
          setIsLoggedIn(false)
          localStorage.setItem('isLoggedIn', JSON.stringify(false))
        }
      })
    return () => {}
  }, [])

  return { isAuthenticated, user }
}
