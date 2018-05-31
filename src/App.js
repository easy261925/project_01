import React, {Component} from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router'

class App extends Component {
  render () {
    return (
      <Router>
        {renderRoutes(routes)}
      </Router>
    )
  }
}

export default App
