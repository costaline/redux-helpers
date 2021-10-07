import C from './constants'
import { PostsAction, PostsState } from './types'

const initialState: PostsState = {
  counter: 0,
}

export const reducer = (state = initialState, action: PostsAction) => {
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

    default:
      const missedAction: never = action;
      return state
  }
}
