import { ReactComponent as LoginLogo } from '../assets/svg/Login_logo.svg'
import styled from 'styled-components/macro'
import { ToastContainer } from 'react-toastify'
import { notifyWrongLogin } from '../utils/toastsNotifications'
import useAuth from '../hooks/useAuth'

import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage() {
  const { handleLogin } = useAuth(notifyWrongLogin)
  return (
    <PageWrapper>
      <Title>kindr.kram</Title>
      <LoginArea>
        <LoginLogo />
        <StyledForm onSubmit={handleLogin}>
          <StyledInput id="username" placeholder="Username"></StyledInput>
          <StyledInput
            id="password"
            type="password"
            placeholder="Passwort"
          ></StyledInput>
          <LoginButton type="submit">EINLOGGEN</LoginButton>
        </StyledForm>
        <ToastContainer />
      </LoginArea>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  margin-top: -30px;
  display: flex;
  height: 100%;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-family: 'OrelegaOne';
  color: var(--font-teal);
  margin: 0;
  margin-bottom: 20px;
`

const LoginArea = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: calc(100vh - 105px);
  padding-top: 50px;

  & .Toastify__toast--error {
    background-color: #ad382b;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    width: 70vw;
  }
`
const LoginButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: var(--font-teal);
  border-radius: 25px;
  padding: 15px;
  margin-bottom: 15px;
  width: 180px;
  color: var(--font-whiteteal);
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`

const StyledInput = styled.input`
  text-align: center;
  border: none;
  border-bottom: 1px solid var(--font-teal-25alpha);
  padding-bottom: 10px;
  font-size: 1.2em;
  color: var(--font-teal);
  font-weight: 300;
  &:focus {
    outline-width: 0;
  }
  margin: 10px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
