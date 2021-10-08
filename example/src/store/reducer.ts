import C from './constants'
import { PostsAction, PostsState } from './types'

const initialState: PostsState = {
  counter: 0,
}

export const reducer = (state = initialState, action: PostsAction): PostsState => {
  switch (action.type) {
    case C.INCREMENT_COUNTER:
      return {
        ...state, counter: state.counter + 1,
      }

    case C.DECREMENT_COUNTER:
      return {
        ...state, counter: state.counter - 1,
      }

    case C.ADD_TO_COUNTER:
      return {
        ...state, counter: state.counter + action.payload,
      }

    case C.ASYNC_SET_COUNTER_START:
    case C.ASYNC_SET_COUNTER_SUCCESS:
    case C.ASYNC_SET_COUNTER_FAILURE:
      return state

    default:
      const missedAction: never = action
      return state
  }
}
