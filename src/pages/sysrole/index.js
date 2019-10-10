import axios from 'axios'
import { Message } from 'element-ui'

const state = {
  role: [],
  pageNo: 1
}
const mutations = {
  // 获取角色列表数据
  async getTableData (state, that) {
    var fd = new FormData()
    if (that.name) {
      fd.append('name', that.name)
    }
    if (that.pageNo) {
      fd.append('pageNo', that.pageNo)
    } else {
      fd.append('pageNo', 1)
    }
    if (that.pageSize) {
      fd.append('pageSize', that.pageSize)
    } else {
      fd.append('pageSize', 5)
    }
    let res = await axios.post('/sys/role/getRolePage.json', fd, { 'headers': { userid: sessionStorage.getItem('userid'), token: sessionStorage.getItem('token') } })
    if (res.data.ret) {
      state.role = res.data.data
      state.pageNo = res.data.data.pageNum
    } else {
      that.$router.replace('/login')
    }
  },
  // 删除角色列表数据
  async deleteData (state, that) {
    let res = await axios.post('/sys/role/delete.json', that, { 'headers': { userid: sessionStorage.getItem('userid'), token: sessionStorage.getItem('token') } })
    if (res.data.ret) {
      const totalPage = Math.ceil((state.role.total - 1) / state.role.pageSize) // 总页数
      state.pageNo = state.pageNo > totalPage ? totalPage : state.pageNo
      state.pageNo = state.pageNo < 1 ? 1 : state.pageNo
      console.log('当前页:' + state.pageNo)
      // 调用获取列表接口
      this.commit('getTableData', { 'pageNo': state.pageNo })

      Message.success('删除成功!')
    } else {
      Message.error(res.data.msg)
    }
  },
  // 改变vuex中的'当前页'属性
  changePageNo (state, that) {
    state.pageNo = that
    // 查询列表
    this.commit('getTableData', { 'pageNo': that })
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
