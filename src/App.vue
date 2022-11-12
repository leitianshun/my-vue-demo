<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { setWaterMark, removeWatermark } from "./utils/watermark";

export default {
  name: "App",
  created() {
    setWaterMark("顺哥哥");
  },
  destroyed() {
    removeWatermark();
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; /*内容居中*/
  color: #2c3e50;
  margin-top: 10px;
}

html,
body,
#app {
  height: 100%;
}
* {
  /* box-sizing: border-box; */
  /* margin: 0;
  padding: 0; */
}

/*
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}

a {
  text-decoration: none;
  color: #444;
}

ul,
li {
  list-style: none;
} */
</style>
