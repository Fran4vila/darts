import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import createLogger from 'redux-logger'
import Root from './components/root'

const store = process.env.NODE_ENV === 'development'
  ? createStore(reducer, applyMiddleware(createLogger()))
  : createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
)
