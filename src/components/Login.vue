<template>
  <div class="container">
    <div id="loginbox">
      <div id="loginform">
        <form
          v-on:submit.prevent="submit"
          id="#frm"
          action
          style="height:300px;width:450px;padding-left:40px;padding-top:100px;"
        >
          <div class="row form-group">
            <div class="col-md-4 col-ms-4 col-xs-6">
              <label for="uname">用户名：</label>
            </div>
            <div class="col-md-8 col-ms-8 col-xs-6">
              <input type="text" id="uname" class="form-control" v-model="us.uname" />
            </div>
          </div>
          <div class="row form-group">
            <div class="col-md-4 col-ms-4 col-xs-6">
              <label for="upwd">密码：</label>
            </div>
            <div class="col-md-8 col-ms-8 col-xs-6">
              <input type="password" id="upwd" v-model="us.upwd" class="form-control" />
            </div>
          </div>
          <button class="btn btn-success loginbtn">登录</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      btn: false, //true 已经提交过， false没有提交过
      us: {
        uname: "",
        upwd: ""
      }
    };
  },
  computed: mapActions(["user_signin"]),
  methods: {
    submit() {
      console.log(this.us.upwd);
      this.$http
        .post(
          "https://easy-mock.com/mock/5cee34b56cd1db2fd269b2a4/address/setDefault",
          {
            username:this.us.uname,
            password:this.us.upwd
          }
        )
        .then(response => {
          //这里在isLogin方法中先判断一下后台返回的是否为空值，如果不是然后提交后台返回的值。
          //注意这里是个难点，Vuex与Vue-Resource结合使用。
            console.log(response.body[0]);
          if ((response.body != null) & (response.body.length > 0)) {
            this.$store.commit("user_signin", response.body[0]);
            this.name = "";
            this.pwd = "";
            this.$router.push({ path: "index" });
          } else {
            alert("请输入正确的用户名和密码！！！");
            this.name = "";
            this.pwd = "";
          }
        })
        .then(error => (this.error = error));
    }
  }
};
</script>