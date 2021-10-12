import { produce } from 'immer'

import C from './constants'
import { StoreWithHelpersAction, StoreWithHelpersState } from './types'

const initialState: StoreWithHelpersState = {
  counter: 0,
  isPending: false,
}

export const reducer = produce((draft, action: StoreWithHelpersAction) => {
  switch (action.type) {
    case C.INCREMENT_COUNTER:
      draft.counter += 1
      break
    case C.DECREMENT_COUNTER:
      draft.counter -= 1
      break
    case C.ADD_TO_COUNTER:
      draft.counter += action.payload
      break
    case C.ASYNC_SET_COUNTER_START:
      draft.isPending = true
      break
    case C.ASYNC_SET_COUNTER_SUCCESS:
      draft.isPending = false
      draft.counter += action.payload
      break
    case C.ASYNC_SET_COUNTER_FAILURE:
      draft.isPending = false
      break
    default:
      const missedAction: never = action
      break
  }
}, initialState)
