<template>
  <div class="content">
    <div class="logo_font"></div>
    <el-card style="width:300px;margin-right: 100px">
      <div slot="header">
        <span>欢迎登陆</span>
      </div>
      <el-form :model="loginform"
               ref="loginform"
               :rules="rules"
               class="loginform">
        <el-form-item class='form_item'
                      prop="username">
          <el-input v-model.trim="loginform.username"
                    placeholder="用户名"
                    clearable
                    prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="loginform.password"
                    @keyup.enter.native="submitForm('loginform')"
                    placeholder="密码"
                    show-password
                    clearable
                    prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-button type="primary"
                   style="margin-top:30px"
                   @click="submitForm('loginform')"
                   @keyup.enter="submitForm('loginform')">登录</el-button>
      </el-form>
    </el-card>
    <div class="wrap">
    </div>
    <div class="body_footer">Copyright ©2019蓝光安科研发中心出品</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  compouted: {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = {
            username: this.loginform.username,
            password: this.loginform.password,
            that: this
          }
          this.$store.commit('login', formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  /* background-color: grey; */
  background-image: url("../../assets/login.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}
.body_footer {
  align-self: center;
  /* background-color: gray; */
  margin-bottom: 30px;
}
.loginform {
  display: flex;
  flex-direction: column;
}
.wrap {
  /* background-color: aqua; */
  height: 300px;
  width: 300px;
}
.form_item {
  justify-content: center;
  margin-top: 20px;
}
.logo_font {
  align-self: flex-start;
  background-image: url("../../assets/logo-font.png");
  background-repeat: no-repeat;
  height: 55px;
  width: 800px;
  margin-top: 30px;
  margin-left: 50px;
}
</style>
