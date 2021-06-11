import { useMemo, useState } from 'react'

export default function useItem(donations, user, _id, saveNewItem) {
  const [spendIsOpen, setSpendIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const donationVolumne = useMemo(
    () =>
      donations.reduce((pre, cur) => {
        console.log('I run')
        return pre + cur.amount
      }, 0),
    [donations]
  )

  function handleOnInputChange(event) {
    const { value } = event.target
    if (value !== '') {
      setInput(Number(Number(value).toFixed(2)))
    } else {
      setInput('')
    }
  }

  function handleDonationClick() {
    const donation = {
      userName: user,
      amount: Number(input),
      category: 'donation',
      item_id: _id,
    }
    fetch('/api/transaction/donate', {
      method: 'POST',
      body: JSON.stringify(donation),
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'error') {
          setErrorMessage(data.message)
          setIsError(true)
        } else {
          saveNewItem(_id, data)
          setInput(0)
          setErrorMessage()
          setIsError(false)
          setSpendIsOpen(false)
        }
      })
  }

  function handleAbortSpendClick() {
    setInput(0)
    setSpendIsOpen(false)
  }

  return {
    spendIsOpen,
    handleAbortSpendClick,
    handleDonationClick,
    donationVolumne,
    isError,
    errorMessage,
    input,
    handleOnInputChange,
    setIsError,
    setSpendIsOpen,
  }
}
