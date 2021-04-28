import { useState } from 'react'

export default function useModal() {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [transaktionsModalIsOpen, setTransaktionsModalIsOpen] = useState(false)
  const [error, setError] = useState('')

  if (modalIsOpen || transaktionsModalIsOpen) {
    document.body.style.overflow = 'hidden'
  }

  if (!modalIsOpen && !transaktionsModalIsOpen) {
    document.body.style.overflow = 'unset'
  }

  function openModal() {
    setError(false)
    setIsOpen(true)
  }
  function openTransaktionsModal() {
    setTransaktionsModalIsOpen(true)
  }

  return {
    modalIsOpen,
    setIsOpen,
    transaktionsModalIsOpen,
    setTransaktionsModalIsOpen,
    error,
    setError,
    openModal,
    openTransaktionsModal,
  }
}
