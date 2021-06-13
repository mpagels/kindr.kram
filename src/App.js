import styled from 'styled-components/macro'

import { Switch, Route, Redirect } from 'react-router-dom'
import NewItemForm from './components/NewItemForm'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

import ItemContextProvider from './context/ItemContext'
import UserContext from './context/UserContext'
import MiscContext from './context/TestContext'

import UserPage from './pages/UserPage'
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './pages/ProfilePage'
import useFindUser from './hooks/useFindUser'
import useGetBudget from './hooks/useGetBudget'

function App() {
  const { user, setUser, isLoading, setLoading } = useFindUser()
  const { budget, setBudget } = useGetBudget(user, items)

  return (
    <Wrapper>
      <MiscContext.Provider value={{ budget, setBudget }}>
        <UserContext.Provider value={{ user, setUser, isLoading, setLoading }}>
          <ItemContextProvider>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>

              <Route exact path="/">
                {user ? <Redirect to="/items" /> : <Redirect to="/login" />}
              </Route>

              <PrivateRoute path="/profil" component={ProfilePage} />

              <PrivateRoute
                path="/create-item"
                component={user?.role === 'admin' ? NewItemForm : LoginPage}
              />

              <PrivateRoute
                path="/items"
                component={user?.role === 'admin' ? AdminPage : UserPage}
              />
              <PrivateRoute
                path="/items-for-admin"
                component={user?.role === 'admin' && UserPage}
              />
            </Switch>
          </ItemContextProvider>
        </UserContext.Provider>
      </MiscContext.Provider>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  padding-top: 80px;
`
