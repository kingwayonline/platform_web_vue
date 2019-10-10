import axios from 'axios'
import { Message } from 'element-ui'

const state = {
}
const mutations = {
  async dropdownCmd (state, { command, that }) {
    if (command === 'logout') {
      let res = await axios.post('/logout.json', null, { 'headers': { userid: sessionStorage.getItem('userid') } })
      if (res.data.ret) {
        that.$router.push({ path: '/login' })
        sessionStorage.clear()
      } else {
        Message.error('服务器异常')
      }
    } else if (command === 'updatePass') {
      // 执行修改密码操作
    }
  }
}
const actions = {

}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
