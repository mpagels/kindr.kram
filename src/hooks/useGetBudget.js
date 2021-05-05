import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'

export default function useFindUser(user, items) {
  const [budget, setBudget] = useState(0)
  //const { user } = useContext(UserContext)

  useEffect(() => {
    console.log('inside useeffect')
    async function getBudget() {
      await axios
        .get(`/user/${user.username}`)
        .then((data) => {
          console.log('data from user/user', data)
          if (!data.data.message && data.data.from_location) {
            console.log('data', data.from_location)
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
