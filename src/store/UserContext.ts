import { createContext, Dispatch } from 'react'

import { Action } from './UserReducer.ts'
import User from '../models/user.ts'

type ContextType = {
  user: User | null,
  dispatch: Dispatch<Action>
}

const initialValue: ContextType = {
  user: null,
  dispatch: () => {}
}

export const UserContext = createContext<ContextType>(initialValue)

export default UserContext
