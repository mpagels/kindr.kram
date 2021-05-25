import { useContext } from 'react'
import ItemForAdmin from '../components/ItemForAdmin'
import ItemContext from '../context/ItemContext'

export default function AdminPage() {
  const { items } = useContext(ItemContext)
  return items
    ? items.map((item, index) => (
        <ItemForAdmin key={`${item.id}_${index}`} data={item} />
      ))
    : ''
}
