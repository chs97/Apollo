import * as React from 'react'
import { NavBar } from 'antd-mobile'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { store } from '../store/UIstore'
import '../style/App.less'

// Page
import Login from './Login'
import Profile from './Profile'
import ClassMateList from './ClassMateList'
@observer
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="header">
            <NavBar mode="dark">{store.title}</NavBar>
          </div>
          <div className="contain" id="contain">
            <Route path="/me" component={Profile} />
            <Route path="/list" component={ClassMateList} />
            <Route path="/profile/:id" component={Profile} />
            <Route exact path="/" component={Login} />
          </div>
          <div className="touch-bar">
            <div className="touch-bar-item">
              <Link to="/list">
                <i className="fa fa-address-book" aria-hidden="true" />
                <p>同学录</p>
              </Link>
            </div>
            <div className="touch-bar-item">
              <Link to="/me">
                <i className="fa fa-user" aria-hidden="true" />
                <p>我的信息</p>
              </Link>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
