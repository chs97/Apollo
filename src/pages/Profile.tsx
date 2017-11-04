import * as React from 'react'
import { store } from '../store/UIstore'
import { List, InputItem, Toast } from 'antd-mobile'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import * as PropTypes from 'prop-types'
const Item = List.Item
import '../style/Profile.less'
import http from '../http'
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
    name: '',
    stdno: '',
    wx: '',
    qq: '',
    email: '',
    address: '',
    phone: '',
    tags: ''
  }
  @observable
  nowData: infomation = {
    name: '',
    stdno: '',
    wx: '',
    qq: '',
    email: '',
    address: '',
    phone: '',
    tags: ''
  }
  @observable edit: boolean = false
  @observable stdid: string = ''
  constructor(props: any) {
    super(props)
    store.title = '个人中心'
    const node = document.getElementById('contain')
    if (node) {
      node.scrollTop = 0
    }
  }
  static contextTypes = {
    router: PropTypes.object
  }
  componentDidMount() {
    if (this.context.router.route.match.path == '/me') {
      this.stdid = window.localStorage.stdid
    } else {
      this.stdid = this.context.router.route.match.params.id
    }
    this.getByStid(this.stdid)
  }
  getByStid = stdid => {
    http.get(`/User_info/get?Uuserid=${stdid}`).then(({ data }) => {
      console.log(data)
    })
  }
  onEditClick = save => {
    if (save) {
      const data = {
        Uusername: this.nowData.name,
        Uuserphone: this.nowData.phone,
        Uuserwechat: this.nowData.wx,
        Uuseremail: this.nowData.email,
        Uuserqq: this.nowData.qq,
        Uuserlang: this.nowData.tags
      }
      http.post('/User_info/update', data).then(({ data }) => {
        if (data.type == 1) {
          Toast.success('保存成功', 2)
          this.userinfo = this.nowData
          this.edit = false
        } else {
          Toast.fail('保存失败', 2)
        }
      })
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
          <Item extra={this.userinfo.wx} wrap={true}>
            微信
          </Item>
          <Item extra={this.userinfo.qq} wrap={true}>
            QQ
          </Item>
          <Item extra={this.userinfo.email} wrap={true}>
            邮箱
          </Item>
          <Item extra={this.userinfo.address} wrap={true}>
            家庭地址
          </Item>
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
