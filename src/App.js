import styled from 'styled-components/macro'
import Header from './components/Header'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'

import { Switch, Route, useLocation, Redirect } from 'react-router-dom'
import NewItemForm from './components/NewItemForm'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

import ItemContext from './context/ItemContext'
import UserContext from './context/UserContext'
import MiscContext from './context/TestContext'

import OwnModal from './components/OwnModal'
import useModal from './hooks/useModal'
import UserPage from './pages/UserPage'
import PrivateRoute from './components/PrivateRoute'

Modal.setAppElement('#root')

function App() {
  const location = useLocation()

  const [user, setContextUser] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn'))
  )

  const [budget, setBudet] = useState(0)
  const [transactions, setTransactions] = useState()
  const [items, setItems] = useState()

  console.log('user', user)
  const {
    modalIsOpen,
    setIsOpen,
    transaktionsModalIsOpen,
    setTransaktionsModalIsOpen,
    error,
    setError,
    openModal,
    openTransaktionsModal,
  } = useModal()

  useEffect(() => {
    fetch('/item')
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [location])

  useEffect(() => {
    console.log('run')
    fetch(`/user/${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.message && data.from_location) {
          console.log('data', data.from_location)
          setBudet(data.from_location.budget)
        }
      })
  }, [items, user])
  useEffect(() => {
    fetch('/transaction/Toerpt')
      .then((res) => res.json())
      .then((data) => setTransactions(data[0].transactions))
  }, [budget, items])

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
      <OwnModal
        user={user}
        setBudet={setBudet}
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        error={error}
        setError={setError}
        transaktionsModalIsOpen={transaktionsModalIsOpen}
        transactions={transactions}
        setTransaktionsModalIsOpen={setTransaktionsModalIsOpen}
      />
      <MiscContext.Provider
        value={{ budget, openModal, openTransaktionsModal }}
      >
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

              <PrivateRoute
                path="/create-item"
                component={user.role === 'admin' ? NewItemForm : LoginPage}
              />

              <PrivateRoute
                path="/items"
                component={user.role === 'admin' ? AdminPage : UserPage}
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
