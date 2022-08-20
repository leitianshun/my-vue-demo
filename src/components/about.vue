<template>
  <div>
    <router-link to="/">
      <button class="el-icon-house">home</button></router-link
    >
    <div style="margin-top:100px">
      <router-link to="/gen">
        <button>饿了吗组件使用</button>
      </router-link>
    </div>

    <div style="display:flex">
      <button @click="set">this.$set 数组添加值写法</button>
      <ul v-for="i in list" :key="i.id">
        <li>{{ i }}</li>
      </ul>
    </div>

    <div style="display:flex;margin-top: 20px;">
      <button @click="setObj">this.$set 添加对象写法</button>
      {{ obj }}
    </div>

    <div style="display:flex;margin-top: 20px;">
      <button @click="setObjs">Object.assign 添加对象写法</button>
      {{ obj2 }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3],
      obj: {
        name: "小明",
        age: 18
      },
      obj2: {
        name: "张飞",
        age: 20
      }
    };
  },
  methods: {
    set() {
      this.$set(this.list, this.list.push(), Math.random().toFixed(2)); //this.$set(Array,index,newValue)
    },
    setObj() {
      this.$set(this.obj, "gender", "男"); //this.$set(Object, key, value)
    },
    setObjs() {
      this.obj2 = Object.assign({}, this.obj2, { color: "green" });
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  li {
    list-style: none;
  }
}
</style>
