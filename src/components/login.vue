<template>
  <div style="">
    <div class="user">
      <div style="margin-bottom:10px">
        <label for="">
          昵称
          <input type="text" v-model="username" placeholder="请输入昵称" />
        </label>
      </div>
      <label for="">
        账号
        <input type="text" v-model="account" placeholder="请输入账号" />
      </label>
    </div>
    <div class="pass">
      <label for="">
        密码
        <input
          type="password"
          @keyup.enter="login()"
          v-model="password"
          placeholder="请输入密码"
        />
      </label>
    </div>

    <div
      @click="login"
      style="background-color:rgb(120, 161, 238);width: 100px;text-align: center;margin: 10px auto 0;border-radius: 20px;color: aliceblue;height: 25px;line-height: 25px;cursor: pointer;"
    >
      登录
    </div>
  </div>
</template>

<script>
import Bus from "../../hepler/Bus";
import { Message } from "element-ui";
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      account: ""
    };
  },
  methods: {
    ...mapMutations(["setUsername"]),
    ...mapActions(["setUser"]),
    login() {
      if (this.account === "" || this.password === "" || this.username === "") {
        //&&表示都为空时才满足条件  || 表示其中有一个为空即是空
        this.$message.error("请完整输入账号和密码");
      } else if (!/^\d/g.test(this.account)) {
        this.$message.error("账号格式错误，请输入1~10个数字");
      } else {
        Bus.$emit("userInfo", { info: this.username });
        window.localStorage.setItem("token", "access_token");
        Message.success("登录成功");
        this.$router.push("/");
        console.log(this.account + "-" + this.password);
        // this.$store.commit("setUsername", { user: this.username });
        // this.setUsername({ user: this.username });   //同步
        this.setUser({ user: this.username }); //异步
      }
    }
  },
  created() {
    // Bus.$emit("msg", { data: "我是传递过去的数据" });
  }
};
</script>

<style lang="scss" scoped>
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
</style>
