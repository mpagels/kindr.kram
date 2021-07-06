import { toast } from 'react-toastify'

export function notifyWrongLogin() {
  toast.error('Username oder Passwort falsch.', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
