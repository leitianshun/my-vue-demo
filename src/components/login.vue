<template>
  <div class="box">
    <div class="login-box">
      <div v-if="!isShow">
        <div class="user">
          <!-- <div style="margin-bottom:10px">
          <label for="">
            昵称
            <input type="text" v-model="username" placeholder="请输入昵称" />
          </label>
        </div> -->
          用户名:
          <input type="text" v-model="username" placeholder="请输入用户名" />
        </div>
        <div class="pass">
          密码:
          <input
            focus
            @keydown.enter="login"
            type="password"
            v-model="password"
            placeholder="请输入密码"
          />
        </div>

        <!-- <div
        @click="login"
        style="background-color:rgb(120, 161, 238);width: 100px;text-align: center;margin: 10px auto 0;border-radius: 20px;color: aliceblue;height: 25px;line-height: 25px;cursor: pointer;"
      >
        登录
      </div> -->
        <el-row style="margin-top:20px">
          <el-col>
            <el-button @click="login" type="success" round>登录</el-button>
          </el-col>
        </el-row>
      </div>

      <div v-if="isShow">
        <div class="user">
          <!-- <div style="margin-bottom:10px">
          <label for="">
            昵称
            <input type="text" v-model="username" placeholder="请输入昵称" />
          </label>
        </div> -->
          <label for="">
            用户名:
            <input type="text" v-model="username" placeholder="请输入用户名" />
          </label>
        </div>
        <div class="pass">
          <label for="">
            密码:
            <input
              type="password"
              @keyup.enter="login"
              v-model="password"
              placeholder="请输入密码"
            />
          </label>
        </div>

        <!-- <div
        @click="login"
        style="background-color:rgb(120, 161, 238);width: 100px;text-align: center;margin: 10px auto 0;border-radius: 20px;color: aliceblue;height: 25px;line-height: 25px;cursor: pointer;"
      >
        登录
      </div> -->
        <el-row style="margin-top:20px">
          <el-col>
            <el-button @click="register" type="primary" round>注册</el-button>
          </el-col>
        </el-row>
      </div>

      <el-row style="margin-top:20px;color: green;">
        <el-col>
          <span @click="toRegister">{{
            isShow ? "已有账号去登录" : "还没账号?去注册"
          }}</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import api from "../utils/http//axios.js";
import Bus from "../../hepler/Bus";
import { Message } from "element-ui";
import { mapMutations, mapActions } from "vuex";
const nameReg = /^[\w\u4e00-\u9fa5]{3,15}$/;
const pasReg = /^.{6,10}/;
export default {
  data() {
    return {
      username: "",
      password: "",
      isShow: false
    };
  },
  // directives: {
  //   focus: {
  //     // 指令的定义
  //     inserted: function(el) {
  //       el.focus();
  //     }
  //   }
  // },
  methods: {
    ...mapMutations(["setUsername"]),
    ...mapActions(["setUser"]),
    login() {
      if (!nameReg.test(this.username)) {
        //&&表示都为空时才满足条件  || 表示其中有一个为空即是空
        this.$message.error("用户名为3~15个字符，仅限于字母数字下划线中文");
        return;
      }
      if (!pasReg.test(this.password)) {
        this.$message.error("密码格式错误，请输入6~10个字符");
        return;
      }

      Bus.$emit("userInfo", { info: this.username });

      // console.log(this.account + "-" + this.password);
      // this.$store.commit("setUsername", { user: this.username });
      // this.setUsername({ user: this.username });   //同步
      // this.setUser({ user: this.username }); //异步

      api
        .login({ username: this.username, password: this.password })
        .then(res => {
          window.localStorage.setItem("token", "access_token");
          console.log(res);
          this.$router.push("/");
          Message.success("登录成功");
          window.localStorage.setItem("userName", this.username);
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    toRegister() {
      this.isShow = !this.isShow;
      this.username = "";
      this.password = "";
    },
    register() {
      if (!nameReg.test(this.username)) {
        //&&表示都为空时才满足条件  || 表示其中有一个为空即是空
        this.$message.error("用户名为3~15个字符，仅限于字母数字下划线中文");
        return;
      }
      if (!pasReg.test(this.password)) {
        this.$message.error("密码格式错误，请输入6~10个字符");
        return;
      }

      api
        .register({ username: this.username, password: this.password })
        .then(res => {
          console.log(res);
          this.$router.push("/");
          Message.success("注册成功");
          window.localStorage.setItem("token", "access_token");
          window.localStorage.setItem("userName", this.username);
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    }
  },
  created() {
    // Bus.$emit("msg", { data: "我是传递过去的数据" });
  }
};
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    padding: 20px;
    box-shadow: 0px 0px 5px #c3b8b8;
    border-radius: 20px;
    .user {
      margin-top: 20%;
      input {
        border: none;
        outline: none;
        border: 1px solid rgb(120, 161, 238);
        border-radius: 20px;
      }
    }
    .pass {
      margin-top: 15px;
      input {
        border: none;
        outline: none;
        border: 1px solid rgb(120, 161, 238);
        border-radius: 20px;
      }
    }
  }
}
</style>
