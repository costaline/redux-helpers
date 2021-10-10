import { Action, combineReducers } from 'redux'
import { storeDefaultReducer } from '../storeDefault'
import { AppState } from './types'

export const combinedReducer = combineReducers({
  storeDefault: storeDefaultReducer
})

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state: AppState, action: Action) => {
  const isResetState = action.type === 'RESET_STATE'

  return combinedReducer(isResetState ? undefined : state, action)
}
