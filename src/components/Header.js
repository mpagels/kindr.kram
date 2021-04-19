import styled from 'styled-components'

export default function Header({ openModal, budget, openTransaktionsModal }) {
  return (
    <HeaderWrapper>
      <TransactionButton onClick={openTransaktionsModal}>
        Transaktionen
      </TransactionButton>
      <ButtonWrapper>
        <Button onClick={openModal}>einzahlen</Button>
        <Budget>{`${budget}€`}</Budget>
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

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #e5e5e5;
  padding: 10px;
  width: 100px;
  margin-right: 20px;
  font-size: 0.8em;
  font-weight: bold;
`
const TransactionButton = styled(Button)`
  background-color: whitesmoke;
  color: darkgray;
`

const ButtonWrapper = styled.div`
  display: flex;
`
const Budget = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #457b9d;
  padding: 10px;
  width: 100px;
  color: whitesmoke;
  height: 50px;
  font-weight: bold;
`
