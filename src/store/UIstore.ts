import { observable } from 'mobx'

class uiStore {
  @observable title: string = '登录'
}
const store = new uiStore()

export { store }
