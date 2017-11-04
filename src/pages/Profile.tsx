import * as React from 'react'
import { store } from '../store/UIstore'
import { List } from 'antd-mobile'
const Item = List.Item
import '../style/Profile.less'
class Profile extends React.Component {
  constructor(props: any) {
    super(props)
    store.title = '个人中心'
  }
  render() {
    return (
      <div className="profile">
        <div className="header">
          <div className="avatar">
            <img src="" alt="" />
          </div>
          <p>用户名</p>
        </div>
        <List>
          <Item extra={'陈汉森'}>姓名</Item>
          <Item extra={'031502205'}>学号</Item>
          <Item extra={'Chs199707'}>微信</Item>
          <Item extra={'623528324'}>QQ</Item>
          <Item extra={'chsqaq@gmail.com'}>邮箱</Item>
          <Item extra={'福建省泉州市晋江市磁灶镇太昌村'}>家庭地址</Item>
        </List>
        <div className="edit">
          <i className="fa fa-pencil-square-o" aria-hidden="true" />
        </div>
      </div>
    )
  }
}

export default Profile
