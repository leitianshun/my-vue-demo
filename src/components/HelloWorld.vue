<template>
  <div class="hello">
    <div
      style="display:flex;justify-content: space-between;align-items: center;padding: 20px ;"
    >
      <h2 style="text-bold:bold" class="el-icon-s-home">
        Welcome to my world... A precious little princess
      </h2>

      <div style="">
        <span :title="users" style="color:red">欢迎回来:</span>
        {{ isLogin ? userName : "" }}
      </div>
      <div
        v-if="!isLogin"
        @click="toLogin"
        style="background-color: red;color: aliceblue;width: 100px;height: 40px;line-height: 40px;border-radius: 20px;"
      >
        登录
      </div>

      <div
        v-else
        @click="logout"
        style="background-color: red;color: aliceblue;width: 100px;height: 40px;line-height: 40px;border-radius: 20px;cursor: pointer;"
      >
        注销
      </div>
    </div>

    <h2>vue2知识复习</h2>

    <ul>
      <li>
        <router-link to="/test"><button>嵌套路由</button></router-link>
      </li>
      <li>
        <router-link to="/about"
          ><button>数组&对象添加值写法</button></router-link
        >
      </li>
    </ul>

    <div>
      <h4>v-for里使用数组</h4>
      <ul v-for="item in list" :key="item.id">
        <li>{{ item.name }}</li>
        <li>{{ item.age }}</li>
      </ul>
    </div>

    <div>
      <h4>v-for里使用对象</h4>
      <ul v-for="val in object" :key="val">
        <li>{{ val }}</li>
      </ul>
    </div>

    <div>
      <h4>v-if / v-else</h4>
      <span v-if="show">yes</span>
      <span v-else>no</span>
      <button @click="change">toggle</button>
    </div>

    <div>
      <h4>计算属性</h4>
      <button>computed</button> <span>{{ names }}</span>
    </div>

    <div>
      <h4>watch监听</h4>
      <button @click="chan">watch</button> <span>{{ name2 }}</span>
    </div>

    <div>
      <h4>使用watch监听输入</h4>
      <label for="">
        请输入内容
        <input type="text" v-model="val" />
        {{ status }}
      </label>
      <div>{{ val }}</div>
    </div>

    <div>
      <h4>class与style动态语法</h4>
      <div>
        <h5>class语法:</h5>
        <div>
          <p>isActive为true时有active这个class： {{ isActive }}</p>

          <span :class="{ active: isActive }">演示</span>
          <button @click="toggle">切换</button>
        </div>
        <br />
        <span>{{ clas }}</span>
        <br />
        <span>{{ cla }}</span>
      </div>
      <div>
        <h5>
          style语法
        </h5>
        <p>sty为true时颜色为绿色:{{ sty }}</p>
        <div>
          <h5 :style="{ color: sty == true ? 'green' : '' }">
            演示 <button @click="toggles">切换</button>
          </h5>
        </div>
      </div>
    </div>

    <h4>vue 生命周期</h4>
    <div class="shengming" style="display:flex;flex-direction:column;">
      <button @click="beforeCre">创建前的钩子函数是什么?</button>
      <button @click="Created">创建后的钩子函数是什么?</button>
      <button @click="beforeM">挂载前的钩子函数是什么?</button>
      <button @click="mounted">挂载后的钩子函数是什么?</button>
      <button @click="beforeDes">销毁前的钩子函数是什么?</button>
      <button @click="destroyed">销毁后的钩子函数是什么?</button>
    </div>
    <div>
      <h4>使用vuex实现一个点击加一</h4>
      <span>{{ num }}</span>
      <button @click="setCount(1)">add</button>
    </div>
    <div>监听事件总线传递过来的数据:{{ eventData }}</div>
    <div>
      <h3>默认插槽、具名插槽、作用域插槽</h3>
      <div>
        默认插槽 slot 具名插槽 name="xxx"
        作用域插槽，子组件在插槽上传递数据，组组件在template里用slop-scope="xxx"获取
      </div>
      <child v-for="item in list" :key="item.id" :item="item">
        <!-- <template slot="hea">
          我是头部
        </template>
        <template slot="foo">
          我是尾部
        </template> -->

        <template slot-scope="{ id }">
          {{ id }}
          <button @click="del(id)">删除</button>
        </template>
      </child>
    </div>
    <div>
      <button @click="success">成功消息提示</button>
    </div>
    <div>使用moment日期格式化全局filter过滤器:{{ nowDate | formDate }}</div>
    <div>
      使用moment日期格式化，使用原型挂载$moment:{{
        $moment(nowDate).format("YYYY-MM-DD HH:mm:ss")
      }}
    </div>
    <!-- <el-container> -->
    <el-row type="flex" justify="center">
      <el-col :span="24">
        评价组件:
        <div
          @click="pingjia(index + 1)"
          v-for="(item, index) in 5"
          style="cursor:pointer"
          :key="index"
          :style="{
            color: appraiseINdex == item ? 'red' : ''
          }"
          class="el-icon-star-on "
        ></div>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col>
        <el-button type="success">小雷笔记</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin:20px">
      <el-col :span="8">
        <el-input></el-input>
      </el-col>
      <el-col :span="5">
        <el-button class="el-icon-circle-plus-outline" type="primary" round
          >add NoteBooks</el-button
        >
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin:20px">
      <el-col :span="8">
        <el-input></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="info" class="el-icon-delete" round>
          delete NoteBooks
        </el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin:20px">
      <el-col :span="8">
        <el-input></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="warning" class="el-icon-edit" round>
          edit NoteBooks</el-button
        >
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin:20px">
      <el-col :span="8">
        <el-input></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="danger" class="el-icon-tickets" round>
          view NoteBooks List</el-button
        >
      </el-col>
    </el-row>

    <div
      class="notebook-box"
      style="display:flex;justify-content: space-between;;width:calc(100% - 100px);padding: 10px;margin: 50px auto ;"
    >
      <div
        class="sideBar"
        style="width:50px;min-height:360px;display: flex;flex-direction: column;justify-content: space-around;"
      >
        <router-link to="/notebook" active-class="actives">
          <i class="el-icon-collection"></i>
        </router-link>
        <router-link to="/note" active-class="actives">
          <i class="el-icon-notebook-2"></i>
        </router-link>
        <router-link to="/collection" active-class="actives">
          <i class="el-icon-delete-solid"></i>
        </router-link>
      </div>
      <div
        style="width:calc(100% - 100px) ;margin:  0 20px;padding: 10px;border: 1px solid rgb(187, 161, 161);"
      >
        <router-view></router-view>
      </div>
    </div>
    <!-- </el-container> -->
    <div style="height:300px"></div>
  </div>
