import { createContext, Dispatch } from 'react'

import { Action } from './UserReducer.ts'

type ContextType = {
  user: string,
  dispatch: Dispatch<Action>
}

const initialValue: ContextType = {
  user: '',
  dispatch: () => {}
}

export const UserContext = createContext<ContextType>(initialValue)

export default UserContext
