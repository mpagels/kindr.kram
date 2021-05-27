import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFindUser() {
  const [user, setUser] = useState('')
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    async function findUser() {
      await axios
        .get('/api/auth')
        .then((res) => {
          if (
            res.data.message !== 'No authentification' ||
            res.data.user !== null
          ) {
            setUser(res.data)
            setLoading(false)
          } else {
            setUser('')
            setLoading(false)
          }
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }

    findUser()
  }, [])

  return {
    user,
    setUser,
    isLoading,
    setLoading,
  }
}
