import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { BudgetContext } from '../context/BudgetContext'
import useAuth from './useAuth'
import useFindTransaction from './useFindTransaction'

export default function useProfilPage() {
  const [error, setError] = useState('')
  const { setBudget } = useContext(BudgetContext)
  const { user } = useContext(UserContext)
  const { logoutUser } = useAuth()
  const [value, setValue] = useState()
  const { transactions, setTransactions, isLoading } = useFindTransaction()
  const [isOpen, setIsOpen] = useState(false)

  function handleOnInputChange(event) {
    const { value } = event.target
    setValue(Number(Number(value).toFixed(2)))
  }

  async function makeDeposit() {
    const deposit = {
      userName: user.username,
      amount: Number(value),
      category: 'deposit',
    }

    const depositResponse = await fetch('/api/transaction/deposit', {
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
      setValue('')
      getTransactionsAndSetBudget()
      setError(false)
    }
  }

  async function makeWithDraw() {
    const withdraw = {
      userName: user.username,
      amount: Number(value),
      category: 'withdraw',
    }
    const withDrawResponse = await fetch('/api/transaction/withdraw', {
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
      setValue('')
      getTransactionsAndSetBudget()
      setError(false)
    }
  }

  async function getTransactionsAndSetBudget() {
    try {
      const transactionRespone = await fetch(`/api/transaction`)
      const transactionsData = await transactionRespone.json()
      setTransactions(transactionsData.transactions[0].transactions)

      const budgetResponse = await fetch(`/api/user/${user.username}`)
      const budgetData = await budgetResponse.json()
      setBudget(budgetData.from_location.budget)
    } catch {
      logoutUser()
    }
  }

  return {
    error,
    isLoading,
    user,
    transactions,
    logoutUser,
    handleOnInputChange,
    makeDeposit,
    makeWithDraw,
    value,
    setIsOpen,
    isOpen,
  }
}
