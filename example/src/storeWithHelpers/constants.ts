import { typeCreator } from '@@lib'

export const SLICE_NAME = 'storeWithHelpers'

const createSliceType = typeCreator(SLICE_NAME)

export default {
  INCREMENT_COUNTER: createSliceType('incrementCounter'),
  DECREMENT_COUNTER: createSliceType('decrementCounter'),
  ADD_TO_COUNTER: createSliceType('addToCounter'),
  ASYNC_SET_COUNTER_START: createSliceType('asyncSetCounter', 'start'),
  ASYNC_SET_COUNTER_SUCCESS: createSliceType('asyncSetCounter', 'success'),
  ASYNC_SET_COUNTER_FAILURE: createSliceType('asyncSetCounter', 'failure'),
} as const
