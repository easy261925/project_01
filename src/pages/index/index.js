import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import Header from '../../components/header'
class Index extends Component {
  render () {
    return (
      <Fragment>
        <Header />
        <h1>我是首页</h1>
        <Link to='/about'>跳转到About</Link>
      </Fragment>
    )
  }
}

export default Index
