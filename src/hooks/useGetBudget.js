import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFindUser(user, items) {
  const [budget, setBudget] = useState(0)

  useEffect(() => {
    async function getBudget() {
      await axios
        .get(`/user/${user.username}`)
        .then((data) => {
          if (!data.data.message && data.data.from_location) {
            setBudget(data.data.from_location.budget)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    user && getBudget()
  }, [user, items])

  return {
    budget,
    setBudget,
  }
}
