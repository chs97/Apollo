import * as React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store/UIstore'
import { Tabs, SearchBar, Modal, List, Button, Toast, WhiteSpace } from 'antd-mobile'
import { observable } from 'mobx'
import '../style/List.less'
@observer
class ClassMateList extends React.Component {
  @observable search: boolean = false
  @observable addModal: boolean = false
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
  }
  conponentDidMount() {}
  render() {
    const tabs = [{ title: '我的同学' }, { title: '我的班级' }]
    return (
      <div ref={node => (this.node = node)} className="list">
        <SearchBar placeholder="输入学号搜索同学" ref={ref => (this.manualFocusInst = ref)} />
        <Tabs
          tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => {
            console.log('onChange', index, tab)
          }}
          onTabClick={(tab, index) => {
            console.log('onTabClick', index, tab)
          }}
        >
          <div id="list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="list-item">
              <div className="avatar">
                <img src="" alt="" />
              </div>
              <div className="list-info">
                <p className="name">陈汉森</p>
                <WhiteSpace />
                <p className="phone">13212312312</p>
                <WhiteSpace />
                <p className="address">阿斯顿萨达萨达萨达</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
        </Tabs>
        <Modal onClose={() => (this.addModal = false)} popup visible={this.addModal} maskClosable={true} animationType="slide-up">
          <List renderHeader={() => <div>添加至同学录</div>} className="modal-add">
            <List.Item extra={'陈汉森'} className="modal-list-item">
              姓名：
            </List.Item>
            <List.Item extra={'031502205'} className="modal-list-item">
              学号：
            </List.Item>
            <List.Item wrap={true} extra={'13212312312'} className="modal-list-item">
              手机号：
            </List.Item>
            <List.Item wrap={true} extra={'Ch97123123'} className="modal-list-item">
              微信：
            </List.Item>
            <List.Item wrap={true} extra={'623528324'} className="modal-list-item">
              QQ：
            </List.Item>
            <List.Item wrap={true} extra={'chsqaq@gmail.com'} className="modal-list-item">
              邮箱：
            </List.Item>
            <List.Item wrap={true} extra={'福建省晋江市磁灶镇太昌村balabalabala'} className="modal-list-item">
              家庭地址：
            </List.Item>
            <List.Item>
              <Button type="primary">添加</Button>
            </List.Item>
          </List>
        </Modal>
        <div className="add" onClick={() => (this.search = true)}>
          <i className="fa fa-plus" aria-hidden="true" />
        </div>
      </div>
    )
  }
}

export default ClassMateList
