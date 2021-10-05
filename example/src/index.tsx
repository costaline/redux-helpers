import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { sum } from '../../.'

const App = () => {
  return (
    <div>
      App example {sum(1, 2)}
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
