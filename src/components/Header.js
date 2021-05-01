import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ReactComponent as AccountLogo } from '../assets/svg/account_2.svg'
import { ReactComponent as SavingLogo } from '../assets/svg/savings.svg'
import { ReactComponent as PriceLogo } from '../assets/svg/price.svg'
import { ReactComponent as AddLogo } from '../assets/svg/add.svg'
import { ReactComponent as CancelLogo } from '../assets/svg/cancel.svg'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

export default function Header({ openModal, budget, openTransaktionsModal }) {
  const { pathname } = useLocation()
  const { user } = useContext(UserContext)
  console.log('header', user)

  let createButton
  if (user.role === 'admin') {
    pathname === '/items'
      ? (createButton = (
          <Link to="/create-item">
            <AddLogo style={{ fill: '#457b9d' }} />
          </Link>
        ))
      : (createButton = (
          <Link to="/">
            <CancelLogo style={{ fill: '#e07a5f' }} />
          </Link>
        ))
  }

  return (
    <HeaderWrapper>
      <AccountButton onClick={openTransaktionsModal} />

      {createButton}

      <ButtonWrapper>
        <MoneyButton onClick={openModal} />
        <Budget>
          <SavingLogo style={{ fill: '#457b9d' }} />
          {`${budget}€`}
        </Budget>
      </ButtonWrapper>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  z-index: 2;
  position: fixed;
  height: 70px;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`

const MoneyButton = styled(PriceLogo)`
  cursor: pointer;
  fill: #457b9d;
  margin-right: 20px;
`
const AccountButton = styled(AccountLogo)`
  cursor: pointer;
  fill: #457b9d;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`
const Budget = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 15px;
  border: 1px solid #457b9d;
  padding: 10px;
  width: 100px;
  color: #457b9d;
  height: 50px;
  font-weight: bold;
`
