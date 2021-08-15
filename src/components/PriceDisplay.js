import styled from 'styled-components'

export default function PriceDisplay({ donationVolumne, price }) {
  const isPriceFull = donationVolumne === price
  return (
    <PriceWrapper>
      {!isPriceFull && <PriceTag>{`Preis: ${price}€`}</PriceTag>}
      <InfoOnDonation>
        <span>{price !== 0 ? 'Bereits gespendet:' : 'Umsonst'}</span>
        <CurrentDonation isFull={isPriceFull}>
          {isPriceFull ? `${donationVolumne}€ ✔` : `${donationVolumne}€`}
        </CurrentDonation>
      </InfoOnDonation>
    </PriceWrapper>
  )
}

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoOnDonation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  & span {
    font-family: 'Open Sans';
    font-size: 0.8em;
    font-weight: bold;
  }
`

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
  margin-bottom: 0;
`

const CurrentDonation = styled.p`
  display: flex;
  justify-content: center;
  padding: 7px;
  width: 120px;
  margin: 0;
  color: ${(props) => (props.isFull ? 'white' : 'black')};
  font-weight: bold;
  border-radius: 10px;
  background-color: ${(props) => (props.isFull ? '#83c5be' : '#f0efeb')};
`
