import styled from 'styled-components/macro'
import Header from './components/Header'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'

import { Switch, Route, useLocation } from 'react-router-dom'
import NewItemForm from './components/NewItemForm'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

import ItemContext from './context/ItemContext'
import OwnModal from './components/OwnModal'
import useModal from './hooks/useModal'
import UserPage from './pages/UserPage'

Modal.setAppElement('#root')

function App() {
  const location = useLocation()

  const user = 'Anke'

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

  const [budget, setBudet] = useState(0)
  const [transactions, setTransactions] = useState()
  const [items, setItems] = useState()

  useEffect(() => {
    fetch('/item')
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [location])

  useEffect(() => {
    fetch(`/user/${user}`)
      .then((res) => res.json())
      .then((data) => {
        setBudet(data.from_location.budget)
      })
  }, [items])
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
      <ItemContext.Provider value={items}>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <Header
              openModal={openModal}
              openTransaktionsModal={openTransaktionsModal}
              budget={budget}
            />
            <UserPage saveNewItem={saveNewItem} user={user} />
          </Route>
          <Route path="/admin">
            <Header
              openModal={openModal}
              openTransaktionsModal={openTransaktionsModal}
              budget={budget}
            />
            <AdminPage />
          </Route>
          <Route path="/create-item">
            <Header
              openModal={openModal}
              openTransaktionsModal={openTransaktionsModal}
              budget={budget}
            />
            <NewItemForm />
          </Route>
        </Switch>
      </ItemContext.Provider>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  padding-top: 80px;
`
