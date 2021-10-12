import { Action, combineReducers } from 'redux'
import { storeDefaultReducer } from '../storeDefault'
import { AppState } from './types'
import {
  STORE_WITH_HELPERS_SLICE_NAME,
  storeWithHelpersReducer,
} from '../storeWithHelpers'

export const combinedReducer = combineReducers({
  storeDefault: storeDefaultReducer,
  [STORE_WITH_HELPERS_SLICE_NAME]: storeWithHelpersReducer,
})

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state: AppState, action: Action) => {
  const isResetState = action.type === 'RESET_STATE'

  return combinedReducer(isResetState ? undefined : state, action)
}
