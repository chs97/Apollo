import * as React from 'react'
import { observer } from 'mobx-react'
import { store } from '../store/UIstore'
import { Tabs } from 'antd-mobile'
import '../style/List.less'
@observer
class List extends React.Component {
  constructor(props: any) {
    super(props)
    store.title = '同学录'
  }
  render() {
    const tabs = [{ title: '我的同学' }, { title: '我的班级' }]
    return (
      <div className="list">
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="list-item">
              <div className="avatar">
                <img src="" alt="" />
              </div>
              <div className="list-info">
                <p className="name">陈汉森</p>
                <p className="phone">13212312312</p>
                <p className="address">阿斯顿萨达萨达萨达</p>
              </div>
            </div>
            <div className="list-item">
              <div className="avatar">
                <img src="" alt="" />
              </div>
              <div className="list-info">
                <p className="name">陈汉森</p>
                <p className="phone">13212312312</p>
                <p className="address">阿斯顿萨达萨达萨达</p>
              </div>
            </div>
            <div className="list-item">
              <div className="avatar">
                <img src="" alt="" />
              </div>
              <div className="list-info">
                <p className="name">陈汉森</p>
                <p className="phone">13212312312</p>
                <p className="address">阿斯顿萨达萨达萨达</p>
              </div>
            </div>
            <div className="list-item">
              <div className="avatar">
                <img src="" alt="" />
              </div>
              <div className="list-info">
                <p className="name">陈汉森</p>
                <p className="phone">13212312312</p>
                <p className="address">阿斯顿萨达萨达萨达</p>
              </div>
            </div>
            <div className="list-item">
              <div className="avatar">
                <img src="" alt="" />
              </div>
              <div className="list-info">
                <p className="name">陈汉森</p>
                <p className="phone">13212312312</p>
                <p className="address">阿斯顿萨达萨达萨达</p>
              </div>
            </div>
            <div className="list-item">
              <div className="avatar">
                <img src="" alt="" />
              </div>
              <div className="list-info">
                <p className="name">陈汉森</p>
                <p className="phone">13212312312</p>
                <p className="address">阿斯顿萨达萨达萨达</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
        </Tabs>
        <div className="add">
          <i className="fa fa-plus" aria-hidden="true" />
        </div>
      </div>
    )
  }
}

export default List
