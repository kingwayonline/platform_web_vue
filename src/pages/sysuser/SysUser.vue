<template>
  <div class="content">
    <el-card class="tree">
      <el-input placeholder="输入关键字进行过滤"
                v-model="filterText">
      </el-input>
      <el-tree class="filter-tree"
               :props="defaultProps"
               :data="dept"
               :default-expand-all="false"
               @node-click="handleNodeClick"
               :filter-node-method="filterNode"
               ref="tree">
      </el-tree>
    </el-card>
    <el-card class="table">
      <div class="search">
        <!-- <div style="display:flex;align-items: center">姓名：</div>
        <div>
          <el-input v-model="input"
                    size="small"
                    placeholder="请输入内容"></el-input>
        </div> -->

        <el-form :inline="true"
                 :rules="rules"
                 ref="sysUserSearchform"
                 :model="sysUserSearchform"
                 class="form_sysUser_search">
          <el-form-item label="姓名"
                        prop="user">
            <el-input v-model.trim="sysUserSearchform.user"
                      clearable
                      placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话"
                        prop="phone"
                        class="sysUser_search">
            <el-input v-model.trim="sysUserSearchform.phone"
                      clearable
                      placeholder="电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱"
                        prop="email"
                        class="sysUser_search">
            <el-input v-model.trim="sysUserSearchform.email"
                      clearable
                      placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       class="sysUser_search_btn"
                       icon="el-icon-search"
                       size='medium'
                       @click="onSubmit('sysUserSearchform')">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button type="primary"
                   class="add_btn"
                   size='medium'
                   icon="el-icon-plus"
                   @click="addUser">新增</el-button>
      </div>
      <el-table :data="userTableData"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%;flex-grow: 1;">
        <el-table-column prop="username"
                         label="姓名"
                         width="100">
        </el-table-column>
        <el-table-column prop="telephone"
                         label="电话"
                         width="150">
        </el-table-column>
        <el-table-column prop="mail"
                         label="邮箱"
                         width="300">
        </el-table-column>
        <el-table-column prop="remark"
                         label="备注">
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%">

      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="用户管理"
                     name="first">
          <div class="dialog2">
            <el-scrollbar style="height:100%">
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
              <span>这是一段信息</span><br>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理"
                     name="second">配置管理</el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SysUser',
  data () {
    return {
      dialogVisible: false,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      sysUserSearchform: {
        user: '',
        phone: '',
        email: ''
      },
      rules: {
        user: [
          { max: 4, message: '姓名最大为4位' }
        ],
        phone: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: '目前只支持中国大陆的手机号码'
          }
        ],
        email: [
          { type: 'email', message: '格式不正确' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      dept: state => state.sysuser.dept,
      userTableData: state => state.sysuser.userTableData
    })
  },
  mounted () {
    // this.breadcrumb = true
    this.$store.commit('showBreadcrumb', true)
    this.$store.commit('getDept', this)
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleNodeClick (data) {
      this.$store.commit('getUser', { data, that: this })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = {
            user: this.sysUserSearchform.user,
            phone: this.sysUserSearchform.phone,
            email: this.sysUserSearchform.email
          }
          console.log(formData)
          // this.$store.commit('login', formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addUser () {
      this.dialogVisible = true
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: flex;
  justify-content: space-between;
}
.tree {
  width: 480px;
}
.table {
  flex-grow: 1;
  margin-left: 20px;
  /* display: flex; */
}
.search {
  display: flex;
  /* margin-bottom: 10px; */
}
.filter-tree {
  margin-top: 10px;
}
.form_sysUser_search {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.sysUser_btn {
  margin-left: 30px;
}
.sysUser_search_btn {
  margin-left: 20px;
}
.add_btn {
  margin-bottom: 5px;
}
.dialog2 {
  height: 200px;
}
</style>
