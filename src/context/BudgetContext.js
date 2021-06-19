import { createContext, useContext } from 'react'
import useGetBudget from '../hooks/useGetBudget'
import { ItemContext } from './ItemContext'
import { UserContext } from './UserContext'

export const BudgetContext = createContext(null)

export default function BudgetContextProvider({ children }) {
  const { items } = useContext(ItemContext)
  const { user } = useContext(UserContext)
  const { budget, setBudget } = useGetBudget(user, items)
  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  )
}
