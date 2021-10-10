import * as React from 'react'
import { selectCounter } from './storeDefault/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { addToCounter, decrementCounter, incrementCounter } from './storeDefault'

export const App = () => {
  const dispatch = useDispatch()
  const counter = useSelector(selectCounter)

  return <div>
    <div>COUNTER: {counter}</div>
    <div>
      <button onClick={() => dispatch(decrementCounter())}>dec</button>
      <button onClick={() => dispatch(addToCounter(10))}>add 10</button>
      <button onClick={() => dispatch(incrementCounter())}>inc</button>
    </div>
  </div>
}
