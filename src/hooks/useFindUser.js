import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFindUser() {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)

  console.log('in useFindUser')
  useEffect(() => {
    async function findUser() {
      await axios
        .get('/auth')
        .then((res) => {
          setUser(res.data.user)
          setLoading(false)
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
  }
}
