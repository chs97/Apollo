import * as axios from 'axios'
const http = axios.default.create({
  baseURL: 'http://contacts-c.and-who.cn/'
})
if (window.localStorage.token) http.defaults.headers.common['Utoken'] = window.localStorage.token
export default http
