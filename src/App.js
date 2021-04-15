import styled from 'styled-components'
import Header from './components/Header'
import Modal from 'react-modal'
import Item from './components/Item'
import { useState } from 'react'
Modal.setAppElement('#root')

function App() {
  var subtitle
  const [modalIsOpen, setIsOpen] = useState(false)
  const [budget, setBudet] = useState(0)

  function isEnoughBudget(budgetToSpend) {
    return budget - budgetToSpend >= 0
  }

  function reduceBudget(amount) {
    setBudet(budget - amount)
  }
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleAddBudget(event) {
    event.preventDefault()
    setBudet(budget + Number(event.target.budget.value))
  }

  return (
    <Wrapper>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <div>I am a modal</div>
        <form onSubmit={handleAddBudget}>
          <input name="budget" type="number" required />
          <button>Budget aufladen</button>
        </form>
        <button onClick={closeModal}>close</button>
      </Modal>
      <Header openModal={openModal} budget={budget} />
      <Main>
        <Item isEnoughBudget={isEnoughBudget} reduceBudget={reduceBudget} />
        <Item isEnoughBudget={isEnoughBudget} reduceBudget={reduceBudget} />
      </Main>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 70px auto;
`

const Main = styled.main``

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: `0 2.8px 2.2px rgba(0, 0, 0, 0.02),
  0 6.7px 5.3px rgba(0, 0, 0, 0.028),
  0 12.5px 10px rgba(0, 0, 0, 0.035),
  0 22.3px 17.9px rgba(0, 0, 0, 0.042),
  0 41.8px 33.4px rgba(0, 0, 0, 0.05),
  0 100px 80px rgba(0, 0, 0, 0.07)`,
  },
}
