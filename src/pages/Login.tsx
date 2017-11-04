import * as React from 'react'
import { store } from '../store/UIstore'
import { Button, List, InputItem, Flex, WhiteSpace, NoticeBar } from 'antd-mobile'
const Col = Flex.Item
class Login extends React.Component {
  username: string = ''
  password: string = ''
  constructor(props: any) {
    super(props)
    store.title = '登录'
  }
  submit = () => {
    const data = {
      username: this.username,
      password: this.password
    }
    console.log(data)
  }
  render() {
    return (
      <div className="login">
        <NoticeBar>请使用教务处的账号密码登录.</NoticeBar>
        <Flex direction="column" justify="start" align="center">
          <Col>
            <h1>登录</h1>
          </Col>
          <WhiteSpace />
          <Col style={{ width: '100%', marginLeft: '0' }}>
            <List>
              <InputItem onChange={e => (this.username = e)} type="number" placeholder="学号">
                学号：
              </InputItem>
              <InputItem onChange={e => (this.password = e)} type="password" placeholder="教务处密码">
                密码：
              </InputItem>
            </List>
          </Col>
          <WhiteSpace />
          <Col style={{ width: '98%', marginLeft: '0' }}>
            <Button onClick={this.submit} type="primary">
              登录
            </Button>
          </Col>
        </Flex>
      </div>
    )
  }
}

export default Login
