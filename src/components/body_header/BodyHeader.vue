<template>
  <div class="body_header">
    <div class="body_header_left"
         @click="handCollapse">
      <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
    </div>
    <div class="body_header_center"></div>
    <div class="body_header_right">
      <el-dropdown slot="dropdown"
                   @command="dropdownCmd">
        <span class="el-dropdown-link">
          欢迎您，{{useName}}！
          <i class="el-icon-arrow-down"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="updatePass">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  data () {
    return {
      useName: sessionStorage.getItem('username')
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.layout.isCollapse
    })
  },
  methods: {
    handCollapse () { this.$store.commit('handCollapse') },
    dropdownCmd (command) {
      let reqData = { command, that: this }
      this.$store.commit('dropdownCmd', reqData)
    }
  },
  mounted () {
    this.$store.commit('getMenu', this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body_header {
  height: 72px;
  background-color: #ffffff;
  display: flex;
  flex-shrink: 0;
}
.body_header_left {
  width: 68px;
  /* background-color: aquamarine; */
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.body_header_center {
  flex: 1;
}
.body_header_right {
  margin-right: 5%;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