</template>

<script>
import Bus from "../../hepler/Bus";
import { mapState, mapGetters, mapActions } from "vuex";
import Child from "./child.vue";
import api from "../utils/http/axios";
export default {
  // inject: ["na"],
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your world",
      list: [
        { id: 1, name: "张三", age: 18 },
        { id: 2, name: "张四", age: 28 },
        { id: 3, name: "张五", age: 38 }
      ],
      object: {
        title: "How to do lists in Vue",
        author: "Jane Doe",
        publishedAt: "2016-04-10"
      },
      show: false,
      users: "",
      name: "好好学习vue",
      name2: "摆烂",
      val: "",
      status: "",
      cla: "<div :class=\"{active:0 === count ? 'active' : ''}\"></div>",
      clas: '<div :class="{ active: isActive }"></div>',
      sty: "<div :style=\"{'color': 0 === cue ? 'red' : ''}\"></div>",
      isActive: false,
      sty: false,
      eventData: "未",
      nowDate: new Date().getTime(),
      userName: "",
      appraiseINdex: "",

      isLogin: false
    };
  },
  created() {
    let userName = window.localStorage.getItem("userName");
    this.userName = userName;
    this.getInfo();
    // console.log(this.$store);
    // console.log(this.$store.state);
    // console.log(this.$store.state.user.count);
  },
  mounted() {
    Bus.$on("userInfo", user => {
      // console.log(user.info);
      // console.log(user);
      this.eventData = user.info;
    });
  },
  computed: {
    // com() {
    //   return this.eventData.charAt(2);
    // },
    ...mapState(["count"]),
    ...mapGetters(["user", "num", "ss"]),
    names() {
      return this.name
        .split("")
        .reverse()
        .join("");
    }
    // slug() {
    //   return this.users[0];
    // }
  },
  // destroyed() {
  //   Bus.$off("userInfo");
  // },
  watch: {
    //用来监听data中的属性是否发生改变
    name2(newVal, oldVal) {
      alert(
        "name2改变了" + "---" + "新值为:" + newVal + "---" + "旧值为:" + oldVal
      );
    },
    val(newVal, oldVal) {
      // console.log(newVal + "---" + oldVal);
      if (this.val) {
        this.status = "正在输入...";
      } else if (this.val === "" || this.val === "null") {
        this.status = "未输入";
      }
    }
  },
  methods: {
    getInfo() {
      api.getInfo().then(res => {
        console.log(res);
        if (res.isLogin) {
          this.isLogin = true;
        } else {
          this.$router.push("/login");
          this.isLogin = false;
        }
      });
    },
    pingjia(index) {
      this.appraiseINdex = index;
    },
    success() {
      this.$message.success("成功信息");
    },
    del(id) {
      console.log(id);
      const index = this.list.findIndex(v => (v.id = id));
      this.list.splice(index, 1);
    },
    ...mapActions(["setCount"]),
    add() {
      this.setCount(1);
    },
    toggle() {
      this.isActive = !this.isActive;
    },
    toggles() {
      this.sty = !this.sty;
    },
    chan() {
      this.name2 = "好好学习";
    },
    change() {
      this.show = !this.show;
    },
    toLogin() {
      this.$router.push("/login");
    },
    logout() {
      this.$confirm("您确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        api.logout().then(res => {
          this.$router.push("/login");
          this.$message.success("注销成功");
          console.log(res);
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("userName");
        });
      });
    },
    beforeCre() {
      const res = prompt("创建前的生命周期钩子是什么?");
      if (res === "beforeCreate" || res === "beforecreate") {
        alert("恭喜答对,奖励一个大嘴巴子");
      } else if (res === "" || res === null) {
        alert("不可以为空哦");
      } else {
        alert("恭喜答错");
      }
    },
    Created() {
      const res = prompt("创建后的生命周期钩子是什么?");
      if (res === "Created" || res === "created") {
        alert("恭喜答对,奖励一个大嘴巴子");
      } else if (res === "" || res === null) {
        alert("不可以为空哦");
      } else {
        alert("恭喜答错");
      }
    },
    beforeM() {
      const res = prompt("挂载前的生命周期钩子是什么?");
      if (res === "beforeMounte" || res === "beforemounte") {
        alert("恭喜答对,奖励一个大嘴巴子");
      } else if (res === "" || res === null) {
        alert("不可以为空哦");
      } else {
        alert("恭喜答错");
      }
    },
    mounted() {
      const res = prompt("挂载后的生命周期钩子是什么?");
      if (res === "Mounted" || res === "mounted") {
        alert("恭喜答对,奖励一个大嘴巴子");
      } else if (res === "" || res === null) {
        alert("不可以为空哦");
      } else {
        alert("恭喜答错");
      }
    },
    beforeDes() {
      const res = prompt("销毁前的生命周期钩子是什么?");
      if (res === "beforeDestroy" || res === "beforedestroy") {
        alert("恭喜答对,奖励一个大嘴巴子");
      } else if (res === "" || res === null) {
        alert("不可以为空哦");
      } else {
        alert("恭喜答错");
      }
    },
    destroyed() {
      const res = prompt("销毁后的生命周期钩子是什么?");
      if (res === "Destroy" || res === "destroy") {
        alert("恭喜答对,奖励一个大嘴巴子");
      } else if (res === "" || res === null) {
        alert("不可以为空哦");
      } else {
        alert("恭喜答错");
      }
    }
  },
  components: { Child }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  h1,
  ul {
    list-style: none;
    padding: 0;
    li {
      display: inline-block;
    }
  }
  a {
    color: white;
  }
  .active {
    color: red;
  }
  .actives {
    color: red;
  }
  .notebook-box {
    // background: red;
    box-shadow: 1px 1px 5px gray;
    .sideBar {
      background: rgb(150, 147, 147);
      color: rgb(231, 227, 218);
      i {
        &:hover {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }
}
.shengming {
  button {
    width: 200px;
    height: 30px;
    margin: 10px auto;
    border-radius: 20px;
    background: rgb(102, 160, 248);
    color: white;
    border: none;
    cursor: pointer;
  }
}
xxx {
  color: rgb(109, 203, 247);
}
</style>
