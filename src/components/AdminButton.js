import { Link } from 'react-router-dom'
import { ReactComponent as ListLogo } from '../assets/svg/list.svg'
import { ReactComponent as AdminLogo } from '../assets/svg/admin-panel.svg'

export default function AdminButton({ pathname }) {
  return pathname === '/items-for-admin' ? (
    <Link to="/items">
      <AdminLogo style={{ fill: '#457b9d', cursor: 'pointer' }} />
    </Link>
  ) : (
    <Link to="/items-for-admin">
      <ListLogo style={{ fill: '#457b9d' }} />
    </Link>
  )
}
