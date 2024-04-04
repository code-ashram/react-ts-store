import User from '../models/user.ts'

export const enum ACTION_TYPE {
  SET,
}

export type SetUserAction = {
  type: ACTION_TYPE
  payload: User | null
}

export type Action = SetUserAction

const userReducer = (state: User | null, action: Action): User | null => {
  switch (action.type) {
    case ACTION_TYPE.SET:
      return action.payload
    default:
      return state
  }
}

export default userReducer
