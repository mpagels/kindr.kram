import BudgetContextProvider from './BudgetContext'
import ItemContextProvider from './ItemContext'
import UserContextProvider from './UserContext'

export default function ContextWrapper({ children }) {
  return (
    <UserContextProvider>
      <ItemContextProvider>
        <BudgetContextProvider>{children}</BudgetContextProvider>
      </ItemContextProvider>
    </UserContextProvider>
  )
}
