import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ItemForAdmin from '../components/ItemForAdmin'
import { ItemContext } from '../context/ItemContext'
import getItems from '../services/getItems'
import getAllDonations from '../services/getAllDonations'
import DonationBubble from '../components/DonationBubble'
export default function AdminPage() {
  const { items, setItems } = useContext(ItemContext)
  const [donations, setDonations] = useState([])

  const location = useLocation()
  useEffect(() => {
    getItems().then((data) => setItems(data))
  }, [location, setItems])

  useEffect(() => {
    getAllDonations().then((data) => setDonations(data))
  }, [])
  return (
    <div>
      <DonationInfoList>
        {donations.map((donation) => (
          <>
            <DonationBubble key={donation.location} locationData={donation} />
          </>
        ))}
      </DonationInfoList>

      {items
        ? items.map((item, index) => (
            <ItemForAdmin key={`${item.id}_${index}`} data={item} />
          ))
        : ''}
    </div>
  )
}

const DonationInfoList = styled.ul`
  margin: 15px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`
