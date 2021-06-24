import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ItemForAdmin from '../components/ItemForAdmin'
import { ItemContext } from '../context/ItemContext'
import getItems from '../services/getItems'

export default function AdminPage() {
  const { items, setItems } = useContext(ItemContext)
  const location = useLocation()
  useEffect(() => {
    getItems().then((data) => setItems(data))
  }, [location, setItems])

  return items
    ? items.map((item, index) => (
        <ItemForAdmin key={`${item.id}_${index}`} data={item} />
      ))
    : ''
}
