import ProgressBar from 'react-percent-bar'
import styled from 'styled-components'
import { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { Image } from 'cloudinary-react'
export default function Item({ data, isAdmin, index, user, saveNewItem }) {
  const [spendIsOpen, setSpendIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const { description, donations, image_urls, name, price, _id } = data || {}
  const donationVolumne = donations.reduce((pre, cur) => pre + cur.amount, 0)

  function handleDonationClick() {
    const donation = {
      userName: user,
      amount: Number(input),
      category: 'donation',
      item_id: _id,
    }
    fetch('/transaction/donate', {
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
          saveNewItem(index, data)
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
  console.log(data)
  return (
    <ItemWrapper>
      <Carousel showThumbs={false}>
        {image_urls.map((url, index) => (
          <Image
            cloudName="martinpagels-dev"
            publicId={url}
            key={`${url}_${index}`}
          />
        ))}
      </Carousel>
      <PriceWrapper>
        <CurrentDonation isFull={donationVolumne === price}>
          {donationVolumne === price
            ? `${donationVolumne}€ ✔`
            : `${donationVolumne}€`}
        </CurrentDonation>
        <PriceTag>{`Preis: ${price}€`}</PriceTag>
      </PriceWrapper>
      <h2>{name}</h2>
      <Description>{description}</Description>
      <ProgressBar
        colorShift={true}
        fillColor="orange"
        percent={(100 / price) * donationVolumne}
        width={'100%'}
      />
      {spendIsOpen && (
        <div>
          <SpendWrapper>
            <SpendInput
              type="number"
              min="0"
              value={input}
              onChange={(e) => setInput(Number(e.target.value))}
            />
            <SpendButton onClick={handleDonationClick}>Spenden</SpendButton>
          </SpendWrapper>
          {isError && (
            <ErrorMessage>
              {errorMessage}
              <RemoveErrorButton onClick={() => setIsError(false)}>
                ❌
              </RemoveErrorButton>
            </ErrorMessage>
          )}
        </div>
      )}
      {spendIsOpen ? (
        <Abortbutton onClick={handleAbortSpendClick}>Abbrechen</Abortbutton>
      ) : !isAdmin ? (
        <WantSpendButton
          disabled={donationVolumne === price}
          onClick={() => setSpendIsOpen(true)}
        >
          Spenden
        </WantSpendButton>
      ) : (
        ''
      )}
    </ItemWrapper>
  )
}
const RemoveErrorButton = styled.button`
  all: unset;
  cursor: pointer;
`
const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
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
const ItemWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 330px;
  border-radius: 10px;
  margin: 15px;
  background-color: white;
  padding: 10px 20px;
  box-shadow: 0 0.4px 2.2px rgba(0, 0, 0, 0.02),
    0 0.9px 5.3px rgba(0, 0, 0, 0.028), 0 1.8px 10px rgba(0, 0, 0, 0.035),
    0 3.1px 17.9px rgba(0, 0, 0, 0.042), 0 5.8px 33.4px rgba(0, 0, 0, 0.05),
    0 14px 80px rgba(0, 0, 0, 0.07);
`

const SpendButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #83c5be;
  padding: 10px;
  border-radius: 10px;
`
const WantSpendButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-radius: 15px;
  background-color: ${(props) => (props.disabled ? 'lightgrey' : '#83c5be')};
  color: black;
  font-weight: bold;
  margin: 10px 0;
`

const Abortbutton = styled(WantSpendButton)`
  background-color: #e07a5f;
  color: white;
`

/* const Image = styled.img`
  margin: 10px 0;
  width: 100%;
  border-radius: 5px;
` */

const PriceTag = styled.p`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  padding: 7px;
  width: 120px;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  background-color: #e07a5f;
`

const CurrentDonation = styled.p`
  display: flex;
  justify-content: center;
  align-self: flex-end;
  padding: 7px;
  width: 120px;
  color: ${(props) => (props.isFull ? 'white' : 'black')};
  font-weight: bold;
  border-radius: 10px;
  background-color: ${(props) => (props.isFull ? '#83c5be' : '#f0efeb')};
`
const Description = styled.p`
  font-size: 0.8em;
`
