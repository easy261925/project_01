import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import '../../style/index.less'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
    this.onCollapse = this.onCollapse.bind(this)
  }
  onCollapse (collapsed) {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  render () {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="2">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
            <Button type='primary'>primary</Button>
            <Button>Default</Button>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
    )
  }
}

export default Index
