import styled from 'styled-components/macro'
import { useContext } from 'react'
import ItemContext from '../context/ItemContext'
import UserContext from '../context/UserContext'
import Item from '../components/Item'

export default function UserPage() {
  const { items, saveNewItem } = useContext(ItemContext)
  const { user } = useContext(UserContext)

  return (
    <Main>
      {items &&
        items.map((item, index) => (
          <Item
            key={item.id}
            data={item}
            index={index}
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
