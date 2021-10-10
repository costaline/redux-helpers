import { AppState } from '../init/types'

export const selectCounter = (state: AppState) => state.storeDefault.counter
