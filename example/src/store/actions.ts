import C from './constants'
import * as T from './types'

export const incrementCounter = () => ({
  type: C.INCREMENT_COUNTER,
}) as const

export const decrementCounter = () => ({
  type: C.DECREMENT_COUNTER,
}) as const

export const addToCounter = (payload: T.AddToCounterPayload) => ({
  type: C.ADD_TO_COUNTER,
  payload,
}) as const

export const asyncSetCounterStart = () => ({
  type: C.ASYNC_SET_COUNTER_START
}) as const

export const asyncSetCounterSuccess = (payload: T.AsyncSetCounterSuccessPayload) => ({
  type: C.ASYNC_SET_COUNTER_SUCCESS,
  payload
}) as const

export const asyncSetCounterFailure = (error: T.AsyncSetCounterFailureError) => ({
  type: C.ASYNC_SET_COUNTER_FAILURE,
  error
}) as const
