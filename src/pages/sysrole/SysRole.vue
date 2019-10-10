<template>
  <div class="role_content">
    <el-card class="card_search">
      <el-form :inline="true"
               :model="searchData"
               class="form_search">
        <el-form-item label="角色名称：">
          <el-input v-model="searchData.name"
                    prefix-icon="el-icon-search"
                    placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success"
                     icon="el-icon-search"
                     @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item class="button_create">
          <el-button type="primary"
                     @click="dialogVisible = true">新增角色</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card_table">
      <el-table :data="tableData.list"
                class="list_table">
        <el-table-column label="角色名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间"
                         width="600">
          <template slot-scope="scope">
            <span>{{ scope.row.operateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="deleteRoleData(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange"
                     :current-page="tableData.pageNum"
                     :page-size="tableData.pageSize"
                     layout="total, prev, pager, next, jumper"
                     :total="tableData.total"
                     class="table_page">
      </el-pagination>
    </el-card>

    <el-dialog :visible.sync="dialogVisible"
               title="新增角色">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理"
                     name="first">
          <el-form :model="form"
                   label-width="120px">
            <el-form-item label="角色名称">
              <el-input v-model="form.name"
                        auto-complete="off"
                        class="input_width"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.name"
                        auto-complete="off"
                        class="input_width"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="配置管理"
                     name="second">
          <el-table :data="roleMenuData"
                    border
                    :span-method="arraySpanMethod"
                    style="width: 100%;">
            <el-table-column label="一级菜单">
              <template slot-scope="scope">
                <el-button type="primary"
                           plain
                           size="mini"
                           v-if="scope.row.name1"
                           @click="handleClick()">{{ scope.row.name1 }}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="二级菜单">
              <template slot-scope="scope">
                <el-button type="primary"
                           plain
                           size="mini"
                           v-if="scope.row.name2"
                           @click="handleClick()">{{ scope.row.name2 }}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="三级菜单">
              <template slot-scope="scope">
                <el-button type="primary"
                           plain
                           size="mini"
                           v-if="scope.row.name3"
                           @click="handleClick()">{{ scope.row.name3 }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sysRole',
  mounted () {
    this.$store.commit('getTableData', { 'name': this.searchData.name })
    this.merage()
  },
  computed: {
    ...mapState({
      tableData: state => state.sysrole.role,
      roleMenuData: state => state.login.roleMenuData,
      pageNo: state => state.sysrole.pageNo
    })
  },
  data () {
    return {
      searchData: {
        name: ''
      },
      dialogVisible: false,
      form: {
        name: ''
      },
      activeName: 'first',
      name1Arr: [], // 第一列数组
      name1Pos: 0, // 第一列数组序号
      name2Arr: [], // 第二列数组
      name2Pos: 0, // 第二列数组序号
      hoverOrderArr: []
    }
  },
  methods: {
    onSearch () {
      this.$store.commit('getTableData', { 'name': this.searchData.name })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    deleteRoleData (index, row) {
      // console.log(index, ',', row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('deleteData', { 'id': row.id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (val) {
      // 更新vuex中的当前页数
      this.$store.commit('changePageNo', val)
    },
    merageInit () { // 初始化数据
      this.name1Arr = []
      this.name1Pos = 0
      this.name2Arr = []
      this.name2Pos = 0
      this.hoverOrderArr = []
    },
    merage () {
      this.merageInit()
      for (let i = 0; i < this.roleMenuData.length; i += 1) {
        if (i === 0) {
          // 第一行必须存在
          this.name1Arr.push(1)
          this.name1Pos = 0
          this.name2Arr.push(1)
          this.name2Pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同,eg：this.name1Pos 是 this.name1Arr序号
          // 第一列
          if (this.roleMenuData[i].name1 === this.roleMenuData[i - 1].name1) {
            this.name1Arr[this.name1Pos] += 1
            this.name1Arr.push(0)
          } else {
            this.name1Arr.push(1)
            this.name1Pos = i
          }
          // 第二列
          if (this.roleMenuData[i].name2 === this.roleMenuData[i - 1].name2 &&
            this.roleMenuData[i].name1 === this.roleMenuData[i - 1].name1) {
            this.name2Arr[this.name2Pos] += 1
            this.name2Arr.push(0)
          } else {
            this.name2Arr.push(1)
            this.name2Pos = i
          }
        }
      }
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        // 第一列的合并方法
        const row1 = this.name1Arr[rowIndex]
        const col1 = row1 > 0 ? 1 : 0 // 如果被合并了row = 0; 则他这个列需要取消
        return {
          rowspan: row1,
          colspan: col1
        }
      } else if (columnIndex === 1) {
        // 第二列的合并方法
        const row2 = this.name2Arr[rowIndex]
        const col2 = row2 > 0 ? 1 : 0 // 如果被合并了row = 0; 则他这个列需要取消
        return {
          rowspan: row2,
          colspan: col2
        }
      }
    },
    handleClick () {
      alert(1111)
    }
  }
}
</script>

<style>
.role_content {
  width: 100%;
  /* background-color: green; */
  display: flex;
  flex-direction: column;
}
.card_search {
  height: 100px;
}
.card_table {
  margin-top: 10px;
  flex-grow: 1;
}
.form_search {
  margin: 10px;
}
.list_table {
  width: 100%;
}
.table_page {
  margin: 20px;
  float: right;
}
.button_create {
  float: right;
}
.input_width {
  width: 217px;
}
</style>
