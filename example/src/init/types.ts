import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { combinedReducer } from './rootReducer'

export type AppState = ReturnType<typeof combinedReducer>

export type AppThunkAction<A extends Action> = ThunkAction<void, AppState, unknown, A>
