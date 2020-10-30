import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import reducer, { initialState } from './context/AppReducer'
import { GlobalContextProvider } from './context/GlobalContextProvider'

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider initialState={initialState} reducer={reducer}>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.querySelector('.app')
)
