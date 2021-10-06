import C from './constants'

const initialState = {
  counter: 0,
}

export const reducer = (state = initialState, action) => {
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
      return state
  }
}
