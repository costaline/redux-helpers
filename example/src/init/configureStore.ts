import { applyMiddleware, createStore, Middleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

import { rootReducer } from './rootReducer'

const middlewares: Middleware[] = [thunk]
const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, enhancer)
