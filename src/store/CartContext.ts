import { createContext, Dispatch } from 'react'

import { Action } from './CartReducer.ts'
import { Cart } from '../models'

type ContextType = {
  cart: Cart | null,
  dispatch: Dispatch<Action>
}

const initialValue: ContextType = {
  cart: null,
  dispatch: () => {}
}

export const UserContext = createContext<ContextType>(initialValue)

export default UserContext
