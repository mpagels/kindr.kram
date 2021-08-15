import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import getSumOfDonation from '../utils/getSumOfDonation'
import editSymbol from '../assets/pngs/edit.png'
import { Link } from 'react-router-dom'

export default function ItemForAdmin({ data }) {
  const { price, donations, name } = data
  const [sumOfDonation, donationCount] = getSumOfDonation(donations)
  const percentage =
    price !== 0 ? Math.round((100 / price) * sumOfDonation) : 100
  return (
    <ItemWrapper>
      <ContentWrapper>
        <h2>
          {name}
          <Link to={`/edit-item/${data._id}`}>
            <img src={editSymbol} alt="edit-symbol" />
          </Link>
        </h2>

        <div>
          <p>Eingestellter Preis: {price}€</p>
          <p>Fehlt noch: {price - sumOfDonation}€</p>
          <p>Bisherige Spenden: {donationCount}</p>
        </div>
      </ContentWrapper>
      <CircleWrapper>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#83c5be' : '#3e98c7',
            textColor: percentage === 100 ? '#83c5be' : '#3e98c7',
          })}
        />
      </CircleWrapper>
    </ItemWrapper>
  )
}

const ItemWrapper = styled.section`
  display: flex;
  align-items: center;
  height: 220px;
  border-radius: 10px;
  margin: 15px;
  background-color: white;
  padding: 10px 20px;
  box-shadow: 0 0.4px 2.2px rgba(0, 0, 0, 0.02),
    0 0.9px 5.3px rgba(0, 0, 0, 0.028), 0 1.8px 10px rgba(0, 0, 0, 0.035),
    0 3.1px 17.9px rgba(0, 0, 0, 0.042), 0 5.8px 33.4px rgba(0, 0, 0, 0.05),
    0 14px 80px rgba(0, 0, 0, 0.07);
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & p {
    margin: 8px 0;
  }
`

const CircleWrapper = styled.div`
  height: 150px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`
