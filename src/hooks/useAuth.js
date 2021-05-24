import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../context/UserContext'

export default function useAuth() {
  let history = useHistory()
  const { setUser, setLoading } = useContext(UserContext)
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

  //set user
  const setUserContext2 = async () => {
    return await axios
      .get('/auth')
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }

  const checkUser = async () => {
    setLoading(true)
    return await axios
      .get('/auth')
      .then(async (res) => {
        await setUserContext2()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
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
  //logout user
  const logoutUser = async () => {
    return axios
      .get('/logout')
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
    checkUser,
    error,
  }
}
