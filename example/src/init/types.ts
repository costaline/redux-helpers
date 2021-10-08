import { combinedReducer } from './rootReducer'

export type AppState = ReturnType<typeof combinedReducer>
