import {
  asyncSetCounterFailure,
  asyncSetCounterStart,
  asyncSetCounterSuccess,
} from './actions'
import { ThunkAsyncSetCounter } from './types'


export const asyncSetCounter = (): ThunkAsyncSetCounter => async (dispatch) => {
  dispatch(asyncSetCounterStart())

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    dispatch(asyncSetCounterSuccess(42))
  } catch (error) {
    dispatch(asyncSetCounterFailure((error as Error)?.toString()))
  }
}
