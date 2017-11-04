import * as React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store/UIstore'
import * as PropTypes from 'prop-types'
import { Tabs, SearchBar, Modal, List, Button, Toast, WhiteSpace, SwipeAction } from 'antd-mobile'
import { observable, computed } from 'mobx'
import '../style/List.less'
import http from '../http'
const alert = Modal.alert
interface infomation {
  UIid?: string
  Uusername: string
  Uuserid: string
  Uuserwechat: string
  Uuserqq: string
  Uuseremail: string
  Uadress: string
  Uuserphone: string
  Uuserlang: string
}
@observer
class ClassMateList extends React.Component {
  @observable search: boolean = false
  @observable addModal: boolean = false
  @observable
  searchResult: infomation = {
    Uusername: '',
    Uuserid: '',
    Uuserwechat: '',
    Uuserqq: '',
    Uuseremail: '',
    Uadress: '',
    Uuserphone: '',
    Uuserlang: ''
  }
  @observable classMateList: infomation[] = []
  @observable searchVal: string = ''
  @computed
  get myClassMate() {
    const stdid = window.localStorage.stdid
    const myClass = stdid.slice(0, 7)
    return this.classMateList.filter(item => item.Uuserid.slice(0, 7) == myClass)
  }
  manualFocusInst
  node
  constructor(props: any) {
    super(props)
    store.title = '同学录'
    // Toast.loading('加载中...', 0, undefined, true)
    Toast.hide()
    const node = document.getElementById('contain')
    if (node) {
      node.scrollTop = 0
    }
    this.fetchList()
  }
  static contextTypes = {
    router: PropTypes.object
  }
  fetchList = () => {
    const stdid = window.localStorage.stdid
    Toast.loading('加载中...', 0)
    http.get(`/User_info/get_list?Uuserid=${stdid}`).then(({ data }) => {
      Toast.hide()
      if (data.type == 1) {
        this.classMateList = data.data.data.map(item => item[0])
      } else {
        Toast.fail('服务器错误', 2)
      }
    })
  }
  searchById = () => {
    this.getByStid(this.searchVal)
  }
  addClassMate = () => {
    const data = {
      Uuserid: this.searchVal
    }
    http.post('/User_info/register', data).then(({ data }) => {
      if (data.type == 1) {
        Toast.success('添加成功', 2)
        this.fetchList()
        this.addModal = false
      } else {
        Toast.fail(data.message, 2)
      }
    })
  }
  getAvatar = stdid => {
    const year = stdid.slice(2, 4)
    return `http://59.77.226.32/xszp/${year}/${stdid}.jpg`
  }
  getByStid = stdid => {
    http.get(`/User_info/get?Uuserid=${stdid}`).then(({ data }) => {
      if (data.type == 1) {
        if (data.data.length == 0) Toast.info('无该用户', 2)
        else {
          this.searchResult = data.data[0]
          this.addModal = true
        }
      } else {
        Toast.fail('服务器错误', 2)
      }
    })
  }
  deletClass = (stdid, index) => {
    alert('删除', '你确定要删除该同学吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () => {
          http.get(`/User_info/delete?Uuserid=${stdid}`).then(({ data }) => {
            if (data.type == 1) {
              Toast.success('删除成功', 2)
              this.classMateList.splice(index, 1)
            } else Toast.fail('删除失败', 2)
          })
        }
      }
    ])
  }
  profile = stdid => {
    this.context.router.history.push(`/profile/${stdid}`)
  }
  conponentDidMount() {}
  render() {
    const tabs = [{ title: '我的同学' }, { title: '我的班级' }]
    return (
      <div ref={node => (this.node = node)} className="list">
        <SearchBar placeholder="输入学号搜索同学" onSubmit={this.searchById} onChange={val => (this.searchVal = val)} ref={ref => (this.manualFocusInst = ref)} />
        <Tabs tabs={tabs} initialPage={0} swipeable={false}>
          <div id="list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {this.classMateList.map((item, index) => (
              <div style={{ width: '100%' }}>
                <SwipeAction
                  style={{ backgroundColor: 'gray', width: '100%' }}
                  autoClose
                  right={[
                    {
                      text: '删除',
                      onPress: () => this.deletClass(item.Uuserid, index),
                      style: { backgroundColor: '#F4333C', color: 'white' }
                    }
                  ]}
                  key={index}
                >
                  <div className="list-item" onClick={() => this.profile(item.Uuserid)}>
                    <div className="avatar">
                      <img src={this.getAvatar(item.Uuserid)} alt="" />
                    </div>
                    <div className="list-info">
                      <p className="name">{item.Uusername}</p>
                      <WhiteSpace />
                      <p className="phone">{item.Uuserphone}</p>
                      <WhiteSpace />
                      <p className="address">{item.Uadress}</p>
                    </div>
                  </div>
                </SwipeAction>
                <WhiteSpace />
              </div>
            ))}
          </div>
          <div id="list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {this.myClassMate.map((item, index) => (
              <div style={{ width: '100%' }}>
                <div className="list-item" onClick={() => this.profile(item.Uuserid)}>
                  <div className="avatar">
                    <img src={this.getAvatar(item.Uuserid)} alt="" />
                  </div>
                  <div className="list-info">
                    <p className="name">{item.Uusername}</p>
                    <WhiteSpace />
                    <p className="phone">{item.Uuserphone}</p>
                    <WhiteSpace />
                    <p className="address">{item.Uadress}</p>
                  </div>
                </div>
                <WhiteSpace />
              </div>
            ))}
          </div>
        </Tabs>
        <Modal onClose={() => (this.addModal = false)} popup visible={this.addModal} maskClosable={true} animationType="slide-up">
          <List renderHeader={() => <div>添加至同学录</div>} className="modal-add">
            <List.Item extra={this.searchResult.Uusername} className="modal-list-item">
              姓名：
            </List.Item>
            <List.Item extra={this.searchResult.Uuserid} className="modal-list-item">
              学号：
            </List.Item>
            <List.Item wrap={true} extra={this.searchResult.Uuserphone} className="modal-list-item">
              手机号：
            </List.Item>
            <List.Item wrap={true} extra={this.searchResult.Uuserwechat} className="modal-list-item">
              微信：
            </List.Item>
            <List.Item wrap={true} extra={this.searchResult.Uuserqq} className="modal-list-item">
              QQ：
            </List.Item>
            <List.Item wrap={true} extra={this.searchResult.Uuseremail} className="modal-list-item">
              邮箱：
            </List.Item>
            <List.Item wrap={true} extra={this.searchResult.Uadress} className="modal-list-item">
              家庭地址：
            </List.Item>
            <List.Item>
              <Button type="primary" onClick={this.addClassMate}>
                添加
              </Button>
            </List.Item>
          </List>
        </Modal>
      </div>
    )
  }
}

export default ClassMateList
