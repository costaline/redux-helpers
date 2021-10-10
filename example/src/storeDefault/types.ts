import { Immutable } from 'immer'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import * as actions from './actions'
import C from './constants'

/* slice state */
export type StoreDefaultState = Immutable<{
  counter: number,
  isPending: boolean
}>

/* action payloads | errors */
export type AddToCounterPayload = number
export type AsyncSetCounterSuccessPayload = number
export type AsyncSetCounterFailureError = string

/* slice actions */
export type StoreDefaultAction = ReturnType<InferValue<typeof actions>>

/* common thunk result for slice */
type ThunkResult<R, A extends Action> = ThunkAction<R, StoreDefaultState, void, A>

/* thunk actions */
export type ThunkAsyncSetCounter = ThunkResult<Promise<void>, Extract<StoreDefaultAction, Action<
  | typeof C.ASYNC_SET_COUNTER_START
  | typeof C.ASYNC_SET_COUNTER_SUCCESS
  | typeof C.ASYNC_SET_COUNTER_FAILURE
>>>
