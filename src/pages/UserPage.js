import styled from 'styled-components/macro'
import { useContext } from 'react'
import ItemContext from '../context/ItemContext'
import Item from '../components/Item'

export default function UserPage({ user }) {
  const { items, saveNewItem } = useContext(ItemContext)

  return (
    <Main>
      {items &&
        items.map((item, index) => (
          <Item
            key={item.id}
            data={item}
            index={index}
            user={user}
            saveNewItem={saveNewItem}
          />
        ))}
    </Main>
  )
}

const Main = styled.main``
