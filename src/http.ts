import * as axios from 'axios'
const http = axios.default.create({
  baseURL: 'http://dyks.west2online.com:8080/',
  withCredentials: true
})
export default http
