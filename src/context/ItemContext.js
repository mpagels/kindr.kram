import { createContext, useState } from 'react'

export const ItemContext = createContext(null)

export default function ItemContextProvider({ children }) {
  const [items, setItems] = useState([])

  function saveNewItem(itemId, newItem) {
    const indexOfItem = items.findIndex((item) => item._id === itemId)

    const newItems = [
      ...items.slice(0, indexOfItem),
      newItem,
      ...items.slice(indexOfItem + 1),
    ]
    setItems(newItems)
  }

  return (
    <ItemContext.Provider value={{ items, setItems, saveNewItem }}>
      {children}
    </ItemContext.Provider>
  )
}
