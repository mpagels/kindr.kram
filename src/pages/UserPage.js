import styled from 'styled-components/macro'
import { useContext } from 'react'
import ItemContext from '../context/ItemContext'
import UserContext from '../context/UserContext'
import Item from '../components/Item'

export default function UserPage() {
  const { items, saveNewItem } = useContext(ItemContext)
  const { user } = useContext(UserContext)

  const sortedItems = items?.sort((a, b) => {
    const itemA =
      a.price - a.donations.reduce((pre, cur) => pre + cur.amount, 0)
    console.log('itemA', itemA)
    const itemB =
      b.price - b.donations.reduce((pre, cur) => pre + cur.amount, 0)
    return itemA - itemB
  })

  const listOfItemsWithDonationFullfiled = []
  const listOfItemsWithDontationNeeded = []

  sortedItems?.forEach((item) => {
    if (
      item.donations.reduce((pre, cur) => pre + cur.amount, 0) === item.price
    ) {
      listOfItemsWithDonationFullfiled.push(item)
    } else {
      listOfItemsWithDontationNeeded.push(item)
    }
  })

  const sortedListOfItemsWithDontationNeeded =
    listOfItemsWithDontationNeeded.sort((a, b) => {
      const itemA =
        a.price - a.donations.reduce((pre, cur) => pre + cur.amount, 0)
      console.log('itemA', itemA)
      const itemB =
        b.price - b.donations.reduce((pre, cur) => pre + cur.amount, 0)
      return itemA - itemB || a.price - b.price
    })

  const itemsToRender = [
    ...sortedListOfItemsWithDontationNeeded,
    ...listOfItemsWithDonationFullfiled,
  ]

  return (
    <Main>
      {items &&
        itemsToRender.map((item, index) => (
          <Item
            key={`${item.id}_${index}`}
            data={item}
            index={index}
            isAdmin={user.role === 'admin'}
            user={user.username}
            saveNewItem={saveNewItem}
          />
        ))}
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
