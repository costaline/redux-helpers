import { combineReducers } from 'redux'
import { postsReducer } from '../store'

const appReducer = combineReducers({
  posts: postsReducer
})

/* https://stackoverflow.com/a/35641992 */
export const rootReducer = (state, action) => {
  const isResetState = action.type === 'RESET_STATE'

  return appReducer(isResetState ? undefined : state, action)
}
