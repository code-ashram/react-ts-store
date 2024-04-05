import User from '../models/user.ts'

export const enum ActionType {
  SetUser = 'set-user',
}

export type SetCurrentUser = {
  type: ActionType
  payload: User | null
}

export type Action = SetCurrentUser

const userReducer = (state: User | null, action: Action): User | null => {
  switch (action.type) {
    case ActionType.SetUser:
      return action.payload
    default:
      return state
  }
}

export default userReducer
