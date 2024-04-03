export const enum ACTION_TYPE {
  SET,
}

export type SetTokenAction = {
  type: ACTION_TYPE
  payload: {
    token: string,
  }
}

export type Action = SetTokenAction

const userReducer = (state: string, { type, payload }: Action): string => {
  switch (type) {
    case ACTION_TYPE.SET:
      return state = payload.token
    default:
      return state
  }
}

export default userReducer
