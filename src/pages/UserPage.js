import styled from 'styled-components/macro'
import { useContext } from 'react'
import ItemContext from '../context/ItemContext'
import UserContext from '../context/UserContext'
import Item from '../components/Item'
import getOrderedItemList from '../utils/getOrderedItemList'

export default function UserPage() {
  const { items, saveNewItem } = useContext(ItemContext)
  const { user } = useContext(UserContext)

  const itemsToRender = getOrderedItemList(items)

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
