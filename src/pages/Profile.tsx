import * as React from 'react'
import { store } from '../store/UIstore'
import { List, InputItem } from 'antd-mobile'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
const Item = List.Item
import '../style/Profile.less'
interface infomation {
  name: string
  stdno: string
  wx: string
  qq: string
  email: string
  address: string
  phone: string
  tags: string
}
@observer
class Profile extends React.Component {
  @observable
  userinfo: infomation = {
    name: '陈汉森',
    stdno: '031502205',
    wx: 'Chs199707',
    qq: '623528324',
    email: 'chsqaq@gmail.com',
    address: '阿德撒旦',
    phone: '12312312312',
    tags: 'Hello world'
  }
  @observable
  nowData: infomation = {
    name: '陈汉森',
    stdno: '031502205',
    wx: 'Chs199707',
    qq: '623528324',
    email: 'chsqaq@gmail.com',
    address: '阿德撒旦',
    phone: '12312312312',
    tags: 'Hello world'
  }
  @observable edit: boolean = false
  constructor(props: any) {
    super(props)
    store.title = '个人中心'
  }
  onEditClick = save => {
    if (save) {
      this.userinfo = this.nowData
      this.edit = false
    } else {
      this.nowData = this.userinfo
      this.edit = true
    }
  }
  render() {
    const info = (
      <div>
        <List>
          <Item extra={this.userinfo.name}>姓名</Item>
          <Item extra={this.userinfo.stdno}>学号</Item>
          <Item extra={this.userinfo.phone}>手机号</Item>
          <Item extra={this.userinfo.wx}>微信</Item>
          <Item extra={this.userinfo.qq}>QQ</Item>
          <Item extra={this.userinfo.email}>邮箱</Item>
          <Item extra={this.userinfo.address}>家庭地址</Item>
        </List>
        <List renderHeader={() => '个性签名'}>
          <Item>{this.userinfo.tags}</Item>
        </List>
      </div>
    )
    const editInfo = (
      <div>
        <List>
          <InputItem onChange={v => (this.nowData.name = v)} value={this.nowData.name}>
            姓名
          </InputItem>
          <InputItem onChange={v => (this.nowData.stdno = v)} value={this.nowData.stdno}>
            学号
          </InputItem>
          <InputItem onChange={v => (this.nowData.phone = v)} value={this.nowData.phone}>
            手机号
          </InputItem>
          <InputItem onChange={v => (this.nowData.wx = v)} value={this.nowData.wx}>
            微信
          </InputItem>
          <InputItem onChange={v => (this.nowData.qq = v)} value={this.nowData.qq}>
            QQ
          </InputItem>
          <InputItem onChange={v => (this.nowData.email = v)} value={this.nowData.email}>
            邮箱
          </InputItem>
          <InputItem onChange={v => (this.nowData.address = v)} value={this.nowData.address}>
            家庭地址
          </InputItem>
        </List>
        <List renderHeader={() => '个性签名'}>
          <InputItem onChange={v => (this.nowData.tags = v)} value={this.nowData.tags} />
        </List>
      </div>
    )
    return (
      <div className="profile">
        <div className="header">
          <div className="avatar">
            <img src="" alt="" />
          </div>
          <p>用户名</p>
        </div>
        {this.edit ? editInfo : info}
        <div className="edit" onClick={() => this.onEditClick(this.edit)}>
          {this.edit ? <i className="fa fa-floppy-o" aria-hidden="true" /> : <i className="fa fa-pencil-square-o" aria-hidden="true" />}
        </div>
      </div>
    )
  }
}

export default Profile
