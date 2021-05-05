import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'

export default function useFindTransaction() {
  const [transactions, setTransactions] = useState()
  const [isLoading, setLoading] = useState(true)
  const { setUser } = useContext(UserContext)
  useEffect(() => {
    console.log('bevor axios')
    async function findTransactions() {
      await axios
        .get('/transaction')
        .then((data) => {
          if (data.data.user === null) {
            setUser(null)
          } else {
            setTransactions(data.data.transactions[0].transactions)
            setLoading(false)
          }
        })
        .catch((err) => {
          //console.log(err);
          setLoading(false)
        })
    }

    findTransactions()
  }, [])

  return { transactions, setTransactions, isLoading }
}
