import { createContext, Dispatch } from 'react'

import { Action } from './CartReducer.ts'
import { Cart } from '../models'

type ContextType = {
  cart: Cart | null,
  dispatchCart: Dispatch<Action>
}

const initialValue: ContextType = {
  cart: null,
  dispatchCart: () => {}
}

export const UserContext = createContext<ContextType>(initialValue)

export default UserContext
