import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
class Index extends Component {
  render () {
    return (
      <Fragment>
        <h2>Index</h2>
        <Link to='/about'>跳转到About</Link>
      </Fragment>
    )
  }
}

export default Index
