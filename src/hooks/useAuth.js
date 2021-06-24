import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

export default function useAuth(notify) {
  let history = useHistory()
  const { setUser } = useContext(UserContext)
  const [error, setError] = useState(null)

  //set user
  const setUserContext = async () => {
    return await axios
      .get('/api/auth')
      .then((res) => {
        setUser(res.data)
        history.push('/items')
      })
      .catch((err) => {
        setError(err)
      })
  }

  //set user
  const setUserContext2 = async () => {
    return await axios
      .get('/api/auth')
      .then((res) => {
        if (res.data.message === 'No authentification') {
          setUser('')
          history.push('/login')
        }
      })
      .catch((err) => {})
  }

  const checkAuth = async () => {
    return await axios
      .get('/api/auth')
      .then(async (res) => {
        await setUserContext2()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //login user
  const loginUser = async (data) => {
    const { username, password } = data
    axios
      .post(
        '/api/login',
        {
          userName: username.value,
          password: password.value,
        },
        {
          validateStatus: function (status) {
            return status < 500 // Resolve only if the status code is less than 500
          },
        }
      )
      .then(async (data) => {
        if (data.status === 200) {
          await setUserContext()
        } else {
          notify()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  //logout user
  const logoutUser = async () => {
    return axios
      .get('/api/logout')
      .then((res) => {
        setUser('')
        history.push('/login')
      })
      .catch((err) => {
        setError(err)
      })
  }

  return {
    loginUser,
    logoutUser,
    checkAuth,
    error,
  }
}
