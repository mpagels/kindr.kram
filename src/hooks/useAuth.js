import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../context/UserContext'

export default function useAuth() {
  let history = useHistory()
  const { setUser } = useContext(UserContext)
  const [error, setError] = useState(null)

  //set user
  const setUserContext = async () => {
    return await axios
      .get('/auth')
      .then((res) => {
        setUser(res.data)
        history.push('/items')
      })
      .catch((err) => {
        setError(err)
      })
  }

  //login user
  const loginUser = async (data) => {
    const { username, password } = data

    return axios
      .post('api/login', {
        userName: username.value,
        password: password.value,
      })
      .then(async () => {
        await setUserContext()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    loginUser,
    error,
  }
}
