import C from './constants'

export const incrementCounter = () => ({
  type: C.INCREMENT_COUNTER,
})

export const decrementCounter = () => ({
  type: C.DECREMENT_COUNTER,
})

export const addToCounter = (payload: number) => ({
  type: C.ADD_TO_COUNTER,
  payload,
})
