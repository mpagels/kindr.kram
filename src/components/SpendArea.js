import styled from 'styled-components/macro'

export default function SpendArea({
  input,
  handleInput,
  handleDonationClick,
  isError,
  errorMessage,
  handleError,
  handleAbortSpendClick,
}) {
  return (
    <>
      <div>
        <SpendWrapper>
          <SpendInput
            type="number"
            min="1"
            value={input}
            onChange={handleInput}
          />
          <SpendButton onClick={handleDonationClick}>Spenden</SpendButton>
        </SpendWrapper>
        {isError && (
          <ErrorMessage>
            {errorMessage}
            <RemoveErrorButton onClick={() => handleError(false)}>
              ❌
            </RemoveErrorButton>
          </ErrorMessage>
        )}
      </div>
      <Abortbutton onClick={handleAbortSpendClick}>Abbrechen</Abortbutton>
    </>
  )
}

const RemoveErrorButton = styled.button`
  all: unset;
  cursor: pointer;
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.7em;
  text-align: center;
`
const SpendWrapper = styled.div`
  margin: 15px;
  display: flex;
  justify-content: center;
  gap: 20px;
`

const SpendInput = styled.input`
  height: 50px;
  width: 120px;
  font-size: 1.3em;
  color: grey;
  text-align: center;
  -moz-appearance: textfield;
  border-radius: 10px;
  border: solid 1px lightgrey;
`

const SpendButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #83c5be;
  padding: 10px;
  border-radius: 10px;
`
const Abortbutton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  font-weight: bold;
  margin: 10px 0;
  background-color: #e07a5f;
  color: white;
`
