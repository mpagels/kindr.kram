import { useState } from 'react'

export default function useBankAccount() {
  const {
    REACT_APP_ACCOUNT_HOLDER: ACCOUNT_HOLDER,
    REACT_APP_BLZ: BLZ,
    REACT_APP_BIC: BIC,
    REACT_APP_IBAN: IBAN,
    REACT_APP_BANK: BANK,
  } = process.env

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenState = () => {
    setIsOpen((prev) => !prev)
  }
  return { ACCOUNT_HOLDER, BLZ, BIC, IBAN, BANK, handleOpenState, isOpen }
}
