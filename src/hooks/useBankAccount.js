import { useState } from 'react'

export default function useBankAccount() {
  const ACCOUNT_HOLDER = process.env.REACT_APP_ACCOUNT_HOLDER
  const BLZ = process.env.REACT_APP_BLZ
  const BIC = process.env.REACT_APP_BIC
  const IBAN = process.env.REACT_APP_IBAN
  const BANK = process.env.REACT_APP_BANK

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenState = () => {
    setIsOpen((prev) => !prev)
  }
  return { ACCOUNT_HOLDER, BLZ, BIC, IBAN, BANK, handleOpenState, isOpen }
}
