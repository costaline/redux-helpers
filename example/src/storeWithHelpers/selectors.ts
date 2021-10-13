import { AppState } from '../init/types'
import { SLICE_NAME } from './constants'
import { getWaitingStatus, getError } from '@@lib'
import C from './constants'

export const selectCounter = (state: AppState) => ({
  data: state[SLICE_NAME].counter,
  isPending: getWaitingStatus(state[SLICE_NAME].waiting, C.ASYNC_SET_COUNTER_START),
  error: getError(state[SLICE_NAME].errors, C.ASYNC_SET_COUNTER_FAILURE)
})
