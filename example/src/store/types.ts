import * as actions from './actions'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import C from './constants'

/* state */
export interface PostsState {
  counter: number
}

/* payloads / errors */
export type AddToCounterPayload = number
export type AsyncSetCounterSuccessPayload = number
export type AsyncSetCounterFailureError = string

/* actions */
export type PostsAction = ReturnType<InferValue<typeof actions>>

/* common */
type ThunkResult<R, A extends Action> = ThunkAction<R, PostsState, void, A>

/* thunks */
type ThunkAsyncSetCounterActions = Extract<PostsAction, Action<typeof C.ASYNC_SET_COUNTER_START
  | typeof C.ASYNC_SET_COUNTER_SUCCESS
  | typeof C.ASYNC_SET_COUNTER_FAILURE>>

export type ThunkAsyncSetCounter = ThunkResult<Promise<void>, ThunkAsyncSetCounterActions>

