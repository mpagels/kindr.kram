import ProgressBar from 'react-percent-bar'
import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Image, Transformation } from 'cloudinary-react'
import useItem from '../hooks/useItem'
import SpendArea from './SpendArea'
import PriceDisplay from './PriceDisplay'

export default function Item({ data, isAdmin, user, saveNewItem }) {
  const { description, donations, image_urls, name, price, _id } = data || {}

  const {
    spendIsOpen,
    input,
    handleOnInputChange,
    handleAbortSpendClick,
    handleDonationClick,
    donationVolumne,
    isError,
    errorMessage,
    setIsError,
    setSpendIsOpen,
  } = useItem(donations, user, _id, saveNewItem)

  return (
    <ItemWrapper>
      <Carousel showThumbs={false}>
        {image_urls.map((url) => (
          <Image key={url} cloudName="martinpagels-dev" publicId={url}>
            <Transformation quality="60" fetchFormat="auto" />
          </Image>
        ))}
      </Carousel>
      <PriceDisplay donationVolumne={donationVolumne} price={price} />
      <h2>{name}</h2>
      <Description>{description}</Description>
      <ProgressBar
        fillColor="#457b9d"
        percent={(100 / price) * donationVolumne}
        width={'100%'}
      />
      {spendIsOpen && (
        <SpendArea
          input={input}
          handleInput={handleOnInputChange}
          handleDonationClick={handleDonationClick}
          isError={isError}
          errorMessage={errorMessage}
          handleError={setIsError}
          handleAbortSpendClick={handleAbortSpendClick}
        />
      )}
      {!spendIsOpen && !isAdmin && (
        <WantSpendButton
          disabled={donationVolumne === price}
          onClick={() => setSpendIsOpen(true)}
        >
          Spenden
        </WantSpendButton>
      )}
    </ItemWrapper>
  )
}

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

const WantSpendButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  ${(props) => !props.disabled && 'cursor: pointer'};
  border-radius: 15px;
  background-color: ${(props) => (props.disabled ? 'lightgrey' : '#83c5be')};
  color: black;
  font-weight: bold;
  margin: 10px 0;
`

const Description = styled.p`
  font-size: 0.8em;
`
