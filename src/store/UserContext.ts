import { createContext, Dispatch } from 'react'

import { Action } from './UserReducer.ts'
import { User } from '../models'

type ContextType = {
  user: User | null,
  dispatchUser: Dispatch<Action>
}

const initialValue: ContextType = {
  user: null,
  dispatchUser: () => {}
}

export const UserContext = createContext<ContextType>(initialValue)

export default UserContext
