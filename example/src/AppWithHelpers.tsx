import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCounter,
  decrementCounter,
  incrementCounter,
  selectCounter,
  asyncSetCounter,
} from './storeWithHelpers'

export const AppWithHelpers = () => {
  const dispatch = useDispatch()
  const counter = useSelector(selectCounter)

  return <div style={{backgroundColor: '#282828', padding: '50px'}}>
    <h2>WITH HELPERS</h2>
    <div>COUNTER: {counter.data}</div>
    <div>
      <button onClick={() => dispatch(decrementCounter())}>dec</button>
      <button onClick={() => dispatch(addToCounter(10))}>add 10</button>
      <button disabled={counter.isPending}
              onClick={() => dispatch(asyncSetCounter())}>async 42
      </button>
      <button onClick={() => dispatch(incrementCounter())}>inc</button>
    </div>
    {counter.error && (<>
      <br/>
      <pre style={{color: 'red'}}>{counter.error}</pre>
    </>)}
  </div>
}
