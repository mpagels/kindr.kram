import { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'
import MiscContext from '../context/TestContext'
import UserContext from '../context/UserContext'
import getCategoryColor from '../utils/getCategoryColor'

export default function ProfilePage() {
  const [error, setError] = useState('')
  const { setBudet } = useContext(MiscContext)
  const { user } = useContext(UserContext)
  const [transactions, setTransactions] = useState()

  const inputRef = useRef()

  useEffect(() => {
    fetch('/transaction/Toerpt')
      .then((res) => res.json())
      .then((data) => setTransactions(data[0].transactions))
  }, [])

  return (
    <Wrapper>
      Hallo {user.username}
      <button>Logout</button>
      Banking
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
      <TransactionList>
        {transactions &&
          transactions
            .map((transaction) =>
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
            )
            .reverse()}
      </TransactionList>
    </Wrapper>
  )

  async function makeDeposit() {
    const deposit = {
      userName: user.username,
      amount: Number(inputRef.current.value),
      category: 'deposit',
    }

    const depositResponse = await fetch('/transaction/deposit', {
      method: 'POST',
      body: JSON.stringify(deposit),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const depositData = await depositResponse.json()
    if (depositData.status === 'error') {
      setError(depositData.message)
    } else {
      inputRef.current.value = ''
      getTransactionsAndSetBudget()
      setError(false)
    }
  }

  async function makeWithDraw() {
    const withdraw = {
      userName: user.username,
      amount: Number(inputRef.current.value),
      category: 'withdraw',
    }
    const withDrawResponse = await fetch('/transaction/withdraw', {
      method: 'POST',
      body: JSON.stringify(withdraw),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const withDrawData = await withDrawResponse.json()

    if (withDrawData.status === 'error') {
      setError(withDrawData.message)
      getTransactionsAndSetBudget()
    } else {
      inputRef.current.value = ''
      getTransactionsAndSetBudget()
      setError(false)
    }
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

  async function getTransactionsAndSetBudget() {
    const transactionRespone = await fetch('/transaction/Toerpt')
    const transactionsData = await transactionRespone.json()
    setTransactions(transactionsData[0].transactions)

    const budgetResponse = await fetch(`/user/${user.username}`)
    const budgetData = await budgetResponse.json()
    setBudet(budgetData.from_location.budget)
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TransactionInput = styled.input`
  display: block;
`

const TransactionError = styled.span`
  color: red;
  font-size: 0.5em;
`

const KontoButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
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
