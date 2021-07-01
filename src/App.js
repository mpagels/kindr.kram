import styled from 'styled-components/macro'

import { Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

import ContextWrapper from './context/ContextWrapper'
import PrivateRoute from './components/PrivateRoute'
import ProfilePage from './pages/ProfilePage'

import CustomRedirect from './components/CostumRedirect'
import CustomCreateItem from './components/CustomCreateItem'
import CustomItemRedirect from './components/CustomItemRedirect'
import CustomItemsForAdmin from './components/CustomItemsForAdmins'
import CustomEditItem from './components/CustomEditItem'

function App() {
  return (
    <Wrapper>
      <ContextWrapper>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <CustomRedirect />
          </Route>
          <PrivateRoute path="/profil" component={ProfilePage} />
          <PrivateRoute path="/create-item" component={CustomCreateItem} />
          <PrivateRoute path="/edit-item/:id" component={CustomEditItem} />
          <PrivateRoute path="/items" component={CustomItemRedirect} />
          <PrivateRoute
            path="/items-for-admin"
            component={CustomItemsForAdmin}
          />
        </Switch>
      </ContextWrapper>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  padding-top: 80px;
`
