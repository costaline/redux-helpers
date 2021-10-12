import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './init'
import { AppDefault } from './AppDefault'
import { AppWithHelpers } from './AppWithHelpers'

const app = (
  <Provider store={store}>
    <style>{`body { margin: 0; color: white }`}</style>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      height: '100vh',
    }}>
      <AppDefault/>
      <AppWithHelpers/>
    </div>
  </Provider>
)


ReactDOM.render(app, document.getElementById('root'))
