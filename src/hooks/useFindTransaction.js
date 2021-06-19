import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'

export default function useFindTransaction() {
  const [transactions, setTransactions] = useState()
  const [isLoading, setLoading] = useState(true)
  const { setUser } = useContext(UserContext)
  useEffect(() => {
    async function findTransactions() {
      await axios
        .get('/api/transaction')
        .then((data) => {
          if (data.data.message === 'No authentification') {
            setUser(data.data)
          } else {
            setTransactions(data.data.transactions[0].transactions)
            setLoading(false)
          }
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }

    findTransactions()
  }, [setUser])

  return { transactions, setTransactions, isLoading }
}
