import styled from 'styled-components/macro'
import { useEffect, useState } from 'react'

import { Switch, Route, useLocation, Redirect } from 'react-router-dom'
import NewItemForm from './components/NewItemForm'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

import ItemContext from './context/ItemContext'
import UserContext from './context/UserContext'
import MiscContext from './context/TestContext'

import UserPage from './pages/UserPage'
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './pages/ProfilePage'

function App() {
  const location = useLocation()
  const [budget, setBudet] = useState(0)
  const [user, setContextUser] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn'))
  )

  const [items, setItems] = useState()

  console.log('user', user)

  fetch(`/user/${user.username}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.message && data.from_location) {
        console.log('data', data.from_location)
        setBudet(data.from_location.budget)
      }
    }, [])

  useEffect(() => {
    fetch('/item')
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [location])

  function saveNewItem(index, newItem) {
    const newItems = [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index + 1),
    ]
    setItems(newItems)
  }

  return (
    <Wrapper>
      <MiscContext.Provider value={{ budget, setBudet }}>
        <UserContext.Provider
          value={{ user, setContextUser, isLoggedIn, setIsLoggedIn }}
        >
          <ItemContext.Provider value={{ items, saveNewItem }}>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/">
                {isLoggedIn ? (
                  <Redirect to="/items" />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              {/*  <Route path="/admin">
                <Header
                  openModal={openModal}
                  openTransaktionsModal={openTransaktionsModal}
                  budget={budget}
                />
                <AdminPage />
              </Route> */}
              {/* <Route path="/create-item">
                <Header
                  openModal={openModal}
                  openTransaktionsModal={openTransaktionsModal}
                  budget={budget}
                />
                <NewItemForm />
              </Route> */}

              <PrivateRoute path="/profil" component={ProfilePage} />
              <PrivateRoute
                path="/create-item"
                component={user.role === 'admin' ? NewItemForm : LoginPage}
              />

              <PrivateRoute
                path="/items"
                component={user.role === 'admin' ? AdminPage : UserPage}
              />
              <PrivateRoute
                path="/items-for-admin"
                component={user.role === 'admin' && UserPage}
              />
            </Switch>
          </ItemContext.Provider>
        </UserContext.Provider>
      </MiscContext.Provider>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  padding-top: 80px;
`
