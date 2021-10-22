import { produce} from 'immer'
import { updateWaiting, updateErrors } from '@@lib'

import C from './constants'
import { StoreWithHelpersAction, StoreWithHelpersState } from './types'

const initialState: StoreWithHelpersState = {
  counter: 0,
  waiting: [],
  errors: {}
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
      draft.waiting = updateWaiting(draft.waiting, action)
      draft.errors = updateErrors(draft.errors, action)
      break
    case C.ASYNC_SET_COUNTER_SUCCESS:
      draft.waiting = updateWaiting(draft.waiting, action)
      draft.counter += action.payload
      break
    case C.ASYNC_SET_COUNTER_FAILURE:
      draft.waiting = updateWaiting(draft.waiting, action)
      draft.errors = updateErrors(draft.errors, action)
      break
    default:
      const missedAction: never = action
      break
  }
}, initialState)
