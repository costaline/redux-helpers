import { AppState } from '../init/types'
import { SLICE_NAME } from './constants'

export const selectCounter = (state: AppState) => state[SLICE_NAME].counter
