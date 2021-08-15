import React from 'react'
import styled from 'styled-components'

export default function DonationBubble({ locationData }) {
  const { location, donated } = locationData
  return (
    <BubbleWrapper hasDonated={donated > 0}>
      <LocationTitle>{location}</LocationTitle>
      <Money>{donated}€</Money>
    </BubbleWrapper>
  )
}

const BubbleWrapper = styled.li`
  background-color: ${(props) => (props.hasDonated ? '#83c5be' : '#e07a5f')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 20px;
  margin: 10px;
  color: black;
`

const LocationTitle = styled.h3`
  margin: 0;
  font-weight: 500;
`

const Money = styled.p`
  margin: 0;
  font-weight: 700;
`
