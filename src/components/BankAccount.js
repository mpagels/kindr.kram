import styled from 'styled-components/macro'
import useBankAccount from '../hooks/useBankAccount'

export default function BankAccount() {
  const { ACCOUNT_HOLDER, BLZ, BIC, IBAN, BANK, handleOpenState, isOpen } =
    useBankAccount()

  return (
    <>
      <ShowAccountButton onClick={handleOpenState}>
        {isOpen
          ? 'Verstecke Informationen'
          : 'Zeige Spenden Konto Informationen'}
      </ShowAccountButton>
      {isOpen && (
        <Wrapper>
          <Label>Bank:</Label>
          <Info> {BANK}</Info>
          <Label>Kontoinhaber:</Label>
          <Info> {ACCOUNT_HOLDER}</Info>
          <Label>IBAN:</Label>
          <Info> {IBAN}</Info>
          <Label>BLZ:</Label>
          <Info> {BLZ}</Info>
          <Label>BIC:</Label>
          <Info> {BIC}</Info>
        </Wrapper>
      )}
    </>
  )
}

const ShowAccountButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #fff500;
  color: #28373c;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`

const Wrapper = styled.section`
  border: solid 1px #28373c;
  border-radius: 10px;
  padding: 10px 20px;
  color: #28373c;

  margin: 10px;
`
const Label = styled.p`
  font-weight: 500;
  margin: 20px 0 0 0;
`
const Info = styled.p`
  font-weight: 700;
  font-size: 1.2em;
  margin: 0 0 20px 0;
`
