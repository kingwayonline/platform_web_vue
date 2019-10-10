<template>
  <div class="content">
    <Sider></Sider>
    <div class="body">
      <BodyHeader></BodyHeader>
      <div class="breadcrumb"
           v-show="breadcrumb">
        <div class="breadcrumb_content">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breadcrumbArr"
                                :key="index"><span style="color:rgba(0, 0, 0, 0.45)">{{item}}</span></el-breadcrumb-item>
          </el-breadcrumb>
          <div class="breadcrumb_title">{{breadcrumbArr[breadcrumbArr.length-1]}}</div>
        </div>
      </div>
      <div class="body_content">
        <router-view />
      </div>
      <div class="body_footer">Copyright ©2019蓝光安科研发中心出品</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sider from '../../components/menu/Sider'
import BodyHeader from '../../components/body_header/BodyHeader'
export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  components: {
    Sider, BodyHeader
  },
  computed: {
    ...mapState({
      isCollapse: state => state.layout.isCollapse,
      breadcrumb: state => state.layout.breadcrumb,
      menuData: state => state.login.menuData,
      breadcrumbArr: state => state.sider.breadcrumbArr
    }),
    bread () {
      return this.menuData.length > 0 ? this.menuData[0].name : ''
    }
  },
  methods: {
    handCollapse () { this.$store.commit('handCollapse') }
  },
  mounted () {
    this.$store.commit('getMenu', this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  display: flex;
  flex-grow: 1;
  /* background-color: green; */
  overflow: auto;
}
.font {
  font-size: 20px;
  color: #ffffff;
  /* margin-left: 5px; */
}
.body {
  background-color: #f0f2f5;
  /* background-color: #f0f2f5; */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.body_content {
  flex-grow: 1;
  /* display: flex; */
  /* flex-direction: column; */
  overflow: auto;
  background-color:#F0F2F5;
  /* F0F2F5 */
  margin: 20px;
  display: flex;
}
.body_footer {
  height: 50px;
  /* background-color: blue; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  flex-shrink: 0;
}
.breadcrumb {
  height: 80px;
  margin-top: 3px;
  display: flex;
  background-color: #ffffff;
}
.breadcrumb_content {
  width: 100%;
  /* background-color: red; */
  margin: 20px;
  /* color: rgba(0, 0, 0, 0.45); */
  color: red;
}
.breadcrumb_title {
  width: 100%;
  /* background-color: aqua; */
  margin-top: 10px;
  font-size: 16px;
  font-weight: 1000;
  color: black;
}
</style>
