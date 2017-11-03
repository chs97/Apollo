import * as React from 'react'
import { Button, NavBar, Icon } from 'antd-mobile'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar
          mode="dark"
          leftContent="Back"
          rightContent={[<Icon key="0" type="search" style={{ marginRight: '16px' }} />, <Icon key="1" type="ellipsis" />]}
        >
          NavBar
        </NavBar>
        <div className="App-header">
          <Button type="primary">按钮</Button>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
