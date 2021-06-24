import styled from 'styled-components/macro'
import getCategoryColor from '../utils/getCategoryColor'
import AbortButton from '../components/AbortButton'
import convertTime from '../utils/convertTime'
import useProfilPage from '../hooks/useProfilPage'

export default function ProfilePage() {
  const {
    error,
    isLoading,
    user,
    transactions,
    logoutUser,
    handleOnInputChange,
    makeDeposit,
    makeWithDraw,
    value,
    setIsOpen,
    isOpen,
  } = useProfilPage()

  if (isLoading) {
    return <></>
  }
  return (
    <Wrapper>
      Hallo {user.username}
      <AbortButton onClick={logoutUser} label="Logout" />
      {user.role !== 'admin' && (
        <>
          Banking
          <TransactionInput
            name="budget"
            value={value}
            onChange={handleOnInputChange}
            type="number"
            required
            min={1}
          />
          {error && <TransactionError>{error}</TransactionError>}
          <KontoButtonWrapper>
            <DepositButton onClick={makeDeposit}>Einzahlen</DepositButton>
            <WithDrawButton onClick={makeWithDraw}>Auszahlen</WithDrawButton>
          </KontoButtonWrapper>
          <ShowTransactionsButton onClick={() => setIsOpen((prev) => !prev)}>
            {isOpen
              ? 'Schließe Transaktionen'
              : 'Zeige bisherige Transaktionen'}
          </ShowTransactionsButton>
          {isOpen && (
            <TransactionList>
              {transactions
                ? transactions
                    .map((transaction) =>
                      transaction.category === 'donation' ? (
                        <TransaktionItem key={transaction._id}>
                          {`${transaction.from.name} hat am ${convertTime(
                            transaction.performed_at
                          )}`}
                          <Amount category={transaction.category}>
                            {` ${transaction.amount}€ `}
                          </Amount>
                          für <strong>{transaction.for_item.name} </strong>
                          gespendet.
                        </TransaktionItem>
                      ) : (
                        <TransaktionItem key={transaction._id}>
                          {`${transaction.from.name} hat am ${convertTime(
                            transaction.performed_at
                          )}`}
                          <Amount category={transaction.category}>
                            {` ${transaction.amount}€ `}
                          </Amount>
                          {`${
                            transaction.category === 'deposit'
                              ? 'eingezahlt'
                              : 'abgehoben'
                          }.`}
                        </TransaktionItem>
                      )
                    )
                    .reverse()
                : 'Keine Transaktionen bisher.'}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <ShowTransactionsButton
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  {isOpen
                    ? 'Schließe Transaktionen'
                    : 'Zeige bisherige Transaktionen'}
                </ShowTransactionsButton>
              </div>
            </TransactionList>
          )}
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TransactionInput = styled.input`
  display: block;
`

const TransactionError = styled.span`
  color: red;
  font-size: 0.5em;
`

const KontoButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
`
const DepositButton = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  background-color: #2a9d8f;
`
const WithDrawButton = styled(DepositButton)`
  background-color: #e76f51;
`

const TransactionList = styled.ul`
  list-style-type: none;
  padding: 15px;
`
const TransaktionItem = styled.li`
  font-size: 0.8em;
`
const Amount = styled.span`
  font-weight: bold;
  color: ${(props) => getCategoryColor(props.category)};
`

const ShowTransactionsButton = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: lightgrey;
`
