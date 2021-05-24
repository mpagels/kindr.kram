import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFindUser() {
  const [user, setUser] = useState('')
  const [isLoading, setLoading] = useState(true)

  console.log('in useFindUser')
  useEffect(() => {
    async function findUser() {
      await axios
        .get('/auth')
        .then((res) => {
          console.log('in then')
          console.log(res.data.user)
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
          //console.log(err);
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
