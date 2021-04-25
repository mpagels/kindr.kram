import styled from 'styled-components'
import Header from './components/Header'
import Modal from 'react-modal'
import Item from './components/Item'
import { useEffect, useRef, useState } from 'react'
import getCategoryColor from './utils/getCategoryColor'
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom'
import ItemForAdmin from './components/ItemForAdmin'
import NewItemForm from './components/NewItemForm'

Modal.setAppElement('#root')

function App() {
  let history = useHistory()
  const location = useLocation()
  var subtitle
  const user = 'Anke'
  const [modalIsOpen, setIsOpen] = useState(false)
  const [transaktionsModalIsOpen, setTransaktionsModalIsOpen] = useState(false)
  const inputRef = useRef()
  const [budget, setBudet] = useState(0)
  const [transactions, setTransactions] = useState()
  const [items, setItems] = useState()

  const [error, setError] = useState('')

  if (modalIsOpen || transaktionsModalIsOpen) {
    document.body.style.overflow = 'hidden'
  }

  if (!modalIsOpen && !transaktionsModalIsOpen) {
    document.body.style.overflow = 'unset'
  }

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

  function openModal() {
    setError(false)
    setIsOpen(true)
  }
  function openTransaktionsModal() {
    setTransaktionsModalIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }
  function closeTransactionsModal() {
    setTransaktionsModalIsOpen(false)
  }

  function saveNewItem(index, newItem) {
    const newItems = [
      ...items.slice(0, index),
      newItem,
      ...items.slice(index + 1),
    ]
    setItems(newItems)
  }
  function convertTime(time) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(Date.parse(time)).toLocaleDateString('de-DE', options)
  }
  function makeDeposit() {
    const deposit = {
      userName: user,
      amount: Number(inputRef.current.value),
      category: 'deposit',
    }

    fetch('/transaction/deposit', {
      method: 'POST',
      body: JSON.stringify(deposit),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBudet(data.from.from_location.budget)
        inputRef.current.value = ''
        setIsOpen(false)
      })
  }

  function makeWithDraw() {
    const deposit = {
      userName: user,
      amount: Number(inputRef.current.value),
      category: 'withdraw',
    }
    fetch('/transaction/withdraw', {
      method: 'POST',
      body: JSON.stringify(deposit),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') {
          setError(data.message)
        } else {
          setBudet(data.from.from_location.budget)
          inputRef.current.value = ''
          setIsOpen(false)
          setError(false)
        }
      })
  }

  return (
    <Wrapper>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Konto</h2>
        <div>I am a modal</div>
        <KontoInput></KontoInput>
        <TransactionInput
          name="budget"
          ref={inputRef}
          type="number"
          required
          min={1}
        />
        {error && <TransactionError>{error}</TransactionError>}
        <KontoButtonWrapper>
          <DepositButton onClick={makeDeposit}>Einzahlen</DepositButton>
          <WithDrawButton onClick={makeWithDraw}>Auszahlen</WithDrawButton>
        </KontoButtonWrapper>

        <CloseButton onClick={closeModal}>❌</CloseButton>
      </Modal>
      <Modal
        isOpen={transaktionsModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Transactions Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Transaktionen</h2>

        <ModelSection>
          <TransactionList>
            {transactions &&
              transactions.map((transaction) =>
                transaction.category === 'donation' ? (
                  <TransaktionItem key={transaction._id}>
                    {`${transaction.from.name} hat am ${convertTime(
                      transaction.performed_at
                    )}`}
                    <Amount category={transaction.category}>
                      {` ${transaction.amount}€ `}
                    </Amount>
                    für <strong>{transaction.for_item.name} </strong>
                    gespendet.
                  </TransaktionItem>
                ) : (
                  <TransaktionItem key={transaction._id}>
                    {`${transaction.from.name} hat am ${convertTime(
                      transaction.performed_at
                    )}`}
                    <Amount category={transaction.category}>
                      {` ${transaction.amount}€ `}
                    </Amount>
                    {`${
                      transaction.category === 'deposit'
                        ? 'eingezahlt'
                        : 'abgehoben'
                    }.`}
                  </TransaktionItem>
                )
              )}
          </TransactionList>
        </ModelSection>

        <CloseButton onClick={closeTransactionsModal}>❌</CloseButton>
      </Modal>
      <>
        <Header
          openModal={openModal}
          openTransaktionsModal={openTransaktionsModal}
          budget={budget}
        />
        <Route exact path="/">
          <Main>
            {items &&
              items.map((item, index) => (
                <Item
                  key={item.id}
                  data={item}
                  index={index}
                  user={user}
                  saveNewItem={saveNewItem}
                />
              ))}
          </Main>
        </Route>
        <Route path="/admin">
          {items &&
            items.map((item, index) => (
              <ItemForAdmin key={item.id} data={item} />
            ))}
        </Route>
        <Route path="/create-item">
          <NewItemForm />
        </Route>
      </>
    </Wrapper>
  )
}

export default App

const ModelSection = styled.section`
  height: 300px;
  overflow-y: auto;
`

const Wrapper = styled.div`
  padding-top: 80px;
`
const CloseButton = styled.button`
  all: unset;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`

const Main = styled.main``

const TransactionInput = styled.input`
  display: block;
`

const DepositButton = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  background-color: #2a9d8f;
`
const WithDrawButton = styled(DepositButton)`
  background-color: #e76f51;
`
const TransactionError = styled.span`
  color: red;
  font-size: 0.5em;
`
const TransactionList = styled.ul`
  list-style-type: none;
  padding: 0;
`
const TransaktionItem = styled.li`
  font-size: 0.8em;
`
const Amount = styled.span`
  font-weight: bold;
  color: ${(props) => getCategoryColor(props.category)};
`

const KontoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const KontoButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  0 12.5px 10px rgba(0, 0, 0, 0.035),
  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  0 100px 80px rgba(0, 0, 0, 0.07)`,
  },
}
