<template>
  <div class="contain">
    <div style="margin-bottom:50px;text-align: center;">
      <button class="el-icon-house" @click="goHome">home</button>
      <!-- <button @click="biu">触发事件</button> -->
    </div>
    <div>嵌套子路由的使用</div>
    <div style="display:flex;margin-top: 20px;">
      <ul style="">
        <li style="">
          <router-link active-class="active" to="/test/tes">首页</router-link>
        </li>
        <li>
          <router-link active-class="active" to="/test/tes2">简介</router-link>
        </li>
        <li>
          <router-link active-class="active" to="/test/tes3"
            >产品中心</router-link
          >
        </li>
        <li>
          <router-link active-class="active" to="/test/tes4"
            >行业新闻</router-link
          >
        </li>
        <li>
          <router-link active-class="active" to="/test/tes5"
            >联系我们</router-link
          >
        </li>
      </ul>
      <div style="border:1px solid red;width:100%">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../../hepler/Bus";
export default {
  provide() {
    return {
      na: "小明"
    };
  },

  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/" });
    },
    biu() {
      this.$event.$emit("send", "传递给父组件");
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: red; //表示路由被选中时的样式
}
.contain {
  ul {
    list-style: none;
    text-decoration: none;
    width: 90px;
    // border: 1px solid red;
    text-align: left;
    padding: 0;
    margin: 0;
    li {
      margin: 20px;
      text-decoration: none;
      text-align: center;
      a {
        text-decoration: none;
      }
      &:hover {
        background: rgb(174, 238, 144);
      }
    }
  }
}
</style>
