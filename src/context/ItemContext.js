import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const ItemContext = createContext(null)

export default function ItemContextProvider({ children }) {
  const location = useLocation()
  const [items, setItems] = useState()

  function saveNewItem(itemId, newItem) {
    const indexOfItem = items.findIndex((item) => item._id === itemId)

    const newItems = [
      ...items.slice(0, indexOfItem),
      newItem,
      ...items.slice(indexOfItem + 1),
    ]
    setItems(newItems)
  }

  useEffect(() => {
    fetch('/api/item')
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [location])

  return (
    <ItemContext.Provider value={{ items, setItems, saveNewItem }}>
      {children}
    </ItemContext.Provider>
  )
}
