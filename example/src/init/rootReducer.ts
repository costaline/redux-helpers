import { Action, combineReducers } from 'redux'
import { postsReducer } from '../store'
import { AppState } from './types'

export const combinedReducer = combineReducers({
  posts: postsReducer
})

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state: AppState, action: Action) => {
  const isResetState = action.type === 'RESET_STATE'

  return combinedReducer(isResetState ? undefined : state, action)
}
