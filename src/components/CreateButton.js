import { ReactComponent as CancelLogo } from '../assets/svg/cancel.svg'
import { Link, useHistory } from 'react-router-dom'
import { ReactComponent as AddLogo } from '../assets/svg/add.svg'
export default function CreateButton({ pathname }) {
  const history = useHistory()

  return pathname === '/create-item' ? (
    <CancelLogo
      style={{ fill: '#e07a5f', cursor: 'pointer' }}
      onClick={() => history.goBack()}
    />
  ) : (
    <Link to="/create-item">
      <AddLogo style={{ fill: '#457b9d' }} />
    </Link>
  )
}
