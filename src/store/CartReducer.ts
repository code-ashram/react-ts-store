import { Cart } from '../models'

export const enum ActionType {
  SetCart = 'set-cart'
}

export type UpdateCart = {
  type: ActionType
  payload: Cart | null
}

export type Action = UpdateCart

const cartReducer = (state: Cart | null,  action: Action): Cart | null => {
  switch (action.type) {
    case ActionType.SetCart:
      return action.payload
    default:
      return state
  }
}

export default cartReducer
