import * as axios from 'axios'
const http = axios.default.create({
  baseURL: 'http://contacts-c.and-who.cn/'
})
export default http
